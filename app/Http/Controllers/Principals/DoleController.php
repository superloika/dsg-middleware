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

class DoleController extends Controller
{
    private $PRINCIPAL_CODE = '';
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
                    'main_vendor_code' => $request->principal_code,
                    'update_settings' => [],
                ],
                [
                    'name' => 'Returns',
                    'output_template' => [],
                    'main_vendor_code' => $request->principal_code,
                    'update_settings' => [],
                ],
            ];

            $postingDateFormat = $this->configs()->getData(true)['posting_date_format'];
            // $dateToday = Carbon::now();
            $system_date = Carbon::now()->format($postingDateFormat);
            $settings = PrincipalsUtil::getSettings($request->principal_code);
            $DocumentNumberAI = $settings['DocumentNumber_AI'] ?? 0;
            $DocumentNumberPrefix = $settings['DocumentNumberPrefix'] ?? 'SOV-';
            // $postingDateFormat = $request->posting_date_format ?? 'm/d/Y';

            $principal_items = DB::table(PrincipalsUtil::$TBL_PRINCIPALS_ITEMS)
                ->where('main_vendor_code', $this->PRINCIPAL_CODE)
                ->get();
            $principal_salesmen = DB::table(PrincipalsUtil::$TBL_PRINCIPALS_SALESMEN)
                ->where('main_vendor_code', $this->PRINCIPAL_CODE)
                ->get();

            $DocumentAmounts = [];
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

                if($request->status == PrincipalsUtil::$STATUS_PENDING) {
                    // Loop through each line of the file content
                    $loopCounter = 0;
                    foreach ($pendingInvoices as $pendingInvoice) {
                        $loopCounter++;
                        $progressPercent = round(($loopCounter / $pendingInvoicesCount) * 100);
                        GenerateTemplated::dispatch("Generating sales invoices ($progressPercent%)");

                        $doc_no =               $pendingInvoice->doc_no;
                        $customer_code =        $pendingInvoice->customer_code;
                        // $posting_date =     $pendingInvoice->posting_date;
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
                        $customer_name =        $pendingInvoice->customer_name;
                        $status =               $pendingInvoice->status;
                        $discount_percentage =  $pendingInvoice->discount_percentage ?? 0;
                        $discount_value =       0;
                        $vat_percentage =       intval($pendingInvoice->vat_percentage ?? 0);
                        $vat_value =            0;
                        $price_supplier =       0;
                        $amount_supplier =      0;
                        $qty_per_uom =          $pendingInvoice->qty_per_uom;
                        $ItemQuantity =         "";
                        $ItemQuantity1 =        0;
                        $ItemQuantity2 =        0;

                        $item = $principal_items->where('item_code', $item_code)->first();
                        $salesman = null;
                        // for non-store invoice data (compare masterfile group to invoice group)
                        if(!in_array($group, ['STORE_CDC','STORE_UDC'])) {
                            $salesman = $principal_salesmen->filter(function($sm) use (&$group) {
                                    return false !== strpos($group, $sm->division, 0);
                                })->first();
                        }
                        // for store invoice data (compare masterfile group to invoice customer name)
                        // note: division=group in db
                        else {
                            $salesman = $principal_salesmen->where('division', $customer_name)->first();
                        }

                        // ************************* MISC INITS **************************
                        $item_notfound = 0;
                        $customer_notfound = 0;
                        $salesman_notfound = 0;
                        $missing_customer_name = '';
                        $missing_item_name = '';

                        if($item == null) {
                            $item_notfound = 1;
                        } else {
                            // XXXXXXXXXXXXXXXXXXXXXXXX PRICEHACKS RIGHT FUCKIN HERE XXXXXXXXXXXXXXXXXXXXXXXX
                            $price_supplier = $item->conversion_uom_price;

                            $amount_supplier = $price_supplier * $quantity * $qty_per_uom;
                            $amount_supplier = $amount_supplier - $discount_value;

                            $vat_percentage = 12; // temporary
                            $vat_value = $amount_supplier * $vat_percentage / 100;

                            $amount_supplier = $amount_supplier + $vat_value;

                            $discount_value = round($discount_value, 5);
                            $amount_supplier = round($amount_supplier, 5);
                            $price_supplier = round($price_supplier, 5);
                            $vat_value = round($vat_value, 5);
                            // XXXXXXXXXXXXXXXXXXXXXXXX /PRICEHACKS RIGHT FUCKIN HERE XXXXXXXXXXXXXXXXXXXXXXXX

                            $ItemQuantity2 = intval(($quantity * $qty_per_uom) / $item->conversion_qty);
                            $ItemQuantity = $ItemQuantity2;
                            $ItemQuantity1 = ($quantity * $qty_per_uom) % $item->conversion_qty;
                            $ItemQuantity = ($ItemQuantity1 > 0) ? "$ItemQuantity2.0$ItemQuantity1" : $ItemQuantity;

                            // $tempInvoice = DB::table(PrinciEpalsUtil::$TBL_INVOICES)
                            //     ->where('vendor_code', $vendor_code)
                            //     ->where('doc_no', $doc_no)
                            //     ->where('posting_date', $pendingInvoice->posting_date)
                            //     ->sum('amount');
                            // $DocumentAmount = $tempInvoice;
                        }

                        if($salesman == null) {
                            $salesman_notfound = 1;
                        } else {

                        }

                        $item_code_supplier = $item->item_code_supplier ?? $item_code;
                        $customer_code_supplier = $customer_code ?? 'NA';
                        $sm_code_supplier = $salesman->sm_code_supplier ?? '';
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
                            'invoice_no' =>             '',
                            'invoice_date' =>           $posting_date,
                            'quantity' =>               $quantity,
                            'price' =>                  $price,
                            'amount' =>                 $amount,
                            'uom' =>                    $uom,
                            'item_description' =>       $item_description,
                            'description_supplier' =>   $item_description,
                            'customer_name' =>          $customer_name,
                            'sm_code' =>                $sm_code,
                            'sm_code_supplier' =>       $sm_code_supplier,
                            'system_date' =>            $system_date,
                            'group' =>                  $group,
                            'status' =>                 $status,
                            'vendor_code' =>            $vendor_code,
                            'price_supplier' =>         $price_supplier,
                            'amount_supplier' =>        $amount_supplier,
                            'discount_percentage' =>    $discount_percentage,
                            'discount_value' =>         $discount_value,
                            'vat_percentage' =>         $vat_percentage,
                            'vat_value' =>              $vat_value,
                            // temp defaults for the template
                            'BeatCode' =>               '',
                            'PromotionAmount' =>        0,
                            'DocumentAmount' =>         0.00,
                            'SalesDescription' =>       '',
                            'ExternalDocNo1' =>         '',
                            'ExternalDocDate1' =>       '',
                            'SequenceNumber' =>         '',
                            'SubHierarchyCode' =>       '',
                            'ItemQuantity' =>           $ItemQuantity,
                            'ItemQuantity1' =>          $ItemQuantity1,
                            'ItemQuantity2' =>          $ItemQuantity2,
                            'ItemQuantity3' =>          0,
                            'ItemQuantity4' =>          0,
                            'ItemQuantity5' =>          0,
                            'MRP' =>                    0,
                            'ItemTotalPromotion' =>     0,
                            'ItemDiscountAmount' =>     0,
                            'NetUnitPrice' =>           0,
                            'IsFreeGood' =>             0,
                        ];

                        // calculate DocumentAmount
                        if (!isset($DocumentAmounts[$doc_no])) {
                            $DocumentAmounts[$doc_no] = 0.00;
                        }
                        $DocumentAmounts[$doc_no] += $amount_supplier;

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

                    // patch DocumentAmounts and DocumentNumbers ---------------------------------------------
                    $DocumentNumbers = [];
                    $invoice_no = '';
                    foreach($DocumentAmounts as $dn => $da) {
                        $DocumentNumberAI += 1;
                        $invoice_no = $DocumentNumberPrefix . $DocumentNumberAI;
                        if (!isset($DocumentNumbers[$dn])) {
                            $DocumentNumbers[$dn] = '';
                        }
                        $DocumentNumbers[$dn] = $invoice_no;
                    }

                    $res['output_template_variations'][0]['output_template'] = array_map(
                        function($ot_element) use ($DocumentAmounts, $DocumentNumbers) {
                            return array_map(
                                function($element) use ($DocumentAmounts, $DocumentNumbers) {
                                    return array_replace(
                                        $element,
                                        [
                                            'DocumentAmount' => round($DocumentAmounts[$element['doc_no']], 5),
                                            'invoice_no' => $DocumentNumbers[$element['doc_no']]
                                        ]
                                    );
                                },
                                $ot_element
                            );
                        },
                        $res['output_template_variations'][0]['output_template']
                    );
                    // /patch DocumentAmounts and DocumentNumbers ---------------------------------------------

                    // attach principal settings to modify (will be applied after exporting the templated data)
                    $res['output_template_variations'][0]['update_settings'] = [
                        ['DocumentNumber_AI', $DocumentNumberAI]
                    ];

                } else if($request->status == PrincipalsUtil::$STATUS_COMPLETED) {
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

                if($request->status == PrincipalsUtil::$STATUS_PENDING) {
                    // Loop through each line of the file content
                    $loopCounter = 0;
                    foreach ($returns as $return) {
                        $loopCounter++;
                        $progressPercent = round(($loopCounter / $returnsCount) * 100);
                        GenerateTemplated::dispatch("Generating returns ($progressPercent%)");

                        $doc_no =           $return->doc_no;
                        $customer_code =    $return->customer_code;
                        $posting_date =     $return->shipment_date;
                        // $posting_date = (new Carbon($posting_date))->format('m/d/Y';
                        $posting_date =     (new Carbon($posting_date))->format($postingDateFormat);
                        $item_code =        $return->item_code;
                        $quantity =         intval($return->quantity);
                        $price =            doubleval($return->price);
                        $amount =           doubleval($return->amount);
                        $uom =              $return->uom;
                        $item_description = $return->item_description;
                        $sm_code =          $return->sm_code;
                        $group =            $return->group;
                        $status =           $return->status;
                        $invoice_doc_no =   $return->invoice_doc_no; // reference #
                        $return_indicator = $return->return_indicator;
                        $remarks =          $return->remarks;
                        $vendor_code =      $return->vendor_code;
                        $customer_name =    $return->customer_name;

                        // ************************* MISC INITS **************************
                        $item_notfound = 0;
                        $customer_notfound = 0;
                        $salesman_notfound = 0;
                        $missing_customer_name = '';
                        $missing_item_name = '';

                        $item_code_supplier = $item_code ?? 'NA';
                        $customer_code_supplier = $customer_code ?? 'NA';
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
                            // 'bulk_qty' => $bulk_qty,
                            // 'loose_qty' => $loose_qty,
                            'price' =>                  $price,
                            'amount' =>                 $amount,
                            'uom' =>                    $uom,
                            'item_description' =>       $item_description,
                            'description_supplier' =>   $item_description ?? 'NA',
                            'customer_name' =>          $customer_name,
                            // 'customer_name' => $nav_customer_name ?? 'NA',
                            'sm_code' =>                $sm_code ?? 'NA',
                            'system_date' =>            $system_date,
                            'group' =>                  $group,
                            'status' =>                 $status,
                            'return_indicator' =>       $return_indicator,
                            'remarks' =>                $remarks,
                            'invoice_doc_no' =>         $invoice_doc_no,
                            'vendor_code' =>            $vendor_code,
                        ];

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
                } else if($request->status == PrincipalsUtil::$STATUS_COMPLETED) {
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
                                $sm_code_supplier = trim(str_replace('"', '', $arrFileContentLine[1]));
                                $sm_name = trim(str_replace('"', '', $arrFileContentLine[2]));

                                $arrLines[] = [
                                    'main_vendor_code' => $this->PRINCIPAL_CODE,
                                    'division' => $division,
                                    'sm_code_supplier' => $sm_code_supplier,
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
            ->where(PrincipalsUtil::$TBL_PRINCIPALS_ITEMS.'.main_vendor_code',
                $this->PRINCIPAL_CODE)
            ->when($search_key != '', function($q) use ($search_key) {
                $q->where(function($q) use ($search_key) {
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
                });
            })
            ->paginate($row_count);

            // append custom column value (case = '1')
            // $result = tap($result, function($paginatedInstance){
            //     return $paginatedInstance->getCollection()->transform(function($value){
            //         $value->case = 1;
            //         return $value;
            //     });
            // });

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
            $fileStoragePath =
                "public/principals/" . $this->PRINCIPAL_CODE . "/items";
            Storage::putFileAs($fileStoragePath, $request->file, $fileName);

            $res['success'] = true;
            $res['message'] = 'Done';

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
                            $item_code_supplier = trim(str_replace('"', '', $arrFileContentLine[0]));
                            $item_code = trim(str_replace('"', '', $arrFileContentLine[1]));
                            $description_supplier = trim(str_replace('"', '', $arrFileContentLine[2]));
                            $uom_price = trim(str_replace('"', '', $arrFileContentLine[3]));
                            $uom_price = str_replace(',', '', $uom_price);
                            $uom_price = floatval($uom_price);
                            $conversion_uom_price = trim(str_replace('"', '', $arrFileContentLine[4]));
                            $conversion_uom_price = str_replace(',', '', $conversion_uom_price);
                            $conversion_uom_price = floatval($conversion_uom_price);
                            $conversion_qty = trim(str_replace('"', '', $arrFileContentLine[5]));
                            $uom = trim(str_replace('"', '', $arrFileContentLine[6]));

                            if(
                                $item_code != '' && $item_code != '#N/A' &&
                                $item_code_supplier != '' && $item_code_supplier != '#N/A'
                            ) {
                                $arrLines[] = [
                                    'main_vendor_code' =>       $this->PRINCIPAL_CODE,
                                    'uploaded_by' =>            auth()->user()->id,
                                    'item_code' =>              $item_code,
                                    'item_code_supplier' =>     $item_code_supplier,
                                    'description_supplier' =>   $description_supplier,
                                    'uom_price' =>              $uom_price,
                                    'conversion_uom_price' =>   $conversion_uom_price,
                                    'conversion_qty' =>         $conversion_qty,
                                    'uom' =>                    $uom,
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

        $result = DB::table(PrincipalsUtil::$TBL_PRINCIPALS_CUSTOMERS)
            ->where('main_vendor_code', $this->PRINCIPAL_CODE)
            ->get();
        return response()->json($result);
    }


    // =====================================================================
    // =====================================================================
    // UPDATE SETTINGS ===========================================================
    // =====================================================================
    // =====================================================================


    /**
     * Templated data table headers
    */
    public function configs() {
        $arr = [
            'posting_date_format' => 'm/d/Y',

            "salesmenTableHeader" => [
                [
                    ["text" => "Group",         "value" => "division" ],
                    ["text" => "System Code",   "value" => "sm_code_supplier" ],
                    ["text" => "SM Name",       "value" => "sm_name" ],
                ],
            ],
            "itemsTableHeader" => [
                [
                    ["text" => "DOLE Code",         "value" => "item_code_supplier"],
                    ["text" => "NAV Code",          "value" => "item_code"],
                    ["text" => "Description",       "value" => "description_supplier"],
                    ["text" => "Amount per Case",   "value" => "uom_price"],
                    ["text" => "Amount per Pcs",    "value" => "conversion_uom_price"],
                    ["text" => "Conversion Factor", "value" => "conversion_qty"],
                    ["text" => "PUOM",              "value" => "uom"],
                ]
            ],

            'generatedDataTableHeader' => [
                // [
                //     ["text" => "Invoice #", "value" => "invoice_no"],
                //     ["text" => "Customer Code", "value" => "customer_code"],
                //     ["text" => "Customer Name", "value" => "customer_name"],
                //     ["text" => "Invoice Date (m/d/Y)", "value" => "invoice_date"],
                //     ["text" => "Item Code (NAV)", "value" => "alturas_item_code"],
                //     // ["text" => "Item Code (Supplier)", "value" => "item_code"],
                //     ["text" => "Item Name (NAV)", "value" => "item_description"],
                //     // ["text" => "Item Name (Supplier)", "value" => "description_supplier"],
                //     ["text" => "UOM", "value" => "uom"],
                //     ["text" => "Quantity", "value" => "quantity"],
                //     ["text" => "Price", "value" => "price"],
                //     ["text" => "Amount", "value" => "amount"],
                //     ["text" => "Salesman", "value" => "sm_code"],
                //     ["text" => "Group", "value" => "group"],
                // ],
                [
                    ["text" => "Invoice # (NAV)",       "value" => "doc_no"],
                    ["text" => "DocumentNumber",        "value" => "invoice_no"],
                    ["text" => "DocumentDate",          "value" => "invoice_date"],
                    ["text" => "SalesmanCode",          "value" => "sm_code_supplier"],
                    ["text" => "BeatCode",              "value" => "BeatCode"],
                    ["text" => "CustomerCode",          "value" => "customer_code"],
                    ["text" => "ScheduledDeliveryDate", "value" => "system_date"],
                    ["text" => "DiscountAmount",        "value" => "discount_value"],
                    ["text" => "PromotionAmount",       "value" => "PromotionAmount"],
                    ["text" => "TaxAmount",             "value" => "vat_value"],
                    ["text" => "DocumentAmount",        "value" => "DocumentAmount"],
                    ["text" => "SalesDescription",      "value" => "SalesDescription"],
                    ["text" => "ExternalDocNo1",        "value" => "ExternalDocNo1"],
                    ["text" => "ExternalDocDate1",      "value" => "ExternalDocDate1"],
                    ["text" => "SequenceNumber",        "value" => "SequenceNumber"],
                    ["text" => "ItemCode",              "value" => "item_code"],
                    ["text" => "SubHierarchyCode",      "value" => "SubHierarchyCode"],
                    ["text" => "ItemQuantity",          "value" => "ItemQuantity"],
                    ["text" => "ItemQuantity1",         "value" => "ItemQuantity1"],
                    ["text" => "ItemQuantity2",         "value" => "ItemQuantity2"],
                    ["text" => "ItemQuantity3",         "value" => "ItemQuantity3"],
                    ["text" => "ItemQuantity4",         "value" => "ItemQuantity4"],
                    ["text" => "ItemQuantity5",         "value" => "ItemQuantity5"],
                    ["text" => "MRP",                   "value" => "MRP"],
                    ["text" => "ItemPrice",             "value" => "price_supplier"],
                    ["text" => "ItemTotalPromotion",    "value" => "ItemTotalPromotion"],
                    ["text" => "ItemDiscountAmount",    "value" => "ItemDiscountAmount"],
                    ["text" => "NetUnitPrice",          "value" => "NetUnitPrice"],
                    ["text" => "IsFreeGood",            "value" => "IsFreeGood"],
                    ["text" => "LineNetAmount",         "value" => "amount_supplier"],
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
                    ["text" => "Salesman", "value" => "sm_code"],
                    ["text" => "Group", "value" => "group"],
                    ["text" => "Invoice Reference #", "value" => "invoice_doc_no"],
                    ["text" => "Remarks", "value" => "remarks"],
                ],
            ],

            'generatedDataHistoryFilters' => [
                [
                    ["text" => 'System Date', "value" => 'system_date'],
                    ["text" => 'Source Group', "value" => 'group'],
                    ["text" => 'Salesman Code (DOLE)', "value" => 'sm_code_supplier'],
                    // ["text" => 'Document #', "value" => 'invoice_no'],
                    // ["text" => 'Item Code', "value" => 'item_code'],
                    ["text" => 'Customer Code', "value" => 'customer_code'],
                    // ["text" => 'Vendor Code', "value" => 'vendor_code'],
                ]
            ],
        ];
        return response()->json($arr);
    }

}