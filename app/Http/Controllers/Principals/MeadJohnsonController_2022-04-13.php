<?php

namespace App\Http\Controllers\Principals;

use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Storage;

class MeadJohnsonController extends Controller
{
    private $PRINCIPAL_CODE = 'mead_johnson';
    // private static $tblCustomers = 'customers';
    // private static $tblProducts = 'products';
    // private static $tblGenerated = 'generated_data';
    // private static $tblInvoices = 'uploaded_invoices';


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
    // PRODUCTS =============================================================
    // =====================================================================
    // =====================================================================

    /**
     * Gets products list
     */
    function products()
    {
        // password reset (test)
        // dd(Hash::make('nenemiro'));

        set_time_limit(0);
        $cols = [
            'id',
            'principal_code',
            'upload_date',
            'item_code',
            'description',
            'item_code_supplier',
            'description_supplier'
        ];
        $result = DB::table(PrincipalsUtil::$TBL_PRODUCTS)
            ->where('principal_code', $this->PRINCIPAL_CODE)
            ->get($cols);

        return response()->json($result);
    }

    /**
     * Import products masterfile (.csv)
     */
    public function uploadMasterProducts(Request $request)
    {
        set_time_limit(0);

        try {
            // $fileName = $request->file->getClientOriginalName()
            //     . '-' . time() . '.' . $request->file->getClientOriginalExtension();
            // $request->file->storeAs('public/test_files', $fileName);

            $delimiter = ',';
            $fileName = time() . '.' . $request->file->getClientOriginalName();
            $fileStoragePath = "public/principals/" . $this->PRINCIPAL_CODE . "/products";
            Storage::putFileAs($fileStoragePath, $request->file, $fileName);

            $res['success'] = true;
            $res['message'] = 'File uploaded successfully';

            if (Storage::exists("$fileStoragePath/$fileName")) {
                $fileContent = Storage::get("$fileStoragePath/$fileName");

                // init lineCount to 1 for the header
                $lineCount = 1;

                DB::table(PrincipalsUtil::$TBL_PRODUCTS)
                    ->where('principal_code', $this->PRINCIPAL_CODE)->delete();

                $arrLines = [];

                $fileContentLines = explode(PHP_EOL, mb_convert_encoding($fileContent, "UTF-8", "UTF-8"));
                foreach ($fileContentLines as $fileContentLine) {
                    // Begin on the second line to skip the headers
                    if ($lineCount > 1) {

                        // $arrFileContentLine = explode($delimiter, $fileContentLine);
                        $arrFileContentLine = preg_split('/,(?=(?:(?:[^"]*"){2})*[^"]*$)/', $fileContentLine);

                        if (count($arrFileContentLine) > 1) {
                            $item_code = trim(str_replace('"','',$arrFileContentLine[0]));
                            $description = trim(str_replace('"', '', $arrFileContentLine[1]));
                            $item_code_supplier = trim(str_replace('"','',$arrFileContentLine[2]));
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
                    DB::table(PrincipalsUtil::$TBL_PRODUCTS)->insert($chunk);
                }
            }

            return response()->json($res);
        } catch (\Throwable $th) {
            $res['success'] = false;
            $res['message'] = $th->getMessage();
            return response()->json($res);
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

        $result = DB::table(PrincipalsUtil::$TBL_CUSTOMERS)
            ->leftJoin(
                'master_customers',
                PrincipalsUtil::$TBL_CUSTOMERS. '.customer_code',
                '=',
                'master_customers.customer_code'
            )
            ->select(PrincipalsUtil::$TBL_CUSTOMERS.'.*',
                'master_customers.name AS customer_name',
                'master_customers.address',
                'master_customers.address_2',
                'master_customers.city',
            )
            ->where(PrincipalsUtil::$TBL_CUSTOMERS. '.principal_code', $this->PRINCIPAL_CODE)
            ->get();

        // $result = DB::table(PrincipalsUtil::$TBL_CUSTOMERS)
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

            $res['success'] = true;
            $res['message'] = 'File uploaded successfully';

            if (Storage::exists("$fileStoragePath/$fileName")) {
                $fileContent = Storage::get("$fileStoragePath/$fileName");

                // init lineCount to 1 for the header
                $lineCount = 1;

                DB::table(PrincipalsUtil::$TBL_CUSTOMERS)
                    ->where('principal_code', $this->PRINCIPAL_CODE)->delete();

                $fileContentLines = explode(PHP_EOL, mb_convert_encoding($fileContent, "UTF-8", "UTF-8"));
                $arrLines = [];

                foreach ($fileContentLines as $fileContentLine) {
                    // Begin at the second line (exclude the header)
                    if ($lineCount > 1) {
                        $arrFileContentLine = preg_split('/,(?=(?:(?:[^"]*"){2})*[^"]*$)/', $fileContentLine);

                        if (count($arrFileContentLine) > 1) {
                            // $distributor_code = $arrFileContentLine[0];
                            // $customer_code = $arrFileContentLine[1];
                            // $customer_name = str_replace('"', '', $arrFileContentLine[2]);
                            // $outlet_type = $arrFileContentLine[3];
                            // $salesman_name = str_replace('"', '', $arrFileContentLine[4]);
                            // $route_code = $arrFileContentLine[5];
                            // $operation_type = $arrFileContentLine[6];
                            // $status = $arrFileContentLine[7];
                            // $address_1 = str_replace('"', '', $arrFileContentLine[8]);
                            // $address_4 = str_replace('"', '', $arrFileContentLine[9]);
                            // $address_5 = str_replace('"', '', $arrFileContentLine[10]);
                            // $postal_code = str_replace('"', '', $arrFileContentLine[11]);

                            // $customer_code = trim($arrFileContentLine[0]);
                            // $customer_code_supplier = trim(str_replace('"', '', $arrFileContentLine[1]));
                            // $customer_name = trim(str_replace('"', '', $arrFileContentLine[2]));
                            // $salesman_name = trim(str_replace('"', '', $arrFileContentLine[3]));
                            // $route_code = trim($arrFileContentLine[4]);

                            $customer_code = trim($arrFileContentLine[0]);
                            $customer_code_supplier = trim(str_replace('"', '', $arrFileContentLine[1]));
                            $salesman_name = trim(str_replace('"', '', $arrFileContentLine[2]));
                            // =========================================================================
                            // DB::table(PrincipalsUtil::$TBL_CUSTOMERS)->insert([
                            //     'principal_code' => $this->PRINCIPAL_CODE,
                            //     'distributor_code' => $distributor_code,
                            //     'customer_code' => $customer_code,
                            //     'customer_name' => $customer_name,
                            //     'outlet_type' => $outlet_type,
                            //     'salesman_name' => $salesman_name,
                            //     'route_code' => $route_code,
                            //     'operation_type' => $operation_type,
                            //     'status' => $status,
                            //     'address_1' => $address_1,
                            //     'address_4' => $address_4,
                            //     'address_5' => $address_5,
                            //     'postal_code' => $postal_code,
                            //     'uploaded_by' => auth()->user()->id
                            // ]);
                            // =========================================================================
                            $isExisting = array_search(
                                $customer_code, array_column($arrLines, 'customer_code')
                            );
                            // $isExisting = false;
                            if($isExisting==false) {
                                $arrLines[] = [
                                    'principal_code' => $this->PRINCIPAL_CODE,
                                    'customer_code' => $customer_code,
                                    'customer_code_supplier' => $customer_code_supplier,
                                    // 'customer_name' => $customer_name,
                                    'salesman_name' => $salesman_name,
                                    // 'route_code' => $route_code,
                                    'uploaded_by' => auth()->user()->id
                                ];
                            }
                        }
                    }
                    $lineCount++;
                }

                $chunks = array_chunk($arrLines, 500);
                foreach ($chunks as $chunk) {
                    DB::table(PrincipalsUtil::$TBL_CUSTOMERS)->insert($chunk);
                }
            }

            return response()->json($res);
        } catch (\Throwable $th) {
            $res['success'] = false;
            $res['message'] = $th->getMessage();
            return response()->json($res);
        }
    }


    // =====================================================================
    // =====================================================================
    // INVOICES ===========================================================
    // =====================================================================
    // =====================================================================

    /**
     * Import invoices(textfile/s) and generate templated data
     * NOTE:
     * - The generated data is NOT YET SAVED unless the user exports it
     * - The saved generated data can be viewed on the Generated Data History
     */
    public function importInvoices(Request $request)
    {
        set_time_limit(0);
        // dd(PrincipalsUtil::getPrincipalSettings('mead_johnson')->route_code_mapping[1]->salesman_name);

        try {
            $delimiter = '|';

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
                ->latest('id')->first()->order_no ?? $settings['custom_order_no'];
            $chunk_line_count = intval($settings['chunk_line_count']);

            $unuploadedLineCount = 0;
            $breakFilesIteration = false;
            $pageLineCount = 1;
            $pageNum = 1;

            // Get principal settings (test)
            $principal_settings = PrincipalsUtil::getPrincipalSettings($this->PRINCIPAL_CODE);

            $route_codes = [];
            foreach($principal_settings->route_code_mapping as $rcm) {
                $route_codes[$rcm->salesman_name] = $rcm->route_code;
            }

            // dd($route_codes);

            if($request->file('files') != null) {
                // Loop through each uploaded file
                foreach ($request->file('files') as $file) {
                    $fileNameOrig = $file->getClientOriginalName();
                    $fileNameNoExt = str_replace('.txt','',$file->getClientOriginalName());

                    $fileName = time() . '.' . $file->getClientOriginalName();
                    $fileStoragePath = "public/principals/" . $this->PRINCIPAL_CODE .
                        "\/invoices\/" . $dateToday->format('Y-m-d');
                    Storage::putFileAs($fileStoragePath, $file, $fileName);

                    if (Storage::exists("$fileStoragePath/$fileName")) {
                        $fileContent = Storage::get("$fileStoragePath/$fileName");

                        $fileContentLines = explode(PHP_EOL, mb_convert_encoding($fileContent, "UTF-8", "UTF-8"));

                        $lineCount = 0;

                        // Loop through each line of the file content
                        foreach ($fileContentLines as $fileContentLine) {
                            if ($lineCount >= 0) {
                                $arrFileContentLine = explode($delimiter, $fileContentLine);

                                if (count($arrFileContentLine) == 12) {
                                    // ======================= INIT ===========================
                                    $doc_type = trim($arrFileContentLine[0]);
                                    $doc_no = trim($arrFileContentLine[1]);
                                    $customer_code = trim($arrFileContentLine[2]);
                                    $posting_date = trim($arrFileContentLine[3]);
                                    $item_code = trim($arrFileContentLine[4]);
                                    $quantity = trim($arrFileContentLine[5]);
                                    $u1 = trim($arrFileContentLine[6]);
                                    $u2 = trim($arrFileContentLine[7]);
                                    $u3 = trim($arrFileContentLine[8]);
                                    $u4 = trim($arrFileContentLine[9]);
                                    $u5 = trim($arrFileContentLine[10]);
                                    $uom = trim($arrFileContentLine[11]);

                                    $customer = DB::table(PrincipalsUtil::$TBL_CUSTOMERS)
                                        ->where('principal_code', $this->PRINCIPAL_CODE)
                                        ->where('customer_code', $customer_code)
                                        ->first();
                                    $product = DB::table(PrincipalsUtil::$TBL_PRODUCTS)
                                        ->where('principal_code', $this->PRINCIPAL_CODE)
                                        ->where('item_code', $item_code)
                                        ->first();

                                    $invoice_uploaded = 0;
                                    $product_notfound = 0;
                                    $customer_notfound = 0;
                                    $salesman_name = '';
                                    // name of customer who's missing in principal's masterfile
                                    $missing_customer_name = '';
                                    $missing_product_name = '';

                                    // last resort
                                    if ($product == null) {
                                        $product_notfound = 1;
                                        $missing_product_name = DB::table('master_products')
                                            ->where('item_code', $item_code)
                                            ->first()->description ?? '[ Not Found ]';
                                    } else {

                                    }

                                    if ($customer == null) {
                                        $customer_notfound = 1;
                                        $missing_customer_name = DB::table('master_customers')
                                            ->where('customer_code', $customer_code)
                                            ->first()->name ?? '[ Not Found ]';
                                    } else {
                                        $salesman_name = $customer->salesman_name;
                                    }

                                    $order_date = $dateToday->format('Y/m/d');
                                    $order_no = 'N/A';
                                    if($product_notfound == 1 || $customer_notfound == 1) {
                                        // $order_date = 'TBD';
                                    } else if($product_notfound == 0 || $customer_notfound == 0) {
                                        $order_no = $latest_order_no += 1;
                                    }

                                    // $route_code = $customer->route_code ?? 'Customer_NA';
                                    // $route_code = Arr::first($principal_settings->route_code_mapping,
                                    //     function($value, $key) use (&$salesman_name){
                                    //         return $value->salesman_name==$salesman_name;
                                    //     }
                                    // )->route_code ?? 'Customer_NA';
                                    $route_code = $route_codes[$salesman_name] ?? 'N/A';

                                    $product_category_code = $settings['product_category_code'];
                                    $ship_to = $settings['ship_to'];

                                    $remarks = '';
                                    $product_code = $product->item_code_supplier ?? $item_code;
                                    // ======================= /INIT ===========================

                                    // Check if the invoice is already uploaded
                                    // if invoices are not yet saved/uploaded
                                    if (
                                        DB::table(PrincipalsUtil::$TBL_INVOICES)
                                            ->where('principal_code', $this->PRINCIPAL_CODE)
                                            // ->where('doc_type', $doc_type)
                                            ->where('doc_no', $doc_no)
                                            // ->where('customer_code', $customer_code)
                                            // ->where('posting_date', $posting_date)
                                            ->where('item_code', $item_code)
                                            ->where('quantity', $quantity)
                                            // ->where('u1', $u1)
                                            // ->where('u2', $u2)
                                            // ->where('u3', $u3) // total amount
                                            // ->where('u4', $u4)
                                            // ->where('u5',$u5)
                                            ->where('uom', $uom)
                                            ->exists() == false
                                    ) {
                                        // if($line_limit > 0) {
                                        //     if($unuploadedLineCount >= $line_limit) {
                                        //         $breakFilesIteration = true;
                                        //         break;
                                        //     }
                                        // }

                                        // =========== SETTING UP ======================================
                                        $invoice_line = [
                                            'principal_code' => $this->PRINCIPAL_CODE,
                                            'upload_date' => $dateToday->format('Y-m-d'),
                                            'product_notfound' => $product_notfound,
                                            'customer_notfound' => $customer_notfound,
                                            'filename' => $fileNameNoExt,
                                            // ===
                                            'doc_type' => $doc_type,
                                            'doc_no' => $doc_no,
                                            'customer_code' => $customer_code,
                                            'posting_date' => $posting_date,
                                            'item_code' => $item_code,
                                            'quantity' => $quantity,
                                            'u1' => $u1,
                                            'u2' => $u2,
                                            'u3' => $u3, // total amount
                                            'u4' => $u4,
                                            'u5' => $u5,
                                            'uom' => $uom,
                                        ];
                                        array_push($res['raw_invoices'], $invoice_line);

                                        // Generated data line structure
                                        $arrGenerated = [
                                            'order_date' => $order_date,
                                            'customer_code' => $customer_code,
                                            'route_code' => $route_code,
                                            'product_category_code' => $product_category_code,
                                            'ship_to' => $ship_to,
                                            'order_no' => $order_no,
                                            'remarks' => $remarks,
                                            // 'product_code' => intval($product_code),
                                            'product_code' => $product_code,
                                            'quantity' => intval($quantity),
                                            'product_notfound' => $product_notfound,
                                            'customer_notfound' => $customer_notfound,
                                            'invoice_uploaded' => $invoice_uploaded,
                                            'doc_no' => $doc_no,
                                            'missing_customer_name' => $missing_customer_name,
                                            'missing_product_name' => $missing_product_name,
                                        ];

                                        if($chunk_line_count > 0) {
                                            if (!isset($res['output_template']["Page ". $pageNum])) {
                                                $res['output_template']["Page ". $pageNum] = [];
                                            }
                                            array_push($res['output_template']["Page ". $pageNum], $arrGenerated);
                                            $pageLineCount+=1;
                                            if($pageLineCount > $chunk_line_count) {
                                                $pageNum+=1;
                                                $pageLineCount = 1;
                                            }
                                        } else {
                                            // group output_template by order_date
                                            // if (!isset($res['output_template'][$order_date])) {
                                            //     $res['output_template'][$order_date] = [];
                                            // }
                                            // array_push($res['output_template'][$order_date], $arrGenerated);

                                            // group output_template by filename
                                            if (!isset($res['output_template'][$fileNameNoExt])) {
                                                $res['output_template'][$fileNameNoExt] = [];
                                            }
                                            array_push($res['output_template'][$fileNameNoExt], $arrGenerated);
                                        }
                                        // =========== /SETTING UP ======================================

                                        // increment line count of unuploaded invoices
                                        $unuploadedLineCount++;
                                    } else {
                                        // Do something here if the invoice is already uploaded

                                    } // /if invoices are not yet saved/uploaded

                                    // increment file line count
                                    $lineCount++;
                                }
                            }
                        }
                        $fileCount++;
                        $filesTotalLineCount += $lineCount;

                        // if(count($res['raw_invoices']) == 0 && $lineCount > 0) {
                        //     Storage::delete("$fileStoragePath/$fileName");
                        // } else if($lineCount == 0) {
                        //     Storage::delete("$fileStoragePath/$fileName");
                        // }
                    }

                    // if($breakFilesIteration) break;

                } // /Loop through each uploaded file
            }

            $res['line_count'] = $filesTotalLineCount;

            $rawInvoicesCount = count($res['raw_invoices']);
            if($rawInvoicesCount == 0 && $filesTotalLineCount > 0) {
                $res['message'] = 'File contents already uploaded';
            } else if($rawInvoicesCount != $filesTotalLineCount) {
                // $res['message'] = 'Only the unuploaded file contents are shown';
            } else if($filesTotalLineCount == 0) {
                $res['message'] = 'Data unreadable';
            }

            return response()->json($res);

        } catch (\Throwable $th) {
            $res['success'] = false;
            $res['message'] = $th->getMessage();
            return response()->json($res);
        }
    }


    /**
     * Save invoices together with the generated data
     * NOTE: This happens when the user exports the generated data
     */
    public function saveInvoices(Request $request)
    {
        set_time_limit(0);

        $response = [
            'success' => true,
            'message' => 'Successful',
        ];

        $dateToday = Carbon::now();

        try {
            // invoices
            foreach ($request->raw_invoices as $line) {
                // ===========================================================================
                // $status = '';
                // if($line['customer_notfound']==0 && $line['product_notfound']==0){
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
                if($line['customer_notfound']==0 && $line['product_notfound']==0){
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
                    // if($line['customer_notfound']==0 && $line['product_notfound']==0){
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
                    //     'product_category_code' => $line['product_category_code'],
                    //     'ship_to' => $line['ship_to'],
                    //     'order_no' => $line['order_no'],
                    //     'remarks' => $line['remarks'],
                    //     'product_code' => $line['product_code'],
                    //     'quantity' => $line['quantity'],
                    //     'generated_at' => $dateToday->format('Y-m-d H:i:s'),
                    // ]);
                    // ======================================================================
                    if($line['customer_notfound']==0 && $line['product_notfound']==0){
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
                            'product_code' => $line['product_code'],
                            'quantity' => $line['quantity'],
                            'generated_at' => $dateToday->format('Y-m-d H:i:s'),
                        ]);
                    }
                }
            }
        } catch (\Throwable $th) {
            $response['success'] = false;
            $response['message'] = $th->getMessage();
        }

        return response()->json($response);
    }


}
