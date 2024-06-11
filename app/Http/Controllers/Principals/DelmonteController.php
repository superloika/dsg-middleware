<?php

namespace App\Http\Controllers\Principals;

use App\Events\GenerateTemplated;
use App\Http\Controllers\Controller;
use App\Http\Controllers\InvoicesController;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class DelmonteController extends Controller
{
    // del monte vendor code
    private $PRINCIPAL_CODE = 'S2121';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }


    /**
     * Generate templated data based on invoices with 'pending' status
     */
    public function generateTemplatedData(Request $request)
    {
        set_time_limit(0);

        try {
            // ************************* MISC INITS *****************************************************
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
            $outputTemplate = null;

            $dateToday = Carbon::now();
            $system_date = $dateToday->format('Y-m-d');
            // $settings = PrincipalsUtil::getSettings($request->principal_code);
            $postingDateFormat = $request->posting_date_format ?? 'm/d/Y';
            // ************************* /MISC INITS **************************************************

            // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX TEMPLATE(S) XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
            if(1) {
                // **************************** TEMPLATE 1 ****************************
                if($exportSI) {
                    // **************** PENDING INVOICES ****************************************
                    $pendingInvoices = InvoicesController::getPendingInvoices(
                        $request->principal_code, $request->posting_date_range, $request->status
                    );
                    $pendingInvoicesCount = $pendingInvoices->count();
                    $res['line_count'] += $pendingInvoicesCount;
                    // **************** /PENDING INVOICES ***************************************

                    $outputTemplate = &$res['output_template_variations'][0]['output_template'];

                    if($request->status == PrincipalsUtil::$STATUS_PENDING) {
                        // Loop through each line of the file content
                        $loopCounter = 0;
                        foreach ($pendingInvoices as $pendingInvoice) {
                            $loopCounter++;
                            $progressPercent = round(($loopCounter / $pendingInvoicesCount) * 100);
                            GenerateTemplated::dispatch("Generating sales invoices ($progressPercent%)");

                            $doc_no = $pendingInvoice->doc_no;
                            $customer_code = $pendingInvoice->customer_code;
                            $posting_date = (new Carbon($pendingInvoice->posting_date))
                                ->format($postingDateFormat);
                            $item_code = $pendingInvoice->item_code;
                            $quantity = intval($pendingInvoice->quantity);
                            $price = doubleval($pendingInvoice->price);
                            $amount = doubleval($pendingInvoice->amount);
                            $uom = $pendingInvoice->uom;
                            $item_description = $pendingInvoice->item_description;
                            $sm_code = $pendingInvoice->sm_code;
                            $sm_name = $pendingInvoice->sm_name;
                            $group = $pendingInvoice->group;
                            $vendor_code = $pendingInvoice->vendor_code;
                            $customer_name = $pendingInvoice->customer_name;
                            $item_code_supplier = '';
                            $customer_code_supplier = '';
                            $item_description_supplier = '';

                            // ************************* MISC INITS **************************
                            $item_notfound = 0;
                            $customer_notfound = 0;
                            $salesman_notfound = 0;
                            $missing_customer_name = '';
                            $missing_item_name = '';
                            // ************************* /MISC INITS **************************

                            // ****************** MF MAPPING *********************************
                            $item = DB::table(PrincipalsUtil::$TBL_PRINCIPALS_ITEMS)
                                ->where('main_vendor_code', $this->PRINCIPAL_CODE)
                                ->where('item_code', $item_code)
                                ->first();

                            $customer = DB::table(PrincipalsUtil::$TBL_PRINCIPALS_CUSTOMERS)
                                ->where('main_vendor_code', $this->PRINCIPAL_CODE)
                                ->where('customer_code', $customer_code)
                                ->first();
                            // ****************** /MF MAPPING *********************************

                            if($item == null) {
                                $item_notfound = 1;
                            } else {
                                $item_code_supplier = $item->item_code_supplier ?? 'NA';
                                $item_description_supplier = $item->description_supplier;
                            }

                            if($customer == null) {
                                $customer_notfound = 1;
                            } else {
                                $customer_code_supplier = $customer->customer_code_supplier ?? 'NA';
                            }

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
                                'price' => $price,
                                'amount' => $amount,
                                'uom' => $uom,
                                'item_description' => $item_description,
                                'description_supplier' => $item_description_supplier,
                                'customer_name' => $customer_name,
                                'sm_code' => $sm_code ?? 'NA',
                                'sm_name' => $sm_name,
                                'system_date' => $system_date,
                                'group' => $pendingInvoice->group,
                                'status' => $pendingInvoice->status,
                                'vendor_code' => $vendor_code,
                            ];

                            // group output_template_variations
                            $tempKey = '';
                            if($item_notfound==1 || $customer_notfound==1 || $salesman_notfound==1) {
                                $tempKey = $$group_by . '-Unmapped';
                            } else {
                                $tempKey = $$group_by;
                            }
                            if (!isset($outputTemplate[$tempKey])) {
                                $outputTemplate[$tempKey] = [];
                            }
                            array_push($outputTemplate[$tempKey], $arrGenerated);
                        }
                    } else if ($request->status ==PrincipalsUtil::$STATUS_COMPLETED) {
                        foreach ($pendingInvoices as $pendingInvoice) {
                            if($pendingInvoice->gendata != null) {
                                $arrGenerated = json_decode($pendingInvoice->gendata);
                                // group output_template_variations
                                $groupByKey = $pendingInvoice->$group_by ?? $arrGenerated->$group_by;
                                if(
                                    $arrGenerated->item_notfound==1 ||
                                    $arrGenerated->customer_notfound==1 ||
                                    $arrGenerated->salesman_notfound==1
                                ) {
                                    $groupByKey = $groupByKey . '-Unmapped';
                                }
                                if (!isset($outputTemplate[$groupByKey])) {
                                    $outputTemplate[$groupByKey] = [];
                                }
                                array_push($outputTemplate[$groupByKey], $arrGenerated);
                            }
                        }
                    }
                    ksort($outputTemplate);
                }
                // **************************** /TEMPLATE 1 ****************************

                // **************************** TEMPLATE 2 ****************************
                if($exportCM) {
                    // **************** RETURNS ************************************************
                    $returns = InvoicesController::getReturns(
                        $request->principal_code, $request->posting_date_range, $request->status
                    );
                    $returnsCount = $returns->count();
                    $res['line_count'] += $returnsCount;
                    // **************** /RETURNS ************************************************

                    $outputTemplate = &$res['output_template_variations'][1]['output_template'];

                    if($request->status == PrincipalsUtil::$STATUS_PENDING) {
                        // Loop through each line of the file content
                        $loopCounter = 0;
                        foreach ($returns as $return) {
                            $loopCounter++;
                            $progressPercent = round(($loopCounter / $returnsCount) * 100);
                            GenerateTemplated::dispatch("Generating returns ($progressPercent%)");

                            $doc_no = $return->doc_no;
                            $customer_code = $return->customer_code;
                            $posting_date = (new Carbon($return->posting_date))
                                ->format($postingDateFormat);
                            $item_code = $return->item_code;
                            $quantity = intval($return->quantity);
                            $price = doubleval($return->price);
                            $amount = doubleval($return->amount);
                            $uom = $return->uom;
                            $item_description = $return->item_description;
                            $sm_code = $return->sm_code;
                            $sm_name = $return->sm_name;
                            $group = $return->group;
                            $status = $return->status;
                            $invoice_doc_no = $return->invoice_doc_no; // reference #
                            $return_indicator = $return->return_indicator;
                            $remarks = $return->remarks;
                            $vendor_code = $return->vendor_code;
                            $customer_name = $return->customer_name;
                            $item_code_supplier = '';
                            $customer_code_supplier = '';
                            $item_description_supplier = '';

                            // ************************* MISC INITS **************************
                            $item_notfound = 0;
                            $customer_notfound = 0;
                            $salesman_notfound = 0;
                            $missing_customer_name = '';
                            $missing_item_name = '';
                            // ************************* /MISC INITS **************************

                            // ****************** MF MAPPING *********************************
                            $item = DB::table(PrincipalsUtil::$TBL_PRINCIPALS_ITEMS)
                                ->where('main_vendor_code', $this->PRINCIPAL_CODE)
                                ->where('item_code', $item_code)
                                ->first();

                            $customer = DB::table(PrincipalsUtil::$TBL_PRINCIPALS_CUSTOMERS)
                                ->where('main_vendor_code', $this->PRINCIPAL_CODE)
                                ->where('customer_code', $customer_code)
                                ->first();
                            // ****************** /MF MAPPING *********************************

                            if($item == null) {
                                $item_notfound = 1;
                            } else {
                                $item_code_supplier = $item->item_code_supplier ?? 'NA';
                                $item_description_supplier = $item->description_supplier;
                            }

                            if($customer == null) {
                                $customer_notfound = 1;
                            } else {
                                $customer_code_supplier = $customer->customer_code_supplier ?? 'NA';
                            }

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
                                'price' => $price,
                                'amount' => $amount,
                                'uom' => $uom,
                                'item_description' => $item_description,
                                'description_supplier' => $item_description_supplier,
                                'customer_name' => $customer_name,
                                'sm_code' => $sm_code ?? 'NA',
                                'sm_name' => $sm_name,
                                'system_date' => $system_date,
                                'group' => $group,
                                'status' => $status,
                                'return_indicator' => $return_indicator,
                                'remarks' => $remarks,
                                'invoice_doc_no' => $invoice_doc_no,
                                'vendor_code' => $vendor_code,
                            ];

                            // group output_template_variations -------------------------------------------------------------
                            $tempKey = '';
                            if($item_notfound==1 || $customer_notfound==1 || $salesman_notfound==1) {
                                $tempKey = $$group_by . '-Unmapped';
                            } else {
                                $tempKey = $$group_by;
                            }
                            if (!isset($outputTemplate[$tempKey])) {
                                $outputTemplate[$tempKey] = [];
                            }
                            array_push($outputTemplate[$tempKey], $arrGenerated);
                        }
                    } else if ($request->status == PrincipalsUtil::$STATUS_COMPLETED) {
                        foreach ($returns as $return) {
                            if($return->gendata != null) {
                                $arrGenerated = json_decode($return->gendata);
                                // group output_template_variations
                                $groupByKey = $return->$group_by ?? $arrGenerated->$group_by;
                                if(
                                    $arrGenerated->item_notfound==1 ||
                                    $arrGenerated->customer_notfound==1 ||
                                    $arrGenerated->salesman_notfound==1
                                ) {
                                    $groupByKey = $groupByKey . '-Unmapped';
                                }
                                if (!isset($outputTemplate[$groupByKey])) {
                                    $outputTemplate[$groupByKey] = [];
                                }
                                array_push($outputTemplate[$groupByKey], $arrGenerated);
                            }
                        }
                    }
                    ksort($outputTemplate);
                }
            }
            // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX /TEMPLATE(S) XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

            return response()->json($res);

        } catch (\Throwable $th) {
            $res['success'] = false;
            $res['message'] = $th->getMessage();
            return response()->json($res, 500);
        }
    }


    /**
     * Templated data table headers
     */
    public function configs() {
        $arr = [
            'posting_date_format' => 'm/d/Y',

            // principal masterfiles
            "itemsTableHeader" => [
                [
                    ["text" => "Item Code",                 "value" => "item_code"],
                    ["text" => "Item Code (Supplier)",      "value" => "item_code_supplier"],
                    ["text" => "Description (Supplier)",    "value" => "description_supplier"],
                ]
            ],

            "customersTableHeader" => [
                [
                    ["text" => "Customer Code",             "value" => "customer_code" ],
                    ["text" => "Customer Code (Supplier)",  "value" => "customer_code_supplier" ],
                    ["text" => "Customer Name",             "value" => "customer_name" ],
                ],
            ],
            'generatedDataTableHeader' => [
                [
                    ["text" => "Vendor Code", "value" => "vendor_code"],
                    ["text" => "Invoice #", "value" => "invoice_no"],
                    ["text" => "Customer Code (NAV)", "value" => "alturas_customer_code"],
                    ["text" => "Customer Code", "value" => "customer_code"],
                    ["text" => "Customer Name", "value" => "customer_name"],
                    ["text" => "Invoice Date (m/d/Y)", "value" => "invoice_date"],
                    ["text" => "Item Code (NAV)", "value" => "alturas_item_code"],
                    ["text" => "Item Code", "value" => "item_code"],
                    ["text" => "Item Description (NAV)", "value" => "item_description"],
                    ["text" => "Item Description", "value" => "description_supplier"],
                    ["text" => "UOM", "value" => "uom"],
                    ["text" => "Quantity", "value" => "quantity"],
                    ["text" => "Price", "value" => "price"],
                    ["text" => "Amount", "value" => "amount"],
                    ["text" => "Salesman Code", "value" => "sm_code"],
                    ["text" => "Salesman Name", "value" => "sm_name"],
                    ["text" => "Group", "value" => "group"],
                ],
                [
                    ["text" => "Vendor Code", "value" => "vendor_code"],
                    ["text" => "CM #", "value" => "invoice_no"],
                    ["text" => "Customer Code (NAV)", "value" => "alturas_customer_code"],
                    ["text" => "Customer Code", "value" => "customer_code"],
                    ["text" => "Customer Name", "value" => "customer_name"],
                    ["text" => "Invoice Date (m/d/Y)", "value" => "invoice_date"],
                    ["text" => "Item Code (NAV)", "value" => "alturas_item_code"],
                    ["text" => "Item Code", "value" => "item_code"],
                    ["text" => "Item Description (NAV)", "value" => "item_description"],
                    ["text" => "Item Description", "value" => "description_supplier"],
                    ["text" => "UOM", "value" => "uom"],
                    ["text" => "Quantity", "value" => "quantity"],
                    ["text" => "Price", "value" => "price"],
                    ["text" => "Amount", "value" => "amount"],
                    ["text" => "Salesman Code", "value" => "sm_code"],
                    ["text" => "Salesman Name", "value" => "sm_name"],
                    ["text" => "Group", "value" => "group"],
                    ["text" => "Invoice Reference #", "value" => "invoice_doc_no"],
                    ["text" => "Remarks", "value" => "remarks"],
                ],
            ],

            'generatedDataHistoryFilters' => [
                [
                    ["text" => 'System Date', "value" => 'system_date'],
                    ["text" => 'Source Group', "value" => 'group'],
                    ["text" => 'Invoice #', "value" => 'doc_no'],
                    ["text" => 'Item Code', "value" => 'item_code'],
                    ["text" => 'Customer Code', "value" => 'customer_code'],
                    ["text" => 'Vendor Code', "value" => 'vendor_code'],
                ]
            ],
        ];
        return response()->json($arr);
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
            ->select([
                PrincipalsUtil::$TBL_PRINCIPALS_ITEMS. '.*',
                PrincipalsUtil::$TBL_GENERAL_ITEMS. '.vendor_code',
            ])

            ->where(PrincipalsUtil::$TBL_PRINCIPALS_ITEMS. '.main_vendor_code', $this->PRINCIPAL_CODE)

            ->where(function($q) use ($search_key) {
                $q->where(
                    PrincipalsUtil::$TBL_PRINCIPALS_ITEMS.'.item_code',
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
                $fileContentLines = explode(PHP_EOL, mb_convert_encoding($fileContent, "UTF-8", "ISO-8859-1"));

                foreach ($fileContentLines as $fileContentLine) {
                    // Begin on the second line to skip the headers
                    if ($lineCount > 1) {
                        $arrFileContentLine = preg_split('/,(?=(?:(?:[^"]*"){2})*[^"]*$)/', $fileContentLine);

                        if (count($arrFileContentLine) > 1) {
                            // get column data **********************************************************
                            $item_code = trim(str_replace('"', '', $arrFileContentLine[0]));
                            $item_code_supplier = trim(str_replace('"', '', $arrFileContentLine[1]));
                            $description_supplier = trim(str_replace('"', '', $arrFileContentLine[2]));
                            // /get column data **********************************************************

                            if(
                                $item_code_supplier != ''
                                && $item_code != ''
                            ) {
                                $arrLines[] = [
                                    'main_vendor_code' => $this->PRINCIPAL_CODE,
                                    'item_code' => $item_code,
                                    'item_code_supplier' => $item_code_supplier,
                                    'description_supplier' => $description_supplier,
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

        $result = DB::table(PrincipalsUtil::$TBL_PRINCIPALS_CUSTOMERS)
            ->where('main_vendor_code', $this->PRINCIPAL_CODE)
            // ->get();

            ->where(function($q) use ($search_key) {
                $q->where(
                    PrincipalsUtil::$TBL_PRINCIPALS_CUSTOMERS.'.customer_code',
                    'like',
                    '%'. $search_key. '%'
                )->orWhere(
                    PrincipalsUtil::$TBL_PRINCIPALS_CUSTOMERS.'.customer_code_supplier',
                    'like',
                    '%'. $search_key. '%'
                )->orWhere(
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

            $res['success'] = true;
            $res['message'] = 'File uploaded successfully';

            DB::beginTransaction();

            if (Storage::exists("$fileStoragePath/$fileName")) {
                $fileContent = Storage::get("$fileStoragePath/$fileName");

                // init lineCount to 1 for the header
                $lineCount = 2;

                DB::table(PrincipalsUtil::$TBL_PRINCIPALS_CUSTOMERS)
                    ->where('main_vendor_code', $this->PRINCIPAL_CODE)->delete();

                $fileContent = mb_convert_encoding($fileContent,"UTF-8", "ISO-8859-1");
                $fileContent = str_replace("\x00",'',$fileContent);
                $fileContentLines = explode("\r\n", $fileContent);

                $arrLines = [];

                foreach ($fileContentLines as $fileContentLine) {
                    // Begin at the second line (exclude the header)
                    if ($lineCount > 2) {
                        $arrFileContentLine = preg_split('/,(?=(?:(?:[^"]*"){2})*[^"]*$)/', $fileContentLine);

                        if (count($arrFileContentLine) > 1) {
                            // ==========================================================================
                            $customer_code = trim(str_replace('"', '', $arrFileContentLine[0]));
                            $customer_code_supplier = trim(str_replace('"', '', $arrFileContentLine[1]));
                            $customer_name = trim(str_replace('"', '', $arrFileContentLine[2]));
                            // =========================================================================
                            if(
                                $customer_code != ''
                                && $customer_code_supplier != ''
                            ) {
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
            return response()->json($res);
        } catch (\Throwable $th) {
            DB::rollBack();
            $res['success'] = false;
            $res['message'] = $th->getMessage();
            return response()->json($res, 500);
        }
    }

}
