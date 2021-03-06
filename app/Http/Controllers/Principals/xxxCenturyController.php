<?php

namespace App\Http\Controllers\Principals;

use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Storage;

class CenturyController extends Controller
{
    private $PRINCIPAL_CODE = 'century';

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
        $cols = [
            'id',
            'principal_code',
            'upload_date',
            'item_code',
            'description',
            'item_code_supplier',
            'description_supplier',
            'uom',
            'conversion_uom',
            'conversion_qty',
        ];
        $result = DB::table(PrincipalsUtil::$TBL_PRINCIPALS_ITEMS)
            ->leftJoin(PrincipalsUtil::$TBL_GENERAL_ITEMS,
                PrincipalsUtil::$TBL_GENERAL_ITEMS. '.item_code',
                PrincipalsUtil::$TBL_PRINCIPALS_ITEMS. '.item_code'
            )
            ->select(PrincipalsUtil::$TBL_PRINCIPALS_ITEMS. '.*',
                PrincipalsUtil::$TBL_GENERAL_ITEMS. '.description'
            )
            ->where('principal_code', $this->PRINCIPAL_CODE)
            ->get($cols);

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
                $fileContentLines = explode(PHP_EOL, mb_convert_encoding($fileContent, "UTF-8", "UTF-8"));

                foreach ($fileContentLines as $fileContentLine) {
                    // Begin on the second line to skip the headers
                    if ($lineCount > 1) {

                        // $arrFileContentLine = explode($delimiter, $fileContentLine);
                        $arrFileContentLine = preg_split('/,(?=(?:(?:[^"]*"){2})*[^"]*$)/', $fileContentLine);

                        if (count($arrFileContentLine) > 1) {
                            $item_code = trim(str_replace('"', '', $arrFileContentLine[0]));
                            $item_code_supplier = trim(str_replace('"', '', $arrFileContentLine[1]));
                            $description_supplier = trim(str_replace('"', '', $arrFileContentLine[2]));
                            $conversion_qty = trim(str_replace('"', '', $arrFileContentLine[4]));
                            $uom = 'CASE';
                            $conversion_uom = 'PCS';

                            $arrLines[] = [
                                'principal_code' => $this->PRINCIPAL_CODE,
                                'uploaded_by' => auth()->user()->id,
                                'item_code' => $item_code,
                                'item_code_supplier' => $item_code_supplier,
                                'description_supplier' => $description_supplier,
                                'uom' => $uom,
                                'conversion_uom' => $conversion_uom,
                                'conversion_qty' => $conversion_qty,
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

        $result = DB::table(PrincipalsUtil::$TBL_PRINCIPALS_CUSTOMERS)
            ->leftJoin(
                PrincipalsUtil::$TBL_GENERAL_CUSTOMERS,
                PrincipalsUtil::$TBL_PRINCIPALS_CUSTOMERS . '.customer_code',
                '=',
                PrincipalsUtil::$TBL_GENERAL_CUSTOMERS.'.customer_code'
            )
            ->select(
                PrincipalsUtil::$TBL_PRINCIPALS_CUSTOMERS . '.*',
                PrincipalsUtil::$TBL_GENERAL_CUSTOMERS.'.name AS customer_name',
                PrincipalsUtil::$TBL_GENERAL_CUSTOMERS.'.address',
                PrincipalsUtil::$TBL_GENERAL_CUSTOMERS.'.address_2',
                PrincipalsUtil::$TBL_GENERAL_CUSTOMERS.'.city',
            )
            ->where(
                PrincipalsUtil::$TBL_PRINCIPALS_CUSTOMERS . '.principal_code',
                $this->PRINCIPAL_CODE
            )
            ->get();

        // $result = DB::table(PrincipalsUtil::$TBL_PRINCIPALS_CUSTOMERS)
        //     ->where('principal_code', $this->PRINCIPAL_CODE)
        //     ->get();

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

                $fileContentLines = explode(
                    PHP_EOL, mb_convert_encoding($fileContent, "UTF-8", "UTF-8")
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
                                    'customer_code_supplier' => $customer_code_supplier,
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
            $res['success'] = true;
            $res['message'] = 'Success';
            $res['output_template'] = [];
            $res['line_count'] = 0;
            $res['raw_invoices'] = [];

            $filesTotalLineCount = 0;
            $dateToday = Carbon::now();
            $fileCount = 0;
            $settings = PrincipalsUtil::getSettings($this->PRINCIPAL_CODE);
            $latest_order_no = DB::table(PrincipalsUtil::$TBL_GENERATED)
                ->where('principal_code', $this->PRINCIPAL_CODE)
                ->latest('id')->first()->order_no ?? $settings['custom_order_no'] ?? 1;

            // $latest_order_no = intval($settings['custom_order_no']) ?? 100000000;

            $chunk_line_count = intval($settings['chunk_line_count'] ?? 0);
            $unuploadedLineCount = 0;
            $breakFilesIteration = false;
            $pageLineCount = 1;
            $pageNum = 1;

            // ================================================================================
            // Get principal settings (test)
            // $principal_settings = PrincipalsUtil::getPrincipalSettings($this->PRINCIPAL_CODE);

            // $route_codes = [];
            // foreach ($principal_settings->route_code_mapping as $rcm) {
            //     $route_codes[$rcm->salesman_name] = $rcm->route_code;
            // }
            // ================================================================================
            // $route_codes = [];
            // $route_code_mapping = $settings['route_code_mapping'];
            // // dd($route_code_mapping);

            // foreach($route_code_mapping->route_code_mapping as $rcm) {
            //     $route_codes[$rcm->salesman_name] = $rcm->route_code;
            // }
            // ================================================================================

            // dd($route_codes);
            //TODO: get pending invoices
            $pendingInvoices = DB::table(PrincipalsUtil::$TBL_INVOICES)
                ->leftJoin(
                    PrincipalsUtil::$TBL_GENERAL_ITEMS,
                    PrincipalsUtil::$TBL_GENERAL_ITEMS.'.item_code',
                    PrincipalsUtil::$TBL_INVOICES.'.item_code'
                )
                ->select(
                    PrincipalsUtil::$TBL_INVOICES.'.*',
                    PrincipalsUtil::$TBL_GENERAL_ITEMS.'.description',
                    PrincipalsUtil::$TBL_GENERAL_ITEMS.'.vendor_code',
                )
                // ->where('invoices.')
                ->where(
                    PrincipalsUtil::$TBL_GENERAL_ITEMS.'.vendor_code',
                    DB::table(PrincipalsUtil::$TBL_PRINCIPALS)
                        ->where('code', $this->PRINCIPAL_CODE)
                        ->select('vendor_code')
                        ->first()->vendor_code ?? 'NA'
                )
                ->where(PrincipalsUtil::$TBL_INVOICES.'.status', 'pending')
                ->get();

            // dd($pendingInvoices);

            // Loop through each line of the file content
            foreach ($pendingInvoices as $pendingInvoice) {
                // ======================= INIT ===========================
                $doc_type = trim($pendingInvoice->doc_type);
                $doc_no = trim($pendingInvoice->doc_no);
                $customer_code = trim($pendingInvoice->customer_code);
                $posting_date = trim($pendingInvoice->posting_date);
                $item_code = trim($pendingInvoice->item_code);
                $quantity = trim($pendingInvoice->quantity);
                $u1 = trim($pendingInvoice->u1);
                $u2 = trim($pendingInvoice->u2);
                $u3 = trim($pendingInvoice->u3);
                $u4 = trim($pendingInvoice->u4);
                $u5 = trim($pendingInvoice->u5);
                $uom = trim($pendingInvoice->uom);

                $customer = DB::table(PrincipalsUtil::$TBL_PRINCIPALS_CUSTOMERS)
                    ->where('principal_code', $this->PRINCIPAL_CODE)
                    ->where('customer_code', $customer_code)
                    ->first();
                $item = DB::table(PrincipalsUtil::$TBL_PRINCIPALS_ITEMS)
                    ->where('principal_code', $this->PRINCIPAL_CODE)
                    ->where('item_code', $item_code)
                    ->first();

                $invoice_uploaded = 0;
                // not found in principal's masterfile
                $item_notfound = 0;
                $customer_notfound = 0;
                // /not found in principal's
                $salesman_name = '';
                // name of customer who's missing in principal's masterfile
                $missing_customer_name = '';
                $missing_item_name = '';

                if ($item == null) {
                    $item_notfound = 1;
                    $missing_item_name = DB::table(PrincipalsUtil::$TBL_GENERAL_ITEMS)
                        ->where('item_code', $item_code)
                        ->first()->description ?? '[ Not Found ]';
                } else {

                }

                if ($customer == null) {
                    $customer_notfound = 1;
                    $missing_customer_name = DB::table(PrincipalsUtil::$TBL_GENERAL_CUSTOMERS)
                        ->where('customer_code', $customer_code)
                        ->first()->name ?? '[ Not Found ]';
                } else {
                    $salesman_name = $customer->salesman_name ?? 'NA';
                }

                $order_date = $dateToday->format('Y/m/d');
                $order_no = 'N/A';

                if ($item_notfound == 1 || $customer_notfound == 1) {
                    // $order_date = 'TBD';
                } else if ($item_notfound == 0 || $customer_notfound == 0) {
                    $order_no = $latest_order_no += 1;
                }

                // $route_code = $customer->route_code ?? 'Customer_NA';
                // $route_code = Arr::first($principal_settings->route_code_mapping,
                //     function($value, $key) use (&$salesman_name){
                //         return $value->salesman_name==$salesman_name;
                //     }
                // )->route_code ?? 'Customer_NA';
                $route_code = $route_codes[$salesman_name] ?? 'N/A';

                $item_category_code = $settings['item_category_code'] ?? 'N/A';
                $ship_to = $settings['ship_to'] ?? 'N/A';

                $remarks = '';
                $item_code_supplier = $item->item_code_supplier ?? $item_code;
                // ======================= /INIT ===========================

                // Check if the invoice is already uploaded
                // if invoices are not yet saved/uploaded
                // if($line_limit > 0) {
                //     if($unuploadedLineCount >= $line_limit) {
                //         $breakFilesIteration = true;
                //         break;
                //     }
                // }

                // =========== SETTING UP ======================================
                // Generated data line structure
                $arrGenerated = [
                    'order_date' => $order_date,
                    'customer_code' => $customer_code,
                    'route_code' => $route_code,
                    'product_category_code' => $item_category_code,
                    'ship_to' => $ship_to,
                    'order_no' => $order_no,
                    'remarks' => $remarks,
                    // 'item_code' => intval($item_code),
                    'item_code' => $item_code_supplier,
                    'alturas_item_code' => $item_code,
                    'quantity' => intval($quantity),
                    'item_notfound' => $item_notfound,
                    'customer_notfound' => $customer_notfound,
                    'invoice_uploaded' => $invoice_uploaded,
                    'doc_no' => $doc_no,
                    'missing_customer_name' => $missing_customer_name,
                    'missing_item_name' => $missing_item_name,
                ];

                if ($chunk_line_count > 0) {
                    if (!isset($res['output_template']["Page " . $pageNum])) {
                        $res['output_template']["Page " . $pageNum] = [];
                    }
                    array_push($res['output_template']["Page " . $pageNum], $arrGenerated);
                    $pageLineCount += 1;
                    if ($pageLineCount > $chunk_line_count) {
                        $pageNum += 1;
                        $pageLineCount = 1;
                    }
                } else {
                    // group output_template
                    if (!isset($res['output_template'][$route_code])) {
                        $res['output_template'][$route_code] = [];
                    }
                    array_push($res['output_template'][$route_code], $arrGenerated);

                    // group output_template by filename
                    // if (!isset($res['output_template'][$fileNameNoExt])) {
                    //     $res['output_template'][$fileNameNoExt] = [];
                    // }
                    // array_push($res['output_template'][$fileNameNoExt], $arrGenerated);
                }
                // =========== /SETTING UP ======================================

                // increment line count of unuploaded invoices
                $unuploadedLineCount++;

                // increment file line count
                // $lineCount++;
            }
            $fileCount++;
            // $filesTotalLineCount += $lineCount;

            // if(count($res['raw_invoices']) == 0 && $lineCount > 0) {
            //     Storage::delete("$fileStoragePath/$fileName");
            // } else if($lineCount == 0) {
            //     Storage::delete("$fileStoragePath/$fileName");
            // }

            // if($breakFilesIteration) break;

            $res['line_count'] = $pendingInvoices->count();

            // $rawInvoicesCount = count($res['raw_invoices']);
            // if ($rawInvoicesCount == 0 && $filesTotalLineCount > 0) {
            //     $res['message'] = 'File contents already uploaded';
            // } else if ($rawInvoicesCount != $filesTotalLineCount) {
            //     // $res['message'] = 'Only the unuploaded file contents are shown';
            // } else if ($filesTotalLineCount == 0) {
            //     $res['message'] = 'Data unreadable';
            // }

            return response()->json($res);
        } catch (\Throwable $th) {
            $res['success'] = false;
            $res['message'] = $th->getMessage();
            return response()->json($res, 500);
        }
    }


    /**
     * Change invoice's status to 'complete'
     * NOTE: This happens when the user exports the generated templated data
     */
    public function setInvoicesComplete(Request $request)
    {
        set_time_limit(0);
        $dateToday = Carbon::now()->format('Y-m-d H:i:s');

        // generated data
        DB::beginTransaction();
        try {
            // kaloy 2022-04-26
            $order_no = 0;

            foreach ($request->generated_data as $gendata) {
                foreach ($gendata[1] as $line) {
                    if($line['customer_notfound'] == 0 && $line['item_notfound'] == 0) {
                        // dd($line);
                        DB::table(PrincipalsUtil::$TBL_INVOICES)
                            ->where('doc_no', $line['doc_no'])
                            ->where('item_code', $line['alturas_item_code'])
                            ->where('status', 'pending')
                            ->update([
                                'status' => 'completed',
                                'updated_at' => $dateToday
                            ]);

                        // kaloy 2022-04-26
                        $temp_orderno = intval($line['order_no']);
                        if($temp_orderno > $order_no) {
                            $order_no = $temp_orderno;
                        }
                    }

                    if ($line['customer_notfound'] == 0 && $line['item_notfound'] == 0) {
                        $status = PrincipalsUtil::$STATUS_COMPLETED;
                        DB::table(PrincipalsUtil::$TBL_GENERATED)->insert([
                            'principal_code' => $this->PRINCIPAL_CODE,
                            'status' => $status,
                            'uploaded_by' => auth()->user()->id,
                            'doc_no' => $line['doc_no'],
                            // ====
                            'order_date' => $line['order_date'],
                            'customer_code' => $line['customer_code'],
                            'route_code' => $line['route_code'],
                            'product_category_code' => $line['product_category_code'],
                            'ship_to' => $line['ship_to'],
                            'order_no' => $line['order_no'],
                            'remarks' => $line['remarks'],
                            'item_code' => $line['item_code'],
                            'quantity' => $line['quantity'],
                            'generated_at' => $dateToday
                        ]);
                    }
                }
            }

            DB::commit();
            $response = [
                'success' => true,
                'message' => 'Successful',
            ];
            return response()->json($response);
        } catch (\Throwable $th) {
            DB::rollBack();
            $response['success'] = false;
            $response['message'] = $th->getMessage();
            return response()->json($response, 500);
        }

    }
    /**
     * Save invoices together with the generated data
     * NOTE: This happens when the user exports the generated data
     */
    public function saveInvoices(Request $request)
    {
        set_time_limit(0);
        $dateToday = Carbon::now();
        try {
            // invoices
            foreach ($request->raw_invoices as $line) {
                // ===========================================================================
                // $status = '';
                // if($line['customer_notfound']==0 && $line['item_notfound']==0){
                //     $status = PrincipalsUtil::$STATUS_COMPLETED;
                // } else {
                //     $status = PrincipalsUtil::$STATUS_PENDING;
                // }
                // DB::table(PrincipalsUtil::$TBL_INVOICES)->insert([
                //     'principal_code' => $this->PRINCIPAL_CODE,
                //     'status' => $status,
                //     'upload_date' => $dateToday->format('Y-m-d H:i:s'),
                //     'uploaded_by' => auth()->user()->id,
                //     // ====
                //     'doc_type' => $line['doc_type'],
                //     'doc_no' => $line['doc_no'],
                //     'customer_code' => $line['customer_code'],
                //     'posting_date' => $line['posting_date'],
                //     'item_code' => $line['item_code'],
                //     'quantity' => $line['quantity'],
                //     'u1' => $line['u1'], // GOOD
                //     'u2' => $line['u2'], // 186.6964
                //     'u3' => $line['u3'], // 186.6964
                //     'u4' => $line['u4'], // Yes
                //     'u5' => $line['u5'], // DSG55
                //     'uom' => $line['uom']
                // ]);
                // ===========================================================================
                if ($line['customer_notfound'] == 0 && $line['item_notfound'] == 0) {
                    $status = PrincipalsUtil::$STATUS_COMPLETED;
                    DB::table(PrincipalsUtil::$TBL_INVOICES)->insert([
                        'principal_code' => $this->PRINCIPAL_CODE,
                        'status' => $status,
                        'upload_date' => $dateToday->format('Y-m-d H:i:s'),
                        'uploaded_by' => auth()->user()->id,
                        'filename' => $line['filename'],
                        // ====
                        'doc_type' => $line['doc_type'],
                        'doc_no' => $line['doc_no'],
                        'customer_code' => $line['customer_code'],
                        'posting_date' => $line['posting_date'],
                        'item_code' => $line['item_code'],
                        'quantity' => $line['quantity'],
                        'u1' => $line['u1'], // GOOD
                        'u2' => $line['u2'], // 186.6964
                        'u3' => $line['u3'], // 186.6964
                        'u4' => $line['u4'], // Yes
                        'u5' => $line['u5'], // DSG55
                        'uom' => $line['uom']
                    ]);
                }
            }

            // generated data
            foreach ($request->generated_data as $gendata) {
                foreach ($gendata[1] as $line) {
                    // ======================================================================
                    // $status = '';
                    // if($line['customer_notfound']==0 && $line['item_notfound']==0){
                    //     $status = PrincipalsUtil::$STATUS_COMPLETED;
                    // } else {
                    //     $status = PrincipalsUtil::$STATUS_PENDING;
                    // }
                    // DB::table(PrincipalsUtil::$TBL_GENERATED)->insert([
                    //     'principal_code' => $this->PRINCIPAL_CODE,
                    //     'status' => $status,
                    //     'uploaded_by' => auth()->user()->id,
                    //     'doc_no' => $line['doc_no'],
                    //     // ====
                    //     'order_date' => $line['order_date'],
                    //     'customer_code' => $line['customer_code'],
                    //     'route_code' => $line['route_code'],
                    //     'item_category_code' => $line['item_category_code'],
                    //     'ship_to' => $line['ship_to'],
                    //     'order_no' => $line['order_no'],
                    //     'remarks' => $line['remarks'],
                    //     'item_code' => $line['item_code'],
                    //     'quantity' => $line['quantity'],
                    //     'generated_at' => $dateToday->format('Y-m-d H:i:s'),
                    // ]);
                    // ======================================================================
                    if ($line['customer_notfound'] == 0 && $line['item_notfound'] == 0) {
                        $status = PrincipalsUtil::$STATUS_COMPLETED;
                        DB::table(PrincipalsUtil::$TBL_GENERATED)->insert([
                            'principal_code' => $this->PRINCIPAL_CODE,
                            'status' => $status,
                            'uploaded_by' => auth()->user()->id,
                            'doc_no' => $line['doc_no'],
                            // ====
                            'order_date' => $line['order_date'],
                            'customer_code' => $line['customer_code'],
                            'route_code' => $line['route_code'],
                            'item_category_code' => $line['item_category_code'],
                            'ship_to' => $line['ship_to'],
                            'order_no' => $line['order_no'],
                            'remarks' => $line['remarks'],
                            'item_code' => $line['item_code'],
                            'quantity' => $line['quantity'],
                            'generated_at' => $dateToday->format('Y-m-d H:i:s'),
                        ]);
                    }
                }
            }

            $response = [
                'success' => true,
                'message' => 'Successful',
            ];

            return response()->json($response);

        } catch (\Throwable $th) {
            $response['success'] = false;
            $response['message'] = $th->getMessage();
            return response()->json($response, 500);
        }
    }


}
