<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Principals\PrincipalsUtil;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class InvoicesController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    function index() {
        $row_count = request()->row_count ?? 10;
        $search_key = request()->search_key ?? '';
        $principal_code = request()->principal_code ?? '';
        $status = request()->status ?? '';

        // dd($principal_code);

        $result = DB::table(PrincipalsUtil::$TBL_INVOICES)
            ->where(function($query) use ($search_key, $status){
                $query->where('doc_no','like', '%'.$search_key. '%')
                    ->orWhere('doc_type','like', '%'.$search_key. '%')
                    ->orWhere('customer_code','like', '%'.$search_key. '%')
                    ->orWhere('posting_date','like', '%'.$search_key. '%')
                    ->orWhere(PrincipalsUtil::$TBL_INVOICES.'.created_at','like', '%'.$search_key. '%')

                    ->orWhere(
                        PrincipalsUtil::$TBL_INVOICES.'.item_code', 'like', '%'.$search_key. '%'
                    );
            })
            ->where(function($query) use ($principal_code) {
                if($principal_code != '') {
                    if($principal_code=='others') {
                        $query->where(PrincipalsUtil::$TBL_PRINCIPALS.'.vendor_code', null);
                    } else {
                        $query->where(PrincipalsUtil::$TBL_PRINCIPALS.'.code', $principal_code);
                    }
                }
            })
            ->where(
                PrincipalsUtil::$TBL_INVOICES. '.status','like', '%'.$status. '%'
            )

            ->leftJoin('users', 'users.id', PrincipalsUtil::$TBL_INVOICES. '.uploaded_by')
            ->leftJoin(
                PrincipalsUtil::$TBL_GENERAL_ITEMS,
                PrincipalsUtil::$TBL_GENERAL_ITEMS.'.item_code',
                PrincipalsUtil::$TBL_INVOICES. '.item_code'
            )
            ->leftJoin(
                PrincipalsUtil::$TBL_PRINCIPALS,
                PrincipalsUtil::$TBL_PRINCIPALS.'.vendor_code',
                PrincipalsUtil::$TBL_GENERAL_ITEMS.'.vendor_code'
            )

            ->select(
                PrincipalsUtil::$TBL_INVOICES. '.*',
                'users.name AS userFullname',
                'users.username',
                PrincipalsUtil::$TBL_GENERAL_ITEMS.'.item_code AS items_item_code',
                PrincipalsUtil::$TBL_PRINCIPALS.'.name AS principals_name',
                PrincipalsUtil::$TBL_PRINCIPALS.'.code',
                PrincipalsUtil::$TBL_PRINCIPALS.'.vendor_code',
            )

            ->orderBy('id','DESC')
            ->paginate($row_count);

        return response()->json($result);
    }

    public function upload(Request $request) {
        set_time_limit(0);
        $memory_limit = ini_get('memory_limit');

        try {
            $dateTimeToday = Carbon::now()->format('Y-m-d H:i:s');

            // selected source terminal terminal
            $terminal = $request->terminal;

            foreach($request->file('files') as $file) {
                $fileName = 'invoices-'. time(). '-'. $file->getClientOriginalName();
                $testFilesPath = "public/invoices/". substr($dateTimeToday, 0, 10);
                Storage::putFileAs($testFilesPath, $file, $fileName);

                if (Storage::exists("$testFilesPath/$fileName")) {
                    $content = Storage::get("$testFilesPath/$fileName");
                    $rows = explode(PHP_EOL, utf8_encode($content));

                    $invoices = [];

                    if(count($rows) > 0) {
                        //set memory limit to unli for heavy stuff processing
                        ini_set('memory_limit', -1);

                        foreach ($rows as $row) {
                            // $cols = preg_split('/,(?=(?:(?:[^"]*"){2})*[^"]*$)/', $row);
                            $cols = explode('|', $row);

                            if (
                                count($cols) == 12
                                && $cols[0][0] != '#'
                                && trim(str_replace('"','',$cols[0])) != 'Credit Memo'
                            ) {
                                $doc_type = trim(str_replace('"','',$cols[0]));
                                $doc_no = trim(str_replace('"','',$cols[1]));
                                $customer_code = trim(str_replace('"','',$cols[2]));
                                $posting_date = trim(str_replace('"','',$cols[3]));
                                $item_code = trim(str_replace('"','',$cols[4]));
                                $quantity = trim(str_replace('"','',$cols[5]));
                                $u1 = trim(str_replace('"','',$cols[6]));
                                $u2 = trim(str_replace('"','',$cols[7]));
                                $u3 = trim(str_replace('"','',$cols[8]));
                                $u4 = trim(str_replace('"','',$cols[9]));
                                $u5 = trim(str_replace('"','',$cols[10]));
                                $uom = trim(str_replace('"','',$cols[11]));

                                if(
                                    DB::table(PrincipalsUtil::$TBL_INVOICES)
                                        ->where('doc_type',$doc_type)
                                        ->where('doc_no',$doc_no)
                                        ->where('customer_code',$customer_code)
                                        ->where('posting_date',$posting_date)
                                        ->where('item_code',$item_code)
                                        ->where('quantity',$quantity)
                                        ->where('u1',$u1)
                                        ->where('u2',$u2)
                                        ->where('u3',$u3)
                                        ->where('u4',$u4)
                                        ->where('u5',$u5)
                                        ->where('uom',$uom)
                                        ->exists() == false
                                ) {
                                    $invoices[] = [
                                        'created_at'=>date($dateTimeToday),
                                        'doc_type'=>$doc_type,
                                        'doc_no'=>$doc_no,
                                        'customer_code'=>$customer_code,
                                        'posting_date'=>$posting_date,
                                        'item_code'=>$item_code,
                                        'quantity'=>$quantity,
                                        'u1'=>$u1,
                                        'u2'=>$u2,
                                        'u3'=>$u3,
                                        'u4'=>$u4,
                                        'u5'=>$u5,
                                        'uom'=>$uom,
                                        'uploaded_by'=>auth()->user()->id,
                                        'filename'=> $fileName,
                                        'terminal'=>$terminal,
                                    ];
                                }

                            }
                        }
                        $chunks = array_chunk($invoices, 500);
                        foreach($chunks as $chunk) {
                            DB::table(PrincipalsUtil::$TBL_INVOICES)
                                ->insert($chunk);
                        }

                        // DB::table(PrincipalsUtil::$TBL_INVOICES)
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

    public function deleteInvoices(Request $request) {
        $selectedInvoices = $request->selectedInvoices ?? [];
        $res = [];
        // dd($selectedInvoices);
        try {
            DB::beginTransaction();
            foreach($selectedInvoices as $invoice) {
                DB::table(PrincipalsUtil::$TBL_INVOICES)
                    ->where('id', $invoice['id'])
                    ->delete();
                DB::table(PrincipalsUtil::$TBL_GENERATED)
                    ->where('principal_code', $invoice['code'])
                    ->where('doc_no', $invoice['doc_no'])
                    ->where('alturas_customer_code', $invoice['customer_code'])
                    ->where('alturas_item_code', $invoice['item_code'])
                    ->delete();
            }
            DB::commit();
            $res['success'] = true;
            $res['message'] = "Deleted successfully";

            return response()->json($res);
        } catch (\Throwable $th) {
            DB::rollBack();
            $res['success'] = false;
            $res['message'] = $th->getMessage();
            return response()->json($res, 500);
        }
    }
}
