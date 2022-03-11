<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class MasterProductsController extends Controller
{
    function index() {
        $result = DB::table('master_products')->get();

        return response()->json($result);
    }


    public function upload(Request $request) {
        try {
            // $fileName = $request->file->getClientOriginalName()
            //     . '-' . time() . '.' . $request->file->getClientOriginalExtension();
            // $request->file->storeAs('public/test_files', $fileName);

            // dd($request->file('files'));

            $tableName = 'master_products';
            $delimiter = ',';

            foreach($request->file('files') as $masterfile) {
                // dd($masterfile);

                // $fileName = 'products-'. time(). '.'.
                //     $masterfile->getClientOriginalExtension();
                $fileName = 'products-'. time(). '-'. $masterfile->getClientOriginalName();

                $testFilesPath = "public/masterfiles";
                Storage::putFileAs($testFilesPath, $masterfile, $fileName);

                if (Storage::exists("$testFilesPath/$fileName")) {
                    $fileContent = Storage::get("$testFilesPath/$fileName");

                    // $fileContentLines = explode(PHP_EOL, mb_convert_encoding($fileContent, "UTF-8", "auto"));
                    $fileContentLines = explode(PHP_EOL, utf8_encode($fileContent));
                    // dd($fileContentLines);

                    // =====================
                    /**
                     * If the file content contains more than one line,
                     * explode the second line and store it in $pcode.
                     * Get the 1st array element in $pcode assuming that it is the principal code
                     */
                    if(count($fileContentLines) > 1) {
                        $pcode = explode(',',$fileContentLines[1])[0];
                        DB::table($tableName)->where('principal_code',$pcode)->delete();
                    }
                    // =====================

                    $loopCounter = 1;
                    // DB::table($tableName)->truncate();
                    foreach ($fileContentLines as $fileContentLine) {
                        if($loopCounter > 1) {
                            // $arrFileContentLine = explode($delimiter, $fileContentLine);
                            // $arrFileContentLine = preg_split('/".*"|[^,"]+/', $fileContentLine);
                            $arrFileContentLine = preg_split('/,(?=(?:(?:[^"]*"){2})*[^"]*$)/', $fileContentLine);

                            // dd($arrFileContentLine);

                            if (count($arrFileContentLine) > 1) {

                                // $item_code = $arrFileContentLine[0] == null ? '' : $arrFileContentLine[0];
                                // $description = $arrFileContentLine[1] == null ? '' : $arrFileContentLine[1];
                                // $item_code_supplier = $arrFileContentLine[2] == null ? '' : $arrFileContentLine[2];
                                // $description_supplier = $arrFileContentLine[3] == null ? '' : $arrFileContentLine[3];
                                // $uom = $arrFileContentLine[4] == null ? '' : $arrFileContentLine[4];
                                // $per_uom = floatval($arrFileContentLine[5]) == null ? '' : $arrFileContentLine[5];
                                // $principal_code = $arrFileContentLine[6] == null ? '' : $arrFileContentLine[6];

                                $principal_code = $arrFileContentLine[0];

                                $item_code = $arrFileContentLine[1];
                                $description = str_replace('"','',$arrFileContentLine[2]);
                                $item_code_supplier = $arrFileContentLine[3];
                                $description_supplier = str_replace('"','',$arrFileContentLine[4]);
                                $uom = $arrFileContentLine[5];

                                // $per_uom = floatval($arrFileContentLine[5]);
                                $per_uom = floatval($arrFileContentLine[6]);
                                $per_uom = $per_uom < 1 ? null : $per_uom;


                                // ===============================================================================
                                DB::table($tableName)->insert([
                                    'item_code'=>$item_code,
                                    'description'=>$description,
                                    'item_code_supplier'=>$item_code_supplier,
                                    'description_supplier'=>$description_supplier,
                                    'uom'=>$uom,
                                    'per_uom'=>$per_uom,
                                    'principal_code'=>$principal_code,
                                ]);
                                // ===============================================================================


                                // ===============================================================================
                                // $recordExists = DB::table($tableName)
                                //     ->where('principal_code', $principal_code)
                                //     ->where('item_code', $item_code)
                                //     ->where('description', $description)
                                //     ->where('item_code_supplier', $item_code_supplier)
                                //     ->where('description_supplier', $description_supplier)
                                //     ->where('uom', $uom)
                                //     ->where('per_uom', $per_uom)
                                //     ->exists();

                                // if($recordExists) {

                                // } else {
                                //     DB::table($tableName)->insert([
                                //         'item_code'=>$item_code,
                                //         'description'=>$description,
                                //         'item_code_supplier'=>$item_code_supplier,
                                //         'description_supplier'=>$description_supplier,
                                //         'uom'=>$uom,
                                //         'per_uom'=>$per_uom,
                                //         'principal_code'=>$principal_code,
                                //     ]);
                                // }
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
