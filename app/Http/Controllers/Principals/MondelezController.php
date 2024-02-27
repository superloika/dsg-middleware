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

class MondelezController extends Controller
{
    private $PRINCIPAL_CODE = 'mondelez';

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
                    PrincipalsUtil::$TBL_PRINCIPALS_ITEMS.'.description',
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
                            $description =
                                trim(str_replace('"', '', $arrFileContentLine[2]));
                            // $delisted_status =
                            //     trim(str_replace('"', '', $arrFileContentLine[3]));
                            // $conversion_uom = 'PCS';

                            // if(strtolower($delisted_status) != 'delisted') {
                                $arrLines[] = [
                                    'main_vendor_code' => $this->PRINCIPAL_CODE,
                                    'uploaded_by' => auth()->user()->id,
                                    'item_code' => $item_code,
                                    'item_code_supplier' => $item_code_supplier,
                                    'description' => $description,
                                    // 'uom' => $uom,
                                    // 'conversion_uom' => $conversion_uom,
                                    // 'conversion_qty' => $conversion_qty,
                                ];
                            // }
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

    //         ->where(
    //             PrincipalsUtil::$TBL_PRINCIPALS_CUSTOMERS . '.principal_code',
    //             $this->PRINCIPAL_CODE
    //         )

    //         ->where(function($q) use ($search_key) {
    //             $q->where(
    //                 PrincipalsUtil::$TBL_PRINCIPALS_CUSTOMERS.'.customer_code',
    //                 'like',
    //                 '%'. $search_key. '%'
    //             )
    //             ->orWhere(
    //                 PrincipalsUtil::$TBL_PRINCIPALS_CUSTOMERS.'.customer_code_supplier',
    //                 'like',
    //                 '%'. $search_key. '%'
    //             )
    //             ->orWhere(
    //                 PrincipalsUtil::$TBL_PRINCIPALS_CUSTOMERS.'.customer_name',
    //                 'like',
    //                 '%'. $search_key. '%'
    //             )
    //             ;
    //         })

    //         ->paginate($row_count);

    //     return response()->json($result);
    // }

    /**
     * Import customers masterfile (.csv)
     */
    // public function uploadMasterCustomers(Request $request)
    // {
    //     set_time_limit(0);
    //     try {
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

    //             $fileContent = utf8_encode($fileContent);
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
    //                         $customer_name = trim(str_replace('"', '', $arrFileContentLine[2]));
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
    //                                 'customer_name' => $customer_name,
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
    // function salesmen()
    // {
    //     set_time_limit(0);

    //     $result = DB::table(PrincipalsUtil::$TBL_PRINCIPALS_SALESMEN)
    //         ->where('principal_code', $this->PRINCIPAL_CODE)
    //         ->get();
    //     return response()->json($result);
    // }

    /**
     * Import salesmen masterfile (.csv)
     */
    // public function uploadMasterSalesmen(Request $request)
    // {
    //     set_time_limit(0);
    //     try {
    //         $delimiter = ',';
    //         $fileName = time() . '.' . $request->file->getClientOriginalName();
    //         $fileStoragePath = "public/principals/" . $this->PRINCIPAL_CODE . "/salesmen";
    //         Storage::putFileAs($fileStoragePath, $request->file, $fileName);

    //         DB::beginTransaction();

    //         if (Storage::exists("$fileStoragePath/$fileName")) {
    //             $fileContent = Storage::get("$fileStoragePath/$fileName");

    //             // init lineCount to 1 for the header
    //             $lineCount = 1;

    //             DB::table(PrincipalsUtil::$TBL_PRINCIPALS_SALESMEN)
    //                 ->where('principal_code', $this->PRINCIPAL_CODE)->delete();

    //             $fileContent = utf8_encode($fileContent);
    //             $fileContentLines = explode(
    //                 PHP_EOL,
    //                 mb_convert_encoding($fileContent, "UTF-8", "UTF-8")
    //             );
    //             $arrLines = [];

