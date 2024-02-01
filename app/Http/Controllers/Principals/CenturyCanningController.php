<?php

namespace App\Http\Controllers\Principals;

use App\Events\GenerateTemplated;
use App\Http\Controllers\Controller;
use App\Http\Controllers\InvoicesController;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;

class CenturyCanningController extends Controller
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
    // ITEMS ===============================================================
    // =====================================================================
    // =====================================================================

    /**
     * Gets items list
     */
    function items()
    {
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

            ->where(PrincipalsUtil::$TBL_PRINCIPALS_ITEMS.'.main_vendor_code',
                $this->PRINCIPAL_CODE)
            // ->get($cols);

            // $result = DB::table(PrincipalsUtil::$TBL_PRINCIPALS_CUSTOMERS)
            ->where(function($q) use ($search_key) {
                $q->where(
                    PrincipalsUtil::$TBL_PRINCIPALS_ITEMS.'.item_code',
                    'like',
                    '%'. $search_key. '%'
                )
                ->orWhere(PrincipalsUtil::$TBL_PRINCIPALS_ITEMS.'.item_code_supplier',
                    'like',
                    '%'. $search_key. '%'
                )
                ->orWhere(PrincipalsUtil::$TBL_PRINCIPALS_ITEMS.'.description_supplier',
                    'like',
                    '%'. $search_key. '%'
                )
                ;
            })
            ->paginate($row_count);

            // append custom column value (case = '1')
            $result = tap($result, function($paginatedInstance){
                return $paginatedInstance->getCollection()->transform(function($value){
                    $value->case = 1;
                    return $value;
                });
            });

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
            $fileStoragePath =
                "public/principals/" . $this->PRINCIPAL_CODE . "/items";
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
                $fileContentLines =
                    explode(PHP_EOL, mb_convert_encoding($fileContent, "UTF-8", "UTF-8"));

                foreach ($fileContentLines as $fileContentLine) {
                    // Begin on the second line to skip the headers
                    if ($lineCount > 1) {

                        // $arrFileContentLine = explode($delimiter, $fileContentLine);
                        $arrFileContentLine =
                            preg_split('/,(?=(?:(?:[^"]*"){2})*[^"]*$)/', $fileContentLine);

                        if (count($arrFileContentLine) > 1) {
                            $item_code = trim(str_replace('"', '', $arrFileContentLine[0]));
                            $item_code_supplier = trim(str_replace('"', '', $arrFileContentLine[1]));
                            $description_supplier = trim(str_replace('"', '', $arrFileContentLine[2]));
                            // $conversion_qty = trim(str_replace('"', '', $arrFileContentLine[4]));
                            // $uom = 'CASE';
                            // $conversion_uom = 'PCS';

                            if(
                                $item_code != '' && $item_code != '#N/A' &&
                                $item_code_supplier != '' && $item_code_supplier != '#N/A'
                            ) {
                                $arrLines[] = [
                                    'main_vendor_code' => $this->PRINCIPAL_CODE,
                                    'uploaded_by' => auth()->user()->id,
                                    'item_code' => $item_code,
                                    'item_code_supplier' => $item_code_supplier,
                                    'description_supplier' => $description_supplier,
                                    // 'uom' => $uom,
                                    // 'conversion_uom' => $conversion_uom,
                                    // 'conversion_qty' => $conversion_qty,
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
    // function customers()
    // {
    //     set_time_limit(0);

    //     $row_count = request()->row_count ?? 10;
    //     $search_key = request()->search_key ?? '';

    //     $result = DB::table(PrincipalsUtil::$TBL_PRINCIPALS_CUSTOMERS)
    //         // ->leftJoin(
    //         //     PrincipalsUtil::$TBL_GENERAL_CUSTOMERS,
    //         //     PrincipalsUtil::$TBL_PRINCIPALS_CUSTOMERS . '.customer_code',
    //         //     '=',
    //         //     PrincipalsUtil::$TBL_GENERAL_CUSTOMERS . '.customer_code'
    //         // )
    //         // ->select(
    //         //     PrincipalsUtil::$TBL_PRINCIPALS_CUSTOMERS . '.*',
    //         //     PrincipalsUtil::$TBL_GENERAL_CUSTOMERS . '.name AS customer_name',
    //         //     PrincipalsUtil::$TBL_GENERAL_CUSTOMERS . '.address',
    //         //     PrincipalsUtil::$TBL_GENERAL_CUSTOMERS . '.address_2',
    //         //     PrincipalsUtil::$TBL_GENERAL_CUSTOMERS . '.city',
    //         // )
    //         ->where(
    //             PrincipalsUtil::$TBL_PRINCIPALS_CUSTOMERS . '.principal_code',
    //             $this->PRINCIPAL_CODE
    //         )
    //         // ->get();

    //         ->where(function($q) use ($search_key) {
    //             $q->where(
    //                 PrincipalsUtil::$TBL_PRINCIPALS_CUSTOMERS.'.customer_code',
    //                 'like',
    //                 '%'. $search_key. '%'
    //             )->orWhere(
    //                 PrincipalsUtil::$TBL_PRINCIPALS_CUSTOMERS.'.customer_code_supplier',
    //                 'like',
    //                 '%'. $search_key. '%'
    //             )
    //             ;
    //         })
    //         ->paginate($row_count);

    //     // $result = DB::table(PrincipalsUtil::$TBL_PRINCIPALS_CUSTOMERS)
    //     //     ->where('principal_code', $this->PRINCIPAL_CODE)
    //     //     ->get();

    //     return response()->json($result);
    // }

    /**
     * Import customers masterfile (.csv)
     */
    // public function uploadMasterCustomers(Request $request)
    // {
    //     set_time_limit(0);
    //     try {
    //         $delimiter = ',';
    //         $fileName = time() . '.' . $request->file->getClientOriginalName();
    //         $fileStoragePath = "public/principals/" . $this->PRINCIPAL_CODE . "/customers";
    //         Storage::putFileAs($fileStoragePath, $request->file, $fileName);

    //         DB::beginTransaction();

    //         if (Storage::exists("$fileStoragePath/$fileName")) {
    //             $fileContent = Storage::get("$fileStoragePath/$fileName");

    //             // init lineCount to 1 for the header
    //             $lineCount = 1;

    //             DB::table(PrincipalsUtil::$TBL_PRINCIPALS_CUSTOMERS)
    //                 ->where('principal_code', $this->PRINCIPAL_CODE)->delete();

    //             $fileContentLines = explode(
    //                 PHP_EOL,
    //                 mb_convert_encoding($fileContent, "UTF-8", "UTF-8")
    //             );
    //             $arrLines = [];

    //             foreach ($fileContentLines as $fileContentLine) {
    //                 // Begin at the second line (exclude the header)
    //                 if ($lineCount > 1) {
    //                     $arrFileContentLine = preg_split('/,(?=(?:(?:[^"]*"){2})*[^"]*$)/', $fileContentLine);

    //                     if (count($arrFileContentLine) > 1) {
    //                         // ==========================================================================
    //                         $customer_code = trim(str_replace('"', '', $arrFileContentLine[0]));
    //                         $customer_code_supplier = trim(str_replace('"', '', $arrFileContentLine[1]));
    //                         // =========================================================================

    //                         // $isExisting = array_search(
    //                         //     $customer_code,
    //                         //     array_column($arrLines, 'customer_code')
    //                         // );
    //                         $isExisting = false;
    //                         if ($isExisting == false) {
    //                             $arrLines[] = [
    //                                 'principal_code' => $this->PRINCIPAL_CODE,
    //                                 'customer_code' => $customer_code,
    //                                 'customer_code_supplier' => $customer_code_supplier,
    //                                 'uploaded_by' => auth()->user()->id
    //                             ];
    //                         }
    //                     }
    //                 }
    //                 $lineCount++;
    //             }

    //             $chunks = array_chunk($arrLines, 500);
    //             foreach ($chunks as $chunk) {
    //                 DB::table(PrincipalsUtil::$TBL_PRINCIPALS_CUSTOMERS)->insert($chunk);
    //             }
    //         }

    //         DB::commit();
    //         $res['success'] = true;
    //         $res['message'] = 'File uploaded successfully';
    //         return response()->json($res);
    //     } catch (\Throwable $th) {
    //         DB::rollBack();
    //         $res['success'] = false;
    //         $res['message'] = $th->getMessage();
    //         return response()->json($res, 500);
    //     }
    // }


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
            $fileStoragePath =
                "public/principals/" . $this->PRINCIPAL_CODE . "/salesmen";
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
                        $arrFileContentLine =
                            preg_split('/,(?=(?:(?:[^"]*"){2})*[^"]*$)/', $fileContentLine);

                        if (count($arrFileContentLine) > 1) {
                            // ====================================================================
                            $group = trim(str_replace('"', '', $arrFileContentLine[0]));
                            $sm_code_supplier = trim(str_replace('"', '', $arrFileContentLine[1]));
                            $location_code_supplier =
                                trim(str_replace('"', '', $arrFileContentLine[2]));
                            // ====================================================================

                            $arrLines[] = [
                                'main_vendor_code' => $this->PRINCIPAL_CODE,
                                'group_code' => $group,
                                'sm_code_supplier' => $sm_code_supplier,
                                'location_code_supplier' => $location_code_supplier,
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
    // INVOICES ============================================================
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
                $group_by = 'order_date';
            }

            $exportSI = $request->data_type=='all' || $request->data_type=='sales_invoice' ? true : false;
            $exportCM = $request->data_type=='all' || $request->data_type=='sales_return' ? true : false;

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
            $system_date = $dateToday->format('Y-m-d');
            $settings = PrincipalsUtil::getSettings($this->PRINCIPAL_CODE);
            // ***************************************************************************

            // ************************* MISC INITS **************************************
            $filesTotalLineCount = 0;
            $chunk_line_count = intval($settings['chunk_line_count'] ?? 0);
            $breakFilesIteration = false;
            $default_user = $settings['default_user'] ?? 'NA';
            $payment_term_code = $settings['payment_term_code'] ?? 'COD';

            GenerateTemplated::dispatch('Getting principal masterfile');
            $principal_items = DB::table(PrincipalsUtil::$TBL_PRINCIPALS_ITEMS)
                ->where('main_vendor_code', $this->PRINCIPAL_CODE)
                ->get();
            $principal_salesmen = DB::table(PrincipalsUtil::$TBL_PRINCIPALS_SALESMEN)
                ->where('main_vendor_code', $this->PRINCIPAL_CODE)
                ->get();

            $postingDateFormat = $request->posting_date_format ?? 'm/d/Y';
            // ************************* /MISC INITS *************************************

            // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX TEMPLATES XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
            if(1) {
                // ****************************** TEMPLATE 1 **********************************
                if ($exportSI) {
                    // **************** PENDING INVOICES ************************************
                    $pendingInvoices = InvoicesController::getPendingInvoices(
                        $this->PRINCIPAL_CODE, $request->posting_date_range, $request->status
                    );
                    $pendingInvoicesCount = $pendingInvoices->count();
                    $res['line_count'] += $pendingInvoicesCount;
                    // **************** /PENDING INVOICES ************************************

                    if($request->status=='pending') {
                        // Loop through each line of the file content
                        $loopCounter = 0;
                        foreach ($pendingInvoices as $pendingInvoice) {
                            $loopCounter++;
                            $progressPercent = round(($loopCounter / $pendingInvoicesCount) * 100);
                            GenerateTemplated::dispatch("Generating sales invoices ($progressPercent%)");

                            $doc_no = $pendingInvoice->doc_no;
                            $customer_code = $pendingInvoice->customer_code;
                            $posting_date = $pendingInvoice->posting_date;
                            $item_code = $pendingInvoice->item_code;
                            $quantity = intval($pendingInvoice->quantity);
                            $price = doubleval($pendingInvoice->price);
                            $amount = doubleval($pendingInvoice->amount);
                            $uom = $pendingInvoice->uom;
                            $group = $pendingInvoice->group;
                            $sm_code = $pendingInvoice->sm_code;
                            $qty_per_uom = intval($pendingInvoice->qty_per_uom);
                            $status = $pendingInvoice->status;
                            $vendor_code = $pendingInvoice->vendor_code;

                            // ****************************************************************
                            // $customer = DB::table(PrincipalsUtil::$TBL_PRINCIPALS_CUSTOMERS)
                            //     ->where('main_vendor_code', $this->PRINCIPAL_CODE)
                            //     ->where('customer_code', $customer_code)
                            //     ->first();
                            // $item = DB::table(PrincipalsUtil::$TBL_PRINCIPALS_ITEMS)
                            //     ->where('main_vendor_code', $this->PRINCIPAL_CODE)
                            //     ->where('item_code', $item_code)
                            //     ->first();
                            // $salesman = DB::table(PrincipalsUtil::$TBL_PRINCIPALS_SALESMEN)
                            //     ->where('main_vendor_code', $this->PRINCIPAL_CODE)
                            //     ->where('group_code', $group)
                            //     ->first();

                            $item = $principal_items
                                ->where('item_code', $item_code)
                                ->first();
                            $salesman = $principal_salesmen
                                ->where('group_code', $group)
                                ->first();
                            // ****************************************************************

                            // quantity_conversion
                            $bulk_qty = 0;
                            $loose_qty = 0;

                            if($qty_per_uom > 1) {
                                $bulk_qty = $quantity;
                            } else {
                                $loose_qty = $quantity;
                            }

                            // if($item != null) {
                            //     $quo = $quantity/$item->conversion_qty;
                            //     $mod = $quantity%$item->conversion_qty;
                            //     $bulk_qty = intval($quo);
                            //     $loose_qty = $mod;
                            // }

                            // if (
                            //     strpos(strtolower($group), 'bulk') > -1
                            // ) {
                            //     $bulk_qty = $quantity;
                            // } else if (
                            //     strpos(strtolower($group), 'pcs') > -1
                            // ) {
                            //     $loose_qty = $quantity;
                            // }

                            // ************************* TEMPLATE 1 **************************
                            // tvc = template variation count
                            // ********************** MISC INITS *************************
                            $item_notfound = 0;
                            $customer_notfound = 0;
                            $salesman_notfound = 0;
                            $missing_customer_name = '';
                            $missing_item_name = '';

                            if ($item == null) {
                                $item_notfound = 1;
                                $missing_item_name =
                                    DB::table(PrincipalsUtil::$TBL_GENERAL_ITEMS)
                                    ->where('item_code', $item_code)
                                    ->first()->description ?? PrincipalsUtil::$ITEM_NOT_FOUND;
                            } else {
                            }

                            // if ($customer == null) {
                            //     $customer_notfound = 1;
                            //     $missing_customer_name =
                            //         DB::table(PrincipalsUtil::$TBL_GENERAL_CUSTOMERS)
                            //         ->where('customer_code', $customer_code)
                            //         ->first()->name ?? PrincipalsUtil::$CUSTOMER_NOT_FOUND;
                            // } else {
                            // }

                            if ($salesman == null) {
                                $salesman_notfound = 1;
                            }

                            $order_date = $dateToday->format('m/d/Y');

                            $item_code_supplier =
                                $item->item_code_supplier ?? $item_code;

                            // $customer_code_supplier =
                            //     $customer->customer_code_supplier ?? $customer_code;
                            $customer_code_supplier =
                                $settings['customer_code_supplier_prefix'] ?? '074-';
                            $customer_code_supplier =
                                $customer_code_supplier . str_replace('-','',$customer_code);

                            $distributor_id = $settings['distributor_id'] ?? 'NA';
                            // $location = $settings['location'] ?? 'NA';
                            $location = $salesman->location_code_supplier ?? 'NA';
                            $sm_code_supplier = $salesman->sm_code_supplier ?? 'NA';
                            // ********************** /MISC INITS *************************

                            // Generated data line structure
                            $arrGenerated = [
                                //commons
                                'alturas_customer_code' => $customer_code,
                                'alturas_item_code' => $item_code,
                                // 'alturas_sm_code' => $u5, // u5 = sm code
                                'doc_no' => $doc_no,
                                'missing_customer_name' => $missing_customer_name,
                                'missing_item_name' => $missing_item_name,
                                'customer_notfound' => $customer_notfound,
                                'item_notfound' => $item_notfound,
                                'salesman_notfound' => $salesman_notfound,
                                // principal specific
                                'customer_code' => $customer_code_supplier,
                                'item_code' => $item_code_supplier,
                                'order_date' => $order_date,
                                'system_date' => $order_date,
                                'request_delivery_date' => $order_date,
                                'distributor_id' => $distributor_id,
                                'bulk_qty' => $bulk_qty,
                                'loose_qty' => $loose_qty,
                                'default_user' => $default_user,
                                'payment_term_code' => $payment_term_code,
                                'location' => $location,
                                'sales_agent_id' => $sm_code_supplier,
                                'status' => $status,
                                'vendor_code' => $vendor_code,
                            ];

                            // group output_template_variations
                            if($item_notfound==1 || $customer_notfound==1 || $salesman_notfound==1) {
                                if (
                                    !isset($res['output_template_variations']
                                        [0]['output_template']['Unmapped'])
                                ) {
                                    $res['output_template_variations']
                                        [0]['output_template']['Unmapped'] = [];
                                }
                                array_push(
                                    $res['output_template_variations']
                                        [0]['output_template']['Unmapped'],
                                    $arrGenerated
                                );
                            } else {
                                if (
                                    !isset($res['output_template_variations']
                                        [0]['output_template'][$$group_by])
                                ) {
                                    $res['output_template_variations']
                                        [0]['output_template'][$$group_by] = [];
                                }
                                array_push(
                                    $res['output_template_variations']
                                        [0]['output_template'][$$group_by],
                                    $arrGenerated
                                );
                            }
                        }
                    } else if ($request->status=='completed') {
                        foreach ($pendingInvoices as $pendingInvoice) {
                            if($pendingInvoice->gendata != null) {
                                $arrGenerated = json_decode($pendingInvoice->gendata);
                                // group output_template_variations
                                $groupByKey = $pendingInvoice->$group_by ?? $arrGenerated->$group_by;
                                if (
                                    !isset(
                                        $res['output_template_variations'][0]['output_template'][$groupByKey]
                                    )
                                ) {
                                    $res['output_template_variations'][0]['output_template'][$groupByKey] = [];
                                }
                                array_push(
                                    $res['output_template_variations'][0]['output_template'][$groupByKey],
                                    $arrGenerated
                                );
                            }
                        }
                    }
                }
                // ****************************** /TEMPLATE 1 **********************************

                // ****************************** TEMPLATE 2 **********************************
                if ($exportCM) {
                    // **************** RETURNS ************************************************
                    $returns = InvoicesController::getReturns(
                        $request->principal_code, $request->posting_date_range, $request->status
                    );
                    $returnsCount = $returns->count();
                    // dd($returns[0]);
                    $res['line_count'] += $returnsCount;
                    // **************** /RETURNS ************************************************

                    if($request->status=='pending') {
                        // Loop through each line of the file content
                        $loopCounter = 0;
                        foreach ($returns as $return) {
                            $loopCounter++;
                            $progressPercent = round(($loopCounter / $returnsCount) * 100);
                            GenerateTemplated::dispatch("Generating returns ($progressPercent%)");

                            $doc_no = $return->doc_no;
                            $customer_code = $return->customer_code;
                            $posting_date = $return->shipment_date;
                            $item_code = $return->item_code;
                            $quantity = intval($return->quantity);
                            $price = doubleval($return->price);
                            $amount = doubleval($return->amount);
                            $uom = $return->uom;
                            $group = $return->group;
                            $sm_code = $return->sm_code;
                            $qty_per_uom = intval($return->qty_per_uom);
                            $status = $return->status;
                            $invoice_doc_no = $return->invoice_doc_no;
                            $return_indicator = $return->return_indicator;
                            $remarks = $return->remarks;
                            $vendor_code = $return->vendor_code;

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
                            //     // ->where('sm_code', $u5)
                            //     ->where('group_code', $group)
                            //     ->first();
                            $item = $principal_items
                                ->where('item_code', $item_code)
                                ->first();
                            $salesman = $principal_salesmen
                                ->where('group_code', $group)
                                ->first();
                            // ****************************************************************

                            // quantity_conversion
                            $bulk_qty = 0;
                            $loose_qty = 0;

                            if($qty_per_uom > 1) {
                                $bulk_qty = $quantity;
                            } else {
                                $loose_qty = $quantity;
                            }

                            // if($item != null) {
                            //     $quo = $quantity/$item->conversion_qty;
                            //     $mod = $quantity%$item->conversion_qty;
                            //     $bulk_qty = intval($quo);
                            //     $loose_qty = $mod;
                            // }

                            // if (
                            //     strpos(strtolower($group), 'bulk') > -1
                            // ) {
                            //     $bulk_qty = $quantity;
                            // } else if (
                            //     strpos(strtolower($group), 'pcs') > -1
                            // ) {
                            //     $loose_qty = $quantity;
                            // }

                            // ************************* TEMPLATE 1 **************************
                            // tvc = template variation count
                            // ********************** MISC INITS *************************
                            $item_notfound = 0;
                            $customer_notfound = 0;
                            $salesman_notfound = 0;
                            $missing_customer_name = '';
                            $missing_item_name = '';

                            if ($item == null) {
                                $item_notfound = 1;
                                $missing_item_name =
                                    DB::table(PrincipalsUtil::$TBL_GENERAL_ITEMS)
                                    ->where('item_code', $item_code)
                                    ->first()->description ?? PrincipalsUtil::$ITEM_NOT_FOUND;
                            } else {
                            }

                            // if ($customer == null) {
                            //     $customer_notfound = 1;
                            //     $missing_customer_name =
                            //         DB::table(PrincipalsUtil::$TBL_GENERAL_CUSTOMERS)
                            //         ->where('customer_code', $customer_code)
                            //         ->first()->name ?? PrincipalsUtil::$CUSTOMER_NOT_FOUND;
                            // } else {
                            // }

                            if ($salesman == null) {
                                $salesman_notfound = 1;
                            }

                            $order_date = $dateToday->format('m/d/Y');

                            $item_code_supplier =
                                $item->item_code_supplier ?? $item_code;

                            // $customer_code_supplier =
                            //     $customer->customer_code_supplier ?? $customer_code;
                            $customer_code_supplier =
                                $settings['customer_code_supplier_prefix'] ?? '074-';
                            $customer_code_supplier =
                                $customer_code_supplier . str_replace('-','',$customer_code);

                            $distributor_id = $settings['distributor_id'] ?? 'NA';
                            // $location = $settings['location'] ?? 'NA';
                            $location = $salesman->location_code_supplier ?? 'NA';
                            $sm_code_supplier = $salesman->sm_code_supplier ?? 'NA';
                            // ********************** /MISC INITS *************************

                            // Generated data line structure
                            $arrGenerated = [
                                //commons
                                'alturas_customer_code' => $customer_code,
                                'alturas_item_code' => $item_code,
                                // 'alturas_sm_code' => $u5, // u5 = sm code
                                'doc_no' => $doc_no,
                                'missing_customer_name' => $missing_customer_name,
                                'missing_item_name' => $missing_item_name,
                                'customer_notfound' => $customer_notfound,
                                'item_notfound' => $item_notfound,
                                'salesman_notfound' => $salesman_notfound,
                                // principal specific
                                'customer_code' => $customer_code_supplier,
                                'item_code' => $item_code_supplier,
                                'order_date' => $order_date,
                                'system_date' => $order_date,
                                'request_delivery_date' => $order_date,
                                'distributor_id' => $distributor_id,
                                'bulk_qty' => $bulk_qty,
                                'loose_qty' => $loose_qty,
                                'default_user' => $default_user,
                                'payment_term_code' => $payment_term_code,
                                'location' => $location,
                                'sales_agent_id' => $sm_code_supplier,
                                'status' => $status,
                                'invoice_doc_no' => $invoice_doc_no,
                                'return_indicator' => $return_indicator,
                                'remarks' => $remarks,
                                'vendor_code' => $vendor_code,
                            ];

                            // group output_template_variations
                            if($item_notfound==1 || $customer_notfound==1 || $salesman_notfound==1) {
                                if (
                                    !isset($res['output_template_variations']
                                        [1]['output_template']['Unmapped'])
                                ) {
                                    $res['output_template_variations']
                                        [1]['output_template']['Unmapped'] = [];
                                }
                                array_push(
                                    $res['output_template_variations']
                                        [1]['output_template']['Unmapped'],
                                    $arrGenerated
                                );
                            } else {
                                if (
                                    !isset($res['output_template_variations']
                                        [1]['output_template'][$$group_by])
                                ) {
                                    $res['output_template_variations']
                                        [1]['output_template'][$$group_by] = [];
                                }
                                array_push(
                                    $res['output_template_variations']
                                        [1]['output_template'][$$group_by],
                                    $arrGenerated
                                );
                            }
                        }

                    } else if ($request->status=='completed') {
                        foreach ($returns as $return) {
                            if($return->gendata != null) {
                                $arrGenerated = json_decode($return->gendata);
                                // group output_template_variations
                                $groupByKey = $return->$group_by ?? $arrGenerated->$group_by;
                                if (
                                    !isset(
                                        $res['output_template_variations'][1]['output_template'][$groupByKey]
                                    )
                                ) {
                                    $res['output_template_variations'][1]['output_template'][$groupByKey] = [];
                                }
                                array_push(
                                    $res['output_template_variations'][1]['output_template'][$groupByKey],
                                    $arrGenerated
                                );
                            }
                        }
                    }
                }
                // ****************************** /TEMPLATE 2 **********************************
            }
            // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX /TEMPLATES XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

            return response()->json($res);

        } catch (\Throwable $th) {
            $res['success'] = false;
            $res['message'] = $th->getMessage();
            return response()->json($res, 500);
        }
    }


    public function configs() {
        $arr = [
            // customersTableHeader: [
            //     [
            //         { text: "Customer Code", value: "customer_code" },
            //         { text: "Principal Customer Code", value: "customer_code_supplier" },
            //     ],
            // ],
            "itemsTableHeader" => [
                [
                    ["text" => "Item Code", "value" => "item_code"],
                    // ["text" => "Description", "value" => "description"],
                    ["text" => "Supplier Item Code", "value" => "item_code_supplier"],
                    ["text" => "Supplier Item Description", "value" => "description_supplier"],
                    // ["text" => "CASE", "value" => "case"],
                    // ["text" => "PCS", "value" => "conversion_qty"],
                ]
            ],

            "salesmenTableHeader" => [
                [
                    ["text" =>"Group Code", "value" =>"group_code"],
                    ["text" =>"Salesman Code - NOAH", "value" =>"sm_code_supplier"],
                    ["text" =>"Location Code - NOAH", "value" =>"location_code_supplier"],
                ]
            ],

            // templated data table header(s)
            "generatedDataTableHeader" => [
                [
                    ["text" =>"Distributor ID", "value" => "distributor_id"],
                    ["text" =>"Salesman", "value" => "sales_agent_id"],
                    ["text" =>"Docno", "value" => "doc_no"],
                    ["text" =>"Location", "value" => "location"],
                    ["text" =>"Ordered Date", "value" => "order_date"],
                    ["text" =>"Request Delivery Date", "value" => "request_delivery_date"],
                    ["text" =>"Payment Term", "value" => "payment_term_code"],
                    ["text" =>"Account Code", "value" => "customer_code"],
                    ["text" =>"Product Code", "value" => "item_code"],
                    ["text" =>"Bulk Qty", "value" => "bulk_qty"],
                    ["text" =>"Loose Qty", "value" => "loose_qty"],
                    ["text" =>"System Date", "value" => "system_date"],
                    ["text" =>"User", "value" => "default_user"],
                ],
                // [
                //     ["text" =>"Distributor ID", "value" => "distributor_id"],
                //     ["text" =>"Sales Agent ID", "value" => "sales_agent_id"],
                //     ["text" =>"Invoice No (Doc No)", "value" => "doc_no"],
                //     ["text" =>"Location", "value" => "location"],
                //     ["text" =>"Invoice Date", "value" => "invoice_date"],
                //     ["text" =>"Payment Term Code", "value" => "payment_term_code"],
                //     ["text" =>"Customer No", "value" => "customer_code"],
                //     ["text" =>"Product Code", "value" => "item_code"],
                //     ["text" =>"Bulk Qty", "value" => "bulk_qty"],
                //     ["text" =>"Loose Qty", "value" => "loose_qty"],
                //     ["text" =>"System Date", "value" => "system_date"],
                //     ["text" =>"Default User", "value" => "default_user"],
                //     ["text" =>"Invoice No", "value" => "invoice_no"],
                //     ["text" =>"Expiry Date", "value" => "expiry_date"],
                // ],
                [
                    ["text" =>"Distributor ID", "value" => "distributor_id"],
                    ["text" =>"Salesman", "value" => "sales_agent_id"],
                    ["text" =>"Docno", "value" => "doc_no"],
                    ["text" =>"Location", "value" => "location"],
                    ["text" =>"Ordered Date", "value" => "order_date"],
                    ["text" =>"Request Delivery Date", "value" => "request_delivery_date"],
                    ["text" =>"Payment Term", "value" => "payment_term_code"],
                    ["text" =>"Account Code", "value" => "customer_code"],
                    ["text" =>"Product Code", "value" => "item_code"],
                    ["text" =>"Bulk Qty", "value" => "bulk_qty"],
                    ["text" =>"Loose Qty", "value" => "loose_qty"],
                    ["text" =>"System Date", "value" => "system_date"],
                    ["text" =>"User", "value" => "default_user"],
                    ["text" =>"Invoice Reference #", "value" => "invoice_doc_no"],
                    ["text" =>"Remarks", "value" => "remarks"],
                ],
            ],

            "generatedDataHistoryFilters" => [
                [
                    ["text" => 'Order Date', "value" => 'order_date'],
                    ["text" => 'Source Group', "value" => 'group'],
                    ["text" => 'Posting Date', "value" => 'posting_date'],
                    ["text" => 'Invoice #', "value" => 'doc_no'],
                    ["text" => 'Vendor Code', "value" => 'vendor_code'],
                    ["text" => 'Product Code', "value" => 'item_code'],
                    ["text" => 'Customer Code', "value" => 'customer_code'],
                    ["text" => 'Salesman', "value" => 'sm_code'],
                    ["text" => 'Location', "value" => 'location'],
                ]
            ],
        ];

        return response()->json($arr);
    }
}
