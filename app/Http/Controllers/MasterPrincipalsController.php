<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Principals\PrincipalsUtil;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class MasterPrincipalsController extends Controller
{

    public function index()
    {
        $res = DB::table('principals')->orderBy('name')->get();

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
                                $name = $cols[0];
                                $vendor_code = $cols[1];
                                $principal_code = $cols[2];
                                $template_variation_count = $cols[3];

                                DB::table(PrincipalsUtil::$TBL_PRINCIPALS)->insert([
                                    'name' => $name,
                                    'vendor_code' => $vendor_code,
                                    'code' => $principal_code,
                                    'template_variation_count' => $template_variation_count,
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
