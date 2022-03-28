<?php

namespace App\Http\Controllers\Principals;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PrincipalsUtil extends Controller
{
    private $tblInvoices = 'uploaded_invoices';
    private $tblGenerated = 'generated_data';
    private static $tblSettings = 'settings';

    public static $STATUS_COMPLETED = 'completed';
    public static $STATUS_PENDING = 'pending';

    public static $TBL_CUSTOMERS = 'customers';
    public static $TBL_PRODUCTS = 'products';
    public static $TBL_GENERATED = 'generated_data';
    public static $TBL_INVOICES = 'uploaded_invoices';

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
     * ====================================== STATICS ======================================
     */
    public static function getSettings($principalCode) {
        $settings = DB::table(self::$tblSettings)
            ->where('principal_code', $principalCode)
            ->get();
        $temp = [];
        foreach($settings as $setting) {
            $temp[$setting->name] = $setting->value;
        }
        return $temp;
    }

    public static function getPrincipalSettings($principalCode) {
        $res = DB::table('settings_principal')
                ->where('principal_code', $principalCode)
                ->first();
        return json_decode($res->config);
    }
    /**
     * ====================================== /STATICS ======================================
     */


    /**
     * ======================================  ======================================
     */
    public function settings() {
        try {
            $res = DB::table(self::$tblSettings)
                ->where('principal_code', request()->principal_code)
                ->get();
            return response()->json($res);
        } catch (\Throwable $th) {
            $res['success'] = false;
            $res['error'] = $th;
            return response()->json($res, 500);
        }
    }

    public function principalSettings() {
        try {
            $res = DB::table('settings_principal')
                ->where('principal_code', request()->principal_code)
                ->first();
            $settings = [
                request()->principal_code => json_decode($res->config)
            ];
            return response()->json($settings);
        } catch (\Throwable $th) {
            $res['success'] = false;
            $res['error'] = $th;
            return response()->json($res, 500);
        }
    }

    public function saveSettings(Request $request) {
        try {
            foreach($request->settings as $setting) {
                extract($setting);
                DB::table(self::$tblSettings)
                    ->where('principal_code', $request->principal_code)
                    ->where('id', $id)
                    ->update(['value' => $value]);
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



    /**
     * Get the uploaded/saved invoices
     */
    public function invoices() {
        set_time_limit(0);

        try {
            $dates = explode(',', request()->date);
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

            $res = DB::table($this->tblInvoices)
                ->where('principal_code', request()->principal_code)
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
            $res = DB::table($this->tblInvoices)
                ->where('principal_code', request()->principal_code)
                ->sum('u3');

            return response()->json($res);
        } catch (\Throwable $th) {
            $res['success'] = false;
            $res['message'] = $th->getMessage();
            return response()->json($res);
        }
    }


    /**
     * Get generated data list
     */
    public function getGeneratedData() {
        set_time_limit(0);

        $res = [
            'success' => true,
            'message' => 'Successful',
        ];

        $cols = request()->cols;

        try {
            // $dates = explode(',', request()->date);
            $dates = request()->date;
            sort($dates);
            $dateFrom = '';
            $dateTo = '';
            if(count($dates) > 1) {
                $dateFrom = $dates[0];
                $dateTo = $dates[1];
            } else if(count($dates) == 1) {
                $dateFrom = $dates[0];
                $dateTo = $dates[0];
            }

            // $gendata = DB::table(request()->table_generated)
            $gendata = DB::table($this->tblGenerated)
                ->where('principal_code', request()->principal_code)
                ->where('status', $this::$STATUS_COMPLETED)
                ->whereDate('generated_at','>=',$dateFrom)
                ->whereDate('generated_at','<=',$dateTo)
                ->get($cols);

            $res['generated_data'] = $gendata;

        } catch (\Throwable $th) {
            $res['success'] = false;
            $res['message'] = $th->getMessage();
        }

        return response()->json($res);
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

            $result = DB::table($this::$TBL_INVOICES)
                ->leftJoin(
                    $this::$TBL_CUSTOMERS, $this::$TBL_INVOICES. '.customer_code',
                    '=',
                    $this::$TBL_CUSTOMERS. '.customer_code'
                )
                ->leftJoin(
                    $this::$TBL_PRODUCTS, $this::$TBL_INVOICES. '.item_code',
                    '=',
                    $this::$TBL_PRODUCTS. '.item_code'
                )
                ->select(
                    $this::$TBL_INVOICES. '.*',
                    $this::$TBL_CUSTOMERS. '.principal_code',
                    $this::$TBL_CUSTOMERS. '.customer_code',
                    $this::$TBL_CUSTOMERS. '.customer_name',
                    $this::$TBL_PRODUCTS. '.principal_code',
                    $this::$TBL_PRODUCTS. '.item_code',
                    $this::$TBL_PRODUCTS. '.description'
                )
                ->where($this::$TBL_INVOICES. '.principal_code', request()->principal_code)
                ->where($this::$TBL_CUSTOMERS. '.principal_code', request()->principal_code)
                ->where($this::$TBL_PRODUCTS. '.principal_code', request()->principal_code)
                ->whereDate($this::$TBL_INVOICES. '.upload_date','>=', $dateFrom)
                ->whereDate($this::$TBL_INVOICES. '.upload_date','<=', $dateTo)
                ->orderBy($this::$TBL_INVOICES. '.upload_date', 'DESC')
                ->orderBy($this::$TBL_INVOICES. '.customer_code', 'ASC')
                ->orderBy($this::$TBL_INVOICES. '.doc_no', 'ASC')
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


    /**
     * Get pending generated data
     */
    public function getPendingGendataAndInvoices() {
        $response['success'] = true;
        $response['message'] = 'Success';
        $cols = request()->cols;
        $res = DB::table($this::$TBL_GENERATED)
            ->where('principal_code', request()->principal_code)
            ->where('status', $this::$STATUS_PENDING)
            ->get($cols);
        $response['pending_gendata'][] = [
            'PENDING',
            $res
        ];

        $res = DB::table($this::$TBL_INVOICES)
            ->where('principal_code', request()->principal_code)
            ->where('status', $this::$STATUS_PENDING)
            ->get();
        $response['pending_rawinvoices'] = $res;

        return response()->json($response);
    }


}
