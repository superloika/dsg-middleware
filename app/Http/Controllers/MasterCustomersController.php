<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Principals\PrincipalsUtil;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class MasterCustomersController extends Controller
{
    function index() {
        $row_count = request()->row_count ?? 10;
        $search_key = request()->search_key ?? '';

        $result = DB::table(PrincipalsUtil::$TBL_GENERAL_CUSTOMERS)
            ->where('customer_code','like','%'. $search_key. '%')
            ->orWhere('name','like','%'. $search_key. '%')
            ->orWhere('address','like','%'. $search_key. '%')
            ->orWhere('address_2','like','%'. $search_key. '%')
            ->orWhere('city','like','%'. $search_key. '%')
            ->orWhere('contact','like','%'. $search_key. '%')
            // ->orWhere('phone_no','like','%'. $search_key. '%')
            ->paginate($row_count);
        return response()->json($result);
    }


    public function upload(Request $request) {
        set_time_limit(0);
        // DB::disableQueryLog();
        $memory_limit = ini_get('memory_limit');
        ini_set('memory_limit', -1);

        try {
            foreach($request->file('files') as $masterfile) {
                $fileName = 'customers-'. time(). '-'. $masterfile->getClientOriginalName();

                $filePath = "public/masterfiles";
                Storage::putFileAs($filePath, $masterfile, $fileName);

                if (Storage::exists("$filePath/$fileName")) {
                    $fileContent = Storage::get("$filePath/$fileName");
                    $fileContentLines = explode(PHP_EOL, utf8_encode($fileContent));

                    // $loopCounter = 1;
                    $arrLines = [];
                    $dateToday = Carbon::now()->toDateTimeString();

                    DB::table(PrincipalsUtil::$TBL_GENERAL_CUSTOMERS)->truncate();

                    foreach ($fileContentLines as $fileContentLine) {
                        // if($loopCounter > 0) {
                            $arrFileContentLine = explode('|', $fileContentLine);
                            // $arrFileContentLine = preg_split('/".*"|[^,"]+/', $fileContentLine);
                            // $arrFileContentLine = preg_split('/,(?=(?:(?:[^"]*"){2})*[^"]*$)/', $fileContentLine);

                            // dd($arrFileContentLine);
                            // dd(count($arrFileContentLine));

                            if (count($arrFileContentLine) > 0) {
                                $customer_code =
                                    trim(str_replace('"','',$arrFileContentLine[0]));
                                $name =
                                    trim(str_replace('"','',$arrFileContentLine[1] ?? 'N/A'));
                                $address =
                                    trim(str_replace('"','',$arrFileContentLine[4] ?? 'N/A'));
                                $address_2 =
                                    trim(str_replace('"','',$arrFileContentLine[5] ?? 'N/A'));
                                $city =
                                    trim(str_replace('"','',$arrFileContentLine[6] ?? 'N/A'));
                                $contact =
                                    trim(str_replace('"','',$arrFileContentLine[7] ?? 'N/A'));
                                // $phone_no = str_replace('"','',$arrFileContentLine[6]);

                                // dd($address_2);

                                // $isExisting = array_search(
                                //     $customer_code, array_column($arrLines, 'customer_code')
                                // );
                                // $isExisting = false;
                                // if($isExisting==false) {
                                    $arrLines[] = [
                                        'updated_at'=>$dateToday,
                                        'customer_code'=>$customer_code,
                                        'name'=>$name,
                                        'address'=>$address,
                                        'address_2'=>$address_2,
                                        'city'=>$city,
                                        'contact'=>$contact,
                                        // 'phone_no'=>$phone_no,
                                    ];

                                    // dd($arrLines);
                                // }
                            }
                        // }
                        // $loopCounter++;
                    }

                    $chunks = array_chunk($arrLines, 500);
                    foreach($chunks as $chunk) {
                        DB::table(PrincipalsUtil::$TBL_GENERAL_CUSTOMERS)
                            ->insert($chunk);
                    }

                }
            }

            // revert to the default memory limit
            ini_set('memory_limit', $memory_limit);

            $res['success'] = true;
            $res['message'] = 'Success';

            return response()->json($res);

        } catch (\Throwable $th) {
            $res['success'] = false;
            $res['message'] = $th->getMessage();
            return response()->json($res, 500);
        }
    }
}
