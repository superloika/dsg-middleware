<?php

namespace App\Http\Controllers\Principals;

use App\Events\GenerateTemplated;
use App\Http\Controllers\Controller;
use App\Http\Controllers\InvoicesController;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class GsmiController extends Controller
{
    private $PRINCIPAL_CODE = 'gsmi';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
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

            ->where('principal_code', $this->PRINCIPAL_CODE)

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
                $fileContentLines =
                    explode(PHP_EOL, mb_convert_encoding($fileContent, "UTF-8", "UTF-8"));

                foreach ($fileContentLines as $fileContentLine) {
                    // Begin on the second line to skip the headers
                    if ($lineCount > 1) {

                        // $arrFileContentLine = explode($delimiter, $fileContentLine);
                        $arrFileContentLine =
                            preg_split('/,(?=(?:(?:[^"]*"){2})*[^"]*$)/', $fileContentLine);

                        if (count($arrFileContentLine) > 1) {
                            $item_code_supplier =
                                trim(str_replace('"', '', $arrFileContentLine[0]));
                            $description_supplier =
                                trim(str_replace('"', '', $arrFileContentLine[1]));
                            $item_code =
                                trim(str_replace('"', '', $arrFileContentLine[2]));
                            $description =
                                trim(str_replace('"', '', $arrFileContentLine[3]));

                            $arrLines[] = [
                                'principal_code' => $this->PRINCIPAL_CODE,
                                'uploaded_by' => auth()->user()->id,
                                'description' => $description,
                                'item_code' => $item_code,
                                'item_code_supplier' => $item_code_supplier,
                                'description_supplier' => $description_supplier,
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
            ->where('principal_code', $this->PRINCIPAL_CODE)

            ->where(function($q) use ($search_key) {
                $q->where(
                    PrincipalsUtil::$TBL_PRINCIPALS_CUSTOMERS.'.customer_code',
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

            DB::beginTransaction();

            if (Storage::exists("$fileStoragePath/$fileName")) {
                $fileContent = Storage::get("$fileStoragePath/$fileName");

                // init lineCount to 1 for the header
                $lineCount = 1;

                DB::table(PrincipalsUtil::$TBL_PRINCIPALS_CUSTOMERS)
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
                            $customer_code =
                                trim(str_replace('"', '', $arrFileContentLine[0]));
                            $salesman_name =
                                trim(str_replace('"', '', $arrFileContentLine[1]));
                            $customer_name =
                                trim(str_replace('"', '', $arrFileContentLine[2]));
                            // =========================================================================

                            // $isExisting = array_search(
                            //     $customer_code,
                            //     array_column($arrLines, 'customer_code')
                            // );
                            $isExisting = false;
                            if ($isExisting == false) {
                                $arrLines[] = [
                                    'principal_code' => $this->PRINCIPAL_CODE,
                                    'customer_code' => $customer_code,
                                    'salesman_name' => $salesman_name,
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
            $system_date = $dateToday->format('Y-m-d');
            $settings = PrincipalsUtil::getSettings($this->PRINCIPAL_CODE);
            // ***************************************************************************

            // ************************* MISC INITS **************************************
            $filesTotalLineCount = 0;
            $chunk_line_count = intval($settings['chunk_line_count'] ?? 0);
            $breakFilesIteration = false;

            $postingDateFormat = $request->posting_date_format ?? 'm/d/Y';
            // ************************* /MISC INITS *************************************


            // **************************** TEMPLATE(S) ***************************************
            if(1){
                // TEMPLATE 1 ===========================================================
                if (1) {
                    $pageLineCount = 1;
                    $pageNum = 1;

                    // **************** PENDING INVOICES ************************************
                    $pendingInvoices = InvoicesController::getPendingInvoices(
                        $this->PRINCIPAL_CODE, $request->posting_date_range, $request->status
                    );
                    $pendingInvoicesCount = $pendingInvoices->count();
                    $res['line_count'] += $pendingInvoicesCount;
                    // **************** /PENDING INVOICES ************************************

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
                        $item_description = $pendingInvoice->item_description;
                        $group_code = $pendingInvoice->group;
                        $sm_code = $pendingInvoice->sm_code;
                        $status = $pendingInvoice->status;

                        //********************************************************************
                        $nav_customer_name = $pendingInvoice->customer_name;
                        if($nav_customer_name==null || $nav_customer_name=='') {
                            $nav_customer_name = DB::table(PrincipalsUtil::$TBL_GENERAL_CUSTOMERS)
                                ->where('customer_code', $customer_code)
                                ->first()->name ?? PrincipalsUtil::$CUSTOMER_NOT_FOUND;
                        }
                        // $nav_customer_name = DB::table(PrincipalsUtil::$TBL_GENERAL_CUSTOMERS)
                        //     ->where('customer_code', $customer_code)
                        //     ->first()->name ?? PrincipalsUtil::$CUSTOMER_NOT_FOUND;
                        // $nav_item_name = DB::table(PrincipalsUtil::$TBL_GENERAL_ITEMS)
                        //     ->where('item_code', $item_code)
                        //     ->first()->description ?? PrincipalsUtil::$ITEM_NOT_FOUND;

                        $customer = DB::table(PrincipalsUtil::$TBL_PRINCIPALS_CUSTOMERS)
                            ->where('principal_code', $this->PRINCIPAL_CODE)
                            ->where('customer_code', $customer_code)
                            ->first();

                        $item = DB::table(PrincipalsUtil::$TBL_PRINCIPALS_ITEMS)
                            ->where('principal_code', $this->PRINCIPAL_CODE)
                            ->where('item_code', $item_code)
                            ->first();
                        //********************************************************************

                        // ************************* MISC INITS **************************
                        $item_notfound = 0;
                        $customer_notfound = 0;
                        $salesman_notfound = 0;
                        $missing_customer_name = '';
                        $missing_item_name = '';
                        $sm_name = $customer->salesman_name ?? 'NA';

                        if ($item == null) {
                            $item_notfound = 1;
                            // $missing_item_name = DB::table(PrincipalsUtil::$TBL_GENERAL_ITEMS)
                            //     ->where('item_code', $item_code)
                            //     ->first()->description ?? PrincipalsUtil::$ITEM_NOT_FOUND;
                            $missing_item_name = $item_description;
                        } else {
                        }

                        if ($customer == null) {
                            $customer_notfound = 1;
                            $missing_customer_name = $nav_customer_name;
                            // $missing_customer_name = DB::table(PrincipalsUtil::$TBL_GENERAL_CUSTOMERS)
                            //     ->where('customer_code', $customer_code)
                            //     ->first()->name ?? PrincipalsUtil::$CUSTOMER_NOT_FOUND;
                        } else {
                        }

                        $item_code_supplier = $item->item_code_supplier ?? $item_code;
                        $customer_code_supplier = $customer->customer_code_supplier ?? $customer_code;
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
                            'salesman_notfound' => 0,
                            'invoice_no' => $doc_no,
                            'invoice_date' => $posting_date,
                            'quantity' => $quantity,
                            'price' => $price,
                            'amount' => $amount,
                            'uom' => $uom,
                            'item_description' => $item_description,
                            'description_supplier' => $item->description_supplier ?? 'NA',
                            'customer_name' => $nav_customer_name,
                            'sm_name' => $sm_name,
                            'system_date' => $system_date,
                            'group' => $group_code,
                            'status' => $status
                        ];

                        if ($chunk_line_count > 0) {
                            if (
                                !isset($res['output_template_variations'][0]['output_template']["Page " . $pageNum])
                            ) {
                                $res['output_template_variations'][0]['output_template']["Page " . $pageNum] = [];
                            }
                            array_push(
                                $res['output_template_variations'][0]['output_template']["Page " . $pageNum],
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
                                !isset($res['output_template_variations'][0]['output_template'][$$group_by])
                            ) {
                                $res['output_template_variations'][0]['output_template'][$$group_by] = [];
                            }
                            array_push(
                                $res['output_template_variations'][0]['output_template'][$$group_by],
                                $arrGenerated
                            );

                        }

                    }
                }
                // /TEMPLATE 1 ===========================================================
                // TEMPLATE 2 ===========================================================
                if (2) {
                    $pageLineCount = 1;
                    $pageNum = 1;

                    // **************** PENDING INVOICES ************************************
                    $returns = InvoicesController::getReturns(
                        $this->PRINCIPAL_CODE, $request->posting_date_range, $request->status
                    );
                    $returnsCount = $returns->count();
                    $res['line_count'] += $returnsCount;
                    // **************** /PENDING INVOICES ************************************

                    // Loop through each line of the file content
                    $loopCounter = 0;
                    foreach ($returns as $return) {
                        $loopCounter++;
                        $progressPercent = round(($loopCounter / $returnsCount) * 100);
                        GenerateTemplated::dispatch("Generating sales invoices ($progressPercent%)");

                        $doc_no = $return->doc_no;
                        $customer_code = $return->customer_code;
                        $posting_date = $return->posting_date;
                        $item_code = $return->item_code;
                        $quantity = intval($return->quantity);
                        $price = doubleval($return->price);
                        $amount = doubleval($return->amount);
                        $uom = $return->uom;
                        $item_description = $return->item_description;
                        $group_code = $return->group;
                        $sm_code = $return->sm_code;
                        $status = $return->status;
                        $invoice_doc_no = $return->invoice_doc_no;
                        $return_indicator = $return->return_indicator;
                        $remarks = $return->remarks;

                        //********************************************************************
                        $nav_customer_name = $return->customer_name;
                        if($nav_customer_name==null || $nav_customer_name=='') {
                            $nav_customer_name = DB::table(PrincipalsUtil::$TBL_GENERAL_CUSTOMERS)
                                ->where('customer_code', $customer_code)
                                ->first()->name ?? PrincipalsUtil::$CUSTOMER_NOT_FOUND;
                        }
                        // $nav_customer_name = DB::table(PrincipalsUtil::$TBL_GENERAL_CUSTOMERS)
                        //     ->where('customer_code', $customer_code)
                        //     ->first()->name ?? PrincipalsUtil::$CUSTOMER_NOT_FOUND;
                        // $nav_item_name = DB::table(PrincipalsUtil::$TBL_GENERAL_ITEMS)
                        //     ->where('item_code', $item_code)
                        //     ->first()->description ?? PrincipalsUtil::$ITEM_NOT_FOUND;

                        $customer = DB::table(PrincipalsUtil::$TBL_PRINCIPALS_CUSTOMERS)
                            ->where('principal_code', $this->PRINCIPAL_CODE)
                            ->where('customer_code', $customer_code)
                            ->first();

                        $item = DB::table(PrincipalsUtil::$TBL_PRINCIPALS_ITEMS)
                            ->where('principal_code', $this->PRINCIPAL_CODE)
                            ->where('item_code', $item_code)
                            ->first();
                        //********************************************************************

                        // ************************* MISC INITS **************************
                        $item_notfound = 0;
                        $customer_notfound = 0;
                        $salesman_notfound = 0;
                        $missing_customer_name = '';
                        $missing_item_name = '';
                        $sm_name = $customer->salesman_name ?? 'NA';

                        if ($item == null) {
                            $item_notfound = 1;
                            // $missing_item_name = DB::table(PrincipalsUtil::$TBL_GENERAL_ITEMS)
                            //     ->where('item_code', $item_code)
                            //     ->first()->description ?? PrincipalsUtil::$ITEM_NOT_FOUND;
                            $missing_item_name = $item_description;
                        } else {
                        }

                        if ($customer == null) {
                            $customer_notfound = 1;
                            $missing_customer_name = $nav_customer_name;
                            // $missing_customer_name = DB::table(PrincipalsUtil::$TBL_GENERAL_CUSTOMERS)
                            //     ->where('customer_code', $customer_code)
                            //     ->first()->name ?? PrincipalsUtil::$CUSTOMER_NOT_FOUND;
                        } else {
                        }

                        $item_code_supplier = $item->item_code_supplier ?? $item_code;
                        $customer_code_supplier = $customer->customer_code_supplier ?? $customer_code;
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
                            'salesman_notfound' => 0,
                            'invoice_no' => $doc_no,
                            'invoice_date' => $posting_date,
                            'quantity' => $quantity,
                            'price' => $price,
                            'amount' => $amount,
                            'uom' => $uom,
                            'item_description' => $item_description,
                            'description_supplier' => $item->description_supplier ?? 'NA',
                            'customer_name' => $nav_customer_name,
                            'sm_name' => $sm_name,
                            'system_date' => $system_date,
                            'group' => $group_code,
                            'status' => $status,
                            'invoice_doc_no' => $invoice_doc_no,
                            'return_indicator' => $return_indicator,
                            'remarks' => $remarks,
                        ];

                        if ($chunk_line_count > 0) {
                            if (
                                !isset($res['output_template_variations'][1]['output_template']["Page " . $pageNum])
                            ) {
                                $res['output_template_variations'][1]['output_template']["Page " . $pageNum] = [];
                            }
                            array_push(
                                $res['output_template_variations'][1]['output_template']["Page " . $pageNum],
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
                }
                // /TEMPLATE 2 ===========================================================
            }
            // ********************************** /TEMPLATES **********************************

            return response()->json($res);

        } catch (\Throwable $th) {
            $res['success'] = false;
            $res['message'] = $th->getMessage();
            return response()->json($res, 500);
        }
    }

}
