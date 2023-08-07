<?php

namespace App\Http\Controllers\Principals;

use App\Events\GenerateTemplated;
use App\Http\Controllers\Controller;
use App\Http\Controllers\InvoicesController;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Storage;

class MagnoliaIncController extends Controller
{
    private $PRINCIPAL_CODE = 'NA';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
        try {
            $this->PRINCIPAL_CODE = explode("/",Route::current()->getAction()['prefix'])[1] ?? 'NA';
        } catch (\Throwable $th) {
            //throw $th;
        }
        // dd($this->PRINCIPAL_CODE);
    }


    // =====================================================================
    // =====================================================================
    // ITEMS =============================================================
    // =====================================================================
    // =====================================================================

    /**
     * Gets items list
     */
    function items()
    {
        // CCMS stuff HAHAHA (Don't mind this!)
        // password reset (test)
        // dd(Hash::make('12345'));

        set_time_limit(0);
        $row_count = request()->row_count ?? 10;
        $search_key = request()->search_key ?? '';

        $result = DB::table(PrincipalsUtil::$TBL_PRINCIPALS_ITEMS)
            ->leftJoin(PrincipalsUtil::$TBL_GENERAL_ITEMS,
                PrincipalsUtil::$TBL_GENERAL_ITEMS. '.item_code',
                PrincipalsUtil::$TBL_PRINCIPALS_ITEMS. '.item_code'
            )
            // ->leftJoin(PrincipalsUtil::$TBL_PRINCIPALS,
            //     PrincipalsUtil::$TBL_PRINCIPALS. '.vendor_code',
            //     PrincipalsUtil::$TBL_GENERAL_ITEMS. '.vendor_code'
            // )
            ->select([
                PrincipalsUtil::$TBL_PRINCIPALS_ITEMS. '.*',
                PrincipalsUtil::$TBL_GENERAL_ITEMS. '.vendor_code',
                // PrincipalsUtil::$TBL_PRINCIPALS. '.name AS principal_name',
            ])

            ->where('principal_code', $this->PRINCIPAL_CODE)
            // ->get($cols);

            ->where(function($q) use ($search_key) {
                $q->where(
                    PrincipalsUtil::$TBL_PRINCIPALS_ITEMS.'.item_code',
                    'like',
                    '%'. $search_key. '%'
                )->orWhere(
                    PrincipalsUtil::$TBL_PRINCIPALS_ITEMS.'.description',
                    'like',
                    '%'. $search_key. '%'
                )->orWhere(
                    PrincipalsUtil::$TBL_PRINCIPALS_ITEMS.'.item_code_supplier',
                    'like',
                    '%'. $search_key. '%'
                )->orWhere(
                    PrincipalsUtil::$TBL_PRINCIPALS_ITEMS.'.description_supplier',
                    'like',
                    '%'. $search_key. '%'
                )
                ;
            })
            ->paginate($row_count);

        return response()->json($result);
    }

    /**
     * Import items masterfile (.csv)
     */
    public function uploadMasterItems(Request $request)
    {
        set_time_limit(0);

        try {
            // $fileName = $request->file->getClientOriginalName()
            //     . '-' . time() . '.' . $request->file->getClientOriginalExtension();
            // $request->file->storeAs('public/test_files', $fileName);

            $delimiter = ',';
            $fileName = time() . '.' . $request->file->getClientOriginalName();
            $fileStoragePath = "public/principals/" . $this->PRINCIPAL_CODE . "/items";
            Storage::putFileAs($fileStoragePath, $request->file, $fileName);

            $res['success'] = true;
            $res['message'] = 'File uploaded successfully';

            DB::beginTransaction();

            if (Storage::exists("$fileStoragePath/$fileName")) {
                $fileContent = Storage::get("$fileStoragePath/$fileName");

                // init lineCount to 1 for the header
                $lineCount = 1;

                DB::table(PrincipalsUtil::$TBL_PRINCIPALS_ITEMS)
                    ->where('principal_code', $this->PRINCIPAL_CODE)->delete();

                $arrLines = [];
                $fileContent = utf8_encode($fileContent);
                $fileContentLines = explode(PHP_EOL, mb_convert_encoding($fileContent, "UTF-8", "UTF-8"));

                foreach ($fileContentLines as $fileContentLine) {
                    // Begin on the second line to skip the headers
                    if ($lineCount > 1) {
                        // $arrFileContentLine = explode($delimiter, $fileContentLine);
                        $arrFileContentLine = preg_split('/,(?=(?:(?:[^"]*"){2})*[^"]*$)/', $fileContentLine);

                        if (count($arrFileContentLine) > 1) {
                            $item_code_supplier = trim(str_replace('"', '', $arrFileContentLine[0]));
                            $description_supplier = trim(str_replace('"', '', $arrFileContentLine[1]));
                            $item_code = trim(str_replace('"', '', $arrFileContentLine[2]));
                            $conversion_qty = trim(str_replace('"', '', $arrFileContentLine[5]));
                            $conversion_qty = intval($conversion_qty);
                            $uom_price = trim(str_replace('"', '', $arrFileContentLine[6]));
                            $uom_price = str_replace(',', '', $uom_price);
                            $uom_price = floatval($uom_price);
                            $conversion_uom_price = trim(str_replace('"', '', $arrFileContentLine[7]));
                            $conversion_uom_price = str_replace(',', '', $conversion_uom_price);
                            $conversion_uom_price = floatval($conversion_uom_price);
                            $uom = trim(str_replace('"', '', $arrFileContentLine[8]));
                            $conversion_uom = trim(str_replace('"', '', $arrFileContentLine[9]));

                            if(
                                ($item_code_supplier!='' || $item_code_supplier!='#N/A')
                                && ($item_code!='' || $item_code!='#N/A')
                                && ($conversion_qty!='' || $conversion_qty!='#N/A')
                                && ($uom_price!='' || $uom_price!='#N/A')
                                && ($conversion_uom_price!='' || $conversion_uom_price!='#N/A')
                            ) {
                                $arrLines[] = [
                                    'principal_code' => $this->PRINCIPAL_CODE,
                                    'item_code' => $item_code,
                                    'item_code_supplier' => $item_code_supplier,
                                    'description_supplier' => $description_supplier,
                                    'conversion_qty' => $conversion_qty,
                                    'uom' => $uom,
                                    'conversion_uom' => $conversion_uom,
                                    'uom_price' => $uom_price,
                                    'conversion_uom_price' => $conversion_uom_price,
                                    'uploaded_by' => auth()->user()->id
                                ];
                            }
                        }
                    }
                    $lineCount++;
                }

                $chunks = array_chunk($arrLines, 500);
                foreach ($chunks as $chunk) {
                    DB::table(PrincipalsUtil::$TBL_PRINCIPALS_ITEMS)->insert($chunk);
                }
            }

            DB::commit();
            return response()->json($res);
        } catch (\Throwable $th) {
            DB::rollBack();
            $res['success'] = false;
            $res['message'] = $th->getMessage();
            return response()->json($res, 500);
        }
    }


    // =====================================================================
    // =====================================================================
    // CUSTOMERS ===========================================================
    // =====================================================================
    // =====================================================================

    /**
     * Get customers list
     */
    function customers()
    {
        set_time_limit(0);

        $row_count = request()->row_count ?? 10;
        $search_key = request()->search_key ?? '';

        // $result = DB::table(PrincipalsUtil::$TBL_PRINCIPALS_CUSTOMERS)
        //     ->leftJoin(
        //         PrincipalsUtil::$TBL_GENERAL_CUSTOMERS,
        //         PrincipalsUtil::$TBL_PRINCIPALS_CUSTOMERS . '.customer_code',
        //         '=',
        //         PrincipalsUtil::$TBL_GENERAL_CUSTOMERS.'.customer_code'
        //     )
        //     ->select(
        //         PrincipalsUtil::$TBL_PRINCIPALS_CUSTOMERS . '.*',
        //         PrincipalsUtil::$TBL_GENERAL_CUSTOMERS.'.name AS customer_name',
        //         PrincipalsUtil::$TBL_GENERAL_CUSTOMERS.'.address',
        //         PrincipalsUtil::$TBL_GENERAL_CUSTOMERS.'.address_2',
        //         PrincipalsUtil::$TBL_GENERAL_CUSTOMERS.'.city',
        //     )
        //     ->where(
        //         PrincipalsUtil::$TBL_PRINCIPALS_CUSTOMERS . '.principal_code',
        //         $this->PRINCIPAL_CODE
        //     )
        //     ->get();

        $result = DB::table(PrincipalsUtil::$TBL_PRINCIPALS_CUSTOMERS)
            ->where('principal_code', $this->PRINCIPAL_CODE)
            // ->get();

            ->where(function($q) use ($search_key) {
                $q->where(
                    PrincipalsUtil::$TBL_PRINCIPALS_CUSTOMERS.'.distributor_code',
                    'like',
                    '%'. $search_key. '%'
                )->orWhere(
                    PrincipalsUtil::$TBL_PRINCIPALS_CUSTOMERS.'.customer_code',
                    'like',
                    '%'. $search_key. '%'
                )->orWhere(
                    PrincipalsUtil::$TBL_PRINCIPALS_CUSTOMERS.'.customer_name',
                    'like',
                    '%'. $search_key. '%'
                )->orWhere(
                    PrincipalsUtil::$TBL_PRINCIPALS_CUSTOMERS.'.outlet_type',
                    'like',
                    '%'. $search_key. '%'
                )->orWhere(
                    PrincipalsUtil::$TBL_PRINCIPALS_CUSTOMERS.'.salesman_name',
                    'like',
                    '%'. $search_key. '%'
                )
                ;
            })
            ->paginate($row_count);

        return response()->json($result);
    }

    /**
     * Import customers masterfile (.csv)
     */
    public function uploadMasterCustomers(Request $request)
    {
        set_time_limit(0);
        try {
            $delimiter = ',';
            $fileName = time() . '.' . $request->file->getClientOriginalName();
            $fileStoragePath = "public/principals/" . $this->PRINCIPAL_CODE . "/customers";
            Storage::putFileAs($fileStoragePath, $request->file, $fileName);

            $res['success'] = true;
            $res['message'] = 'File uploaded successfully';

            DB::beginTransaction();

            if (Storage::exists("$fileStoragePath/$fileName")) {
                $fileContent = Storage::get("$fileStoragePath/$fileName");

                // init lineCount to 1 for the header
                $lineCount = 2;

                DB::table(PrincipalsUtil::$TBL_PRINCIPALS_CUSTOMERS)
                    ->where('principal_code', $this->PRINCIPAL_CODE)->delete();

                $fileContent = mb_convert_encoding($fileContent,"UTF-8");
                $fileContent = str_replace("\x00",'',$fileContent);
                $fileContentLines = explode("\r\n", $fileContent);

                // dd($fileContentLines);

                $arrLines = [];

                foreach ($fileContentLines as $fileContentLine) {
                    // Begin at the second line (exclude the header)
                    if ($lineCount > 2) {
                        $arrFileContentLine = preg_split('/,(?=(?:(?:[^"]*"){2})*[^"]*$)/', $fileContentLine);

                        if (count($arrFileContentLine) > 1) {
                            // ==========================================================================
                            $customer_code_supplier = trim(str_replace('"', '', $arrFileContentLine[30]));
                            $customer_code = trim(str_replace('"', '', $arrFileContentLine[31]));
                            $customer_name = trim(str_replace('"', '', $arrFileContentLine[32]));
                            // =========================================================================
                            $arrLines[] = [
                                'principal_code' => $this->PRINCIPAL_CODE,
                                'customer_code_supplier' => $customer_code_supplier,
                                'customer_code' => $customer_code,
                                'customer_name' => $customer_name,
                                'uploaded_by' => auth()->user()->id
                            ];
                        }
                    }
                    $lineCount++;
                }

                $chunks = array_chunk($arrLines, 500);
                foreach ($chunks as $chunk) {
                    DB::table(PrincipalsUtil::$TBL_PRINCIPALS_CUSTOMERS)->insert($chunk);
                }
            }

            DB::commit();
            return response()->json($res);
        } catch (\Throwable $th) {
            DB::rollBack();
            $res['success'] = false;
            $res['message'] = $th->getMessage();
            return response()->json($res, 500);
        }
    }



    // =====================================================================
    // =====================================================================
    // SALESMEN ===========================================================
    // =====================================================================
    // =====================================================================

    /**
     * Get salesmen list
     */
    function salesmen()
    {
        set_time_limit(0);

        $result = DB::table(PrincipalsUtil::$TBL_PRINCIPALS_SALESMEN)
            ->where('principal_code', $this->PRINCIPAL_CODE)
            ->get();
        return response()->json($result);
    }

    /**
     * Import salesmen masterfile (.csv)
     */
    public function uploadMasterSalesmen(Request $request)
    {
        set_time_limit(0);
        try {
            $delimiter = ',';
            $fileName = time() . '.' . $request->file->getClientOriginalName();
            $fileStoragePath = "public/principals/" . $this->PRINCIPAL_CODE . "/salesmen";
            Storage::putFileAs($fileStoragePath, $request->file, $fileName);

            DB::beginTransaction();

            if (Storage::exists("$fileStoragePath/$fileName")) {
                $fileContent = Storage::get("$fileStoragePath/$fileName");

                // init lineCount to 1 for the header
                $lineCount = 1;

                DB::table(PrincipalsUtil::$TBL_PRINCIPALS_SALESMEN)
                    ->where('principal_code', $this->PRINCIPAL_CODE)->delete();

                $fileContent = utf8_encode($fileContent);
                $fileContentLines = explode(
                    PHP_EOL,
                    mb_convert_encoding($fileContent, "UTF-8", "UTF-8")
                );
                $arrLines = [];

                foreach ($fileContentLines as $fileContentLine) {
                    // Begin at the second line (exclude the header)
                    if ($lineCount > 1) {
                        $arrFileContentLine = preg_split('/,(?=(?:(?:[^"]*"){2})*[^"]*$)/', $fileContentLine);

                        if (count($arrFileContentLine) > 1) {
                            // ==========================================================================
                            $sm_name = trim(str_replace('"', '', $arrFileContentLine[0]));
                            $route_code = trim(str_replace('"', '', $arrFileContentLine[1]));
                            // =========================================================================

                            $arrLines[] = [
                                'principal_code' => $this->PRINCIPAL_CODE,
                                'sm_name' => $sm_name,
                                'route_code' => $route_code,
                                'uploaded_by' => auth()->user()->id
                            ];
                        }
                    }
                    $lineCount++;
                }

                $chunks = array_chunk($arrLines, 500);
                foreach ($chunks as $chunk) {
                    DB::table(PrincipalsUtil::$TBL_PRINCIPALS_SALESMEN)->insert($chunk);
                }
            }

            DB::commit();
            $res['success'] = true;
            $res['message'] = 'File uploaded successfully';
            return response()->json($res);
        } catch (\Throwable $th) {
            DB::rollBack();
            $res['success'] = false;
            $res['message'] = $th->getMessage();
            return response()->json($res, 500);
        }
    }


    // =====================================================================
    // =====================================================================
    // INVOICES ===========================================================
    // =====================================================================
    // =====================================================================

    /**
     * Generate templated data based on invoices with 'pending' status
     */
    public function generateTemplatedData(Request $request)
    {
        set_time_limit(0);

        try {
            // templated data grouped result filter
            $group_by = $request->group_by;
            if($group_by==null || $group_by=='null' || $group_by=='' || $group_by=='undefined') {
                $group_by = 'system_date';
            }

            // $template_variation_count = 1;
            $template_variation_count = DB::table(PrincipalsUtil::$TBL_PRINCIPALS)
                ->where('code', $this->PRINCIPAL_CODE)->pluck('template_variation_count')->first() ?? 1;

            $res['success'] = true;
            $res['message'] = 'Success';
            $res['line_count'] = 0;
            $res['output_template_variations'] = [
                [
                    'name' => 'Sales Invoices',
                    'output_template' => [],
                ],
                [
                    'name' => 'Returns',
                    'output_template' => [],
                ],
            ];

            $dateToday = Carbon::now();
            $system_date = $dateToday->format('Y/m/d');
            $settings = PrincipalsUtil::getSettings($this->PRINCIPAL_CODE);
            $br_config = DB::table('br_config')->get()->first();
            // ***************************************************************************

            // ************************* MISC INITS **************************************
            $filesTotalLineCount = 0;
            $chunk_line_count = intval($settings['chunk_line_count'] ?? 0);
            $breakFilesIteration = false;

            $pageLineCount = 1;
            $pageNum = 1;
            // ************************* /MISC INITS *************************************

            // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX TEMPLATE(S) XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

            // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX TEMPLATE 1 XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
            if(1) {
                // **************** PENDING INVOICES ****************************************
                $pendingInvoices = InvoicesController::getPendingInvoices(
                    $request->principal_code, $request->posting_date_range, $request->status
                );
                // dd($pendingInvoices[0]);
                $res['line_count'] = $pendingInvoices->count();
                // **************** /PENDING INVOICES ****************************************

                // Loop through each line of the file content
                $loopCounter = 0;
                foreach ($pendingInvoices as $pendingInvoice) {
                    $loopCounter++;

                    $progressPercent = round(($loopCounter / $res['line_count']) * 100);
                    GenerateTemplated::dispatch("Generating sales invoices ($progressPercent%)");

                    $doc_no =               trim($pendingInvoice->doc_no);
                    // $customer_code       = trim($pendingInvoice->customer_code);
                    $customer_code =        '101798'; // for BR test (Espana Store External ID)
                    $posting_date =         trim($pendingInvoice->posting_date);
                    $posting_date =         (new Carbon($posting_date))->format('m/d/Y');
                    $item_code =            trim($pendingInvoice->item_code) . '';
                    $quantity =             $pendingInvoice->quantity;
                    $price =                $pendingInvoice->price;
                    $amount =               $pendingInvoice->amount;
                    $uom =                  $pendingInvoice->uom;
                    $item_description =     $pendingInvoice->item_description;
                    $group_code =           $pendingInvoice->group;
                    $sm_code =              $pendingInvoice->sm_code;
                    $discount_percentage =  $pendingInvoice->discount_percentage ?? 0;

                    //********************************************************************
                    $customer = DB::table(PrincipalsUtil::$TBL_PRINCIPALS_CUSTOMERS)
                        ->where('principal_code', $this->PRINCIPAL_CODE)
                        ->where('customer_code', $customer_code)
                        ->first();
                    $item = DB::table(PrincipalsUtil::$TBL_PRINCIPALS_ITEMS)
                        ->where('principal_code', $this->PRINCIPAL_CODE)
                        ->where('item_code', $item_code)
                        ->first();

                    // price and uom mapping (supplier) ********************
                    $uom_supplier = $pendingInvoice->qty_per_uom > 1 ?
                        $item->uom : $item->conversion_uom;
                    $price_supplier = $pendingInvoice->qty_per_uom > 1 ?
                        ($item->uom_price ?? 0) : ($item->conversion_uom_price ?? 0);
                    $price_supplier = doubleval($price_supplier);
                    $amount_supplier = round($price_supplier * $quantity, 4);

                    // ************************* MISC INITS **************************
                    $item_notfound = 0;
                    $customer_notfound = 0;
                    $salesman_notfound = 0;
                    $missing_customer_name = '';
                    $missing_item_name = '';
                    $item_code_supplier = 'NA';
                    $item_description_supplier = 'NA';
                    $customer_code_supplier = 'NA';
                    // $sm_code = 'NA';

                    // check item *******************************
                    if ($item == null) {
                        $item_notfound = 1;
                        $missing_item_name = $item_description;
                    } else {
                        $item_code_supplier = "00000". $item->item_code_supplier;
                        $item_description_supplier = $item->description_supplier;
                    }
                    // check customer ***************************
                    if ($customer == null) {
                        $customer_notfound = 1;
                        $missing_customer_name = DB::table(PrincipalsUtil::$TBL_GENERAL_CUSTOMERS)
                            ->where('customer_code', $customer_code)
                            ->first()->name ?? PrincipalsUtil::$CUSTOMER_NOT_FOUND;
                    } else {
                        $customer_code_supplier = $customer->customer_code_supplier;
                        $customer_name = $customer->customer_name;
                    }
                    // ************************* /MISC INITS **************************

                    // Generated data line structure
                    $arrGenerated = [
                        //commons
                        'customer_code' =>          $customer_code_supplier,
                        'alturas_customer_code' =>  $customer_code,
                        'item_code' =>              $item_code_supplier,
                        'alturas_item_code' =>      $item_code,
                        'doc_no' =>                 $doc_no,
                        'missing_customer_name' =>  $missing_customer_name,
                        'missing_item_name' =>      $missing_item_name,
                        'customer_notfound' =>      $customer_notfound,
                        'item_notfound' =>          $item_notfound,
                        'salesman_notfound' =>      $salesman_notfound,
                        // principal specific
                        'invoice_no' =>             $doc_no,
                        'invoice_date' =>           $posting_date,
                        'quantity' =>               $quantity,
                        'price' =>                  $price,
                        'price_supplier' =>         $price_supplier,
                        'amount' =>                 $amount,
                        'amount_supplier' =>        $amount_supplier,
                        'uom' =>                    $uom,
                        'uom_supplier' =>           $uom_supplier,
                        'item_description' =>       $item_description,
                        'description_supplier' =>   $item_description_supplier,
                        'customer_name' =>          $customer_name ?? $missing_customer_name,
                        'sm_code' =>                $sm_code,
                        'system_date' =>            $system_date,
                        'group' =>                  $group_code,
                        'status' =>                 $pendingInvoice->status,
                        // other BR payload props
                        'cf_dsp_name_id' =>         $br_config->cf_dsp_name,
                        'cf_dsp_name_value' =>      $settings['DSP_'. $group_code],
                        'invoice_number' =>         trim($pendingInvoice->vendor_code). '-'. $doc_no,
                        'discount_percentage' =>    $discount_percentage,
                    ];

                    if ($chunk_line_count > 0) {
                        if (
                            !isset(
                                $res[
                                    'output_template_variations'
                                ][0]['output_template']["Page " . $pageNum]
                            )
                        ) {
                            $res[
                                'output_template_variations'
                            ][0]['output_template']["Page " . $pageNum] = [];
                        }
                        array_push(
                            $res[
                                'output_template_variations'
                            ][0]['output_template']["Page " . $pageNum],
                            $arrGenerated
                        );

                        $pageLineCount += 1;
                        if ($pageLineCount > $chunk_line_count) {
                            $pageNum += 1;
                            $pageLineCount = 1;
                        }
                    } else {
                        // group output_template_variations
                        if (
                            !isset(
                                $res[
                                    'output_template_variations'
                                ][0]['output_template'][$$group_by]
                            )
                        ) {
                            $res[
                                'output_template_variations'
                            ][0]['output_template'][$$group_by] = [];
                        }
                        array_push(
                            $res[
                                'output_template_variations'
                            ][0]['output_template'][$$group_by],
                            $arrGenerated
                        );
                    }
                } // /loop invoices

                // reset this guys to 1
                $pageLineCount = 1;
                $pageNum = 1;

            }
            // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX /TEMPLATE 1 XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

            // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX TEMPLATE 2 XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
            if(2) {
                // **************** RETURNS ************************************************
                $returns = InvoicesController::getReturns(
                    $request->principal_code, $request->posting_date_range, $request->status
                );
                // dd($returns[0]);
                // **************** /RETURNS ************************************************

                // Loop through each line of the file content
                $loopCounter = 0;
                foreach ($returns as $return) {
                    $loopCounter++;

                    $progressPercent = round(($loopCounter / $res['line_count']) * 100);
                    GenerateTemplated::dispatch("Generating returns ($progressPercent%)");

                    $doc_no =               trim($return->doc_no);
                    // $customer_code       = trim($return->customer_code);
                    $customer_code =        '101798'; // for BR test (Espana Store External ID)
                    $shipment_date =         trim($return->shipment_date);
                    $shipment_date =         (new Carbon($shipment_date))->format('m/d/Y');
                    $item_code =            trim($return->item_code) . '';
                    $quantity =             $return->quantity;
                    $price =                $return->price;
                    $amount =               $return->amount;
                    $uom =                  $return->uom;
                    $item_description =     $return->item_description;
                    $group_code =           $return->group;
                    $discount_percentage =  $return->discount_percentage ?? 0;
                    $invoice_quantity =     $return->invoice_quantity;
                    $invoice_doc_no =       $return->invoice_doc_no;
                    $return_indicator =     $return->return_indicator;

                    //********************************************************************
                    $customer = DB::table(PrincipalsUtil::$TBL_PRINCIPALS_CUSTOMERS)
                        ->where('principal_code', $this->PRINCIPAL_CODE)
                        ->where('customer_code', $customer_code)
                        ->first();
                    $item = DB::table(PrincipalsUtil::$TBL_PRINCIPALS_ITEMS)
                        ->where('principal_code', $this->PRINCIPAL_CODE)
                        ->where('item_code', $item_code)
                        ->first();

                    // // price and uom mapping (supplier) ********************
                    // $uom_supplier = $return->qty_per_uom > 1 ?
                    //     $item->uom : $item->conversion_uom;
                    // $price_supplier = $return->qty_per_uom > 1 ?
                    //     ($item->uom_price ?? 0) : ($item->conversion_uom_price ?? 0);
                    // $price_supplier = doubleval($price_supplier);
                    // $amount_supplier = round($price_supplier * $quantity, 4);

                    // ************************* MISC INITS **************************
                    $item_notfound = 0;
                    $customer_notfound = 0;
                    $salesman_notfound = 0;
                    $missing_customer_name = '';
                    $missing_item_name = '';
                    $item_code_supplier = 'NA';
                    $item_description_supplier = 'NA';
                    $customer_code_supplier = 'NA';

                    // check item *******************************
                    if ($item == null) {
                        $item_notfound = 1;
                        $missing_item_name = $item_description;
                    } else {
                        $item_code_supplier = "00000". $item->item_code_supplier;
                        $item_description_supplier = $item->description_supplier;

                        // price and uom mapping (supplier) ********************
                        $uom_supplier = $return->qty_per_uom > 1 ?
                            $item->uom : $item->conversion_uom;
                        $price_supplier = $return->qty_per_uom > 1 ?
                            ($item->uom_price ?? 0) : ($item->conversion_uom_price ?? 0);
                        $price_supplier = doubleval($price_supplier);
                        $amount_supplier = round($price_supplier * $quantity, 4);
                    }
                    // check customer ***************************
                    if ($customer == null) {
                        $customer_notfound = 1;
                        $missing_customer_name = DB::table(PrincipalsUtil::$TBL_GENERAL_CUSTOMERS)
                            ->where('customer_code', $customer_code)
                            ->first()->name ?? PrincipalsUtil::$CUSTOMER_NOT_FOUND;
                    } else {
                        $customer_code_supplier = $customer->customer_code_supplier;
                        $customer_name = $customer->customer_name;
                    }
                    // ************************* /MISC INITS **************************

                    // Generated data line structure
                    $arrGenerated = [
                        //commons
                        'customer_code' =>          $customer_code_supplier,
                        'alturas_customer_code' =>  $customer_code,
                        'item_code' =>              $item_code_supplier,
                        'alturas_item_code' =>      $item_code,
                        'doc_no' =>                 $doc_no,
                        'missing_customer_name' =>  $missing_customer_name,
                        'missing_item_name' =>      $missing_item_name,
                        'customer_notfound' =>      $customer_notfound,
                        'item_notfound' =>          $item_notfound,
                        'salesman_notfound' =>      $salesman_notfound,
                        // principal specific
                        'invoice_no' =>             $doc_no,
                        'invoice_date' =>           $shipment_date,
                        'quantity' =>               $quantity,
                        'price' =>                  $price,
                        'price_supplier' =>         $price_supplier ?? 0,
                        'amount' =>                 $amount,
                        'amount_supplier' =>        $amount_supplier ?? 0,
                        'uom' =>                    $uom,
                        'uom_supplier' =>           $uom_supplier ?? 'NA',
                        'item_description' =>       $item_description,
                        'description_supplier' =>   $item_description_supplier,
                        'customer_name' =>          $customer_name ?? $missing_customer_name,
                        'system_date' =>            $system_date,
                        'group' =>                  $group_code,
                        'status' =>                 $return->status,
                        // other BR payload props
                        'cf_dsp_name_id' =>         $br_config->cf_dsp_name,
                        'cf_dsp_name_value' =>      $settings['DSP_'. $group_code],
                        'invoice_number' =>         trim($return->vendor_code). '-'. $doc_no,
                        'discount_percentage' =>    $discount_percentage,
                        // order orig details
                        'invoice_quantity' =>       $invoice_quantity,
                        'invoice_doc_no' =>         $invoice_doc_no,
                        'return_indicator' =>       $return_indicator,
                    ];

                    if ($chunk_line_count > 0) {
                        if (
                            !isset(
                                $res[
                                    'output_template_variations'
                                ][1]['output_template']["Page " . $pageNum]
                            )
                        ) {
                            $res[
                                'output_template_variations'
                            ][1]['output_template']["Page " . $pageNum] = [];
                        }
                        array_push(
                            $res[
                                'output_template_variations'
                            ][1]['output_template']["Page " . $pageNum],
                            $arrGenerated
                        );

                        $pageLineCount += 1;
                        if ($pageLineCount > $chunk_line_count) {
                            $pageNum += 1;
                            $pageLineCount = 1;
                        }
                    } else {
                        // group output_template_variations
                        if (
                            !isset(
                                $res[
                                    'output_template_variations'
                                ][1]['output_template'][$$group_by]
                            )
                        ) {
                            $res[
                                'output_template_variations'
                            ][1]['output_template'][$$group_by] = [];
                        }
                        array_push(
                            $res[
                                'output_template_variations'
                            ][1]['output_template'][$$group_by],
                            $arrGenerated
                        );
                    }
                } // /loop invoices

                // reset this guys to 1
                $pageLineCount = 1;
                $pageNum = 1;

            }
            // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX /TEMPLATE 2 XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

            // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX /TEMPLATES XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

            // $fileCount++;

            return response()->json($res);

        } catch (\Throwable $th) {
            $res['success'] = false;
            $res['message'] = $th->getMessage();
            return response()->json($res, 500);
        }
    }

    // temporary
    public function resetInvoicesToPending() {
        $res = DB::table('invoices_lines')
            ->whereIn('vendor_code',['S3030','S4135','S3564'])
            ->update([
                'status' => 'pending'
            ]);
        return response()->json($res);
    }

}
