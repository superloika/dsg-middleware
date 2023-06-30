<?php

namespace App\Http\Controllers\Principals;

use App\Http\Controllers\Controller;
use App\Http\Controllers\InvoicesController;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Storage;

class MeadJohnsonController extends Controller
{
    private $PRINCIPAL_CODE = 'magnolia_inc';

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
        // CCMS stuff HAHAHA (Don't mind this!)
        // password reset (test)
        // dd(Hash::make('12345'));


        set_time_limit(0);
        $row_count = request()->row_count ?? 10;
        $search_key = request()->search_key ?? '';

        $result = DB::table(PrincipalsUtil::$TBL_PRINCIPALS_ITEMS)
            // ->leftJoin(PrincipalsUtil::$TBL_GENERAL_ITEMS,
            //     PrincipalsUtil::$TBL_GENERAL_ITEMS. '.item_code',
            //     PrincipalsUtil::$TBL_PRINCIPALS_ITEMS. '.item_code'
            // )
            // ->leftJoin(PrincipalsUtil::$TBL_PRINCIPALS,
            //     PrincipalsUtil::$TBL_PRINCIPALS. '.vendor_code',
            //     PrincipalsUtil::$TBL_GENERAL_ITEMS. '.vendor_code'
            // )
            ->select([
                PrincipalsUtil::$TBL_PRINCIPALS_ITEMS. '.*',
                // PrincipalsUtil::$TBL_GENERAL_ITEMS. '.vendor_code',
                // PrincipalsUtil::$TBL_PRINCIPALS. '.name AS principal_name',
            ])

            ->where('principal_code', $this->PRINCIPAL_CODE)
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
                    ->where('principal_code', $this->PRINCIPAL_CODE)->delete();

                $arrLines = [];
                $fileContent = utf8_encode($fileContent);
                $fileContentLines = explode(PHP_EOL, mb_convert_encoding($fileContent, "UTF-8", "UTF-8"));

