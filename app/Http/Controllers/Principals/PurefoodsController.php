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

class PurefoodsController extends Controller
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
            // dd($this->PRINCIPAL_CODE);
        } catch (\Throwable $th) {
            dd($th->getMessage());
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

            ->where(PrincipalsUtil::$TBL_PRINCIPALS_ITEMS. '.main_vendor_code', $this->PRINCIPAL_CODE)
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
                    ->where('main_vendor_code', $this->PRINCIPAL_CODE)->delete();

                $arrLines = [];
                $fileContent = utf8_encode($fileContent);
                $fileContentLines = explode(PHP_EOL, mb_convert_encoding($fileContent, "UTF-8", "UTF-8"));

                foreach ($fileContentLines as $fileContentLine) {
                    // Begin on the second line to skip the headers
                    if ($lineCount > 1) {
                        // $arrFileContentLine = explode($delimiter, $fileContentLine);
                        $arrFileContentLine = preg_split('/,(?=(?:(?:[^"]*"){2})*[^"]*$)/', $fileContentLine);

                        if (count($arrFileContentLine) > 1) {
                            // get column data **********************************************************
                            $item_code_supplier = trim(str_replace('"', '', $arrFileContentLine[0]));
                            $description_supplier = trim(str_replace('"', '', $arrFileContentLine[1]));
                            $item_code = trim(str_replace('"', '', $arrFileContentLine[2]));

                            $conversion_qty = trim(str_replace('"', '', $arrFileContentLine[5]));
                            $conversion_qty = intval($conversion_qty);

                            $uom_price = trim(str_replace('"', '', $arrFileContentLine[6]));
                            $uom_price = str_replace(',', '', $uom_price);
                            $uom_price = floatval($uom_price);

                            $uom = trim(str_replace('"', '', $arrFileContentLine[7]));

                            $conversion_uom_price = trim(str_replace('"', '', $arrFileContentLine[8]));
                            $conversion_uom_price = str_replace(',', '', $conversion_uom_price);
                            $conversion_uom_price = floatval($conversion_uom_price);

                            $conversion_uom = trim(str_replace('"', '', $arrFileContentLine[9]));
                            // /get column data **********************************************************

                            if(
                                ($item_code_supplier!='' || $item_code_supplier!='#N/A')
                                && ($item_code!='' || $item_code!='#N/A')
                                && ($conversion_qty!='' || $conversion_qty!='#N/A')
                                && ($uom_price!='' || $uom_price!='#N/A')
                                && ($conversion_uom_price!='' || $conversion_uom_price!='#N/A')
                            ) {
                                $arrLines[] = [
                                    'main_vendor_code' => $this->PRINCIPAL_CODE,
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
            ->where('main_vendor_code', $this->PRINCIPAL_CODE)
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
                    ->where('main_vendor_code', $this->PRINCIPAL_CODE)->delete();

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
                            // $customer_code_supplier = trim(str_replace('"', '', $arrFileContentLine[30]));
                            // $customer_code = trim(str_replace('"', '', $arrFileContentLine[31]));
                            // $customer_name = trim(str_replace('"', '', $arrFileContentLine[32]));
                            $customer_code = trim(str_replace('"', '', $arrFileContentLine[0]));
                            $customer_code_supplier = trim(str_replace('"', '', $arrFileContentLine[1]));
                            $customer_name = trim(str_replace('"', '', $arrFileContentLine[2]));
                            // =========================================================================
                            $arrLines[] = [
                                'main_vendor_code' => $this->PRINCIPAL_CODE,
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
            ->where('main_vendor_code', $this->PRINCIPAL_CODE)
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
                    ->where('main_vendor_code', $this->PRINCIPAL_CODE)->delete();

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
                            if($arrFileContentLine[0] != '' && $arrFileContentLine[0] != null ) {
                                // ==========================================================================
                                $division = trim(str_replace('"', '', $arrFileContentLine[0])); // group code (e.g. WDG)
                                $sm_code = trim(str_replace('"', '', $arrFileContentLine[1]));
                                $sm_name = trim(str_replace('"', '', $arrFileContentLine[2]));
                                // =========================================================================

                                $arrLines[] = [
                                    'main_vendor_code' => $this->PRINCIPAL_CODE,
                                    'division' => $division,
                                    'sm_code' => $sm_code,
                                    'sm_name' => $sm_name,
                                    'uploaded_by' => auth()->user()->id
                                ];
                            }
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
            // ************************* MISC INITS **************************************
            // templated data grouped result filter
            $group_by = $request->group_by;
            if($group_by==null || $group_by=='null' || $group_by=='' || $group_by=='undefined') {
                $group_by = 'system_date';
            }

            // response
            $res['success'] = true;
            $res['message'] = 'Success';
            $res['line_count'] = 0;
            $res['output_template_variations'] = [
                [
                    'name' => 'Sales Invoices',
                    'output_template' => [],
                ],
                // [
                //     'name' => 'Returns',
                //     'output_template' => [],
                // ],
            ];
            // /response

            $dateToday = Carbon::now();
            $system_date = $dateToday->format('Y-m-d');
            $settings = PrincipalsUtil::getSettings($this->PRINCIPAL_CODE);
            $br_config = DB::table('br_config')->get()->first();

            $principal_customers = DB::table(PrincipalsUtil::$TBL_PRINCIPALS_CUSTOMERS)
                ->where('main_vendor_code', $this->PRINCIPAL_CODE)
                ->get();
            $principal_items = DB::table(PrincipalsUtil::$TBL_PRINCIPALS_ITEMS)
                ->where('main_vendor_code', $this->PRINCIPAL_CODE)
                ->get();
            $principal_salesmen = DB::table(PrincipalsUtil::$TBL_PRINCIPALS_SALESMEN)
                ->where('main_vendor_code', $this->PRINCIPAL_CODE)
                ->get();
            // dd($principal_salesmen);

            $postingDateFormat = $request->posting_date_format ?? 'm/d/Y';
            // ************************* /MISC INITS *************************************

            // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX TEMPLATE(S) XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
            // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX TEMPLATE(S) XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
            // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX TEMPLATE(S) XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
            // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX TEMPLATE(S) XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
            // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX TEMPLATE(S) XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

            // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX TEMPLATE 1 XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
            // Sales Invoices
            if(true) {
                // **************** PENDING INVOICES ****************************************
                $pendingInvoices = InvoicesController::getPendingInvoices(
                    $request->principal_code, $request->posting_date_range, $request->status
                );
                $pendingInvoicesCount = $pendingInvoices->count();
                // dd($pendingInvoices[0]);
                $res['line_count'] += $pendingInvoicesCount;
                // **************** /PENDING INVOICES ****************************************

                // Loop through each line of the file content
                $loopCounter = 0;
                foreach ($pendingInvoices as $pendingInvoice) {
                    $loopCounter++;
                    $progressPercent = round(($loopCounter / $pendingInvoicesCount) * 100);
                    GenerateTemplated::dispatch("Generating sales invoices ($progressPercent%)");

                    $doc_no =               $pendingInvoice->doc_no;
                    $customer_code =        $pendingInvoice->customer_code;
                    // $customer_code =        '101798'; // for BR test (Espana Store External ID)
                    $posting_date =         $pendingInvoice->posting_date;
                    $posting_date =         (new Carbon($posting_date))->format($postingDateFormat);
                    $item_code =            $pendingInvoice->item_code;
                    $quantity =             $pendingInvoice->quantity;
                    $price =                doubleval($pendingInvoice->price);
                    $amount =               doubleval($pendingInvoice->amount);
                    $uom =                  $pendingInvoice->uom;
                    $item_description =     $pendingInvoice->item_description;
                    $group_code =           $pendingInvoice->group;
                    $sm_code =              $pendingInvoice->sm_code;
                    $discount_percentage =  $pendingInvoice->discount_percentage ?? 0;
                    $discount_value =       0;
                    $vat_percentage =       intval($pendingInvoice->vat_percentage ?? 0);
                    $vat_value =            0;
                    $vendor_code =          $pendingInvoice->vendor_code;
                    $qty_per_uom =          $pendingInvoice->qty_per_uom;

                    //********************************************************************
                    $nav_customer_name = $pendingInvoice->customer_name;
                    if($nav_customer_name==null || $nav_customer_name=='') {
                        $nav_customer_name = DB::table(PrincipalsUtil::$TBL_GENERAL_CUSTOMERS)
                            ->where('customer_code', $customer_code)
                            ->first()->name ?? PrincipalsUtil::$CUSTOMER_NOT_FOUND;
                    }

                    $customer = $principal_customers
                        ->where('customer_code', $customer_code)
                        ->first();

                    $item = null;
                    if($qty_per_uom > 1) {
                        $item = $principal_items
                        ->where('item_code', $item_code)
                        // ->where('conversion_qty', $qty_per_uom)
                        ->first();
                    } else {
                        $item = $principal_items
                        ->where('item_code', $item_code)
                        ->first();
                    }

                    $salesman = $principal_salesmen
                        ->filter(function($sm) use (&$group_code) {
                            return false !== strpos($group_code, $sm->division, 0);
                        })
                        ->where('sm_code', $sm_code)
                        ->first();

                    // ************************* MISC INITS **************************
                    $item_notfound = 0;
                    $customer_notfound = 0;
                    $salesman_notfound = 0;
                    $missing_customer_name = '';
                    $missing_item_name = '';
                    $item_code_supplier = '';
                    $item_description_supplier = '';
                    $customer_code_supplier = '';
                    // $sm_code = 'NA';
                    $sm_name = '';
                    $uom_supplier = '';
                    $price_supplier = 0;
                    $amount_supplier = 0;

                    // check item *******************************
                    if ($item == null) {
                        $item_notfound = 1;
                        $missing_item_name = $item_description;
                    } else {
                        if($item->item_code_supplier!='') {
                            $item_code_supplier = str_pad(
                                $item->item_code_supplier,
                                18,
                                "0",
                                STR_PAD_LEFT
                            );
                        }
                        $item_description_supplier = $item->description_supplier;

                        // price and uom mapping (supplier) ********************
                        $uom_supplier = $qty_per_uom > 1 ?
                            $item->uom : $item->conversion_uom;

                        // XXXXXXXXXXXXXXXXXXXXXXXX PRICEHACKS RIGHT FUCKIN HERE XXXXXXXXXXXXXXXXXXXXXXXX
                        // map to supplier price
                        $price_supplier = ($item->uom_price / $item->conversion_qty) * $qty_per_uom;
                        // map to orig price temporarily
                        // $price_supplier = $price;

                        // reverse percentage to get the vat-ex price
                        if($vat_percentage > 0) {
                            // $price_vat_ex = $price / (1 + ($vat_percentage / 100));
                            $price_vat_ex = $price_supplier / (1 + ($vat_percentage / 100));
                            $vat_value = ($price_supplier - $price_vat_ex) * $quantity;
                            $price_supplier = $price_vat_ex;
                        }
                        // XXXXXXXXXXXXXXXXXXXXXXXX /PRICEHACKS RIGHT FUCKIN HERE XXXXXXXXXXXXXXXXXXXXXXXX

                        $amount_supplier = $price_supplier * $quantity;
                        $discount_value = $amount_supplier * $discount_percentage / 100;
                        $amount_supplier = $amount_supplier - $discount_value;

                        $discount_value = round($discount_value, 5);
                        $amount_supplier = round($amount_supplier, 5);
                        $price_supplier = round($price_supplier, 5);
                    }
                    // check customer ***************************
                    if ($customer == null) {
                        $customer_notfound = 1;
                        $missing_customer_name = DB::table(PrincipalsUtil::$TBL_GENERAL_CUSTOMERS)
                            ->where('customer_code', $customer_code)
                            ->first()->name ?? PrincipalsUtil::$CUSTOMER_NOT_FOUND;
                        $customer_name = $nav_customer_name;
                    } else {
                        $customer_code_supplier = $customer->customer_code_supplier;
                        $customer_name = $customer->customer_name;
                    }

                    // check salesman
                    if($salesman == null) {
                        $salesman_notfound = 1;
                    } else {
                        $sm_name = $salesman->sm_name ?? '';
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
                        'vendor_code' =>            $vendor_code,
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
                        'customer_name' =>          $customer_name,
                        'sm_code' =>                $sm_code,
                        'sm_name' =>                $sm_name,
                        'system_date' =>            $system_date,
                        'group' =>                  $group_code,
                        'status' =>                 $pendingInvoice->status,
                        // other BR payload props
                        'cf_dsp_name_id' =>         $br_config->cf_dsp_name,
                        // 'cf_dsp_name_value' =>      $settings['DSP_'. $group_code],
                        'cf_dsp_name_value' =>      $sm_name,
                        'invoice_number' =>         $pendingInvoice->ext_doc_no!='' || $pendingInvoice->ext_doc_no!=null ?
                                                        // $vendor_code. '-'. $pendingInvoice->ext_doc_no : '',
                                                        $pendingInvoice->ext_doc_no : '',
                        'discount_percentage' =>    $discount_percentage,
                        'discount_value' =>         $discount_value,
                        'vat_percentage' =>         $vat_percentage,
                        'vat_value' =>              $vat_value,
                    ];

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
                } // /loop invoices
            }
            // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX /TEMPLATE 1 XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

            // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX TEMPLATE 2 XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
            // Sales Returns (CM)
            if(false) {
                // **************** RETURNS ************************************************
                $returns = InvoicesController::getReturns(
                    $request->principal_code, $request->posting_date_range, $request->status
                );
                $returnsCount = $returns->count();
                // dd($returnsCount);
                $res['line_count'] += $returnsCount;
                // **************** /RETURNS ************************************************

                // Loop through each line of the file content
                $loopCounter = 0;
                foreach ($returns as $return) {
                    $loopCounter++;
                    $progressPercent = round(($loopCounter / $returnsCount) * 100);
                    GenerateTemplated::dispatch("Generating returns ($progressPercent%)");

                    $doc_no =               $return->doc_no;
                    $customer_code       =  $return->customer_code;
                    // $customer_code =        '101798'; // for BR test (Espana Store External ID)
                    $shipment_date =        $return->shipment_date;
                    $posting_date =        (new Carbon($shipment_date))->format($postingDateFormat);
                    $item_code =            $return->item_code . '';
                    $quantity =             $return->quantity;
                    $price =                doubleval($return->price);
                    $amount =               doubleval($return->amount);
                    $uom =                  $return->uom;
                    $item_description =     $return->item_description;
                    $group_code =           $return->group;
                    $discount_percentage =  $return->discount_percentage ?? 0;
                    $discount_value =       0;
                    $invoice_quantity =     $return->invoice_quantity;
                    $invoice_doc_no =       $return->invoice_doc_no;
                    $return_indicator =     $return->return_indicator;
                    $vendor_code =          $return->vendor_code;
                    $sm_code =              $return->sm_code;
                    $remarks =              $return->remarks;
                    $vat_percentage =       intval($return->vat_percentage ?? 0);
                    $vat_value =            0;
                    $ext_doc_no =           $return->ext_doc_no;
                    $qty_per_uom =          $return->qty_per_uom;
                    // dd($ext_doc_no);

                    /**
                     * return quantity vs actual sales invoice quantity
                     * skip returned items with greater quantity than the actual sales quantity
                     */
                    // if($quantity > $invoice_quantity) continue;

                    //************************************************************************
                    $nav_customer_name = $return->customer_name;
                    if($nav_customer_name==null || $nav_customer_name=='') {
                        $nav_customer_name = DB::table(PrincipalsUtil::$TBL_GENERAL_CUSTOMERS)
                            ->where('customer_code', $customer_code)
                            ->first()->name ?? PrincipalsUtil::$CUSTOMER_NOT_FOUND;
                    }
                    // $customer = DB::table(PrincipalsUtil::$TBL_PRINCIPALS_CUSTOMERS)
                    //     ->where('principal_code', $this->PRINCIPAL_CODE)
                    //     ->where('customer_code', $customer_code)
                    //     ->first();
                    // $item = DB::table(PrincipalsUtil::$TBL_PRINCIPALS_ITEMS)
                    //     ->where('principal_code', $this->PRINCIPAL_CODE)
                    //     ->where('item_code', $item_code)
                    //     ->first();
                    $customer = $principal_customers
                        ->where('customer_code', $customer_code)
                        ->first();
                    $item = $principal_items
                        ->where('item_code', $item_code)
                        ->first();
                    $salesman = $principal_salesmen
                        ->filter(function($sm) use (&$group_code) {
                            return false !== strpos($group_code, $sm->division, 0);
                        })
                        ->where('sm_code', $sm_code)
                        ->first();

                    // ************************* MISC INITS **************************
                    $item_notfound = 0;
                    $customer_notfound = 0;
                    $salesman_notfound = 0;
                    $sm_name = '';
                    $missing_customer_name = '';
                    $missing_item_name = '';
                    $item_code_supplier = '';
                    $item_description_supplier = '';
                    $customer_code_supplier = '';
                    $uom_supplier = '';
                    $price_supplier = 0;
                    $amount_supplier = 0;

                    // check item *******************************
                    if ($item == null) {
                        $item_notfound = 1;
                        $missing_item_name = $item_description;
                    } else {
                        // $item_code_supplier = "00000". $item->item_code_supplier;
                        $item_code_supplier = str_pad(
                            $item->item_code_supplier,
                            18,
                            "0",
                            STR_PAD_LEFT
                        );
                        $item_description_supplier = $item->description_supplier;

                        // price and uom mapping (supplier) ********************
                        $uom_supplier = $return->qty_per_uom > 1 ?
                            $item->uom : $item->conversion_uom;

                        // *********** PRICEHACKS RIGHT FUCKIN HERE ************************
                        // map to supplier price
                        $price_supplier = ($item->uom_price / $item->conversion_qty) * $qty_per_uom;
                        // map to orig price temporarily
                        // $price_supplier = $price;

                        // reverse percentage to get the vat-ex price
                        if($vat_percentage > 0) {
                            // $price_vat_ex = $price / (1 + ($vat_percentage / 100));
                            $price_vat_ex = $price_supplier / (1 + ($vat_percentage / 100));
                            $vat_value = ($price_supplier - $price_vat_ex) * $quantity;
                            $price_supplier = $price_vat_ex;
                        }
                        // *********** /PRICEHACKS RIGHT FUCKIN HERE **********************

                        $amount_supplier = $price_supplier * $quantity;
                        $discount_value = $amount_supplier * $discount_percentage / 100;
                        $amount_supplier = $amount_supplier - $discount_value;

                        $discount_value = round($discount_value, 5);
                        $amount_supplier = round($amount_supplier, 5);
                        $price_supplier = round($price_supplier, 5);
                    }
                    // check customer ***************************
                    if ($customer == null) {
                        $customer_notfound = 1;
                        $missing_customer_name = DB::table(PrincipalsUtil::$TBL_GENERAL_CUSTOMERS)
                            ->where('customer_code', $customer_code)
                            ->first()->name ?? PrincipalsUtil::$CUSTOMER_NOT_FOUND;
                        $customer_name = $nav_customer_name;
                    } else {
                        $customer_code_supplier = $customer->customer_code_supplier;
                        $customer_name = $customer->customer_name;
                    }
                    // check salesman
                    if($salesman == null) {
                        $salesman_notfound = 1;
                    } else {
                        $sm_name = $salesman->sm_name ?? '';
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
                        'price_supplier' =>         $price_supplier ?? 0,
                        'amount' =>                 $amount,
                        'amount_supplier' =>        $amount_supplier ?? 0,
                        'uom' =>                    $uom,
                        'uom_supplier' =>           $uom_supplier ?? '',
                        'item_description' =>       $item_description,
                        'description_supplier' =>   $item_description_supplier,
                        'customer_name' =>          $customer_name,
                        'system_date' =>            $system_date,
                        'group' =>                  $group_code,
                        'status' =>                 $return->status,
                        // other BR payload props
                        'cf_dsp_name_id' =>                     $br_config->cf_dsp_name,
                        // 'cf_dsp_name_value' =>                  $settings['DSP_'. $group_code],
                        'cf_dsp_name_value' =>                  $sm_name,
                        'cf_return_indicator_id' =>             $br_config->cf_return_indicator,
                        'cf_return_indicator_value' =>          $return_indicator,
                        'cf_return_invoice_reference_id' =>     $br_config->cf_return_invoice_reference,
                        // 'cf_return_invoice_reference_value' =>  $vendor_code. '-'. $invoice_doc_no,
                        'cf_return_invoice_reference_value' =>  ($ext_doc_no!=''&&$ext_doc_no!=null) ? $ext_doc_no : '',
                                                                    // $vendor_code. '-'. $ext_doc_no : '',
                        'invoice_number' =>                     $doc_no,
                        'discount_percentage' =>                $discount_percentage,
                        'discount_value' =>                     $discount_value,
                        'remarks' =>                            $remarks,
                        'vat_percentage' =>                     $vat_percentage,
                        'vat_value' =>                          $vat_value,
                        // order orig details
                        'invoice_quantity' =>       $invoice_quantity,
                        'invoice_doc_no' =>         $invoice_doc_no,
                        'return_indicator' =>       $return_indicator,
                        'vendor_code' =>            $vendor_code,
                        'sm_code' =>                $sm_code,
                        'sm_name' =>                $sm_name,
                    ];

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
                } // /loop invoices
            }
            // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX /TEMPLATE 2 XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

            // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX /TEMPLATES XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
            // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX /TEMPLATES XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
            // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX /TEMPLATES XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
            // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX /TEMPLATES XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
            // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX /TEMPLATES XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

            return response()->json($res);

        } catch (\Throwable $th) {
            $res['success'] = false;
            $res['message'] = $th->getMessage();
            return response()->json($res, 500);
        }
    }

    // temporary
    public function resetInvoicesToPending() {
        $dateFrom = new Carbon('2023-07-01');
        $dateTo = new Carbon('2023-07-31');

        // sales invoices
        $inv = DB::table(PrincipalsUtil::$TBL_INVOICES)
            ->whereIn('vendor_code',['S3030','S4135','S3564'])
            ->update([
                'status' => 'pending',
            ]);

        // returns
        $cm = DB::table(PrincipalsUtil::$TBL_INVOICES)
            ->whereIn('vendor_code',['S3030','S4135','S3564'])
            ->join('cm_lines',function($q){
                $q->on('cm_lines.invoice_doc_no',PrincipalsUtil::$TBL_INVOICES.'.doc_no')
                ->on('cm_lines.item_code',PrincipalsUtil::$TBL_INVOICES. '.item_code')
                ->on('cm_lines.uom',PrincipalsUtil::$TBL_INVOICES. '.uom')
                ;
            })
            ->update([
                'cm_lines.status' => 'pending',
            ]);

        $response['invoice_lines_reverted'] = $inv + $cm;

        return response()->json($response);
    }


    // varies on every principal/supplier
    public function configs() {
        $arr = [
            "beatroute_uploading" => false,
            "bu" => 'ppfb',
            "posting_date_format" => 'Y-m-d',

            // principal masterfiles
            "itemsTableHeader" => [
                [
                    ["text" => "Material Code",             "value" => "item_code_supplier"],
                    ["text" => "Item Code",                 "value" => "item_code"],
                    ["text" => "Supplier Item Description", "value" => "description_supplier"],
                    ["text" => "PCS/CASE",                  "value" => "conversion_qty"],
                    ["text" => "CASE Price",                "value" => "uom_price"],
                    ["text" => "UOM",                       "value" => "uom"],
                    ["text" => "PCS Price",                 "value" => "conversion_uom_price"],
                    ["text" => "Conversion UOM",            "value" => "conversion_uom"],
                ]
            ],

            "customersTableHeader" => [
                [
                    ["text" => "Customer Code",             "value" => "customer_code" ],
                    ["text" => "Customer Code (Supplier)",  "value" => "customer_code_supplier" ],
                    ["text" => "Customer Name",             "value" => "customer_name" ],
                ],
            ],

            "salesmenTableHeader" => [
                [
                    ["text" => "Group",                     "value" => "division" ],
                    ["text" => "SM Code",                   "value" => "sm_code" ],
                    ["text" => "SM Name",                   "value" => "sm_name" ],
                ],
            ],

            // templated data table header
            "generatedDataTableHeader" => [
                [
                    ["text" => "Vendor Code",                   "value" => "vendor_code"],
                    ["text" => "Invoice #",                     "value" => "invoice_no"],
                    ["text" => "External Invoice #",            "value" => "invoice_number"], // external doc no
                    ["text" => "Customer Code (NAV)",           "value" => "alturas_customer_code"],
                    ["text" => "Customer Code",                 "value" => "customer_code"],
                    ["text" => "Customer Name",                 "value" => "customer_name"],
                    ["text" => "Invoice Date (m/d/Y) (NAV)",    "value" => "invoice_date"],
                    ["text" => "Item Code (NAV)",               "value" => "alturas_item_code"],
                    ["text" => "Item Code",                     "value" => "item_code"],
                    ["text" => "Item Name (NAV)",               "value" => "item_description"],
                    ["text" => "Item Name",                     "value" => "description_supplier"],
                    ["text" => "VAT (%)",                       "value" => "vat_percentage"],
                    ["text" => "Discount (%)",                  "value" => "discount_percentage"],
                    ["text" => "UOM (NAV)",                     "value" => "uom"],
                    ["text" => "UOM",                           "value" => "uom_supplier"],
                    ["text" => "Quantity",                      "value" => "quantity"],
                    ["text" => "Price (NAV, VAT Inc)",          "value" => "price"],
                    ["text" => "Amount (NAV, Discounted)",      "value" => "amount"],
                    ["text" => "Price (VAT Ex)",                "value" => "price_supplier"],
                    ["text" => "Amount (Discounted)",           "value" => "amount_supplier"],
                    ["text" => "SM Code",                       "value" => "sm_code"],
                    ["text" => "SM Name",                       "value" => "sm_name"],
                    ["text" => "Group",                         "value" => "group"],
                ],
                // [
                //     ["text" =>"Vendor Code",                     "value" => "vendor_code"],
                //     ["text" =>"CM #",                            "value" => "invoice_no"],
                //     ["text" =>"External CM #",                      "value" => "invoice_number"], // external doc no
                //     ["text" =>"Customer Code (NAV)",                "value" => "alturas_customer_code"],
                //     ["text" =>"Customer Code",                      "value" => "customer_code"],
                //     ["text" =>"Customer Name",                      "value" => "customer_name"],
                //     ["text" =>"CM Date (m/d/Y) (NAV)",              "value" => "invoice_date"],
                //     ["text" =>"Item Code (NAV)",                    "value" => "alturas_item_code"],
                //     ["text" =>"Item Code",                          "value" => "item_code"],
                //     ["text" =>"Item Name (NAV)",                    "value" => "item_description"],
                //     ["text" =>"Item Name",                          "value" => "description_supplier"],
                //     ["text" =>"VAT (%)",                            "value" => "vat_percentage"],
                //     ["text" =>"Discount (%)",                       "value" => "discount_percentage"],
                //     ["text" =>"UOM (NAV)",                          "value" => "uom"],
                //     ["text" =>"UOM",                                "value" => "uom_supplier"],
                //     ["text" =>"Quantity",                           "value" => "quantity"],
                //     ["text" =>"Price (NAV, VAT Inc)",               "value" => "price"],
                //     ["text" =>"Amount (NAV,Discounted)",            "value" => "amount"],
                //     ["text" =>"Price (VAT Ex)",                     "value" => "price_supplier"],
                //     ["text" =>"Amount (Discounted",                 "value" => "amount_supplier"],
                //     ["text" =>"SM Code",                            "value" => "sm_code"],
                //     ["text" =>"SM Name",                            "value" => "sm_name"],
                //     ["text" =>"Group",                              "value" => "group"],
                //     // additional return stuff
                //     ["text" =>"Return Indicator",                   "value" => "return_indicator"],
                //     ["text" =>"Return Reason",                      "value" => "remarks"],
                //     ["text" =>"Invoice Reference #",                "value" => "invoice_doc_no"],
                //     // ["text" =>"Invoice Reference # (Ext Doc No.)",  "value" => "ext_doc_no"],
                // ],
            ],

            // ***********************************************************************************
            "generatedDataHistoryFilters" => [
                [
                    ["text" => 'System Date',   "value" => 'system_date'],
                    ["text" => 'Posting Date',  "value" => 'posting_date'],
                    ["text" => 'Item Code',     "value" => 'item_code'],
                    ["text" => 'Customer Code', "value" => 'customer_code'],
                    ["text" => 'Source Group',  "value" => 'group_code'],
                    ["text" => 'Invoice #',     "value" => 'doc_no'],
                    ["text" => 'Vendor Code',   "value" => 'vendor_code'],
                ]
            ],
        ];

        return response()->json($arr);
    }

}
