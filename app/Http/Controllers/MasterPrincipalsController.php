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
        $res = DB::table('principals')
            // ->where('active', 1)
            ->where('active', 1)
            // ->orderBy('proj_status', 'DESC')
            // ->orderBy('code')
            ->orderBy('name')
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
                    DB::table(PrincipalsUtil::$TBL_PRINCIPALS)->truncate();

                    foreach ($rows as $row) {
                        if ($loopCounter > 1) {
                            // $cols = explode($delimiter, $row);
                            $cols = preg_split('/,(?=(?:(?:[^"]*"){2})*[^"]*$)/', $row);

                            if (count($cols) > 1) {
                                $id = $cols[0];
                                $name = trim($cols[1], ' \t\n\r\0\"');
                                $principal_code = $cols[2];
                                $vendor_code = $cols[3];
                                $template_variation_count = $cols[4];
                                $proj_status = $cols[5];
                                $active = $cols[6];
                                $search_key = $cols[7];

                                DB::table(PrincipalsUtil::$TBL_PRINCIPALS)->insert([
                                    'id' => $id,
                                    'name' => $name,
                                    'code' => $principal_code,
                                    'vendor_code' => $vendor_code,
                                    'template_variation_count' => $template_variation_count,
                                    'proj_status' => $proj_status,
                                    'active' => $active,
                                    'search_key' => $search_key,
                                ]);
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
