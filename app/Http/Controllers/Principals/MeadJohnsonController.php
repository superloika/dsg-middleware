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

class MeadJohnsonController extends Controller
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
            dd($th->getMessage());
        }
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
            ->leftJoin(PrincipalsUtil::$TBL_PRINCIPALS,
                PrincipalsUtil::$TBL_PRINCIPALS. '.vendor_code',
                PrincipalsUtil::$TBL_GENERAL_ITEMS. '.vendor_code'
            )
            ->select([
                PrincipalsUtil::$TBL_PRINCIPALS_ITEMS. '.*',
                PrincipalsUtil::$TBL_GENERAL_ITEMS. '.vendor_code',
                PrincipalsUtil::$TBL_PRINCIPALS. '.name AS principal_name',
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
                            $item_code = trim(str_replace('"', '', $arrFileContentLine[0]));
                            $description = trim(str_replace('"', '', $arrFileContentLine[1]));
                            $item_code_supplier = trim(str_replace('"', '', $arrFileContentLine[2]));
                            $description_supplier = trim(str_replace('"', '', $arrFileContentLine[3]));

                            $arrLines[] = [
                                'main_vendor_code' => $this->PRINCIPAL_CODE,
                                'item_code' => $item_code,
                                'description' => $description,
                                'item_code_supplier' => $item_code_supplier,
                                'description_supplier' => $description_supplier,
                                'uploaded_by' => auth()->user()->id
                            ];
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
                $lineCount = 1;

                DB::table(PrincipalsUtil::$TBL_PRINCIPALS_CUSTOMERS)
                    ->where('main_vendor_code', $this->PRINCIPAL_CODE)->delete();

                $fileContent = utf8_encode($fileContent);
                $fileContentLines = explode(PHP_EOL, mb_convert_encoding($fileContent, "UTF-8", "UTF-8"));
                $arrLines = [];

                foreach ($fileContentLines as $fileContentLine) {
                    // Begin at the second line (exclude the header)
                    if ($lineCount > 1) {
                        $arrFileContentLine = preg_split('/,(?=(?:(?:[^"]*"){2})*[^"]*$)/', $fileContentLine);

                        if (count($arrFileContentLine) > 1) {
                            // // ==========================================================================
                            // $distributor_code = trim(str_replace('"', '', $arrFileContentLine[0]));
                            // $customer_code = trim(str_replace('"', '', $arrFileContentLine[1]));
                            // $customer_code_supplier = trim(str_replace('"', '', $arrFileContentLine[2]));
                            // $customer_name = trim(str_replace('"', '', $arrFileContentLine[3]));
                            // $outlet_type = trim(str_replace('"', '', $arrFileContentLine[4]));
                            // $salesman_name = trim(str_replace('"', '', $arrFileContentLine[5]));
                            // $operation_type = trim(str_replace('"', '', $arrFileContentLine[6]));
                            // // =========================================================================
                            // ==========================================================================
                            $distributor_code = trim(str_replace('"', '', $arrFileContentLine[0]));
                            $customer_code = trim(str_replace('"', '', $arrFileContentLine[1]));
                            $customer_name = trim(str_replace('"', '', $arrFileContentLine[2]));
                            $outlet_type = trim(str_replace('"', '', $arrFileContentLine[3]));
                            $salesman_name = trim(str_replace('"', '', $arrFileContentLine[4]));
                            // $operation_type = trim(str_replace('"', '', $arrFileContentLine[5]));
                            // =========================================================================

                            // $isExisting = array_search(
                            //     $customer_code,
                            //     array_column($arrLines, 'customer_code')
                            // );
                            $isExisting = false;
                            if ($isExisting == false) {
                                $arrLines[] = [
                                    'main_vendor_code' => $this->PRINCIPAL_CODE,
                                    'distributor_code' => $distributor_code,
                                    'customer_code' => $customer_code,
                                    // 'customer_code_supplier' => $customer_code_supplier,
                                    'customer_name' => $customer_name,
                                    'outlet_type' => $outlet_type,
                                    'salesman_name' => $salesman_name,
                                    // 'operation_type' => $operation_type,
                                    'uploaded_by' => auth()->user()->id
                                ];
                            }
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
                            // ==========================================================================
                            $sm_name = trim(str_replace('"', '', $arrFileContentLine[0]));
                            $route_code = trim(str_replace('"', '', $arrFileContentLine[1]));
                            // =========================================================================

                            $arrLines[] = [
                                'main_vendor_code' => $this->PRINCIPAL_CODE,
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
                $group_by = 'route_code';
            }

            $res['success'] = true;
            $res['message'] = 'Success';
            $res['line_count'] = 0;
            // $res['output_template_variations'] = [];
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
            $settings = PrincipalsUtil::getSettings($this->PRINCIPAL_CODE);
            // ***************************************************************************

            // ************************* MISC INITS **************************************
            $principal_customers = DB::table(PrincipalsUtil::$TBL_PRINCIPALS_CUSTOMERS)
                ->where('main_vendor_code', $this->PRINCIPAL_CODE)
                ->get();
            $principal_items = DB::table(PrincipalsUtil::$TBL_PRINCIPALS_ITEMS)
                ->where('main_vendor_code', $this->PRINCIPAL_CODE)
                ->get();
            $principal_salesmen = DB::table(PrincipalsUtil::$TBL_PRINCIPALS_SALESMEN)
                ->where('main_vendor_code', $this->PRINCIPAL_CODE)
                ->get();

            $postingDateFormat = $request->posting_date_format ?? 'm/d/Y';
            // ************************* /MISC INITS *************************************

            // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX TEMPLATES XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
            if (1) {
                // ****************************** TEMPLATE 1 ******************************
                if(1) {
                    // **************** PENDING INVOICES ************************************
                    $pendingInvoices = InvoicesController::getPendingInvoices(
                        $this->PRINCIPAL_CODE, $request->posting_date_range, $request->status
                    );
                    $pendingInvoicesCount = $pendingInvoices->count();
                    $res['line_count'] += $pendingInvoicesCount;
                    // **************** /PENDING INVOICES ***********************************

                    // Loop through each line of the file content
                    $loopCounter = 0;
                    foreach ($pendingInvoices as $pendingInvoice) {
                        $loopCounter++;
                        $progressPercent = round(($loopCounter / $pendingInvoicesCount) * 100);
                        GenerateTemplated::dispatch("Generating sales invoices ($progressPercent%)");

                        // ======================= INIT ===========================
                        $doc_no =           $pendingInvoice->doc_no;
                        $doc_no_ints =      filter_var($doc_no, FILTER_SANITIZE_NUMBER_INT);
                        $doc_no_ints =      str_replace('0','', $doc_no_ints);
                        $doc_no_ints =      str_replace('-','', $doc_no_ints);

                        $customer_code =    $pendingInvoice->customer_code;
                        $item_code =        $pendingInvoice->item_code;
                        $quantity =         intval($pendingInvoice->quantity);
                        $price =            doubleval($pendingInvoice->price);
                        $amount =           doubleval($pendingInvoice->amount);
                        $uom =              $pendingInvoice->uom;
                        $group_code =       $pendingInvoice->group;
                        $sm_code =          $pendingInvoice->sm_code;
                        $vendor_code =      $pendingInvoice->vendor_code;

                        // ****************************************************************
                        // $customer = DB::table(PrincipalsUtil::$TBL_PRINCIPALS_CUSTOMERS)
                        //     ->where('principal_code', $this->PRINCIPAL_CODE)
                        //     ->where('customer_code', $customer_code)
                        //     ->first();
                        // $item = DB::table(PrincipalsUtil::$TBL_PRINCIPALS_ITEMS)
                        //     ->where('principal_code', $this->PRINCIPAL_CODE)
                        //     ->where('item_code', $item_code)
                        //     ->first();
                        // $salesman = DB::table(PrincipalsUtil::$TBL_PRINCIPALS_SALESMEN)
                        //     ->where('principal_code', $this->PRINCIPAL_CODE)
                        //     ->where('sm_name', $customer->salesman_name ?? 'NA')
                        //     ->first();
                        $customer = $principal_customers
                            ->where('customer_code', $customer_code)
                            ->first();
                        $item = $principal_items
                            ->where('item_code', $item_code)
                            ->first();
                        $salesman = $principal_salesmen
                            ->where('sm_name', $customer->salesman_name ?? 'NA')
                            ->first();
                        // ****************************************************************

                        // ************************* TEMPLATE 1 **************************
                        // tvc = template variation count
                        // ********************** MISC INITS *************************
                        $item_notfound = 0;
                        $customer_notfound = 0;
                        $salesman_notfound = 0;
                        $missing_customer_name = '';
                        $missing_item_name = '';
                        $missing_salesman_name = '';

                        if ($item==null) {
                            $item_notfound = 1;
                            $missing_item_name = DB::table(PrincipalsUtil::$TBL_GENERAL_ITEMS)
                                ->where('item_code', $item_code)
                                ->first()->description ?? '[ Not Found ]';
                        } else {
                        }

                        if ($customer==null) {
                            $customer_notfound = 1;
                            $missing_customer_name = DB::table(PrincipalsUtil::$TBL_GENERAL_CUSTOMERS)
                                ->where('customer_code', $customer_code)
                                ->first()->name ?? '[ Not Found ]';
                        } else {

                        }

                        if($salesman==null && $customer!=null) {
                            $salesman_notfound = 1;
                            $missing_salesman_name = $customer->salesman_name;
                        }

                        $order_date = $dateToday->format($postingDateFormat);
                        $order_no = 'N/A';

                        $order_no = $doc_no_ints. $item_code;

                        $item_category_code = $settings['item_category_code'] ?? 'N/A';
                        $ship_to = $settings['ship_to'] ?? 'N/A';

                        $remarks = '';
                        $item_code_supplier = $item->item_code_supplier ?? $item_code;
                        $route_code = $salesman->route_code ?? 'N/A';
                        // ********************** /MISC INITS *************************

                        // Generated data line structure
                        $arrGenerated = [
                            'alturas_customer_code' => $customer_code,
                            'alturas_item_code' => $item_code,
                            // 'alturas_sm_code' => $u5, // u5 = sm code
                            'doc_no' => $doc_no,
                            'missing_customer_name' => $missing_customer_name,
                            'missing_item_name' => $missing_item_name,
                            'missing_salesman_name' => $missing_salesman_name,
                            'customer_notfound' => $customer_notfound,
                            'item_notfound' => $item_notfound,
                            'salesman_notfound' => $salesman_notfound,
                            // =============================
                            'customer_code' => $customer_code,
                            'item_code' => $item_code_supplier,
                            'order_date' => $order_date,
                            'route_code' => $route_code,
                            'product_category_code' => $item_category_code,
                            'ship_to' => $ship_to,
                            'order_no' => $order_no,
                            'remarks' => $remarks,
                            'quantity' => $quantity,
                            // 'invoice_uploaded' => $invoice_uploaded,
                            'status' => $pendingInvoice->status,
                            'vendor_code' => $pendingInvoice->vendor_code,
                        ];

                        if($item_notfound==1||$customer_notfound==1||$salesman_notfound==1) {
                            // ---------------------------------------------------------------------------
                            if (
                                !isset($res['output_template_variations'][0]['output_template']['Unmapped'])
                            ) {
                                $res['output_template_variations'][0]['output_template']['Unmapped'] = [];
                            }
                            array_push(
                                $res['output_template_variations'][0]['output_template']['Unmapped'],
                                $arrGenerated
                            );
                            // ---------------------------------------------------------------------------
                        } else {
                            // group output_template_variations
                            if (
                                !isset($res['output_template_variations'][0]
                                    ['output_template'][$$group_by])
                            ) {
                                $res['output_template_variations'][0]
                                    ['output_template'][$$group_by] = [];
                            }
                            array_push(
                                $res['output_template_variations'][0]
                                    ['output_template'][$$group_by],
                                $arrGenerated
                            );
                        }
                    }
                }
                // ****************************** /TEMPLATE 1 ******************************

                // ****************************** TEMPLATE 2 *******************************
                // if(2) {
                //     // **************** RETURNS ************************************************
                //     $returns = InvoicesController::getReturns(
                //         $request->principal_code, $request->posting_date_range, $request->status
                //     );
                //     $returnsCount = $returns->count();
                //     // dd($returns[0]);
                //     $res['line_count'] += $returnsCount;
                //     // **************** /RETURNS ************************************************

                //     $pageLineCount = 1;
                //     $pageNum = 1;

                //     // Loop through each line of the file content
                //     $loopCounter = 0;
                //     foreach ($returns as $return) {
                //         $loopCounter++;
                //         $progressPercent = round(($loopCounter / $returnsCount) * 100);
                //         GenerateTemplated::dispatch("Generating returns ($progressPercent%)");

                //         $doc_no =               $return->doc_no;
                //         $customer_code =        $return->customer_code;
                //         $shipment_date =        $return->shipment_date;
                //         $posting_date =         (new Carbon($shipment_date))->format('Y-m-d');
                //         $item_code =            $return->item_code . '';
                //         $quantity =             intval($return->quantity);
                //         $price =                doubleval($return->price);
                //         $amount =               doubleval($return->amount);
                //         $uom =                  $return->uom;
                //         $item_description =     $return->item_description;
                //         $group_code =           $return->group;
                //         $discount_percentage =  $return->discount_percentage ?? 0;
                //         $discount_percentage =  intval($discount_percentage);
                //         $invoice_quantity =     intval($return->invoice_quantity);
                //         $invoice_doc_no =       $return->invoice_doc_no;
                //         $return_indicator =     $return->return_indicator;
                //         $vendor_code =          $return->vendor_code;
                //         $sm_code =              $return->sm_code;
                //         $remarks =              $return->remarks;
                //         $discount_amount =      $amount * $discount_percentage / 100;
                //         $nav_customer_name =    $return->customer_name;

                //         /**
                //          * return quantity vs actual sales invoice quantity
                //          * skip returned items with greater quantity than the actual sales quantity
                //          */
                //         // if($quantity > $invoice_quantity) continue;

                //         //********************************************************************
                //         // $customer = DB::table(PrincipalsUtil::$TBL_PRINCIPALS_CUSTOMERS)
                //         //     ->where('principal_code', $this->PRINCIPAL_CODE)
                //         //     ->where('customer_code', $customer_code)
                //         //     ->first();
                //         // $item = DB::table(PrincipalsUtil::$TBL_PRINCIPALS_ITEMS)
                //         //     ->where('principal_code', $this->PRINCIPAL_CODE)
                //         //     ->where('item_code', $item_code)
                //         //     ->first();

                //         // // price and uom mapping (supplier) ********************
                //         // $uom_supplier = $return->qty_per_uom > 1 ?
                //         //     $item->uom : $item->conversion_uom;
                //         // $price_supplier = $return->qty_per_uom > 1 ?
                //         //     ($item->uom_price ?? 0) : ($item->conversion_uom_price ?? 0);
                //         // $price_supplier = doubleval($price_supplier);
                //         // $amount_supplier = round($price_supplier * $quantity, 4);

                //         // ************************* MISC INITS **************************
                //         $item_notfound = 0;
                //         $customer_notfound = 0;
                //         $salesman_notfound = 0;
                //         $missing_customer_name = '';
                //         $missing_item_name = '';
                //         // $item_code_supplier = 'NA';
                //         // $item_description_supplier = 'NA';
                //         // $customer_code_supplier = 'NA';
                //         // $uom_supplier = 'NA';
                //         // $price_supplier = 0;
                //         // $amount_supplier = 0;

                //         // check item *******************************
                //         // code here...

                //         // check customer ***************************
                //         // code here...

                //         // ************************* /MISC INITS **************************
                //         // Generated data line structure
                //         $arrGenerated = [
                //             //commons
                //             'customer_code' =>          $customer_code,
                //             'alturas_customer_code' =>  $customer_code,
                //             'item_code' =>              $item_code,
                //             'alturas_item_code' =>      $item_code,
                //             'doc_no' =>                 $doc_no,
                //             'missing_customer_name' =>  $missing_customer_name,
                //             'missing_item_name' =>      $missing_item_name,
                //             'customer_notfound' =>      $customer_notfound,
                //             'item_notfound' =>          $item_notfound,
                //             'salesman_notfound' =>      $salesman_notfound,
                //             // principal specific
                //             'invoice_no' =>             $doc_no,
                //             'invoice_date' =>           $posting_date,
                //             'quantity' =>               $quantity,
                //             'price' =>                  $price,
                //             'price_supplier' =>         $price ?? 0,
                //             'amount' =>                 $amount,
                //             'amount_supplier' =>        $amount ?? 0,
                //             'uom' =>                    $uom,
                //             'uom_supplier' =>           $uom ?? 'NA',
                //             'item_description' =>       $item_description,
                //             'description_supplier' =>   $item_description,
                //             'customer_name' =>          $nav_customer_name,
                //             'system_date' =>            $system_date,
                //             'group' =>                  $group_code,
                //             'status' =>                 $return->status,
                //             // other BR payload props
                //             // 'cf_dsp_name_id' =>                     $br_config->cf_dsp_name,
                //             // 'cf_dsp_name_value' =>                  $settings['DSP_'. $group_code],
                //             // 'cf_return_indicator_id' =>             $br_config->cf_return_indicator,
                //             // 'cf_return_indicator_value' =>          $return_indicator,
                //             // 'cf_return_invoice_reference_id' =>     $br_config->cf_return_invoice_reference,
                //             // 'cf_return_invoice_reference_value' =>  $invoice_doc_no,
                //             'invoice_number' =>         $doc_no,
                //             'discount_percentage' =>    $discount_percentage,
                //             'discount_amount' =>        $discount_amount,
                //             'remarks' =>                $remarks,
                //             // order orig details
                //             'invoice_quantity' =>       $invoice_quantity,
                //             'invoice_doc_no' =>         $invoice_doc_no,
                //             'return_indicator' =>       $return_indicator,
                //             'vendor_code' =>            $vendor_code,
                //             'sm_code' =>                $sm_code,
                //         ];

                //         if ($chunk_line_count > 0) {
                //             if (
                //                 !isset(
                //                     $res[
                //                         'output_template_variations'
                //                     ][1]['output_template']["Page " . $pageNum]
                //                 )
                //             ) {
                //                 $res[
                //                     'output_template_variations'
                //                 ][1]['output_template']["Page " . $pageNum] = [];
                //             }
                //             array_push(
                //                 $res[
                //                     'output_template_variations'
                //                 ][1]['output_template']["Page " . $pageNum],
                //                 $arrGenerated
                //             );

                //             $pageLineCount += 1;
                //             if ($pageLineCount > $chunk_line_count) {
                //                 $pageNum += 1;
                //                 $pageLineCount = 1;
                //             }
                //         } else {
                //             // group output_template_variations
                //             if (
                //                 !isset(
                //                     $res[
                //                         'output_template_variations'
                //                     ][1]['output_template'][$$group_by]
                //                 )
                //             ) {
                //                 $res[
                //                     'output_template_variations'
                //                 ][1]['output_template'][$$group_by] = [];
                //             }
                //             array_push(
                //                 $res[
                //                     'output_template_variations'
                //                 ][1]['output_template'][$$group_by],
                //                 $arrGenerated
                //             );
                //         }
                //     } // /loop invoices
                // }
                // ****************************** /TEMPLATE 2 ******************************
            }
            // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX TEMPLATES XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

            return response()->json($res);
        } catch (\Throwable $th) {
            $res['success'] = false;
            $res['message'] = $th->getMessage();
            return response()->json($res, 500);
        }
    }


    public function configs() {
        $arr = [

            "customersTableHeader" => [
                [
                    ["text" => "Distributor",      "value" => "distributor_code" ],
                    ["text" => "Customer Code",    "value" => "customer_code" ],
                    ["text" => "Customer Name",    "value" => "customer_name" ],
                    ["text" => "Outlet Type",      "value" => "outlet_type" ],
                    ["text" => "Salesman Name",    "value" => "salesman_name" ],
                    // ["text" => "Operation Type",   "value" => "operation_type" ],
                ],
            ],
            "itemsTableHeader" => [
                [
                    ["text" =>"Item Code",                  "value" =>"item_code"],
                    ["text" =>"Description",                "value" =>"description"],
                    ["text" =>"Supplier Item Code",         "value" =>"item_code_supplier"],
                    ["text" =>"Supplier Item Description",  "value" =>"description_supplier"],
                ],
            ],
            "salesmenTableHeader" => [
                [
                    ["text" =>"Salesman Name",  "value" =>"sm_name"],
                    ["text" =>"Route Code",     "value" =>"route_code"],
                ]
            ],


            // templated data table header
            "generatedDataTableHeader" => [
                [
                    ["text" =>"Order Date (Date) (YYYY/MM/DD)", "value" => "order_date"],
                    ["text" =>"Customer Code (nv20)",           "value" => "customer_code"],
                    ["text" =>"Route Code (nv20)",              "value" => "route_code"],
                    ["text" =>"Product Category Code (nv20)",   "value" => "product_category_code"],
                    ["text" =>"Ship To (nv40)",                 "value" => "ship_to"],
                    ["text" =>"Order Number (nv20)",            "value" => "order_no"],
                    ["text" =>"Remarks (nv50)",                 "value" => "remarks"],
                    ["text" =>"Product Code (nv20)",            "value" => "item_code"],
                    ["text" =>"Quantity (numeric 25,4)",        "value" => "quantity"],
                ],
                // [
                //     ["text" =>"Order Date (Date) (YYYY/MM/DD)", "value" => "order_date"],
                //     ["text" =>"Customer Code (nv20)",           "value" => "customer_code"],
                //     ["text" =>"Route Code (nv20)",              "value" => "route_code"],
                //     ["text" =>"Product Category Code (nv20)",   "value" => "product_category_code"],
                //     ["text" =>"Ship To (nv40)",                 "value" => "ship_to"],
                //     ["text" =>"Order Number (nv20)",            "value" => "order_no"],
                //     ["text" =>"Remarks (nv50)",                 "value" => "remarks"],
                //     ["text" =>"Product Code (nv20)",            "value" => "item_code"],
                //     ["text" =>"Quantity (numeric 25,4)",        "value" => "quantity"],
                // ],
            ],


            // transactions table header
            // transactionsTableHeader: [
            //     [
            //         ["text" =>"Upload Date",    "value" =>"updated_at"],
            //         ["text" =>"Customer Code",  "value" =>"customer_code"],
            //         ["text" =>"Account Name",   "value" =>"customer_name"],
            //         ["text" =>"Sales Invoice",  "value" =>"doc_no"],
            //         ["text" =>"Item Code",      "value" =>"item_code"],
            //         ["text" =>"Description",    "value" =>"description"],
            //         ["text" =>"UOM",            "value" =>"uom"],
            //         ["text" =>"Quantity",       "value" =>"quantity"],
            //         ["text" =>"Amount",         "value" =>"u3"],
            //     ]
            // ],


            // ************************* Templated Data History *******************************
            // custom cols (Templated Data History)
            // generatedDataDBTableColumns: [
            //     // common
            //     'id',
            //     'generated_at',
            //     'uploaded_by',
            //     'doc_no',
            //     // principal template
            //     'order_date',
            //     'customer_code',
            //     'route_code',
            //     'product_category_code',
            //     'ship_to',
            //     'order_no',
            //     'remarks',
            //     'item_code',
            //     'quantity'
            // ],
            "generatedDataHistoryFilters" => [
                [
                    ["text" => 'Route Code',    "value" => 'route_code'],
                    ["text" => 'Order Date',    "value" => 'order_date'],
                    ["text" => 'Item Code',     "value" => 'item_code'],
                    ["text" => 'Customer Code', "value" => 'customer_code'],
                    ["text" => 'Invoice #', "value" => 'doc_no'],
                    ["text" => 'Source Group', "value" => 'group_code'],
                    ["text" => 'Vendor Code', "value" => 'vendor_code'],
                ]
            ],
            // ************************* /Templated Data History *******************************

            // misc
            "posting_date_format" => 'Y/m/d',
        ];

        return response()->json($arr);
    }
}
