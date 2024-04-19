<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Principals\PrincipalsUtil;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MiscUtils extends Controller
{
    //
    public function __construct()
    {
        $this->middleware('auth');
    }


    // public function exportToTxt(Request $request) {
    //     try {
    //         $data = $request->data ?? 'test';
    //         $filename = $request->filename ?? 'test.txt';

    //         return response()->streamDownload(function() use ($data) {
    //             echo $data;
    //         }, $filename);
    //     } catch (\Throwable $th) {
    //         //throw $th;
    //         return response()->json([
    //             'success' => false,
    //             'message' => $th->getMessage(),
    //         ]);
    //     }
    // }


    /**
     * MVC = main vendor code KEKW
     */
    public function overrideMVC(Request $request) {

    }


    public function dbDetails() {
        $con = DB::connection();
        return response()->json([
            'db_config' => array_filter(
                $con->getConfig(), function($key) {
                    return $key != 'password';
                },
                ARRAY_FILTER_USE_KEY
            ),
            'invoices_table' => PrincipalsUtil::$TBL_INVOICES,
            'settings_table' => PrincipalsUtil::$TBL_SETTINGS,
        ]);
    }


    public function dbDetailsNavision() {
        return response()->json(NavisionController::serverConfigs());
    }


    public function patchUsersMVC() {
        $res = DB::table(PrincipalsUtil::$TBL_USERS)->get();
        $str = "";
        foreach($res as $r) {
            // dd(json_decode($r->principal_ids));
            if($r->principal_ids == '["*"]') {
                DB::table(PrincipalsUtil::$TBL_USERS)
                ->where('id', $r->id)
                ->update(['main_vendor_codes'=>$r->principal_ids]);
            }
        }
        return response()->json($str);
    }
}
