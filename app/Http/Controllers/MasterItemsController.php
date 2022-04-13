<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class MasterItemsController extends Controller
{
    public static $TBL_ITEMS = 'items';

    public function __construct()
    {
        $this->middleware('auth');
    }

    function index() {
        $row_count = request()->row_count ?? 10;
        $search_key = request()->search_key ?? '';

        // $result = DB::table($this::$TBL_ITEMS)
        //     ->where('item_code','like', '%'.$search_key. '%')
        //     ->orWhere('description','like', '%'.$search_key. '%')
        //     ->orWhere('vendor_code','like', '%'.$search_key. '%')
        //     ->paginate($row_count);

        $result = DB::table($this::$TBL_ITEMS)
            ->leftJoin('principals', 'principals.vendor_code', $this::$TBL_ITEMS.'.vendor_code')
            ->select(
                $this::$TBL_ITEMS.'.*',
                'principals.name as principal_name'
            )
            ->where('item_code','like', '%'.$search_key. '%')
            ->orWhere('description','like', '%'.$search_key. '%')
            ->orWhere($this::$TBL_ITEMS.'.vendor_code','like', '%'.$search_key. '%')
            ->orWhere('principals.name','like', '%'.$search_key. '%')
            ->paginate($row_count);

        return response()->json($result);
    }

    public function upload(Request $request) {
        set_time_limit(0);
        $memory_limit = ini_get('memory_limit');

        try {
            $dateTimeToday = Carbon::now()->format('Y-m-d H:i:s');

            foreach($request->file('files') as $masterfile) {
                $fileName = 'items-'. time(). '-'. $masterfile->getClientOriginalName();

                $testFilesPath = "public/masterfiles";
                Storage::putFileAs($testFilesPath, $masterfile, $fileName);

                if (Storage::exists("$testFilesPath/$fileName")) {
                    $content = Storage::get("$testFilesPath/$fileName");
                    $rows = explode(PHP_EOL, utf8_encode($content));

                    $items = [];

                    if(count($rows) > 0) {
                        //set memory limit to unli for heavy stuff processing
                        ini_set('memory_limit', -1);

                        DB::table($this::$TBL_ITEMS)->truncate();

                        foreach ($rows as $row) {
                            // $cols = preg_split('/,(?=(?:(?:[^"]*"){2})*[^"]*$)/', $row);
                            $cols = explode('|', $row);

                            if (count($cols) == 7 && $cols[0][0] != '#') {
                                $item_code = trim(str_replace('"','',$cols[0]));
                                $description = trim(str_replace('"','',$cols[1]));
                                $vendor_code = trim(str_replace('"','',$cols[2]));
                                $u1 = trim(str_replace('"','',$cols[3]));
                                $u2 = trim(str_replace('"','',$cols[4]));
                                $u3 = trim(str_replace('"','',$cols[5]));
                                $u4 = trim(str_replace('"','',$cols[6]));

                                $items[] = [
                                    'created_at'=>date($dateTimeToday),
                                    'item_code'=>$item_code,
                                    'description'=>$description,
                                    'vendor_code'=>$vendor_code,
                                    'u1'=>$u1,
                                    'u2'=>$u2,
                                    'u3'=>$u3,
                                    'u4'=>$u4,
                                ];
                            }
                        }
                        $chunks = array_chunk($items, 500);
                        foreach($chunks as $chunk) {
                            DB::table($this::$TBL_ITEMS)
                                ->insert($chunk);
                        }

                        // DB::table($this::$TBL_ITEMS)
                        //     ->where('created_at','<>',$dateTimeToday)->delete();
                    }
                }
            }

            // revert to the default memory limit
            ini_set('memory_limit', $memory_limit);

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
