<?php

namespace App\Http\Controllers\Principals;

use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Storage;

class MeadJohnsonController extends Controller
{
    private static $principalCode = 'mead_johnson';
    private static $tblCustomers = 'customers';
    private static $tblProducts = 'products';
    private static $tblGenerated = 'generated_mead_johnson';
    private static $tblInvoices = 'uploaded_invoices';
    private static $tblSettings = 'settings';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');

        /**
         * Create tblGenerated if it doesn't exist in the database
         */
        if(!Schema::hasTable(self::$tblGenerated)) {
            $createTableStr =
                "CREATE TABLE IF NOT EXISTS `". self::$tblGenerated. "` (
                    `id` bigint(20) NOT NULL AUTO_INCREMENT,
                    `generated_at` datetime NOT NULL,
                    `uploaded_by` bigint(20) NOT NULL,
                    `invoice_no` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
                    `order_date` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
                    `customer_code` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
                    `route_code` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
                    `product_category_code` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
                    `ship_to` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
                    `order_no` bigint(20) NOT NULL,
                    `remarks` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
                    `product_code` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
                    `quantity` int(11) NOT NULL,
                    PRIMARY KEY (`id`)
                ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci";
            $createIndexStr = "CREATE INDEX generated_at ON ". self::$tblGenerated . " (generated_at)";

            DB::statement($createTableStr);
            DB::statement($createIndexStr);
        }
    }

    public function getSettings() {
        $settings = DB::table(self::$tblSettings)
            ->where('principal_code', self::$principalCode)
            ->get();
        $temp = [];
        foreach($settings as $setting) {
            $temp[$setting->name] = $setting->value;
        }
        return $temp;
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
        $result = DB::table($this::$tblProducts)
            ->where('principal_code', $this::$principalCode)
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
            $fileStoragePath = "public/principals/" . $this::$principalCode . "/products";
            Storage::putFileAs($fileStoragePath, $request->file, $fileName);

            $res['success'] = true;
            $res['message'] = 'File uploaded successfully';

            if (Storage::exists("$fileStoragePath/$fileName")) {
                $fileContent = Storage::get("$fileStoragePath/$fileName");

                // init lineCount to 1 for the header
                $lineCount = 1;

                DB::table($this::$tblProducts)
                    ->where('principal_code', $this::$principalCode)->delete();

                $fileContentLines = explode(PHP_EOL, mb_convert_encoding($fileContent, "UTF-8", "UTF-8"));
                foreach ($fileContentLines as $fileContentLine) {
                    // Begin on the second line to skip the headers
                    if ($lineCount > 1) {

                        // $arrFileContentLine = explode($delimiter, $fileContentLine);
                        $arrFileContentLine = preg_split('/,(?=(?:(?:[^"]*"){2})*[^"]*$)/', $fileContentLine);

                        if (count($arrFileContentLine) > 1) {
                            $item_code = $arrFileContentLine[0];
                            $description = str_replace('"', '', $arrFileContentLine[1]);
                            $item_code_supplier = $arrFileContentLine[2];
                            $description_supplier = str_replace('"', '', $arrFileContentLine[3]);

                            DB::table($this::$tblProducts)->insert([
                                'principal_code' => $this::$principalCode,
                                'item_code' => $item_code,
                                'description' => $description,
                                'item_code_supplier' => $item_code_supplier,
                                'description_supplier' => $description_supplier,
                                'uploaded_by' => auth()->user()->id
                            ]);
                        }
                    }

                    $lineCount++;
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

        $cols = [
            'id',
            'principal_code',
            'upload_date',
            'distributor_code',
            'customer_code',
            'customer_name',
            'outlet_type',
            'salesman_name',
            'route_code',
            'operation_type',
            'status',
            'address_1',
            'address_4',
            'address_5',
            'postal_code',
        ];
        $result = DB::table($this::$tblCustomers)
            ->where('principal_code', $this::$principalCode)
            ->get($cols);
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
            $fileStoragePath = "public/principals/" . $this::$principalCode . "/customers";
            Storage::putFileAs($fileStoragePath, $request->file, $fileName);

            $res['success'] = true;
            $res['message'] = 'File uploaded successfully';

            if (Storage::exists("$fileStoragePath/$fileName")) {
                $fileContent = Storage::get("$fileStoragePath/$fileName");

                // init lineCount to 1 for the header
                $lineCount = 1;

                DB::table($this::$tblCustomers)
                    ->where('principal_code', $this::$principalCode)->delete();

                $fileContentLines = explode(PHP_EOL, mb_convert_encoding($fileContent, "UTF-8", "UTF-8"));
                foreach ($fileContentLines as $fileContentLine) {
                    // Begin at the second line (exclude the header)
                    if ($lineCount > 1) {
                        $arrFileContentLine = preg_split('/,(?=(?:(?:[^"]*"){2})*[^"]*$)/', $fileContentLine);

                        if (count($arrFileContentLine) > 1) {
                            $distributor_code = $arrFileContentLine[0];
                            $customer_code = $arrFileContentLine[1];
                            $customer_name = str_replace('"', '', $arrFileContentLine[2]);
                            $outlet_type = $arrFileContentLine[3];
                            $salesman_name = str_replace('"', '', $arrFileContentLine[4]);
                            $route_code = $arrFileContentLine[5];
                            $operation_type = $arrFileContentLine[6];
                            $status = $arrFileContentLine[7];
                            $address_1 = str_replace('"', '', $arrFileContentLine[8]);
                            $address_4 = str_replace('"', '', $arrFileContentLine[9]);
                            $address_5 = str_replace('"', '', $arrFileContentLine[10]);
                            $postal_code = str_replace('"', '', $arrFileContentLine[11]);

                            // ===============================================================================
                            DB::table($this::$tblCustomers)->insert([
                                'principal_code' => $this::$principalCode,
                                'distributor_code' => $distributor_code,
                                'customer_code' => $customer_code,
                                'customer_name' => $customer_name,
                                'outlet_type' => $outlet_type,
                                'salesman_name' => $salesman_name,
                                'route_code' => $route_code,
                                'operation_type' => $operation_type,
                                'status' => $status,
                                'address_1' => $address_1,
                                'address_4' => $address_4,
                                'address_5' => $address_5,
                                'postal_code' => $postal_code,
                                'uploaded_by' => auth()->user()->id
                            ]);
                            // ===============================================================================
                        }
                    }

                    $lineCount++;
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
            $settings = $this->getSettings();
            $latest_order_no = DB::table($this::$tblGenerated)
                ->latest('id')->first()->order_no ?? $settings['custom_order_no'];
            $chunk_line_count = intval($settings['chunk_line_count']);

            $unuploadedLineCount = 0;
            $breakFilesIteration = false;
            $pageLineCount = 1;
            $pageNum = 1;

            // Loop through each uploaded file
            foreach ($request->file('files') as $file) {
                $fileName = time() . '.' . $file->getClientOriginalName();
                $fileStoragePath = "public/principals/" . $this::$principalCode .
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

                                $customer = DB::table($this::$tblCustomers)
                                    ->where('principal_code', $this::$principalCode)
                                    ->where('customer_code', $customer_code)
                                    ->first();
                                $product = DB::table($this::$tblProducts)
                                    ->where('principal_code', $this::$principalCode)
                                    ->where('item_code', $item_code)
                                    ->first();

                                $invoice_uploaded = 0;
                                $product_notfound = 0;
                                $customer_notfound = 0;

                                if ($product == null) $product_notfound = 1;
                                if ($customer == null) $customer_notfound = 1;

                                $order_date = $dateToday->format('Y/m/d');
                                $route_code = $customer->route_code ?? 'Customer_NA';
                                $product_category_code = $settings['product_category_code'];
                                $ship_to = $settings['ship_to'];
                                $order_no = $latest_order_no += 1;
                                $remarks = '';
                                $product_code = $product->mj_code ?? $item_code;

                                // Check if the invoice is already uploaded
                                $isInvoiceUploaded = DB::table($this::$tblInvoices)
                                    ->where('principal_code', $this::$principalCode)
                                    ->where('doc_type', $doc_type)
                                    ->where('doc_no', $doc_no)
                                    ->where('customer_code', $customer_code)
                                    ->where('posting_date', $posting_date)
                                    ->where('item_code', $item_code)
                                    ->where('quantity', $quantity)
                                    ->where('u1', $u1)
                                    ->where('u2', $u2)
                                    ->where('u3', $u3) // total amount
                                    ->where('u4', $u4)
                                    // ->where('u5',$u5)
                                    ->where('uom', $uom)
                                    ->exists();

                                // if invoices are not yet saved/uploaded
                                if ($isInvoiceUploaded == false) {
                                    // if($line_limit > 0) {
                                    //     if($unuploadedLineCount >= $line_limit) {
                                    //         $breakFilesIteration = true;
                                    //         break;
                                    //     }
                                    // }

                                    $invoice_line = [
                                        'principal_code' => $this::$principalCode,
                                        'upload_date' => $dateToday->format('Y-m-d'),
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
                                        'invoice_no' => $doc_no,
                                    ];
                                    if($chunk_line_count > 0) {
                                        if (!isset($res['output_template'][$pageNum])) {
                                            $res['output_template'][$pageNum] = [];
                                        }
                                        array_push($res['output_template'][$pageNum], $arrGenerated);
                                        $pageLineCount+=1;
                                        if($pageLineCount > $chunk_line_count) {
                                            $pageNum+=1;
                                            $pageLineCount = 1;
                                        }
                                    } else {
                                        // group output_template by order_date
                                        if (!isset($res['output_template'][$order_date])) {
                                            $res['output_template'][$order_date] = [];
                                        }
                                        array_push($res['output_template'][$order_date], $arrGenerated);
                                    }

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

            $res['line_count'] = $filesTotalLineCount;

            $rawInvoicesCount = count($res['raw_invoices']);
            if($rawInvoicesCount == 0 && $filesTotalLineCount > 0) {
                $res['message'] = 'File contents already uploaded';
            } else if($rawInvoicesCount != $filesTotalLineCount) {
                $res['message'] = 'NOTE: Some of the file contents are already uploaded';
            } else if($filesTotalLineCount == 0) {
                $res['message'] = 'Unable to read the data';
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
                DB::table($this::$tblInvoices)->insert([
                    'principal_code' => $this::$principalCode,
                    'upload_date' => $dateToday->format('Y-m-d H:i:s'),
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
                    'uom' => $line['uom'],
                    'uploaded_by' => auth()->user()->id
                ]);
            }

            // generated data
            foreach ($request->generated_data as $gendata) {
                foreach ($gendata[1] as $line) {
                    DB::table($this::$tblGenerated)->insert([
                        'invoice_no' => $line['invoice_no'],
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
                        'uploaded_by' => auth()->user()->id
                    ]);
                }
            }
        } catch (\Throwable $th) {
            $response['success'] = false;
            $response['message'] = $th->getMessage();
        }

        return response()->json($response);
    }

    /**
     * Get the uploaded/saved invoices
     */
    public function invoices(Request $request) {
        set_time_limit(0);

        try {
            $dates = explode(',', $request->input('date'));
            // sort($dates);
            $dateFrom = '';
            $dateTo = '';
            if(count($dates) > 1) {
                $dateFrom = $dates[0];
                $dateTo = $dates[1];
            } else if(count($dates) == 1) {
                $dateFrom = $dates[0];
                $dateTo = $dates[0];
            }

            $res = DB::table($this::$tblInvoices)
                ->where('principal_code', $this::$principalCode)
                ->whereDate('upload_date','>=', $dateFrom)
                ->whereDate('upload_date','<=', $dateTo)
                ->latest('id')->get();

            return response()->json($res);
        } catch (\Throwable $th) {
            $res['success'] = false;
            $res['message'] = $th->getMessage();
            return response()->json($res);
        }
    }

    /**
     * Get the overall total amount of the uploaded invoices
     */
    public function invoicesGrandTotal() {
        try {
            $res = DB::table($this::$tblInvoices)
                ->where('principal_code', $this::$principalCode)
                ->sum('u3');

            return response()->json($res);
        } catch (\Throwable $th) {
            $res['success'] = false;
            $res['message'] = $th->getMessage();
            return response()->json($res);
        }
    }


    // =====================================================================
    // =====================================================================
    // ============  GENERATED DATA ========================================
    // =====================================================================
    // =====================================================================

    /**
     * Get generated data list
     */
    public function getGeneratedData(Request $request) {
        set_time_limit(0);

        $res = [
            'success' => true,
            'message' => 'Successful',
        ];

        try {
            $dates = explode(',', $request->input('date'));
            // sort($dates);
            $dateFrom = '';
            $dateTo = '';
            if(count($dates) > 1) {
                $dateFrom = $dates[0];
                $dateTo = $dates[1];
            } else if(count($dates) == 1) {
                $dateFrom = $dates[0];
                $dateTo = $dates[0];
            }

            $gendata = DB::table($this::$tblGenerated)
                ->whereDate('generated_at','>=',$dateFrom)
                ->whereDate('generated_at','<=',$dateTo)
                ->get();

            $res['generated_data'] = $gendata;

        } catch (\Throwable $th) {
            $res['success'] = false;
            $res['message'] = $th->getMessage();
        }

        return response()->json($res);
    }


    // =====================================================================
    // =====================================================================
    // ============  SETTINGS ==============================================
    // =====================================================================
    // =====================================================================

    public function settings() {
        try {
            $res = DB::table($this::$tblSettings)
                ->where('principal_code', $this::$principalCode)
                ->get();
            return response()->json($res);
        } catch (\Throwable $th) {
            $res['error'] = $th;
            return response()->json($res, 500);
        }
    }

    public function saveSettings(Request $request) {
        try {
            $payload = json_decode($request->getContent());
            foreach($payload as $setting) {
                // dd($setting->value);
                DB::table($this::$tblSettings)
                    ->where('principal_code', $this::$principalCode)
                    ->where('id', $setting->id)
                    ->update(['value' => $setting->value]);
            }
            $response['success'] = true;
            $response['message'] = 'Settings updated';
            return response()->json($response);
        } catch (\Throwable $th) {
            //throw $th;
            $response['success'] = false;
            $response['message'] = $th->getMessage();
            return response()->json($response);
        }
    }


    // =====================================================================
    // =====================================================================
    // ============  TRANSACTION REPORTS ===================================
    // =====================================================================
    // =====================================================================

    /**
     * Retrieve the list of transactions
     */
    public function transactions(Request $request) {
        set_time_limit(0);

        try {
            $dates = explode(',', $request->input('date'));
            // sort($dates);
            $dateFrom = '';
            $dateTo = '';
            if(count($dates) > 1) {
                $dateFrom = $dates[0];
                $dateTo = $dates[1];
            } else if(count($dates) == 1) {
                $dateFrom = $dates[0];
                $dateTo = $dates[0];
            }

            $result = DB::table($this::$tblInvoices)
                ->leftJoin(
                    $this::$tblCustomers, $this::$tblInvoices. '.customer_code',
                    '=',
                    $this::$tblCustomers. '.customer_code'
                )
                ->leftJoin(
                    $this::$tblProducts, $this::$tblInvoices. '.item_code',
                    '=',
                    $this::$tblProducts. '.item_code'
                )
                ->select(
                    $this::$tblInvoices. '.*',
                    $this::$tblCustomers. '.principal_code',
                    $this::$tblCustomers. '.customer_code',
                    $this::$tblCustomers. '.customer_name',
                    $this::$tblProducts. '.principal_code',
                    $this::$tblProducts. '.item_code',
                    $this::$tblProducts. '.description'
                )
                ->where($this::$tblInvoices. '.principal_code', $this::$principalCode)
                ->where($this::$tblCustomers. '.principal_code', $this::$principalCode)
                ->where($this::$tblProducts. '.principal_code', $this::$principalCode)
                ->whereDate($this::$tblInvoices. '.upload_date','>=', $dateFrom)
                ->whereDate($this::$tblInvoices. '.upload_date','<=', $dateTo)
                ->orderBy($this::$tblInvoices. '.upload_date', 'DESC')
                ->orderBy($this::$tblInvoices. '.customer_code', 'ASC')
                ->orderBy($this::$tblInvoices. '.doc_no', 'ASC')
                ->get();

            $res['success'] = true;
            $res['nessage'] = 'Success';
            $res['data'] = $result;

            return response()->json($res);
        } catch (\Throwable $th) {
            $res['success'] = false;
            $res['nessage'] = $th->getMessage();
            $res['data'] = [];
            return response()->json($res);
        }
    }
}