    //             foreach ($fileContentLines as $fileContentLine) {
    //                 // Begin at the second line (exclude the header)
    //                 if ($lineCount > 1) {
    //                     $arrFileContentLine =
    //                         preg_split('/,(?=(?:(?:[^"]*"){2})*[^"]*$)/', $fileContentLine);

    //                     if (count($arrFileContentLine) > 1) {
    //                         // ====================================================================
    //                         $group = trim(str_replace('"', '', $arrFileContentLine[0]));
    //                         $sm_name = trim(str_replace('"', '', $arrFileContentLine[1]));
    //                         // ====================================================================

    //                         $arrLines[] = [
    //                             'principal_code' => $this->PRINCIPAL_CODE,
    //                             'group_code' => $group,
    //                             'sm_name' => $sm_name,
    //                             'uploaded_by' => auth()->user()->id
    //                         ];
    //                     }
    //                 }
    //                 $lineCount++;
    //             }

    //             $chunks = array_chunk($arrLines, 500);
    //             foreach ($chunks as $chunk) {
    //                 DB::table(PrincipalsUtil::$TBL_PRINCIPALS_SALESMEN)->insert($chunk);
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
    // INVOICES ===========================================================
    // =====================================================================
    // =====================================================================

    /**
     * Generate templated data based on invoices with 'pending' status
     */
    // public function generateTemplatedData_1(Request $request)
    // {
    //     set_time_limit(0);

    //     try {
    //         $template_variation_count = DB::table(PrincipalsUtil::$TBL_PRINCIPALS)
    //             ->select('template_variation_count')
    //             ->where('code', $this->PRINCIPAL_CODE)
    //             ->first()->template_variation_count;

    //         $res['success'] = true;
    //         $res['message'] = 'Success';
    //         $res['line_count'] = 0;
    //         $res['output_template_variations'] = [];

    //         $dateToday = Carbon::now();
    //         $settings = PrincipalsUtil::getSettings($this->PRINCIPAL_CODE);
    //         $filesTotalLineCount = 0;
    //         $chunk_line_count = intval($settings['chunk_line_count'] ?? 0);
    //         $breakFilesIteration = false;

    //         // **************** PENDING INVOICES **************************
    //         $pendingInvoices = DB::table(PrincipalsUtil::$TBL_INVOICES)
    //             ->leftJoin(
    //                 PrincipalsUtil::$TBL_GENERAL_ITEMS,
    //                 PrincipalsUtil::$TBL_GENERAL_ITEMS . '.item_code',
    //                 PrincipalsUtil::$TBL_INVOICES . '.item_code'
    //             )
    //             ->select(
    //                 PrincipalsUtil::$TBL_INVOICES . '.*',
    //                 PrincipalsUtil::$TBL_GENERAL_ITEMS . '.description',
    //                 PrincipalsUtil::$TBL_GENERAL_ITEMS . '.vendor_code',
    //             )
    //             // ->where('invoices.')
    //             ->where(
    //                 PrincipalsUtil::$TBL_GENERAL_ITEMS . '.vendor_code',
    //                 DB::table(PrincipalsUtil::$TBL_PRINCIPALS)
    //                     ->where('code', $this->PRINCIPAL_CODE)
    //                     ->select('vendor_code')
    //                     ->first()->vendor_code ?? 'NA'
    //             )
    //             ->where(PrincipalsUtil::$TBL_INVOICES . '.status', 'pending')
    //             ->get();

    //         $res['line_count'] = $pendingInvoices->count();
    //         // **************** /PENDING INVOICES **************************


    //         // **************************** TEMPLATE(S) ****************************
    //         $pageLineCount = 1;
    //         $pageNum = 1;
    //         for ($tvc_index = 0; $tvc_index < $template_variation_count; $tvc_index++) {
    //             array_push($res['output_template_variations'], [
    //                 'name' => 'Template ' . ($tvc_index + 1),
    //                 'output_template' => [],
    //             ]);

