<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Principals\PrincipalsUtil;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class MasterPrincipalsController extends Controller
{
    public function index(Request $request)
    {
        $main_vendor_codes = json_decode($request->main_vendor_codes ?? '[]');

        // dd($main_vendor_codes);

        $res = DB::table(PrincipalsUtil::$TBL_PRINCIPALS)
            // ->where('active', 1)
            ->where('active', 1)
            // ->orderBy('proj_status', 'DESC')
            // ->orderBy('code')
            // ->orderBy('name')
            ->when(
                count($main_vendor_codes) > 0 && $main_vendor_codes[0]!='*',
                function($q) use($main_vendor_codes) {
                    $q->whereIn('main_vendor_code', $main_vendor_codes)
                    ;
                }
            )
            ->get();

        return response()->json($res);
    }


    public function upload(Request $request)
    {
        try {
            foreach ($request->file('files') as $masterfile) {
                $fileName = 'principals-' . time() . '-' . $masterfile->getClientOriginalName();
                $testFilesPath = "public/masterfiles";
                Storage::putFileAs($testFilesPath, $masterfile, $fileName);

                if (Storage::exists("$testFilesPath/$fileName")) {
                    $content = Storage::get("$testFilesPath/$fileName");
                    $rows = explode(PHP_EOL, utf8_encode($content));

                    $loopCounter = 1;
                    // DB::table(PrincipalsUtil::$TBL_PRINCIPALS)->truncate();

                    foreach ($rows as $row) {
                        if ($loopCounter > 1) {
                            // $cols = explode($delimiter, $row);
                            $cols = preg_split('/,(?=(?:(?:[^"]*"){2})*[^"]*$)/', $row);

                            if (count($cols) > 1) {
                                // $id = $cols[0];
                                $name = trim($cols[0], ' \t\n\r\0\"');
                                $principal_code = $cols[1];
                                $vendor_code = $cols[2];
                                $template_variation_count = $cols[3];
                                $proj_status = $cols[4];
                                $active = $cols[5];
                                $search_key = $cols[6];
                                $main_vendor_code = $cols[7];
                                $controller = $cols[9];

                                $arr = [
                                    'name' => $name,
                                    'code' => $principal_code,
                                    'vendor_code' => $vendor_code,
                                    'template_variation_count' => $template_variation_count,
                                    'proj_status' => $proj_status,
                                    'active' => $active,
                                    'search_key' => $search_key,
                                    'main_vendor_code' => $main_vendor_code,
                                    'controller' => $controller,
                                ];

                                if(
                                    DB::table(PrincipalsUtil::$TBL_PRINCIPALS)
                                        ->where('vendor_code', $vendor_code)
                                        ->exists() == false
                                ) {
                                    DB::table(PrincipalsUtil::$TBL_PRINCIPALS)->insert($arr);
                                } else {
                                    DB::table(PrincipalsUtil::$TBL_PRINCIPALS)
                                        ->where('vendor_code', $vendor_code)
                                        ->update($arr);
                                }

                            }
                        }

                        $loopCounter++;
                    }
                }
            }

            $res['success'] = true;
            $res['message'] = 'Successful';

            return response()->json($res, 200);
        } catch (\Throwable $th) {
            $res['success'] = false;
            $res['message'] = $th->getMessage();
            return response()->json($res, 500);
        }
    }
}
