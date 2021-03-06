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
            ->orWhere('phone_no','like','%'. $search_key. '%')
            ->paginate($row_count);
        return response()->json($result);
    }


    public function upload(Request $request) {
        set_time_limit(0);
        // DB::disableQueryLog();

        try {
            $delimiter = ',';

            foreach($request->file('files') as $masterfile) {
                $fileName = 'customers-'. time(). '-'. $masterfile->getClientOriginalName();

                $filePath = "public/masterfiles";
                Storage::putFileAs($filePath, $masterfile, $fileName);

                if (Storage::exists("$filePath/$fileName")) {
                    $fileContent = Storage::get("$filePath/$fileName");
                    $fileContentLines = explode(PHP_EOL, utf8_encode($fileContent));

                    $loopCounter = 1;
                    // DB::table(PrincipalsUtil::$TBL_GENERAL_CUSTOMERS)->truncate();
                    $arrLines = [];
                    $dateToday = Carbon::now()->toDateTimeString();

                    DB::table(PrincipalsUtil::$TBL_GENERAL_CUSTOMERS)->truncate();

                    foreach ($fileContentLines as $fileContentLine) {
                        if($loopCounter > 1) {
                            // $arrFileContentLine = explode($delimiter, $fileContentLine);
                            // $arrFileContentLine = preg_split('/".*"|[^,"]+/', $fileContentLine);
                            $arrFileContentLine = preg_split('/,(?=(?:(?:[^"]*"){2})*[^"]*$)/', $fileContentLine);

                            // dd($arrFileContentLine);

                            if (count($arrFileContentLine) > 1 && substr($arrFileContentLine[0], 0, 1) != '#') {
                                $customer_code = trim($arrFileContentLine[0]);
                                $name = str_replace('"','',$arrFileContentLine[1]);
                                $address = str_replace('"','',$arrFileContentLine[2]);
                                $address_2 = str_replace('"','',$arrFileContentLine[3]);
                                $city = str_replace('"','',$arrFileContentLine[4]);
                                $contact = str_replace('"','',$arrFileContentLine[5]);
                                $phone_no = str_replace('"','',$arrFileContentLine[6]);

                                $isExisting = array_search(
                                    $customer_code, array_column($arrLines, 'customer_code')
                                );
                                // $isExisting = false;
                                if($isExisting==false) {
                                    $arrLines[] = [
                                        'updated_at'=>$dateToday,
                                        'customer_code'=>$customer_code,
                                        'name'=>$name,
                                        'address'=>$address,
                                        'address_2'=>$address_2,
                                        'city'=>$city,
                                        'contact'=>$contact,
                                        'phone_no'=>$phone_no,
                                    ];
                                }
                            }
                        }
                        $loopCounter++;
                    }

                    $chunks = array_chunk($arrLines, 500);
                    foreach($chunks as $chunk) {
                        DB::table(PrincipalsUtil::$TBL_GENERAL_CUSTOMERS)
                            ->insert($chunk);
                    }

                }
            }

            $res['success'] = true;
            $res['message'] = 'Success';

            return response()->json($res);

        } catch (\Throwable $th) {
            $res['success'] = false;
            $res['message'] = $th;
            return response()->json($res);
        }
    }
}