    //             // Loop through each line of the file content
    //             foreach ($pendingInvoices as $pendingInvoice) {
    //                 // ======================= INIT ===============================
    //                 $doc_type = trim($pendingInvoice->doc_type);
    //                 $doc_no = trim($pendingInvoice->doc_no);
    //                 $customer_code = trim($pendingInvoice->customer_code);
    //                 $posting_date = trim($pendingInvoice->posting_date);
    //                 $item_code = trim($pendingInvoice->item_code);
    //                 $quantity = trim($pendingInvoice->quantity);
    //                 $u1 = trim($pendingInvoice->u1);
    //                 $u2 = trim($pendingInvoice->u2);
    //                 $u3 = trim($pendingInvoice->u3);
    //                 $u4 = trim($pendingInvoice->u4);
    //                 $u5 = trim($pendingInvoice->u5);
    //                 $uom = trim($pendingInvoice->uom);

    //                 $nav_customer_name = DB::table(PrincipalsUtil::$TBL_GENERAL_CUSTOMERS)
    //                     ->where('customer_code', $customer_code)
    //                     ->first()->name ?? PrincipalsUtil::$CUSTOMER_NOT_FOUND;
    //                 $nav_item_name = DB::table(PrincipalsUtil::$TBL_GENERAL_ITEMS)
    //                     ->where('item_code', $item_code)
    //                     ->first()->description ?? PrincipalsUtil::$ITEM_NOT_FOUND;

    //                 $customer = DB::table(PrincipalsUtil::$TBL_PRINCIPALS_CUSTOMERS)
    //                     ->where('principal_code', $this->PRINCIPAL_CODE)
    //                     ->where('customer_code', $customer_code)
    //                     ->first();

    //                 $item = DB::table(PrincipalsUtil::$TBL_PRINCIPALS_ITEMS)
    //                     ->where('principal_code',$this->PRINCIPAL_CODE)
    //                     ->where('item_code', $item_code)
    //                     ->first();

    //                 // QTY-CONVERSION *******************************************
    //                 // $bulk_qty = 0;
    //                 // $loose_qty = 0;
    //                 // if($item != null) {
    //                 //     $quo = $quantity/$item->conversion_qty;
    //                 //     $mod = $quantity%$item->conversion_qty;
    //                 //     $bulk_qty = intval($quo);
    //                 //     $loose_qty = $mod;
    //                 // }


    //                 // ******************** TEMPLATE 1 **************************
    //                 if ($tvc_index == 0) {
    //                     $item_notfound = 0;
    //                     $customer_notfound = 0;
    //                     $missing_customer_name = '';
    //                     $missing_item_name = '';

    //                     if ($item == null) {
    //                         $item_notfound = 1;
    //                         $missing_item_name = $nav_item_name;
    //                     } else {
    //                     }

    //                     if ($customer == null) {
    //                         // $customer_notfound = 1;
    //                         $missing_customer_name = $nav_customer_name;
    //                     } else {
    //                     }

    //                     $item_code_supplier =
    //                         $item->item_code_supplier ?? $item_code;
    //                     $customer_code_supplier =
    //                         $item->customer_code_supplier ?? $customer_code;
    //                     // ======================= /INIT =========================

