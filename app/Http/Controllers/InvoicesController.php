<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Principals\PrincipalsUtil;
use Facade\FlareClient\Http\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use ZipArchive;

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
        $terminal = request()->terminal ?? '';

        // dd($principal_code);

        $result = DB::table(PrincipalsUtil::$TBL_INVOICES)
            ->where(function($query) use ($search_key, $status){
                $query->where('doc_no','like', '%'.$search_key. '%')
                    ->orWhere('customer_code','like', '%'.$search_key. '%')
                    ->orWhere('posting_date','like', '%'.$search_key. '%')
                    ->orWhere(PrincipalsUtil::$TBL_INVOICES.'.created_at','like', '%'.$search_key. '%')

                    ->orWhere(
                        PrincipalsUtil::$TBL_INVOICES.'.item_code', 'like', '%'.$search_key. '%'
                    )
                    ->orWhere(
                        PrincipalsUtil::$TBL_INVOICES.'.vendor_code', 'like', '%'.$search_key. '%'
                    )

                    ->orWhere('batch_number','like', '%'.$search_key. '%');
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
            ->where(
                PrincipalsUtil::$TBL_INVOICES. '.group','like', '%'.$terminal. '%'
            )

            ->leftJoin('users', 'users.id', PrincipalsUtil::$TBL_INVOICES. '.uploaded_by')
            ->leftJoin(
                PrincipalsUtil::$TBL_PRINCIPALS,
                PrincipalsUtil::$TBL_PRINCIPALS.'.vendor_code',
                PrincipalsUtil::$TBL_INVOICES.'.vendor_code'
            )
            ->select(
                PrincipalsUtil::$TBL_INVOICES. '.*',
                'users.name AS user_fullname',
                'users.username',
                PrincipalsUtil::$TBL_PRINCIPALS.'.name AS principals_name',
                PrincipalsUtil::$TBL_PRINCIPALS.'.code',
                PrincipalsUtil::$TBL_PRINCIPALS.'.vendor_code',
            );

            $sum = $result->sum(PrincipalsUtil::$TBL_INVOICES. '.amount');

            // $invoices = $result->orderBy('id','DESC')
            $invoices = $result->orderBy('posting_date','DESC')
                ->paginate($row_count);

        return response()->json([
            'sum' => $sum,
            'invoices' => $invoices
        ]);
    }

    function groups(Request $request) {
        $groups = DB::table(PrincipalsUtil::$TBL_GROUPS)->get();
        return response()->json($groups);
    }

    function index_1() {
        $row_count = request()->row_count ?? 10;
        $search_key = request()->search_key ?? '';
        $principal_code = request()->principal_code ?? '';
        $status = request()->status ?? '';
        $terminal = request()->terminal ?? '';

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
                    )

                    ->orWhere('batch_number','like', '%'.$search_key. '%');
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
            // ->where(
            //     PrincipalsUtil::$TBL_INVOICES. '.terminal','like', '%'.$terminal. '%'
            // )
            ->where(
                PrincipalsUtil::$TBL_INVOICES. '.group','like', '%'.$terminal. '%'
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
            );

            $sum = $result->sum(PrincipalsUtil::$TBL_INVOICES. '.u3');

            $invoices = $result->orderBy('id','DESC')
                ->paginate($row_count);

        return response()->json([
            'sum' => $sum,
            'invoices' => $invoices
        ]);
    }

    public function syncTextfiles(Request $request) {
        set_time_limit(0);
        $memory_limit = ini_get('memory_limit');

        try {
            $dateTimeToday = Carbon::now()->format('Y-m-d H:i:s');

            // selected source terminal terminal
            $terminal = $request->terminal;

            $terminals = DB::table('terminals')->get();

            foreach($terminals as $terminal) {
                $fileNames = Storage::disk('dsgm_textfiles')->files($terminal->terminal_code);
                // dd($fileNames);
                foreach($fileNames as $fileName) {
                    // $fileName = 'invoices-'. time(). '-'. $file->getClientOriginalName();
                    $uploadedPath = $terminal->terminal_code. "\/UPLOADED\/". substr($dateTimeToday, 0, 10). "/";
                    // Storage::putFileAs($testFilesPath, $file, $fileName);

                    if (Storage::disk('dsgm_textfiles')->exists($fileName)) {

                        $content = Storage::disk('dsgm_textfiles')->get($fileName);

                        $rows = explode(PHP_EOL, utf8_encode($content));

                        // move text file to 'UPLOADED'
                        $fileName = str_replace("$terminal->terminal_code/", '', $fileName);
                        Storage::disk('dsgm_textfiles')->move(
                            "$terminal->terminal_code/$fileName",
                            "$uploadedPath/". time(). "-$fileName"
                        );

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
                                    $doc_type =         trim(str_replace('"','',$cols[0]));
                                    $doc_no =           trim(str_replace('"','',$cols[1]));
                                    $customer_code =    trim(str_replace('"','',$cols[2]));
                                    $posting_date =     trim(str_replace('"','',$cols[3]));
                                    $item_code =        trim(str_replace('"','',$cols[4]));
                                    $quantity =         trim(str_replace('"','',$cols[5]));
                                    $u1 =               trim(str_replace('"','',$cols[6]));
                                    $u2 =               trim(str_replace('"','',$cols[7]));
                                    $u3 =               trim(str_replace('"','',$cols[8]));
                                    $u4 =               trim(str_replace('"','',$cols[9]));
                                    $u5 =               trim(str_replace('"','',$cols[10]));
                                    $uom =              trim(str_replace('"','',$cols[11]));

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
                                            'terminal'=>$terminal->terminal_code,
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

    public function upload_1(Request $request) {
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
                                $doc_type =         trim(str_replace('"','',$cols[0]));
                                $doc_no =           trim(str_replace('"','',$cols[1]));
                                $customer_code =    trim(str_replace('"','',$cols[2]));
                                $posting_date =     trim(str_replace('"','',$cols[3]));
                                $item_code =        trim(str_replace('"','',$cols[4]));
                                $quantity =         trim(str_replace('"','',$cols[5]));
                                $u1 =               trim(str_replace('"','',$cols[6]));
                                $u2 =               trim(str_replace('"','',$cols[7]));
                                $u3 =               trim(str_replace('"','',$cols[8]));
                                $u4 =               trim(str_replace('"','',$cols[9]));
                                $u5 =               trim(str_replace('"','',$cols[10]));
                                $uom =              trim(str_replace('"','',$cols[11]));



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

    public function upload_2(Request $request) {
        set_time_limit(0);
        $memory_limit = ini_get('memory_limit');

        try {
            $dateTimeToday = Carbon::now()->format('Y-m-d H:i:s');

            $batchNumber =  str_replace('-','', $dateTimeToday);
            $batchNumber =  str_replace(' ','', $batchNumber);
            $batchNumber =  str_replace(':','', $batchNumber);
            $batchNumber =  'DSGPM-'.$batchNumber;

            // selected source terminal terminal
            $terminal = $request->terminal;

            $groups = DB::table('groups')->get();

            $summary = [];

            foreach($request->file('files') as $file) {
                $origFilename = $file->getClientOriginalName();

                $summaryItem['file_name'] = $origFilename;

                $group = 'NA';
                foreach($groups as $g) {
                    if(
                        strpos(strtolower($origFilename), strtolower($g->group_code)) > -1
                    ) {
                        $group = $g->group_code;
                        break;
                    }
                }
                // dd($group);

                $fileName = 'invoices-'. time(). '-'. $origFilename;
                $testFilesPath = "public/invoices/". substr($dateTimeToday, 0, 10);
                Storage::putFileAs($testFilesPath, $file, $fileName);


                if (Storage::exists("$testFilesPath/$fileName")) {
                    $content = Storage::get("$testFilesPath/$fileName");
                    $rows = explode(PHP_EOL, utf8_encode($content));

                    $invoices = [];

                    $summaryItem['line_total'] = count($rows);
                    $summaryItem['line_read'] = 0;
                    $summaryItem['line_uploaded'] = 0;
                    $summaryItem['line_existing'] = 0;
                    $summaryItem['skipped_other_principals'] = [];
                    $summaryItem['skipped_unknown_line'] = [];
                    $summaryItem['skipped_not_in_item_masterfile'] = [];

                    $line_number = 0;

                    if(count($rows) > 0) {
                        //set memory limit to unli for heavy stuff processing
                        ini_set('memory_limit', -1);

                        foreach ($rows as $row) {
                            $line_number += 1;

                            // $cols = preg_split('/,(?=(?:(?:[^"]*"){2})*[^"]*$)/', $row);
                            $cols = explode('|', $row);

                            if (
                                count($cols) == 12
                                && $cols[0][0] != '#'
                                && trim(str_replace('"','',$cols[0])) != 'Credit Memo'
                            ) {
                                $doc_type =         trim(str_replace('"','',$cols[0]));
                                $doc_no =           trim(str_replace('"','',$cols[1]));
                                $customer_code =    trim(str_replace('"','',$cols[2]));
                                $posting_date =     trim(str_replace('"','',$cols[3]));
                                $item_code =        trim(str_replace('"','',$cols[4]));
                                $quantity =         trim(str_replace('"','',$cols[5]));
                                $u1 =               trim(str_replace('"','',$cols[6]));
                                $u2 =               trim(str_replace('"','',$cols[7]));
                                $u3 =               trim(str_replace('"','',$cols[8]));
                                $u4 =               trim(str_replace('"','',$cols[9]));
                                $u5 =               trim(str_replace('"','',$cols[10]));
                                $uom =              trim(str_replace('"','',$cols[11]));


                                // -------------------------------------------------------
                                $item =
                                    DB::table(PrincipalsUtil::$TBL_GENERAL_ITEMS)
                                    ->where(
                                        PrincipalsUtil::$TBL_GENERAL_ITEMS. '.item_code',
                                        $item_code
                                    )
                                    ->first();

                                if($item != null) {
                                    $isNotFromOtherPrincipals = null;
                                    if($item->vendor_code=="") {
                                        $isNotFromOtherPrincipals = true;
                                    } else {
                                        $isNotFromOtherPrincipals =
                                            DB::table(PrincipalsUtil::$TBL_PRINCIPALS)
                                                ->where('vendor_code', $item->vendor_code)
                                                ->exists();
                                    }

                                    if($isNotFromOtherPrincipals) {
                                        // dd('passed');
                                        $summaryItem['line_read'] += 1;
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
                                                'filename'=> $origFilename,
                                                'group'=>$group,
                                                'batch_number' => $batchNumber
                                            ];

                                            $summaryItem['line_uploaded'] += 1;
                                        } else {
                                            $summaryItem['line_existing'] += 1;
                                        }
                                    } else {
                                        $summaryItem['skipped_other_principals'][$line_number] = $row;
                                    }
                                } else {
                                    $summaryItem['skipped_not_in_item_masterfile'][$line_number]
                                        = $row;
                                }
                                // -------------------------------------------------------

                            } else {
                                if(str_replace(' ','',$row) == '') {
                                    $row = 'BLANK_LINE';
                                }
                                $summaryItem['skipped_unknown_line'][$line_number] = $row;
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

                    $summary[] = $summaryItem;
                }
            }

            // revert to the default memory limit
            ini_set('memory_limit', $memory_limit);

            $res['success'] = true;
            $res['message'] = 'Successful';
            $res['batch_number'] = $batchNumber;
            $res['summary'] = $summary;
            return response()->json($res, 200);

        } catch (\Throwable $th) {
            $res['success'] = false;
            $res['message'] = $th->getMessage();
            return response()->json($res, 500);
        }
    }

    public function upload(Request $request) {
        set_time_limit(0);
        $memory_limit = ini_get('memory_limit');

        try {
            $dateTimeToday = Carbon::now()->format('Y-m-d H:i:s');

            $batchNumber =  str_replace('-','', $dateTimeToday);
            $batchNumber =  str_replace(' ','', $batchNumber);
            $batchNumber =  str_replace(':','', $batchNumber);
            $batchNumber =  'DSGPM-'.$batchNumber;

            $groups = DB::table('groups')->get();

            $summary = [];

            $fileCount = 0;
            foreach($request->file('files') as $file) {
                $origFilename = $file->getClientOriginalName();
                $summaryItem['file_name'] = $origFilename;

                $group = 'NA';
                foreach($groups as $g) {
                    if(
                        strpos(strtolower($origFilename), strtolower($g->group_code)) > -1
                    ) {
                        $group = $g->group_code;
                        break;
                    }
                }

                // if $group is still 'NA', do not accept the file
                if($group=='NA') {
                    break;
                }

                $fileCount += 1;
                // if no group keyword found in the filename, skip reading the file...
                // if($group=='NA') {
                //     break;
                // } else {
                //     $fileCount += 1;
                // }
                // dd($group);

                $fileName = 'invoices-'. time(). '-'. $origFilename;
                $testFilesPath = "public/invoices/". substr($dateTimeToday, 0, 10);
                Storage::putFileAs($testFilesPath, $file, $fileName);

                if (Storage::exists("$testFilesPath/$fileName")) {
                    $content = Storage::get("$testFilesPath/$fileName");
                    $rows = explode(PHP_EOL, utf8_encode($content));

                    $invoices = [];

                    $summaryItem['line_total'] = count($rows);
                    $summaryItem['line_read'] = 0;
                    $summaryItem['line_uploaded'] = 0;
                    $summaryItem['line_existing'] = 0;
                    $summaryItem['skipped_other_principals'] = [];
                    $summaryItem['skipped_unknown_line'] = [];
                    $summaryItem['skipped_not_in_item_masterfile'] = [];
                    $summaryItem['skipped_zero_qty'] = [];

                    $line_number = 0;

                    if(count($rows) > 0) {
                        //set memory limit to unli for heavy stuff processing
                        ini_set('memory_limit', -1);

                        foreach ($rows as $row) {
                            $line_number += 1;

                            // $cols = preg_split('/,(?=(?:(?:[^"]*"){2})*[^"]*$)/', $row);
                            $cols = explode('|', $row);

                            if (
                                count($cols) == 14
                                && $cols[0][0] != '#'
                                && trim(str_replace('"','',$cols[0])) != 'Credit Memo'
                            ) {
                                $vendor_code =      trim(str_replace('"','',$cols[0]));
                                $customer_code =    trim(str_replace('"','',$cols[1]));
                                $doc_no =           trim(str_replace('"','',$cols[2]));
                                $item_code =        trim(str_replace('"','',$cols[5]));
                                $posting_date =     trim(str_replace('"','',$cols[6]));
                                $item_description = trim(str_replace('"','',$cols[7]));
                                $uom =              trim(str_replace('"','',$cols[8]));
                                $quantity =         trim(str_replace('"','',$cols[9]));
                                $quantity =         trim(str_replace(',','',$quantity));
                                $price =            trim(str_replace('"','', str_replace(',','',$cols[10])));
                                $price =            trim(str_replace(',','', $price));
                                $amount =           trim(str_replace('"','', str_replace(',','',$cols[11])));
                                $amount =           trim(str_replace(',','', $amount));
                                $qty_per_uom =      trim(str_replace('"','',$cols[12]));
                                $qty_per_uom =      trim(str_replace(',','',$qty_per_uom));
                                $uom_code =         trim(str_replace('"','',$cols[13]));

                                $isNotFromOtherPrincipals = null;
                                if($vendor_code=="") {
                                    $isNotFromOtherPrincipals = true;
                                } else {
                                    $isNotFromOtherPrincipals =
                                        DB::table(PrincipalsUtil::$TBL_PRINCIPALS)
                                            ->where('vendor_code', $vendor_code)
                                            ->exists();
                                }

                                if($isNotFromOtherPrincipals) {
                                    // dd('passed');

                                    if (
                                        DB::table(PrincipalsUtil::$TBL_INVOICES)
                                            ->where('vendor_code',$vendor_code)
                                            ->where('customer_code',$customer_code)
                                            ->where('doc_no',$doc_no)
                                            // ->where('posting_date',$posting_date)
                                            ->where('item_code',$item_code)
                                            ->where('uom',$uom)
                                            ->where('quantity',$quantity)
                                            // ->where('price',$price)
                                            // ->where('amount',$amount)
                                            // ->where('qty_per_uom',$qty_per_uom)
                                            // ->where('uom_code',$uom_code)

                                            ->exists() == false
                                    ) {
                                        if($quantity > 0) {
                                            $summaryItem['line_read'] += 1;

                                            $invoices[] = [
                                                'created_at'=>date($dateTimeToday),
                                                'uploaded_by'=>auth()->user()->id,
                                                'filename'=> $origFilename,
                                                'group'=>$group,
                                                'batch_number' => $batchNumber,
                                                //
                                                'vendor_code'=>$vendor_code,
                                                'customer_code'=>$customer_code,
                                                'doc_no'=>$doc_no,
                                                'posting_date'=>$posting_date,
                                                'item_code'=>$item_code,
                                                'item_description'=>$item_description,
                                                'uom'=>$uom,
                                                'quantity'=>$quantity,
                                                'price'=>$price,
                                                'amount'=>$amount,
                                                'qty_per_uom'=>$qty_per_uom,
                                                'uom_code'=>$uom_code
                                            ];

                                            $summaryItem['line_uploaded'] += 1;
                                        } else {
                                            $summaryItem['skipped_zero_qty'][$line_number] = $row;
                                        }
                                    } else {
                                        $summaryItem['line_existing'] += 1;
                                    }
                                } else {
                                    $summaryItem['skipped_other_principals'][$line_number] = $row;
                                }
                            // -------------------------------------------------------

                            } else {
                                if(str_replace(' ','',$row) == '') {
                                    $row = 'BLANK_LINE';
                                }
                                $summaryItem['skipped_unknown_line'][$line_number] = $row;
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

                    $summary[] = $summaryItem;
                }
            }

            // revert to the default memory limit
            ini_set('memory_limit', $memory_limit);

            if($fileCount>0) {
                $res['success'] = true;
                $res['message'] = 'Successful';
            }
            // else {
            //     $res['success'] = false;
            //     $res['message'] = "Unable to read the file(s).
            //         No group keyword found in the filename(s)";
            // }

            $res['batch_number'] = $batchNumber;
            $res['summary'] = $summary;

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

                // "others" is the default middleware code for non-principal items
                $principal_code = $invoice['code'] ?? 'others';

                DB::table(PrincipalsUtil::$TBL_INVOICES)
                    ->where('id', $invoice['id'])
                    ->delete();
                DB::table(PrincipalsUtil::$TBL_GENERATED)
                    ->where('principal_code', $principal_code)
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


    public function resetInvoices(Request $request) {
        $selectedInvoices = $request->selectedInvoices ?? [];

        $res = [];
        // dd($selectedInvoices);
        try {
            DB::beginTransaction();
            foreach($selectedInvoices as $invoice) {

                // "others" is the default middleware code for non-principal items
                $principal_code = $invoice['code'] ?? 'others';

                DB::table(PrincipalsUtil::$TBL_INVOICES)
                    ->where('id', $invoice['id'])
                    // ->delete();
                    ->update([
                        'status'=>PrincipalsUtil::$STATUS_PENDING
                    ]);
                // DB::table(PrincipalsUtil::$TBL_GENERATED)
                //     ->where('principal_code', $principal_code)
                //     ->where('doc_no', $invoice['doc_no'])
                //     ->where('alturas_customer_code', $invoice['customer_code'])
                //     ->where('alturas_item_code', $invoice['item_code'])
                //     ->delete();
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


    /**
     * Get the overall total amount of the uploaded invoices
     * // principal specific
     */
    public function invoicesTotalAmount_1() {
        try {
            $vendor_code = DB::table(PrincipalsUtil::$TBL_PRINCIPALS)
                ->where('code', request()->principal_code ?? 'NA')
                ->first();

            $res = DB::table(PrincipalsUtil::$TBL_INVOICES)
                ->where('vendor_code', $vendor_code)
                ->where('status', request()->status)

                ->sum('amount');

            return response()->json($res);
        } catch (\Throwable $th) {
            $res['success'] = false;
            $res['message'] = $th->getMessage();
            return response()->json($res, 500);
        }
    }


    /**
     * Get the overall total amount of the uploaded invoices
     * // principal specific
     */
    public function invoicesGrandTotal() {
        try {
            $vendor = DB::table(PrincipalsUtil::$TBL_PRINCIPALS)
                ->where('code', request()->principal_code ?? 'NA')
                ->first();

            $res = DB::table(PrincipalsUtil::$TBL_INVOICES)
                ->where('vendor_code', $vendor->vendor_code)
                // ->where('status', request()->status)
                ->sum('amount');

            return response()->json($res);
        } catch (\Throwable $th) {
            $res['success'] = false;
            $res['message'] = $th->getMessage();
            return response()->json($res, 500);
        }
    }

    /**
     * Change invoice's status to 'complete'
     * NOTE: This happens when the user exports the generated templated data
     */
    public function setInvoicesComplete(Request $request)
    {
        set_time_limit(0);
        $dateToday = Carbon::now()->format('Y-m-d H:i:s');

        // generated data
        DB::beginTransaction();
        try {
            foreach ($request->generated_data[0]['output_template'] as $gendata) {
                foreach ($gendata[1] as $line) {
                    if (
                        $line['customer_notfound'] == 0 && $line['item_notfound'] == 0
                        && $line['salesman_notfound'] == 0
                    ) {
                        // dd($line);
                        DB::table(PrincipalsUtil::$TBL_INVOICES)
                            ->where('doc_no', $line['doc_no'])
                            ->where('item_code', $line['alturas_item_code'])
                            ->where('status', 'pending')
                            ->update([
                                'status' => 'completed',
                                'updated_at' => $dateToday
                            ]);
                    }
                }
            }

            DB::commit();
            $response = [
                'success' => true,
                'message' => 'Successful',
            ];
            return response()->json($response);
        } catch (\Throwable $th) {
            DB::rollBack();
            $response['success'] = false;
            $response['message'] = $th->getMessage();
            return response()->json($response, 500);
        }
    }



    /**
     * Export to textfile
     */

    public function extract(Request $request) {
        set_time_limit(0);
        try {
            $principal_code = $request->principal_code;

            // $dates = explode(',', $request->input('posting_date'));
            $dates = $request->input('posting_date');
            sort($dates);
            $dateFrom = '';
            $dateTo = '';
            if(count($dates) > 1) {
                $dateFrom = $dates[0];
                $dateTo = $dates[1];
            } else if(count($dates) == 1) {
                $dateFrom = $dates[0];
                $dateTo = $dates[0];
            }
            $dateFrom = new Carbon($dateFrom);
            $dateTo = new Carbon($dateTo);

            $vendor_code = DB::table(PrincipalsUtil::$TBL_PRINCIPALS)
                ->where('code', $principal_code)->first()->vendor_code ?? 'NA';

            $invoices = DB::table(PrincipalsUtil::$TBL_INVOICES)
                ->where('vendor_code', $vendor_code)
                ->whereBetween(
                    DB::raw("STR_TO_DATE(posting_date, '%m/%d/%Y')"),
                    [$dateFrom, $dateTo])
                ->orderBy('doc_no')
                ->get()
                ;

            $zip_file = public_path('invoices.zip');
            $zip = new ZipArchive();
            $zip->open($zip_file, ZipArchive::CREATE | ZipArchive::OVERWRITE);

            $groups = [];

            foreach($invoices as $inv) {
                if(!isset($groups[$inv->group])) {
                    $groups[$inv->group]['filename'] =
                        $inv->group. '_'. $dateFrom->format('Y-m-d'). '_'.
                        $dateTo->format('Y-m-d'). '.txt';
                    $groups[$inv->group]['data'] = '';
                }
                $groups[$inv->group]['data'] = $groups[$inv->group]['data'].
                    '"'. $inv->vendor_code. '"|'.
                    '"'. $inv->customer_code. '"|'.
                    '"'. $inv->doc_no. '"|'.
                    '"'. $inv->posting_date. '"|'.
                    '"'. $inv->item_code. '"|'.
                    '"'. $inv->item_description. '"|'.
                    '"'. $inv->uom. '"|'.
                    '"'. $inv->quantity. '"|'.
                    '"'. $inv->price. '"|'.
                    '"'. $inv->amount. '"|'.
                    '"'. $inv->qty_per_uom. '"|'.
                    '"'. $inv->uom_code. '"'.
                    PHP_EOL;
            }

            foreach($groups as $g) {
                Storage::put("public\\test\\$g[filename]", $g['data']);
            }

            $files = Storage::files('public\\test');
            foreach($files as $file) {
                $zip->addFile(storage_path("app\\$file"), basename($file));
            }

            $zip->close();

            Storage::deleteDirectory('public\\test');

            return response()->download(
                $zip_file,
                $principal_code. '_invoices_'.
                    $dateFrom->format('Y-m-d'). '_'. $dateTo->format('Y-m-d'). '.zip'
            );
        } catch (\Throwable $th) {
            //throw $th;
            return response()->json($th->getMessage(), 500);
        }
    }



    /**
     * Export raw invoices to excel
     */

    public function extractRawInvoicesToExcel(Request $request) {
        set_time_limit(0);
        try {
            // $dates = explode(',', $request->input('posting_date'));
            $dates = $request->input('posting_date');
            sort($dates);
            $dateFrom = '';
            $dateTo = '';
            if(count($dates) > 1) {
                $dateFrom = $dates[0];
                $dateTo = $dates[1];
            } else if(count($dates) == 1) {
                $dateFrom = $dates[0];
                $dateTo = $dates[0];
            }

            $dateFrom = new Carbon($dateFrom);
            $dateTo = new Carbon($dateTo);

            $principal_code = $request->principal_code;
            $vendor_code = DB::table(PrincipalsUtil::$TBL_PRINCIPALS)
                ->where('code', $principal_code)->first()->vendor_code ?? 'NA';

            $invoices = DB::table(PrincipalsUtil::$TBL_INVOICES)
                ->where('vendor_code', $vendor_code)
                ->whereBetween(
                    DB::raw("STR_TO_DATE(posting_date, '%m/%d/%Y')"),
                    [$dateFrom, $dateTo])
                ->orderBy('posting_date')
                ->orderBy('doc_no')
                ->get()
                ;

            $groups = [];
            foreach($invoices as $inv) {
                if(!isset($groups[$inv->group])) {
                    $groups[$inv->group] = [];
                }
                $groups[$inv->group][] = $inv;
            }

            return response()->json($groups);
        } catch (\Throwable $th) {
            //throw $th;
            return response()->json($th->getMessage(), 500);
        }
    }


    public static function getPendingInvoices($principal_code, $posting_date_range) {
        // posting date range
        $dates = explode(',', $posting_date_range);
        sort($dates);
        $dateFrom = '';
        $dateTo = '';
        if(count($dates) > 1) {
            $dateFrom = $dates[0];
            $dateTo = $dates[1];
        } else if(count($dates) == 1) {
            $dateFrom = $dates[0];
            $dateTo = $dates[0];
        }
        $dateFrom = new Carbon($dateFrom);
        $dateTo = new Carbon($dateTo);

        return DB::table(PrincipalsUtil::$TBL_INVOICES)
        ->where(
            'vendor_code',
            DB::table(PrincipalsUtil::$TBL_PRINCIPALS)
                ->where('code', $principal_code)
                ->select('vendor_code')
                ->first()->vendor_code ?? 'NA'
        )
        ->whereBetween(
            DB::raw("STR_TO_DATE(posting_date, '%m/%d/%Y')"),
            [$dateFrom, $dateTo])
        ->orderBy('customer_code')
        ->orderBy('posting_date')
        ->orderBy('doc_no')
        ->where('status', 'pending')
        ->get();
    }
}