                foreach ($fileContentLines as $fileContentLine) {
                    // Begin on the second line to skip the headers
                    if ($lineCount > 1) {

                        // $arrFileContentLine = explode($delimiter, $fileContentLine);
                        $arrFileContentLine = preg_split('/,(?=(?:(?:[^"]*"){2})*[^"]*$)/', $fileContentLine);

                        if (count($arrFileContentLine) > 1) {
                            $item_code_supplier = trim(str_replace('"', '', $arrFileContentLine[0]));
                            $item_code = trim(str_replace('"', '', $arrFileContentLine[2]));
                            $description = trim(str_replace('"', '', $arrFileContentLine[1]));
                            $description_supplier = trim(str_replace('"', '', $arrFileContentLine[3]));

                            $arrLines[] = [
                                'principal_code' => $this->PRINCIPAL_CODE,
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
            ->where('principal_code', $this->PRINCIPAL_CODE)
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
                    ->where('principal_code', $this->PRINCIPAL_CODE)->delete();

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
                                    'principal_code' => $this->PRINCIPAL_CODE,
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
            ->where('principal_code', $this->PRINCIPAL_CODE)
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
                            $sm_name = trim(str_replace('"', '', $arrFileContentLine[0]));
                            $route_code = trim(str_replace('"', '', $arrFileContentLine[1]));
                            // =========================================================================

                            $arrLines[] = [
                                'principal_code' => $this->PRINCIPAL_CODE,
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

            // $template_variation_count = intval($request->template_variation_count);
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
            // ***************************************************************************

            // ************************* MISC INITS **************************************
            $filesTotalLineCount = 0;
            // $fileCount = 0;
            // $latest_order_no = intval($settings['custom_order_no']) ?? 100000000;

            $chunk_line_count = intval($settings['chunk_line_count'] ?? 0);
            $breakFilesIteration = false;
            // ************************* /MISC INITS *************************************

            // **************** PENDING INVOICES ************************************
            $pendingInvoices = InvoicesController::getPendingInvoices(
                $this->PRINCIPAL_CODE, $request->posting_date_range, $request->status
            );

            $res['line_count'] = $pendingInvoices->count();
            // **************** /PENDING INVOICES ***********************************

            // ********************************** TEMPLATES **************************
            $pageLineCount = 1;
            $pageNum = 1;

            for ($tvc_index = 0; $tvc_index < $template_variation_count; $tvc_index++) {
                array_push($res['output_template_variations'], [
                    'name' => 'Template ' . ($tvc_index + 1),
                    // 'name' => ($tvc_index + 1),
                    'output_template' => [],
                ]);

                // Loop through each line of the file content
                foreach ($pendingInvoices as $pendingInvoice) {
                    // ======================= INIT ===========================
                    $doc_no = $pendingInvoice->doc_no;
                    $doc_no_ints = filter_var($doc_no, FILTER_SANITIZE_NUMBER_INT);
                    $doc_no_ints = str_replace('0','', $doc_no_ints);
                    $doc_no_ints = str_replace('-','', $doc_no_ints);

                    $customer_code = $pendingInvoice->customer_code;
                    $item_code = $pendingInvoice->item_code;
                    $quantity = $pendingInvoice->quantity;
                    $price = $pendingInvoice->price;
                    $amount = $pendingInvoice->amount;
                    $uom = $pendingInvoice->uom;
                    $group_code = $pendingInvoice->group;
                    $sm_code = $pendingInvoice->sm_code;

                    // ****************************************************************
                    $customer = DB::table(PrincipalsUtil::$TBL_PRINCIPALS_CUSTOMERS)
                        ->where('principal_code', $this->PRINCIPAL_CODE)
                        ->where('customer_code', $customer_code)
                        ->first();
                    $item = DB::table(PrincipalsUtil::$TBL_PRINCIPALS_ITEMS)
                        ->where('principal_code', $this->PRINCIPAL_CODE)
                        ->where('item_code', $item_code)
                        ->first();
                    $salesman = DB::table(PrincipalsUtil::$TBL_PRINCIPALS_SALESMEN)
                        ->where('principal_code', $this->PRINCIPAL_CODE)
                        ->where('sm_name', $customer->salesman_name ?? 'NA')
                        ->first();
                    // ****************************************************************

                    // ************************* TEMPLATE 1 **************************
                    // tvc = template variation count
                    if ($tvc_index == 0) {
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

                        $order_date = $dateToday->format('Y/m/d');
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
                            'quantity' => intval($quantity),
                            // 'invoice_uploaded' => $invoice_uploaded,
                            'status' => $pendingInvoice->status
                        ];

                        if ($chunk_line_count > 0) {
                            if (
                                !isset($res['output_template_variations'][0]
                                    ['output_template']["Page " . $pageNum])
                            ) {
                                $res['output_template_variations'][0]
                                    ['output_template']["Page " . $pageNum] = [];
                            }
                            array_push(
                                $res['output_template_variations'][0]
                                    ['output_template']["Page " . $pageNum],
                                $arrGenerated
                            );

                            $pageLineCount += 1;
                            if ($pageLineCount > $chunk_line_count) {
                                $pageNum += 1;
                                $pageLineCount = 1;
                            }
                        } else {
                            if($item_notfound==1||$customer_notfound==1||$salesman_notfound==1) {
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
                                // if($sm_code==null||$sm_code=='') {
                                //     // ---------------------------------------------------------------------------
                                //     if (
                                //         !isset($res['output_template_variations'][$tvc_index]['output_template']['NO_SM_CODE'])
                                //     ) {
                                //         $res['output_template_variations'][$tvc_index]['output_template']['NO_SM_CODE'] = [];
                                //     }
                                //     array_push(
                                //         $res['output_template_variations'][$tvc_index]['output_template']['NO_SM_CODE'],
                                //         $arrGenerated
                                //     );
                                //     // ---------------------------------------------------------------------------
                                // } else {
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
                                // }
                            }

                        }
                    }
                }

                // reset this guys to 1
                $pageLineCount = 1;
                $pageNum = 1;
            }
            // ********************************** /TEMPLATES **************************

            return response()->json($res);
        } catch (\Throwable $th) {
            $res['success'] = false;
            $res['message'] = $th->getMessage();
            return response()->json($res, 500);
        }
    }

}
