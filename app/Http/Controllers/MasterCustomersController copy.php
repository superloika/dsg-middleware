<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class MasterCustomersController extends Controller
{
    private $TBL_MASTER_CUSTOMERS = 'master_customers';

    function index() {
        $row_count = request()->row_count ?? 10;
        $search_key = request()->search_key ?? '';

        $result = DB::table($this->TBL_MASTER_CUSTOMERS)
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
            $this->TBL_MASTER_CUSTOMERS = 'master_customers';
            $delimiter = ',';

            foreach($request->file('files') as $masterfile) {
                $fileName = 'customers-'. time(). '-'. $masterfile->getClientOriginalName();

                $filePath = "public/masterfiles";
                Storage::putFileAs($filePath, $masterfile, $fileName);

                if (Storage::exists("$filePath/$fileName")) {
                    $fileContent = Storage::get("$filePath/$fileName");
                    $fileContentLines = explode(PHP_EOL, utf8_encode($fileContent));

                    DB::table($this->TBL_MASTER_CUSTOMERS)->delete();

                    $loopCounter = 1;
                    // DB::table($this->TBL_MASTER_CUSTOMERS)->truncate();
                    foreach ($fileContentLines as $fileContentLine) {
                        if($loopCounter > 1) {
                            // $arrFileContentLine = explode($delimiter, $fileContentLine);
                            // $arrFileContentLine = preg_split('/".*"|[^,"]+/', $fileContentLine);
                            $arrFileContentLine = preg_split('/,(?=(?:(?:[^"]*"){2})*[^"]*$)/', $fileContentLine);

                            // dd($arrFileContentLine);

                            if (count($arrFileContentLine) > 1 && substr($arrFileContentLine[0], 0, 1) != '#') {
                                $customer_code = $arrFileContentLine[0];
                                $name = str_replace('"','',$arrFileContentLine[1]);
                                $address = str_replace('"','',$arrFileContentLine[2]);
                                $address_2 = str_replace('"','',$arrFileContentLine[3]);
                                $city = str_replace('"','',$arrFileContentLine[4]);
                                $contact = str_replace('"','',$arrFileContentLine[5]);
                                $phone_no = str_replace('"','',$arrFileContentLine[6]);

                                $dateToday = Carbon::now()->toDateTimeString();

                                // ===============================================================================
                                DB::table($this->TBL_MASTER_CUSTOMERS)->insert([
                                    'updated_at'=>$dateToday,
                                    'customer_code'=>$customer_code,
                                    'name'=>$name,
                                    'address'=>$address,
                                    'address_2'=>$address_2,
                                    'city'=>$city,
                                    'contact'=>$contact,
                                    'phone_no'=>$phone_no,
                                ]);
                                // ===============================================================================


                                // ===============================================================================
                                // if(
                                //     DB::table($this->TBL_MASTER_CUSTOMERS)
                                //         ->where('customer_code', $customer_code)
                                //         ->exists()
                                // ) {
                                //     // do something if record already exists...
                                //     DB::table($this->TBL_MASTER_CUSTOMERS)
                                //         ->where('customer_code', $customer_code)
                                //         ->update([
                                //             'updated_at'=>$dateToday,
                                //             'name'=>$name,
                                //             'search_name'=>$search_name,
                                //             'name_2'=>$name_2,
                                //             'address'=>$address,
                                //             'address_2'=>$address_2,
                                //             'city'=>$city,
                                //             'contact'=>$contact,
                                //             'phone_no'=>$phone_no,
                                //         ]);
                                // } else {
                                //     DB::table($this->TBL_MASTER_CUSTOMERS)->insert([
                                //         'updated_at'=>$dateToday,
                                //         'customer_code'=>$customer_code,
                                //         'name'=>$name,
                                //         'search_name'=>$search_name,
                                //         'name_2'=>$name_2,
                                //         'address'=>$address,
                                //         'address_2'=>$address_2,
                                //         'city'=>$city,
                                //         'contact'=>$contact,
                                //         'phone_no'=>$phone_no,
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
            $res['message'] = 'Success';

            return response()->json($res);

        } catch (\Throwable $th) {
            $res['success'] = false;
            $res['message'] = $th->getMessage();
            return response()->json($res);
        }
    }
}
