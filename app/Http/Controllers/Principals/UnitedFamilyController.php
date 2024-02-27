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

class UnitedFamilyController extends Controller
{
    private $PRINCIPAL_CODE = 'S1311';
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

            $principal_salesmen = DB::table(PrincipalsUtil::$TBL_PRINCIPALS_SALESMEN)
                ->where('main_vendor_code', $this->PRINCIPAL_CODE)
                ->get();

            // $postingDateFormat = $request->posting_date_format ?? 'm/d/Y';
            $postingDateFormat = $this->configs()->getData(true)['posting_date_format'];
            // ************************* /MISC INITS **************************************************

            // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX TEMPLATE(S) XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
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

                        $doc_no =               $pendingInvoice->doc_no;
                        $customer_code =        $pendingInvoice->customer_code;
                        // $posting_date =         $pendingInvoice->posting_date;
                        // $posting_date = (new Carbon($posting_date))->format('m/d/Y';
                        $posting_date =         (new Carbon($pendingInvoice->posting_date))->format($postingDateFormat);
                        $item_code =            $pendingInvoice->item_code;
                        $quantity =             intval($pendingInvoice->quantity);
                        $price =                doubleval($pendingInvoice->price);
                        $amount =               doubleval($pendingInvoice->amount);
                        $uom =                  $pendingInvoice->uom;
                        $item_description =     $pendingInvoice->item_description;
                        $sm_code =              $pendingInvoice->sm_code;
                        $group =                $pendingInvoice->group;
                        $vendor_code =          $pendingInvoice->vendor_code;
                        $status =               $pendingInvoice->status;
                        $customer_name =        $pendingInvoice->customer_name;

                        // ************************* MASTERFILE MAPPING *************************
                        $salesman = $principal_salesmen
                            ->filter(function($sm) use (&$group) {
                                return false !== strpos($group, $sm->division, 0);
                            })
                            ->where('sm_code', $sm_code)
                            ->first();
                        // ************************* /MASTERFILE MAPPING *************************

                        // ************************* MISC INITS **************************
                        $item_notfound = 0;
                        $customer_notfound = 0;
                        $salesman_notfound = 0;
                        $missing_customer_name = '';
                        $missing_item_name = '';
                        $sm_name = '';

                        $item_code_supplier = $item_code ?? 'NA';
                        $customer_code_supplier = $customer_code ?? 'NA';