    //                     // =========== SETTING UP ================================
    //                     // Generated data line structure
    //                     $arrGenerated = [
    //                         //commons
    //                         'customer_code' => $customer_code_supplier,
    //                         'alturas_customer_code' => $customer_code,
    //                         'item_code' => $item_code_supplier,
    //                         'alturas_item_code' => $item_code,
    //                         'doc_no' => $doc_no,
    //                         'missing_customer_name' => $missing_customer_name,
    //                         'missing_item_name' => $missing_item_name,
    //                         'customer_notfound' => $customer_notfound,
    //                         'item_notfound' => $item_notfound,
    //                         'salesman_notfound' => 0,
    //                         // principal specific
    //                         'invoice_no' => $doc_no,
    //                         'invoice_date' => $posting_date,
    //                         'quantity' => $quantity,
    //                         // 'bulk_qty' => $bulk_qty,
    //                         // 'loose_qty' => $loose_qty,
    //                         // 'status' => $u1, // invoice status
    //                         'price' => $u2, // price
    //                         'amount' => $u3, // amount
    //                         // 'sm_code' => $u5, // salesman code
    //                         'uom' => $uom,
    //                         'base_uom' => $item->uom ?? 'N/A',
    //                         'description' =>
    //                             ($item->description==null || $item->description=='')
    //                             ? $nav_item_name : $item->description,
    //                         'description_supplier' => $item->description_supplier ?? 'N/A',
    //                         // 'customer_name' => $customer->customer_name_general ?? 'N/A',
    //                         'customer_name' => $customer->customer_name ?? $nav_customer_name,
    //                         'sm_name' => $customer->salesman_name ?? 'N/A',
    //                         'system_date' => $dateToday->format('d/m/Y')
    //                     ];

    //                     if ($chunk_line_count > 0) {
    //                         if (
    //                             !isset($res['output_template_variations'][$tvc_index]['output_template']["Page " . $pageNum])
    //                         ) {
    //                             $res['output_template_variations'][$tvc_index]['output_template']["Page " . $pageNum] = [];
    //                         }
    //                         array_push(
    //                             $res['output_template_variations'][$tvc_index]['output_template']["Page " . $pageNum],
    //                             $arrGenerated
    //                         );

    //                         $pageLineCount += 1;
    //                         if ($pageLineCount > $chunk_line_count) {
    //                             $pageNum += 1;
    //                             $pageLineCount = 1;
    //                         }
    //                     } else {
    //                         // group output_template_variations
    //                         if($item_notfound==1 || $customer_notfound==1) {
    //                             // ---------------------------------------------------------------------------
    //                             if (
    //                                 !isset($res['output_template_variations'][$tvc_index]['output_template']['Unmapped'])
    //                             ) {
    //                                 $res['output_template_variations'][$tvc_index]['output_template']['Unmapped'] = [];
    //                             }
    //                             array_push(
    //                                 $res['output_template_variations'][$tvc_index]['output_template']['Unmapped'],
    //                                 $arrGenerated
    //                             );
    //                             // ---------------------------------------------------------------------------
    //                         } else {
    //                             // ---------------------------------------------------------------------------
    //                             if (
    //                                 !isset($res['output_template_variations'][$tvc_index]['output_template'][$dateToday->format('m/d/Y')])
    //                             ) {
    //                                 $res['output_template_variations'][$tvc_index]['output_template'][$dateToday->format('m/d/Y')] = [];
    //                             }
    //                             array_push(
    //                                 $res['output_template_variations'][$tvc_index]['output_template'][$dateToday->format('m/d/Y')],
    //                                 $arrGenerated
    //                             );
    //                             // ---------------------------------------------------------------------------
    //                         }

    //                     }
    //                     // =========== /SETTING UP =======================================================

    //                 }
    //             }

    //             // reset this guys to 1
    //             $pageLineCount = 1;
    //             $pageNum = 1;
    //         }
    //         // ********************************** /TEMPLATES **********************************

    //         // $fileCount++;

    //         return response()->json($res);

    //     } catch (\Throwable $th) {
    //         $res['success'] = false;
    //         $res['message'] = $th->getMessage();
    //         return response()->json($res, 500);
    //     }
    // }

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
            // $settings = PrincipalsUtil::getSettings($this->PRINCIPAL_CODE);
            // ***************************************************************************

            // ************************* MISC INITS **************************************
            //get principal item masterfile
            $principal_items = DB::table(PrincipalsUtil::$TBL_PRINCIPALS_ITEMS)
                ->where('main_vendor_code', $this->PRINCIPAL_CODE)
                ->get();

            $postingDateFormat = $request->posting_date_format ?? 'm/d/Y';
            // ************************* /MISC INITS *************************************

            // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX TEMPLATE(S) XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
            if (1) {
                // *************************** TEMPLATE 1 ***********************************
                if($exportSI) {
                    // **************** PENDING INVOICES ************************************
                    $pendingInvoices = InvoicesController::getPendingInvoices(
                        $this->PRINCIPAL_CODE, $request->posting_date_range, $request->status
                    );
                    $pendingInvoicesCount = $pendingInvoices->count();
                    $res['line_count'] += $pendingInvoicesCount;
                    // **************** /PENDING INVOICES ***********************************

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
                            $posting_date = (new Carbon($pendingInvoice->posting_date))->format($postingDateFormat);
                            $item_code = $pendingInvoice->item_code;
                            $quantity = intval($pendingInvoice->quantity);
                            $price = doubleval($pendingInvoice->price);
                            $amount = doubleval($pendingInvoice->amount);
                            $uom = $pendingInvoice->uom;
                            $item_description = $pendingInvoice->item_description;
                            $sm_code = $pendingInvoice->sm_code;
                            $group = $pendingInvoice->group;
                            $nav_customer_name = $pendingInvoice->customer_name;
                            $vendor_code = $pendingInvoice->vendor_code;

                            //********************************************************************
                            if($nav_customer_name==null || $nav_customer_name=='') {
                                $nav_customer_name = DB::table(PrincipalsUtil::$TBL_GENERAL_CUSTOMERS)
                                    ->where('customer_code', $customer_code)
                                    ->first()->name ?? PrincipalsUtil::$CUSTOMER_NOT_FOUND;
                            }

                            $item = $principal_items
                                ->where('item_code', $item_code)
                                ->first();
                            //********************************************************************
                            // ******************** TEMPLATE 1 **************************
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
                            // ************************* /MISC INITS **************************

                            // Generated data line structure
                            $arrGenerated = [
                                //commons
                                'customer_code' => $customer_code,
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
                                'description_supplier' => $item->description_supplier ?? $item_description,
                                // 'customer_name' => $nav_customer_name,
                                'customer_name' => $nav_customer_name,
                                'sm_code' => $sm_code ?? 'N/A',
                                'system_date' => $system_date,
                                'group' => $pendingInvoice->group,
                                'status' => $pendingInvoice->status,
                                'vendor_code' => $pendingInvoice->vendor_code,
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
                // *************************** /TEMPLATE 1 ***********************************

                // *************************** TEMPLATE 2 ***********************************

                if($exportCM) {
                    // **************** RETURNS ************************************************
                    $returns = InvoicesController::getReturns(
                        $request->principal_code, $request->posting_date_range, $request->status
                    );
                    $returnsCount = $returns->count();
                    // dd($returns[0]);
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
                            $posting_date = (new Carbon($return->shipment_date))->format($postingDateFormat);
                            $item_code = $return->item_code;
                            $quantity = intval($return->quantity);
                            $price = doubleval($return->price);
                            $amount = doubleval($return->amount);
                            $uom = $return->uom;
                            $item_description = $return->item_description;
                            $sm_code = $return->sm_code;
                            $group = $return->group;
                            $nav_customer_name = $return->customer_name;
                            $status = $return->status;
                            $invoice_doc_no = $return->invoice_doc_no;
                            $return_indicator = $return->return_indicator;
                            $remarks = $return->remarks;
                            $vendor_code = $return->vendor_code;

                            //********************************************************************
                            if($nav_customer_name==null || $nav_customer_name=='') {
                                $nav_customer_name = DB::table(PrincipalsUtil::$TBL_GENERAL_CUSTOMERS)
                                    ->where('customer_code', $customer_code)
                                    ->first()->name ?? PrincipalsUtil::$CUSTOMER_NOT_FOUND;
                            }

                            $item = $principal_items
                                ->where('item_code', $item_code)
                                ->first();

                            // ******************** TEMPLATE 1 **************************
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
                            // ************************* /MISC INITS **************************

                            // Generated data line structure
                            $arrGenerated = [
                                //commons
                                'customer_code' => $customer_code,
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
                                'description_supplier' => $item->description_supplier ?? $item_description,
                                // 'customer_name' => $nav_customer_name,
                                'customer_name' => $nav_customer_name,
                                'sm_code' => $sm_code ?? 'N/A',
                                'system_date' => $system_date,
                                'group' => $group,
                                'status' => $status,
                                'invoice_doc_no' => $invoice_doc_no,
                                'return_indicator' => $return_indicator,
                                'remarks' => $remarks,
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
                                if (!isset($outputTemplate[$groupByKey])) {
                                    $outputTemplate[$groupByKey] = [];
                                }
                                array_push($outputTemplate[$groupByKey], $arrGenerated);
                            }
                        }
                    }
                    ksort($outputTemplate);
                }
                // *************************** /TEMPLATE 2 ***********************************

            }
            // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX /TEMPLATE(S) XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

