<?php

namespace App\Http\Controllers\Principals;

use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class PurefoodsController extends Controller
{
    private $PRINCIPAL_CODE = 'purefoods';

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
                    ->where('principal_code', $this->PRINCIPAL_CODE)->delete();

                $arrLines = [];
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
                                'principal_code' => $this->PRINCIPAL_CODE,
                                'uploaded_by' => auth()->user()->id,
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

            ->where(
                PrincipalsUtil::$TBL_PRINCIPALS_CUSTOMERS . '.principal_code',
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
                    ->where('principal_code', $this->PRINCIPAL_CODE)->delete();

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
                                    'principal_code' => $this->PRINCIPAL_CODE,
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
            $template_variation_count = DB::table(PrincipalsUtil::$TBL_PRINCIPALS)
                ->select('template_variation_count')
                ->where('code', $this->PRINCIPAL_CODE)
                ->first()->template_variation_count;

            $res['success'] = true;
            $res['message'] = 'Success';
            $res['line_count'] = 0;
            $res['output_template_variations'] = [];

            $dateToday = Carbon::now();
            $settings = PrincipalsUtil::getSettings($this->PRINCIPAL_CODE);
            $filesTotalLineCount = 0;
            $chunk_line_count = intval($settings['chunk_line_count'] ?? 0);
            $breakFilesIteration = false;

            // **************** PENDING INVOICES **************************
            $pendingInvoices = DB::table(PrincipalsUtil::$TBL_INVOICES)
                ->leftJoin(
                    PrincipalsUtil::$TBL_GENERAL_ITEMS,
                    PrincipalsUtil::$TBL_GENERAL_ITEMS . '.item_code',
                    PrincipalsUtil::$TBL_INVOICES . '.item_code'
                )
                ->select(
                    PrincipalsUtil::$TBL_INVOICES . '.*',
                    PrincipalsUtil::$TBL_GENERAL_ITEMS . '.description',
                    PrincipalsUtil::$TBL_GENERAL_ITEMS . '.vendor_code',
                )
                // ->where('invoices.')
                ->where(
                    PrincipalsUtil::$TBL_GENERAL_ITEMS . '.vendor_code',
                    DB::table(PrincipalsUtil::$TBL_PRINCIPALS)
                        ->where('code', $this->PRINCIPAL_CODE)
                        ->select('vendor_code')
                        ->first()->vendor_code ?? 'NA'
                )
                ->where(PrincipalsUtil::$TBL_INVOICES . '.status', 'pending')
                ->get();

            $res['line_count'] = $pendingInvoices->count();
            // **************** /PENDING INVOICES **************************


            // **************************** TEMPLATE(S) ****************************
            $pageLineCount = 1;
            $pageNum = 1;
            for ($tvc_index = 0; $tvc_index < $template_variation_count; $tvc_index++) {
                array_push($res['output_template_variations'], [
                    'name' => 'Template ' . ($tvc_index + 1),
                    'output_template' => [],
                ]);

                // Loop through each line of the file content
                foreach ($pendingInvoices as $pendingInvoice) {
                    // ======================= INIT ===============================
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

                    $nav_customer_name = DB::table(PrincipalsUtil::$TBL_GENERAL_CUSTOMERS)
                        ->where('customer_code', $customer_code)
                        ->first()->name ?? PrincipalsUtil::$CUSTOMER_NOT_FOUND;
                    $nav_item_name = DB::table(PrincipalsUtil::$TBL_GENERAL_ITEMS)
                        ->where('item_code', $item_code)
                        ->first()->description ?? PrincipalsUtil::$ITEM_NOT_FOUND;

                    $customer = DB::table(PrincipalsUtil::$TBL_PRINCIPALS_CUSTOMERS)
                        ->where('principal_code', $this->PRINCIPAL_CODE)
                        ->where('customer_code', $customer_code)
                        ->first();

                    $item = DB::table(PrincipalsUtil::$TBL_PRINCIPALS_ITEMS)
                        ->where('principal_code',$this->PRINCIPAL_CODE)
                        ->where('item_code', $item_code)
                        ->first();

                    // QTY-CONVERSION *******************************************
                    // $bulk_qty = 0;
                    // $loose_qty = 0;
                    // if($item != null) {
                    //     $quo = $quantity/$item->conversion_qty;
                    //     $mod = $quantity%$item->conversion_qty;
                    //     $bulk_qty = intval($quo);
                    //     $loose_qty = $mod;
                    // }


                    // ******************** TEMPLATE 1 **************************
                    if ($tvc_index == 0) {
                        $item_notfound = 0;
                        $customer_notfound = 0;
                        $missing_customer_name = '';
                        $missing_item_name = '';

                        if ($item == null) {
                            // $item_notfound = 1;
                            $missing_item_name = $nav_item_name;
                        } else {
                        }

                        if ($customer == null) {
                            // $customer_notfound = 1;
                            $missing_customer_name = $nav_customer_name;
                        } else {
                        }

                        $item_code_supplier =
                            $item->item_code_supplier ?? $item_code;
                        $customer_code_supplier =
                            $item->customer_code_supplier ?? $customer_code;
                        // ======================= /INIT =========================

                        // =========== SETTING UP ================================
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
                            // principal specific
                            'invoice_no' => $doc_no,
                            'invoice_date' => $posting_date,
                            'quantity' => $quantity,
                            // 'bulk_qty' => $bulk_qty,
                            // 'loose_qty' => $loose_qty,
                            // 'status' => $u1, // invoice status
                            'price' => $u2, // price
                            'amount' => $u3, // amount
                            // 'sm_code' => $u5, // salesman code
                            'uom' => $uom,
                            'base_uom' => $item->uom ?? 'N/A',
                            'description' =>
                                ($item==null || $item->description==null || $item->description=='')
                                ? $nav_item_name : $item->description,
                            'description_supplier' => $item->description_supplier ?? 'N/A',
                            // 'customer_name' => $customer->customer_name_general ?? 'N/A',
                            'customer_name' => $customer->customer_name ?? $nav_customer_name,
                            'sm_name' => $customer->salesman_name ?? 'N/A',
                            'system_date' => $dateToday->format('Y-m-d')
                        ];

                        if ($chunk_line_count > 0) {
                            if (
                                !isset($res['output_template_variations'][$tvc_index]['output_template']["Page " . $pageNum])
                            ) {
                                $res['output_template_variations'][$tvc_index]['output_template']["Page " . $pageNum] = [];
                            }
                            array_push(
                                $res['output_template_variations'][$tvc_index]['output_template']["Page " . $pageNum],
                                $arrGenerated
                            );

                            $pageLineCount += 1;
                            if ($pageLineCount > $chunk_line_count) {
                                $pageNum += 1;
                                $pageLineCount = 1;
                            }
                        } else {
                            // group output_template_variations
                            if($item_notfound==1 || $customer_notfound==1) {
                                // ---------------------------------------------------------------------------
                                if (
                                    !isset($res['output_template_variations'][$tvc_index]['output_template']['Unmapped'])
                                ) {
                                    $res['output_template_variations'][$tvc_index]['output_template']['Unmapped'] = [];
                                }
                                array_push(
                                    $res['output_template_variations'][$tvc_index]['output_template']['Unmapped'],
                                    $arrGenerated
                                );
                                // ---------------------------------------------------------------------------
                            } else {
                                // ---------------------------------------------------------------------------
                                if (
                                    !isset($res['output_template_variations'][$tvc_index]['output_template'][$dateToday->format('m/d/Y')])
                                ) {
                                    $res['output_template_variations'][$tvc_index]['output_template'][$dateToday->format('m/d/Y')] = [];
                                }
                                array_push(
                                    $res['output_template_variations'][$tvc_index]['output_template'][$dateToday->format('m/d/Y')],
                                    $arrGenerated
                                );
                                // ---------------------------------------------------------------------------
                            }

                        }
                        // =========== /SETTING UP =======================================================

                    }
                }

                // reset this guys to 1
                $pageLineCount = 1;
                $pageNum = 1;
            }
            // ********************************** /TEMPLATES **********************************

            // $fileCount++;

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
            foreach ($request->generated_data[0]['output_template'] as $gendata) {
                foreach ($gendata[1] as $line) {
                    if ($line['customer_notfound'] == 0 && $line['item_notfound'] == 0) {
                        // dd($line);
                        DB::table(PrincipalsUtil::$TBL_INVOICES)
                            ->where('doc_no', $line['doc_no'])
                            ->where('item_code', $line['alturas_item_code'])
                            ->where('status', 'pending')
                            ->update([
                                'status' => 'completed',
                                'updated_at' => $dateToday
                            ]);
                    }
                }
            }

            $template_variation = 1;
            foreach ($request->generated_data as $variations) {
                foreach ($variations['output_template'] as $gendata) {
                    foreach ($gendata[1] as $line) {
                        if ($line['customer_notfound'] == 0 && $line['item_notfound'] == 0) {
                            $status = PrincipalsUtil::$STATUS_COMPLETED;
                            DB::table(PrincipalsUtil::$TBL_GENERATED)->insert([
                                // common ***********************************************
                                'principal_code' => $this->PRINCIPAL_CODE,
                                'template_variation' => $template_variation,
                                'generated_at' => $dateToday,
                                'uploaded_by' => auth()->user()->id,
                                // 'status' => $status,
                                'doc_no' => $line['doc_no'],
                                // principal specific ***********************************
                                'invoice_no' => $line['invoice_no'],
                                'customer_code' => $line['customer_code'],
                                'alturas_customer_code' => $line['alturas_customer_code'],
                                'customer_name' => $line['customer_name'],
                                'sm_name' => $line['sm_name'],
                                'invoice_date' => $line['invoice_date'],
                                'alturas_item_code' => $line['alturas_item_code'],
                                'item_code' => $line['item_code'],
                                'description' => $line['description'],
                                'description_supplier' => $line['description_supplier'],
                                // 'bulk_qty' => $line['bulk_qty'],
                                // 'loose_qty' => $line['loose_qty'],
                                'quantity' => $line['quantity'],
                                'price' => $line['price'],
                                'amount' => $line['amount'],
                                'base_uom' => $line['base_uom'],
                                'uom' => $line['uom'],
                                'sm_name' => $line['sm_name'],
                                'system_date' => $line['system_date'],
                            ]);
                        }
                    }
                }
                $template_variation++;
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
}
