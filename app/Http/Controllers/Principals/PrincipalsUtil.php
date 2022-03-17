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

        $cols = [
            // common
            'id',
            'generated_at',
            'uploaded_by',
            'doc_no',
            // principal template
            'order_date',
            'customer_code',
            'route_code',
            'product_category_code',
            'ship_to',
            'order_no',
            'remarks',
            'product_code',
            'quantity'
        ];

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

            // $gendata = DB::table(request()->table_generated)
            $gendata = DB::table($this->tblGenerated)
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
}
