<?php

namespace App\Http\Controllers\Principals;

use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PrincipalsUtil extends Controller
{
    public static $TBL_SETTINGS = 'settings';

    public static $STATUS_COMPLETED = 'completed';
    public static $STATUS_PENDING = 'pending';
    public static $STATUS_UPLOADED = 'uploaded';

    public static $TBL_GENERATED = 'generated_data';
    // public static $TBL_INVOICES = 'uploaded_invoices';

    /**
     * Invoices db table name (headers)
     */
    public static $TBL_INVOICES_H = 'invoices_headers';
    /**
     * Invoices db table name (lines)
     */
    // public static $TBL_INVOICES = 'invoices_lines';
    // public static $TBL_INVOICES = 'invoices_lines_trial';
    public static $TBL_INVOICES = 'invoices_lines_ptn'; // test table with partitioning

    // credit memos
    /**
     * Return invoices db table name (lines)
     */
    // public static $TBL_CM = 'cm_lines';
    public static $TBL_CM = 'cm_lines_ptn';

    // public static $TBL_PRINCIPALS_CUSTOMERS = 'principals_customers';
    // public static $TBL_PRINCIPALS_ITEMS = 'principals_items';
    // public static $TBL_PRINCIPALS_SALESMEN = 'principals_salesmen';
    public static $TBL_PRINCIPALS_CUSTOMERS = 'principals_customers_ptn';
    public static $TBL_PRINCIPALS_ITEMS = 'principals_items_ptn';
    public static $TBL_PRINCIPALS_SALESMEN = 'principals_salesmen_ptn';

    // public static $TBL_GENERAL_ITEMS = 'general_items';
    // public static $TBL_GENERAL_CUSTOMERS = 'general_customers';
    public static $TBL_GENERAL_ITEMS = 'general_items_ptn';
    public static $TBL_GENERAL_CUSTOMERS = 'general_customers_ptn';

    // public static $TBL_PRINCIPALS = 'principals';
    public static $TBL_PRINCIPALS = 'principals_ptn';

    public static $TBL_GROUPS = 'groups';

    public static $ITEM_NOT_FOUND = 'ITEM_NOT_FOUND';
    public static $CUSTOMER_NOT_FOUND = 'CUSTOMER_NOT_FOUND';

    // invoices upload log
    public static $TBL_INVOICES_UPLOG = 'invoices_upload_log';

    // invoices upload log
    public static $TBL_PT_RI = 'pterm_return_indicator';


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
        $settings = DB::table(self::$TBL_SETTINGS)
            ->where('main_vendor_code', $principalCode)
            ->get();
        $temp = [];
        foreach($settings as $setting) {
            if($setting->type=='json') {
                $setting->value = rtrim($setting->value,",");
                $json_string = "{\"$setting->name\":[$setting->value]}";
                $temp[$setting->name] = json_decode($json_string);
            } else {
                $temp[$setting->name] = $setting->value;
            }
        }
        return $temp;
    }
    /**
     * ====================================== /STATICS ======================================
     */


    /**
     * ======================================  ======================================
     */
    public function settings() {
        try {
            $res = DB::table(self::$TBL_SETTINGS)
                ->where('main_vendor_code', request()->principal_code)
                // ->orderBy('name')
                ->get();
            return response()->json($res);
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
                DB::table(self::$TBL_SETTINGS)
                    ->where('main_vendor_code', $request->principal_code)
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
            return response()->json($response, 500);
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
            $dateFrom = new Carbon($dateFrom);
            $dateTo = new Carbon($dateTo);

            $invoice_status = $request->invoice_status ?? '';

            $vendor_codes = DB::table(PrincipalsUtil::$TBL_PRINCIPALS)
                ->where('main_vendor_code', request()->principal_code)
                ->pluck('vendor_code')->toArray();

            $result = DB::table($this::$TBL_INVOICES)

                ->whereIn($this::$TBL_INVOICES. '.vendor_code', $vendor_codes)
                ->where($this::$TBL_INVOICES. '.status','like', "%$invoice_status%")
                ->whereBetween(
                    'posting_date',
                    [$dateFrom->startOfDay(), $dateTo->endOfDay()]
                )

                // ->orderBy($this::$TBL_INVOICES. '.posting_date', 'DESC')
                // ->orderBy($this::$TBL_INVOICES. '.customer_code', 'ASC')
                ->orderBy($this::$TBL_INVOICES. '.doc_no', 'ASC')

                ->get();

            $res['success'] = true;
            $res['message'] = 'Success';
            $res['data'] = $result;

            return response()->json($res);
        } catch (\Throwable $th) {
            $res['success'] = false;
            $res['nessage'] = $th->getMessage();
            $res['data'] = [];
            return response()->json($res, 500);
        }
    }


    public static function principalRoutes() {
        config()->set('database.connections.mysql.strict', false);
        DB::reconnect();

        $res = DB::table(self::$TBL_PRINCIPALS)
            ->select(
                'main_vendor_code',
                'controller'
            )
            ->groupBy('main_vendor_code')
            ->get();

        config()->set('database.connections.mysql.strict', true);
        DB::reconnect();

        return $res;
    }


    /**
     * get all the vendor codes of the principals added in the middleware
     */
    public static function getSystemVendorCodes() {
        return DB::table(self::$TBL_PRINCIPALS)->pluck('vendor_code');
    }

}
