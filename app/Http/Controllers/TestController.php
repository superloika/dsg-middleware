<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class TestController extends Controller
{
    //

    public function test() {
        $tbl = '[Islands City Mall - SM TEST$Item]';

        $conn=odbc_connect('ODBC_LDI','fran_conn','fran_conn');
        if (!$conn) {exit("Connection Failed: " . $conn);}

        $sql="SELECT TOP 2000 * FROM $tbl";
        $rs=odbc_exec($conn, $sql);

        if (!$rs) { exit("Error in SQL"); }

        $response = [];
        $rows = [];

        // $res = "<table><tr>";
        // $res .= "<th>No</th>";
        // $res .=  "<th>Description</th></tr>";
        // while (odbc_fetch_row($rs))
        // {
        //   $no=odbc_result($rs,"No_");
        //   $desc=odbc_result($rs,"Description");
        //   $res .= "<tr><td>$no</td>";
        //   $res .= "<td>===> $desc</td></tr>";
        // }

        while($row = odbc_fetch_array($rs)){
            // $row["timestamp"] = 'X';
            $rows[] = mb_convert_encoding($row, "UTF-8", "UTF-8");
        }

        // $response['data'] = $rows;
        // $response['data'] = mb_convert_encoding($rows,"UTF-8","UTF-8");
        $response['data'] = $rows;
        odbc_close($conn);

        // dd($response);
        return response()->json($response);

        // return response()->json($rs);

        // ======================================================================================

        // $res = DB::connection('sqlsrv')->table($tbl)->where('id', 1);
        // dd($res);
        // return response()->json($res);
    }


    public function test2(Request $request) {
        $tbl = '[Islands City Mall - SM TEST$Item]';
        // $tbl = 'Company';

        $per_page = $request->input('per_page') ?? 10;
        $curr_page = $request->input('curr_page') ?? 1;

        $res = DB::connection('odbc_ldi')
            ->select("SELECT * FROM
                        (SELECT *,ROW_NUMBER() OVER (ORDER BY [No_]) AS RowNum FROM $tbl) AS tbItems
                        WHERE tbItems.RowNum BETWEEN (($curr_page-1)*$per_page)-1 AND $per_page * $curr_page"
                    );

        $resMapped = array_map(function($val){
            return mb_convert_encoding((array)$val,"UTF-8","UTF-8");
        }, $res);

        return response()->json($resMapped);
    }

    public function recordCount(Request $request) {
        $tbl = '[Islands City Mall - SM TEST$Item]';
        // $tbl = 'Company';

        $res = DB::connection('odbc_ldi')
            ->select("SELECT COUNT(No_) AS recordCount FROM $tbl");

        return response()->json($res);
    }


    public function testFileUpload(Request $request) {
        try {
            $fileName = $request->file->getClientOriginalName()
                . '-' . time() . '.' . $request->file->getClientOriginalExtension();
            // $request->file->storeAs('public/test_files', $fileName);

            $testFilesPath = "public/test_files";
            Storage::putFileAs($testFilesPath, $request->file, $fileName);

            $res['test_data'] = [];
            $res['success'] = true;
            $res['message'] = 'File uploaded successfully';

            if(Storage::exists("$testFilesPath/$fileName")){
                $fileContent = Storage::get("$testFilesPath/$fileName");

                $fileContentLines = explode(PHP_EOL, mb_convert_encoding($fileContent, "UTF-8","UTF-8"));
                foreach($fileContentLines as $fileContentLine) {
                    $arrFileContentLine = explode(',', $fileContentLine);
                    if(count($arrFileContentLine) > 1) {
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
