<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FileUploadController extends Controller
{
    public function uploadFile(Request $request)
    {
        try {
            $fileName = $request->file->getClientOriginalName()
                . '-' . time() . '.' . $request->file->getClientOriginalExtension();
            // $request->file->storeAs('public/test_files', $fileName);

            $testFilesPath = "public/test_files";
            Storage::putFileAs($testFilesPath, $request->file, $fileName);

            $res['test_data'] = [];
            $res['success'] = true;
            $res['message'] = 'File uploaded successfully';

            if (Storage::exists("$testFilesPath/$fileName")) {
                $fileContent = Storage::get("$testFilesPath/$fileName");

                $fileContentLines = explode(PHP_EOL, mb_convert_encoding($fileContent, "UTF-8", "UTF-8"));
                foreach ($fileContentLines as $fileContentLine) {
                    $arrFileContentLine = explode(',', $fileContentLine);
                    if (count($arrFileContentLine) > 1) {
                        array_push($res['test_data'], $arrFileContentLine);
                    }
                }
            }

            return response()->json($res);
        } catch (\Throwable $th) {
            $res['success'] = false;
            $res['message'] = $th->getMessage();
            return response()->json($res);
        }
    }
}
