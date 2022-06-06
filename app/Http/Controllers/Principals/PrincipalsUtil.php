<?php

namespace App\Http\Controllers\Principals;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PrincipalsUtil extends Controller
{
    public static $TBL_SETTINGS = 'settings';

    public static $STATUS_COMPLETED = 'completed';
    public static $STATUS_PENDING = 'pending';

    public static $TBL_GENERATED = 'generated_data';
    // public static $TBL_INVOICES = 'uploaded_invoices';
    public static $TBL_INVOICES = 'invoices';

    public static $TBL_PRINCIPALS_CUSTOMERS = 'principals_customers';
    public static $TBL_PRINCIPALS_ITEMS = 'principals_items';
    public static $TBL_GENERAL_ITEMS = 'general_items';
    public static $TBL_GENERAL_CUSTOMERS = 'general_customers';

    public static $TBL_PRINCIPALS = 'principals';

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
            ->where('principal_code', $principalCode)
            ->get();
        $temp = [];
        foreach($settings as $setting) {
            if($setting->type=='json') {
                $temp[$setting->name] = json_decode($setting->value);
            } else {
                $temp[$setting->name] = $setting->value;
            }
        }
        return $temp;
    }

    // public static function getPrincipalSettings($principalCode) {
    //     $res = DB::table('settings_principal')
    //             ->where('principal_code', $principalCode)
    //             ->first();
    //     return json_decode($res->config ?? '[]');
    // }
    /**
     * ====================================== /STATICS ======================================
     */


    /**
     * ======================================  ======================================
     */
    public function settings() {
        try {
            $res = DB::table(self::$TBL_SETTINGS)
                ->where('principal_code', request()->principal_code)
                ->get();
            return response()->json($res);
        } catch (\Throwable $th) {
            $res['success'] = false;
            $res['error'] = $th;
            return response()->json($res, 500);
        }
    }

    // public function principalSettings() {
    //     try {
    //         $res = DB::table('settings_principal')
    //             ->where('principal_code', request()->principal_code)
    //             ->first();
    //         $settings = [
    //             request()->principal_code => json_decode($res->config)
    //         ];
    //         return response()->json($settings);
    //     } catch (\Throwable $th) {
    //         $res['success'] = false;
    //         $res['error'] = $th;
    //         return response()->json($res, 500);
    //     }
    // }

    public function saveSettings(Request $request) {
        try {
            foreach($request->settings as $setting) {
                extract($setting);
                DB::table(self::$TBL_SETTINGS)
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
            return response()->json($response, 500);
        }
    }



    /**
     * Get the uploaded/saved invoices
     */
    // public function invoices() {
    //     set_time_limit(0);

    //     try {
    //         $dates = explode(',', request()->date);
    //         // sort($dates);
    //         $dateFrom = '';
    //         $dateTo = '';
    //         if(count($dates) > 1) {
    //             $dateFrom = $dates[0];
    //             $dateTo = $dates[1];
    //         } else if(count($dates) == 1) {
    //             $dateFrom = $dates[0];
    //             $dateTo = $dates[0];
    //         }

    //         $res = DB::table($this->tblInvoices)
    //             ->where('principal_code', request()->principal_code)
    //             ->whereDate('upload_date','>=', $dateFrom)
    //             ->whereDate('upload_date','<=', $dateTo)
    //             ->latest('id')->get();

    //         return response()->json($res);
    //     } catch (\Throwable $th) {
    //         $res['success'] = false;
    //         $res['message'] = $th->getMessage();
    //         return response()->json($res, 500);
    //     }
    // }

    /**
     * Get the overall total amount of the uploaded invoices
     */
    public function invoicesGrandTotal() {
        try {
            $res = DB::table($this::$TBL_INVOICES)
                // ->where('principal_code', request()->principal_code)
                ->leftJoin(PrincipalsUtil::$TBL_PRINCIPALS_ITEMS,
                    $this::$TBL_PRINCIPALS_ITEMS. '.item_code',
                    $this::$TBL_INVOICES. '.item_code'
                )
                ->where($this::$TBL_INVOICES. '.status', self::$STATUS_COMPLETED)
                ->where($this::$TBL_PRINCIPALS_ITEMS. '.principal_code', request()->principal_code)
                ->sum($this::$TBL_INVOICES. '.u3');

            return response()->json($res);
        } catch (\Throwable $th) {
            $res['success'] = false;
            $res['message'] = $th->getMessage();
            return response()->json($res, 500);
        }
    }


    /**
     * Get generated/templated data list
     */
    public function getGeneratedData() {
        set_time_limit(0);
        $cols = request()->cols;
        $dates = request()->date;
        $template_variation_count = DB::table(PrincipalsUtil::$TBL_PRINCIPALS)
            ->select('template_variation_count')
            ->where('code', request()->principal_code)
            ->first()->template_variation_count;

        $res['success'] = true;
        $res['message'] = 'Successful';
        $res['output_template_variations'] = [];

        try {
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


            for ($i=1; $i <= $template_variation_count ; $i++) {
                $gendata = DB::table($this::$TBL_GENERATED)
                ->where('principal_code', request()->principal_code)
                ->where('status', $this::$STATUS_COMPLETED)
                ->whereDate('generated_at','>=',$dateFrom)
                ->whereDate('generated_at','<=',$dateTo)
                ->where('template_variation',$i)
                ->get($cols);

                if(count($gendata) > 0) {
                    $template_variation = [
                        'name' => "Template $i",
                        'output_template' => $gendata
                    ];
                    array_push($res['output_template_variations'], $template_variation);
                }
            }

            return response()->json($res);
        } catch (\Throwable $th) {
            $res = [
                'success' => false,
                'message' => $th->getMessage(),
            ];
            return response()->json($res, 500);
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

            $result = DB::table($this::$TBL_INVOICES)
                ->leftJoin(
                    $this::$TBL_GENERAL_CUSTOMERS,
                    $this::$TBL_INVOICES. '.customer_code',
                    '=',
                    $this::$TBL_GENERAL_CUSTOMERS. '.customer_code'
                )
                ->leftJoin(
                    $this::$TBL_GENERAL_ITEMS,
                    $this::$TBL_INVOICES. '.item_code',
                    '=',
                    $this::$TBL_GENERAL_ITEMS. '.item_code'
                )
                ->leftJoin(
                    $this::$TBL_PRINCIPALS_CUSTOMERS,
                    $this::$TBL_INVOICES. '.customer_code',
                    '=',
                    $this::$TBL_PRINCIPALS_CUSTOMERS. '.customer_code'
                )
                ->leftJoin(
                    $this::$TBL_PRINCIPALS_ITEMS,
                    $this::$TBL_INVOICES. '.item_code',
                    '=',
                    $this::$TBL_PRINCIPALS_ITEMS. '.item_code'
                )
                ->select(
                    $this::$TBL_INVOICES. '.*',
                    $this::$TBL_PRINCIPALS_CUSTOMERS. '.principal_code',
                    // $this::$TBL_PRINCIPALS_CUSTOMERS. '.customer_code',
                    // $this::$TBL_PRINCIPALS_CUSTOMERS. '.customer_name',
                    $this::$TBL_GENERAL_CUSTOMERS. '.name as customer_name',
                    $this::$TBL_GENERAL_CUSTOMERS. '.customer_code',
                    $this::$TBL_PRINCIPALS_ITEMS. '.principal_code',
                    // $this::$TBL_PRINCIPALS_ITEMS. '.item_code',
                    // $this::$TBL_PRINCIPALS_ITEMS. '.description'
                    $this::$TBL_GENERAL_ITEMS. '.description',
                    $this::$TBL_GENERAL_ITEMS. '.item_code',
                )
                // ->where($this::$TBL_INVOICES. '.principal_code', request()->principal_code)
                ->where($this::$TBL_INVOICES. '.status', 'completed')
                ->where($this::$TBL_PRINCIPALS_CUSTOMERS. '.principal_code', request()->principal_code)
                ->where($this::$TBL_PRINCIPALS_ITEMS. '.principal_code', request()->principal_code)
                ->whereDate($this::$TBL_INVOICES. '.updated_at','>=', $dateFrom)
                ->whereDate($this::$TBL_INVOICES. '.updated_at','<=', $dateTo)
                ->orderBy($this::$TBL_INVOICES. '.updated_at', 'DESC')
                ->orderBy($this::$TBL_INVOICES. '.customer_code', 'ASC')
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


    /**
     * Get pending generated data
     */
    // public function getPendingGendataAndInvoices() {
    //     $response['success'] = true;
    //     $response['message'] = 'Success';
    //     $cols = request()->cols;
    //     $res = DB::table($this::$TBL_GENERATED)
    //         ->where('principal_code', request()->principal_code)
    //         ->where('status', $this::$STATUS_PENDING)
    //         ->get($cols);
    //     $response['pending_gendata'][] = [
    //         'PENDING',
    //         $res
    //     ];

    //     $res = DB::table($this::$TBL_INVOICES)
    //         ->where('principal_code', request()->principal_code)
    //         ->where('status', $this::$STATUS_PENDING)
    //         ->get();
    //     $response['pending_rawinvoices'] = $res;

    //     return response()->json($response);
    // }


}
