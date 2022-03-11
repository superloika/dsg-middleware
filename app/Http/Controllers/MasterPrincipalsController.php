<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class MasterPrincipalsController extends Controller
{

    protected static $tableName = 'principals';


    public function index()
    {
        $res = DB::table('principals')->orderBy('name')->get();

        return response()->json($res);
    }


    public function upload(Request $request)
    {
        try {

            $delimiter = ',';

            foreach ($request->file('files') as $masterfile) {

                $fileName = 'principals-' . time() . '-' . $masterfile->getClientOriginalName();

                $testFilesPath = "public/masterfiles";
                Storage::putFileAs($testFilesPath, $masterfile, $fileName);

                if (Storage::exists("$testFilesPath/$fileName")) {
                    $fileContent = Storage::get("$testFilesPath/$fileName");

                    $fileContentLines = explode(PHP_EOL, utf8_encode($fileContent));

                    // =====================
                    /**
                     * If the file content contains more than one line,
                     * explode the second line and store it in $pcode.
                     * Get the 1st array element in $pcode assuming that it is the principal code
                     */
                    // if (count($fileContentLines) > 1) {
                    //     $pcode = explode(',', $fileContentLines[1])[0];
                    //     DB::table($this::$tableName)->where('principal_code', $pcode)->delete();
                    // }
                    // =====================

                    $loopCounter = 1;
                    DB::table($this::$tableName)->truncate();

                    foreach ($fileContentLines as $fileContentLine) {
                        if ($loopCounter > 1) {
                            // $arrFileContentLine = explode($delimiter, $fileContentLine);
                            $arrFileContentLine = preg_split('/,(?=(?:(?:[^"]*"){2})*[^"]*$)/', $fileContentLine);

                            if (count($arrFileContentLine) > 1) {

                                $name = $arrFileContentLine[0];
                                $code = $arrFileContentLine[1];

                                // ===============================================================================
                                DB::table($this::$tableName)->insert([
                                    'code' => $code,
                                    'name' => $name,

                                ]);
                                // ===============================================================================

                            }
                        }

                        $loopCounter++;
                    }
                }
            }

            $res['success'] = true;
            $res['message'] = 'File uploaded successfully';

            return response()->json($res);
        } catch (\Throwable $th) {
            $res['success'] = false;
            $res['message'] = $th->getMessage();
            return response()->json($res);
        }
    }
}
