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

class FoodsphereIncController extends Controller
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

            ->where(function($q) use ($search_key) {
                $q->where(
                    PrincipalsUtil::$TBL_PRINCIPALS_ITEMS.'.item_code',
                    'like',
                    '%'. $search_key. '%'
                )
                ->orWhere(
                    PrincipalsUtil::$TBL_PRINCIPALS_ITEMS.'.item_code_supplier',
                    'like',
                    '%'. $search_key. '%'
                )
                ->orWhere(
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
                            $item_code =
                                trim(str_replace('"', '', $arrFileContentLine[0]));
                            $item_code_supplier =
                                trim(str_replace('"', '', $arrFileContentLine[1]));
                            $description_supplier =
                                trim(str_replace('"', '', $arrFileContentLine[2]));
                            // $conversion_uom = 'PCS';

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

        $result = DB::table(PrincipalsUtil::$TBL_PRINCIPALS_CUSTOMERS)

            ->where(
                PrincipalsUtil::$TBL_PRINCIPALS_CUSTOMERS . '.main_vendor_code',
                $this->PRINCIPAL_CODE
            )

            ->where(function($q) use ($search_key) {
                $q->where(
                    PrincipalsUtil::$TBL_PRINCIPALS_CUSTOMERS.'.customer_code',
                    'like',
                    '%'. $search_key. '%'
                )
                ->orWhere(
                    PrincipalsUtil::$TBL_PRINCIPALS_CUSTOMERS.'.customer_code_supplier',
                    'like',
                    '%'. $search_key. '%'
                )
                ->orWhere(
                    PrincipalsUtil::$TBL_PRINCIPALS_CUSTOMERS.'.customer_name',
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
            $fileName = time() . '.' . $request->file->getClientOriginalName();
            $fileStoragePath = "public/principals/" . $this->PRINCIPAL_CODE . "/customers";
            Storage::putFileAs($fileStoragePath, $request->file, $fileName);

            DB::beginTransaction();

            if (Storage::exists("$fileStoragePath/$fileName")) {
                $fileContent = Storage::get("$fileStoragePath/$fileName");

                // init lineCount to 1 for the header
                $lineCount = 1;

                DB::table(PrincipalsUtil::$TBL_PRINCIPALS_CUSTOMERS)
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
                            $customer_code = trim(str_replace('"', '', $arrFileContentLine[0]));
                            $customer_code_supplier = trim(str_replace('"', '', $arrFileContentLine[1]));
                            $customer_name = trim(str_replace('"', '', $arrFileContentLine[2]));
                            // =========================================================================

                            // $isExisting = array_search(
                            //     $customer_code,
                            //     array_column($arrLines, 'customer_code')
                            // );
                            $isExisting = false;
                            if ($isExisting == false) {
                                $arrLines[] = [
                                    'main_vendor_code' => $this->PRINCIPAL_CODE,
                                    'customer_code' => $customer_code,
                                    'customer_code_supplier' => $customer_code_supplier,
                                    'customer_name' => $customer_name,
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
            // $settings = PrincipalsUtil::getSettings($this->PRINCIPAL_CODE);
            // ***************************************************************************

            // ************************* MISC INITS **************************************
            //get principal item masterfile
            $principal_items = DB::table(PrincipalsUtil::$TBL_PRINCIPALS_ITEMS)
                ->where('main_vendor_code', $this->PRINCIPAL_CODE)
                ->get();

            $postingDateFormat = $request->posting_date_format ?? 'm/d/Y';
            // ************************* /MISC INITS *************************************

            // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX TEMPLATE(S) XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
            if (1) {
                // ******************************** TEMPLATE 1 ************************************
                if($exportSI) {
                    // **************** PENDING INVOICES ************************************
                    $pendingInvoices = InvoicesController::getPendingInvoices(
                        $this->PRINCIPAL_CODE, $request->posting_date_range, $request->status
                    );
                    $pendingInvoicesCount = $pendingInvoices->count();

                    $res['line_count'] = $pendingInvoicesCount;
                    // **************** /PENDING INVOICES ************************************

                    if($request->status=='pending') {
                        // Loop through each line of the file content
                        $loopCounter = 0;
                        foreach ($pendingInvoices as $pendingInvoice) {
                            $loopCounter++;
                            $progressPercent = round(($loopCounter / $pendingInvoicesCount) * 100);
                            GenerateTemplated::dispatch("Generating sales invoices ($progressPercent%)");

                            $doc_no =           $pendingInvoice->doc_no;
                            $customer_code =    $pendingInvoice->customer_code;
                            $posting_date =     (new Carbon($pendingInvoice->posting_date))->format($postingDateFormat);
                            $item_code =        $pendingInvoice->item_code;
                            $quantity =         intval($pendingInvoice->quantity);
                            $price =            doubleval($pendingInvoice->price);
                            $amount =           doubleval($pendingInvoice->amount);
                            $uom =              $pendingInvoice->uom;
                            $item_description = $pendingInvoice->item_description;
                            $sm_code =          $pendingInvoice->sm_code;
                            $group =       $pendingInvoice->group;
                            $vendor_code =      $pendingInvoice->vendor_code;

                            //********************************************************************
                            $nav_customer_name = trim($pendingInvoice->customer_name);
                            if($nav_customer_name==null || $nav_customer_name=='') {
                                $nav_customer_name = DB::table(PrincipalsUtil::$TBL_GENERAL_CUSTOMERS)
                                    ->where('customer_code', $customer_code)
                                    ->first()->name ?? PrincipalsUtil::$CUSTOMER_NOT_FOUND;
                            }
                            $item = $principal_items->where('item_code', $item_code)->first();

                            // ************************* MISC INITS **************************
                            $item_notfound = 0;
                            $customer_notfound = 0;
                            $salesman_notfound = 0;
                            $missing_customer_name = '';
                            $missing_item_name = '';

                            if ($item == null) {
                                $item_notfound = 1;
                                $missing_item_name = $item_description;
                            } else {

                            }

                            $item_code_supplier = $item->item_code_supplier ?? $item_code;
                            $customer_code_supplier = $customer_code;
                            // ************************* /MISC INITS **************************

                            // Generated data line structure
                            $arrGenerated = [
                                //commons
                                'customer_code' => $customer_code_supplier,
                                'alturas_customer_code' => $customer_code,
                                'item_code' => $item_code_supplier,
                                'alturas_item_code' => $item_code,
                                'doc_no' => $doc_no,
                                'missing_customer_name' => $missing_customer_name,
                                'missing_item_name' => $missing_item_name,
                                'customer_notfound' => $customer_notfound,
                                'item_notfound' => $item_notfound,
                                'salesman_notfound' => $salesman_notfound,
                                // principal specific
                                'invoice_no' => $doc_no,
                                'invoice_date' => $posting_date,
                                'quantity' => $quantity,
                                // 'bulk_qty' => $bulk_qty,
                                // 'loose_qty' => $loose_qty,
                                'price' => $price,
                                'amount' => $amount,
                                'uom' => $uom,
                                'item_description' => $item_description,
                                'description_supplier' => $item->description_supplier ?? 'N/A',
                                // 'customer_name' => $nav_customer_name,
                                'customer_name' => $nav_customer_name ?? 'N/A',
                                'sm_code' => $sm_code ?? 'N/A',
                                'system_date' => $system_date,
                                'group' => $pendingInvoice->group,
                                'status' => $pendingInvoice->status,
                                'vendor_code' => $pendingInvoice->vendor_code,
                            ];

                            // group output_template_variations
                            if($item_notfound==1 || $customer_notfound==1 || $salesman_notfound==1) {
                                // ---------------------------------------------------------------------------
                                if (
                                    !isset($res['output_template_variations'][0]['output_template'][$$group_by . '-Unmapped'])
                                ) {
                                    $res['output_template_variations'][0]['output_template'][$$group_by . '-Unmapped'] = [];
                                }
                                array_push(
                                    $res['output_template_variations'][0]['output_template'][$$group_by . '-Unmapped'],
                                    $arrGenerated
                                );
                                // ---------------------------------------------------------------------------
                            } else {
                                if (
                                    !isset($res['output_template_variations'][0]['output_template'][$$group_by])
                                ) {
                                    $res['output_template_variations'][0]['output_template'][$$group_by] = [];
                                }
                                array_push(
                                    $res['output_template_variations'][0]['output_template'][$$group_by],
                                    $arrGenerated
                                );
                            }
                            // ******************** /TEMPLATE 1 **************************
                        }

                        ksort($res['output_template_variations'][0]['output_template']);

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
                // ******************************** /TEMPLATE 1 ***********************************

                // ***************************** TEMPLATE 2 ***************************************
                if($exportCM) {
                    // **************** RETURNS ************************************************
                    $returns = InvoicesController::getReturns(
                        $request->principal_code, $request->posting_date_range, $request->status
                    );
                    $returnsCount = $returns->count();
                    // dd($returns[0]);
                    $res['line_count'] += $returnsCount;
                    // **************** /RETURNS ***********************************************

                    if($request->status=='pending') {
                        // Loop through each line of the file content
                        $loopCounter = 0;
                        foreach ($returns as $return) {
                            $loopCounter++;
                            $progressPercent = round(($loopCounter / $returnsCount) * 100);
                            GenerateTemplated::dispatch("Generating sales invoices ($progressPercent%)");

                            $doc_no =           $return->doc_no;
                            $customer_code =    $return->customer_code;
                            $posting_date =     (new Carbon($return->shipment_date))->format($postingDateFormat);
                            $item_code =        $return->item_code;
                            $quantity =         intval($return->quantity);
                            $price =            doubleval($return->price);
                            $amount =           doubleval($return->amount);
                            $uom =              $return->uom;
                            $item_description = $return->item_description;
                            $sm_code =          $return->sm_code;
                            $group =       $return->group;
                            $status =           $return->status;
                            $return_indicator = $return->return_indicator;
                            $invoice_doc_no =   $return->invoice_doc_no;
                            $remarks =          $return->remarks;
                            $vendor_code =          $return->vendor_code;

                            //********************************************************************
                            $nav_customer_name = trim($return->customer_name);
                            if($nav_customer_name==null || $nav_customer_name=='') {
                                $nav_customer_name = DB::table(PrincipalsUtil::$TBL_GENERAL_CUSTOMERS)
                                    ->where('customer_code', $customer_code)
                                    ->first()->name ?? PrincipalsUtil::$CUSTOMER_NOT_FOUND;
                            }
                            $item = $principal_items->where('item_code', $item_code)->first();
                            //********************************************************************

                            // ************************* MISC INITS **************************
                            $item_notfound = 0;
                            $customer_notfound = 0;
                            $salesman_notfound = 0;
                            $missing_customer_name = '';
                            $missing_item_name = '';

                            if ($item == null) {
                                $item_notfound = 1;
                                $missing_item_name = $item_description;
                            } else {

                            }

                            $item_code_supplier = $item->item_code_supplier ?? $item_code;
                            $customer_code_supplier = $customer_code;
                            // ************************* /MISC INITS **************************

                            // Generated data line structure
                            $arrGenerated = [
                                //commons
                                'customer_code' => $customer_code_supplier,
                                'alturas_customer_code' => $customer_code,
                                'item_code' => $item_code_supplier,
                                'alturas_item_code' => $item_code,
                                'doc_no' => $doc_no,
                                'missing_customer_name' => $missing_customer_name,
                                'missing_item_name' => $missing_item_name,
                                'customer_notfound' => $customer_notfound,
                                'item_notfound' => $item_notfound,
                                'salesman_notfound' => $salesman_notfound,
                                // principal specific
                                'invoice_no' => $doc_no,
                                'invoice_date' => $posting_date,
                                'quantity' => $quantity,
                                // 'bulk_qty' => $bulk_qty,
                                // 'loose_qty' => $loose_qty,
                                'price' => $price,
                                'amount' => $amount,
                                'uom' => $uom,
                                'item_description' => $item_description,
                                'description_supplier' => $item->description_supplier ?? 'N/A',
                                // 'customer_name' => $nav_customer_name,
                                'customer_name' => $nav_customer_name ?? 'N/A',
                                'sm_code' => $sm_code ?? 'N/A',
                                'system_date' => $system_date,
                                'group' => $group,
                                'status' => $status,
                                'return_indicator' => $return_indicator,
                                'remarks' => $remarks,
                                'invoice_doc_no' => $invoice_doc_no,
                                'vendor_code' => $vendor_code,
                            ];

                            // group output_template_variations
                            if($item_notfound==1 || $customer_notfound==1 || $salesman_notfound==1) {
                                // ---------------------------------------------------------------------------
                                if (
                                    !isset($res['output_template_variations'][1]['output_template']['Unmapped'])
                                ) {
                                    $res['output_template_variations'][1]['output_template']['Unmapped'] = [];
                                }
                                array_push(
                                    $res['output_template_variations'][1]['output_template']['Unmapped'],
                                    $arrGenerated
                                );
                                // ---------------------------------------------------------------------------
                            } else {
                                if (
                                    !isset($res['output_template_variations'][1]['output_template'][$$group_by])
                                ) {
                                    $res['output_template_variations'][1]['output_template'][$$group_by] = [];
                                }
                                array_push(
                                    $res['output_template_variations'][1]['output_template'][$$group_by],
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
                // ***************************** /TEMPLATE 2 *************************************
            }
            // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX /TEMPLATE(S) XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

            return response()->json($res);

        } catch (\Throwable $th) {
            $res['success'] = false;
            $res['message'] = $th->getMessage();
            return response()->json($res, 500);
        }
    }


    public function configs() {
        $arr = [
            // misc
            "posting_date_format" => 'm/d/Y',
            // customersTableHeader: [
            //     [
            //         { text: "Customer Code", value: "customer_code" },
            //         { text: "Customer Code (Supplier)", value: "customer_code_supplier" },
            //         { text: "Name", value: "customer_name" },
            //     ],
            // ],
            "itemsTableHeader" => [
                [
                    ["text" =>"Item Code", "value" =>"item_code"],
                    ["text" =>"Item Code (Supplier)", "value" =>"item_code_supplier"],
                    ["text" =>"Description (Supplier)", "value" =>"description_supplier"],
                ]
            ],

            // templated data table header
            "generatedDataTableHeader" => [
                [
                    ["text" =>"Invoice #", "value" => "invoice_no"],
                    ["text" =>"Customer Code", "value" => "customer_code"],
                    ["text" =>"Customer Name", "value" => "customer_name"],
                    ["text" =>"Invoice Date (m/d/Y)", "value" => "invoice_date"],
                    ["text" =>"Item Code (NAV)", "value" => "alturas_item_code"],
                    ["text" =>"Item Code (Supplier)", "value" => "item_code"],
                    ["text" =>"Item Name (NAV)", "value" => "item_description"],
                    ["text" =>"Item Name (Supplier)", "value" => "description_supplier"],
                    ["text" =>"UOM", "value" => "uom"],
                    ["text" =>"Quantity", "value" => "quantity"],
                    ["text" =>"Price", "value" => "price"],
                    ["text" =>"Amount", "value" => "amount"],
                    ["text" =>"Salesman", "value" => "sm_code"],
                    ["text" =>"Group", "value" => "group"]
                ],
                [
                    ["text" =>"CM #", "value" => "invoice_no"],
                    ["text" =>"Customer Code", "value" => "customer_code"],
                    ["text" =>"Customer Name", "value" => "customer_name"],
                    ["text" =>"Invoice Date (m/d/Y)", "value" => "invoice_date"],
                    ["text" =>"Item Code (NAV)", "value" => "alturas_item_code"],
                    ["text" =>"Item Code (Supplier)", "value" => "item_code"],
                    ["text" =>"Item Name (NAV)", "value" => "item_description"],
                    ["text" =>"Item Name (Supplier)", "value" => "description_supplier"],
                    ["text" =>"UOM", "value" => "uom"],
                    ["text" =>"Quantity", "value" => "quantity"],
                    ["text" =>"Price", "value" => "price"],
                    ["text" =>"Amount", "value" => "amount"],
                    ["text" =>"Salesman", "value" => "sm_code"],
                    ["text" =>"Group", "value" => "group"],
                    // ["text" =>"Return Indicator", "value" => "return_indicator"],
                    ["text" =>"Invoice Reference #", "value" => "invoice_doc_no"],
                    ["text" =>"Remarks", "value" => "remarks"],
                ]
            ],

            // ***********************************************************************************
            "generatedDataHistoryFilters" => [
                [
                    ["text" => 'System Date', "value" => 'system_date'],
                    ["text" => 'Source Group', "value" => 'group'],
                    ["text" => 'Posting Date', "value" => 'posting_date'],
                    ["text" => 'Invoice #', "value" => 'doc_no'],
                    ["text" => 'Item Code', "value" => 'item_code'],
                    ["text" => 'Customer Code', "value" => 'customer_code'],
                    ["text" => 'Vendor Code', "value" => 'vendor_code'],
                ]
            ],
        ];

        return response()->json($arr);
    }

}