                        if ($salesman == null) {
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
                            'amount' =>                 $amount,
                            'uom' =>                    $uom,
                            'item_description' =>       $item_description,
                            'description_supplier' =>   $item_description ?? 'NA',
                            'customer_name' =>          $customer_name,
                            'sm_code' =>                $sm_code ?? 'NA',
                            'sm_name' =>                $sm_name,
                            'system_date' =>            $system_date,
                            'group' =>                  $group,
                            'status' =>                 $status,
                            'vendor_code' =>            $vendor_code,
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

                        $doc_no =               $return->doc_no;
                        $customer_code =        $return->customer_code;
                        $shipment_date =        $return->shipment_date;
                        $posting_date =         (new Carbon($shipment_date))->format($postingDateFormat);
                        $item_code =            $return->item_code;
                        $quantity =             intval($return->quantity);
                        $price =                doubleval($return->price);
                        $amount =               doubleval($return->amount);
                        $uom =                  $return->uom;
                        $item_description =     $return->item_description;
                        $sm_code =              $return->sm_code;
                        $group =                $return->group;
                        $status =               $return->status;
                        $invoice_doc_no =       $return->invoice_doc_no; // reference #
                        $return_indicator =     $return->return_indicator;
                        $remarks =              $return->remarks;
                        $vendor_code =          $return->vendor_code;
                        $customer_name =        $return->customer_name;

                        // ************************* MASTERFILE MAPPING *************************
                        $salesman = $principal_salesmen
                            ->filter(function($sm) use (&$group) {
                                return false !== strpos($group, $sm->division, 0);
                            })
                            ->where('sm_code', $sm_code)
                            ->first();
                        // ************************* /MASTERFILE MAPPING *************************

                        // ************************* MISC INITS **************************
                        $item_notfound = 0;
                        $customer_notfound = 0;
                        $salesman_notfound = 0;
                        $missing_customer_name = '';
                        $missing_item_name = '';
                        $sm_name = '';

                        $item_code_supplier = $item_code ?? 'NA';
                        $customer_code_supplier = $customer_code ?? 'NA';

                        if ($salesman == null) {
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
                            'amount' =>                 $amount,
                            'uom' =>                    $uom,
                            'item_description' =>       $item_description,
                            'description_supplier' =>   $item_description ?? 'NA',
                            'customer_name' =>          $customer_name,
                            'sm_code' =>                $sm_code ?? 'NA',
                            'sm_name' =>                $salesman,
                            'system_date' =>            $system_date,
                            'group' =>                  $group,
                            'status' =>                 $status,
                            'return_indicator' =>       $return_indicator,
                            'remarks' =>                $remarks,
                            'invoice_doc_no' =>         $invoice_doc_no,
                            'vendor_code' =>            $vendor_code,
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
                            if (!isset($outputTemplate[$groupByKey])) {
                                $outputTemplate[$groupByKey] = [];
                            }
                            array_push($outputTemplate[$groupByKey], $arrGenerated);
                        }
                    }
                }
                ksort($outputTemplate);
            }
            // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX /TEMPLATE(S) XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

            return response()->json($res);

        } catch (\Throwable $th) {
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
                                $division = trim(str_replace('"', '', $arrFileContentLine[0])); // group code (e.g. WDG)
                                $sm_code = trim(str_replace('"', '', $arrFileContentLine[1]));
                                $sm_name = trim(str_replace('"', '', $arrFileContentLine[2]));

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
    // ITEMS ===========================================================
    // =====================================================================
    // =====================================================================

    /**
     * Get items list
     */
    function items()
    {
        set_time_limit(0);

        $result = DB::table(PrincipalsUtil::$TBL_PRINCIPALS_ITEMS)
            ->where('main_vendor_code', $this->PRINCIPAL_CODE)
            ->get();
        return response()->json($result);
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

        $result = DB::table(PrincipalsUtil::$TBL_PRINCIPALS_CUSTOMERS)
            ->where('main_vendor_code', $this->PRINCIPAL_CODE)
            ->get();
        return response()->json($result);
    }


    /**
     * Templated data table headers
     */
    public function configs() {
        $arr = [
            "salesmenTableHeader" => [
                [
                    ["text" => "Group",     "value" => "division" ],
                    ["text" => "SM Code",   "value" => "sm_code" ],
                    ["text" => "SM Name",   "value" => "sm_name" ],
                ],
            ],

            'generatedDataTableHeader' => [
                [
                    ["text" => "Invoice #", "value" => "invoice_no"],
                    // ["text" => "Customer Code", "value" => "customer_code"],
                    ["text" => "Customer Name", "value" => "customer_name"],
                    ["text" => "Invoice Date (m/d/Y)", "value" => "invoice_date"],
                    ["text" => "Item Code (NAV)", "value" => "alturas_item_code"],
                    // ["text" => "Item Code (Supplier)", "value" => "item_code"],
                    ["text" => "Item Name (NAV)", "value" => "item_description"],
                    // ["text" => "Item Name (Supplier)", "value" => "description_supplier"],
                    ["text" => "UOM", "value" => "uom"],
                    ["text" => "Quantity", "value" => "quantity"],
                    ["text" => "Price", "value" => "price"],
                    ["text" => "Amount", "value" => "amount"],
                    ["text" => "Salesman Code", "value" => "sm_code"],
                    ["text" => "Salesman Name", "value" => "sm_name"],
                    ["text" => "Group", "value" => "group"],
                ],
                [
                    ["text" => "CM #", "value" => "invoice_no"],
                    ["text" => "Customer Code", "value" => "customer_code"],
                    ["text" => "Customer Name", "value" => "customer_name"],
                    ["text" => "Invoice Date (m/d/Y)", "value" => "invoice_date"],
                    ["text" => "Item Code (NAV)", "value" => "alturas_item_code"],
                    // ["text" => "Item Code (Supplier)", "value" => "item_code"],
                    ["text" => "Item Name (NAV)", "value" => "item_description"],
                    // ["text" => "Item Name (Supplier)", "value" => "description_supplier"],
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

            'posting_date_format' => 'm/d/Y',
        ];
        return response()->json($arr);
    }

}
