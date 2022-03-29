<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class MasterProductsController extends Controller
{
    private $TBL_MASTER_PRODUCTS = 'master_products';

    function index() {
        $row_count = request()->row_count ?? 10;
        $search_key = request()->search_key ?? '';

        $result = DB::table('master_products')
            ->where('item_code','like', '%'.$search_key. '%')
            ->paginate($row_count);

        return response()->json($result);
    }


    public function upload(Request $request) {
        set_time_limit(0);

        try {
            // $fileName = $request->file->getClientOriginalName()
            //     . '-' . time() . '.' . $request->file->getClientOriginalExtension();
            // $request->file->storeAs('public/test_files', $fileName);

            // dd($request->file('files'));

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
                    // if(count($fileContentLines) > 1) {
                    //     $pcode = explode(',',$fileContentLines[1])[0];
                    //     DB::table($tableName)->where('principal_code',$pcode)->delete();
                    // }
                    // =====================

                    $loopCounter = 1;
                    DB::table($this->TBL_MASTER_PRODUCTS)->delete();
                    $arrLines = [];
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

                                $item_code = trim($arrFileContentLine[0]);
                                $description = str_replace('"','',$arrFileContentLine[1]);

                                // ===============================================================================
                                $arrLines[] = [
                                    'item_code'=>$item_code,
                                    'description'=>$description,
                                ];
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
                    $chunks = array_chunk($arrLines, 500);
                    foreach($chunks as $chunk) {
                        DB::table($this->TBL_MASTER_PRODUCTS)
                            ->insert($chunk);
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