            // $fileCount++;

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
            //         { text: "Customer Code (Supplier)", value: "customer_code_supplier" },
            //         { text: "Name", value: "customer_name" },
            //     ],
            // ],
            "itemsTableHeader" => [
                [
                    ["text" => "Item Code", "value" =>"item_code"],
                    ["text" => "Item Code (Supplier)", "value" =>"item_code_supplier"],
                    ["text" => "Description (Nav)", "value" =>"description"],
                ]
            ],
            // salesmenTableHeader: [
            //     [
            //         ["text" => "Group Code", "value" =>"group_code"],
            //         ["text" => "Salesman Name", "value" =>"sm_name"],
            //     ]
            // ],

            // templated data table header
            "generatedDataTableHeader" => [
                [
                    ["text" => "Invoice #", "value" => "invoice_no"],
                    ["text" => "Customer Code", "value" => "customer_code"],
                    ["text" => "Customer Name", "value" => "customer_name"],
                    ["text" => "Invoice Date (d/m/Y)", "value" => "invoice_date"],
                    ["text" => "Item Code (NAV)", "value" => "alturas_item_code"],
                    ["text" => "Item Code (Supplier)", "value" => "item_code"],
                    ["text" => "Item Name (NAV)", "value" => "item_description"],
                    ["text" => "Item Name (Supplier)", "value" => "description_supplier"],
                    ["text" => "UOM", "value" => "uom"],
                    ["text" => "Quantity", "value" => "quantity"],
                    ["text" => "Price", "value" => "price"],
                    ["text" => "Amount", "value" => "amount"],
                    ["text" => "Salesman", "value" => "sm_code"],
                    ["text" => "Group", "value" => "group"],
                ],
                [
                    ["text" => "CM #", "value" => "invoice_no"],
                    ["text" => "Customer Code", "value" => "customer_code"],
                    ["text" => "Customer Name", "value" => "customer_name"],
                    ["text" => "Invoice Date (d/m/Y)", "value" => "invoice_date"],
                    ["text" => "Item Code (NAV)", "value" => "alturas_item_code"],
                    ["text" => "Item Code (Supplier)", "value" => "item_code"],
                    ["text" => "Item Name (NAV)", "value" => "item_description"],
                    ["text" => "Item Name (Supplier)", "value" => "description_supplier"],
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

            // ***********************************************************************************
            "generatedDataHistoryFilters" => [
                [
                    ["text" =>  'System Date', "value" => 'system_date'],
                    ["text" =>  'Source Group', "value" => 'group'],
                    ["text" =>  'Invoice #', "value" => 'doc_no'],
                    ["text" =>  'Item Code', "value" => 'item_code'],
                    ["text" =>  'Customer Code', "value" => 'customer_code'],
                    ["text" =>  'Vendor Code', "value" => 'vendor_code'],
                ]
            ],

            // misc
            "posting_date_format" => 'd/m/Y',

        ];

        return response()->json($arr);
    }

}
