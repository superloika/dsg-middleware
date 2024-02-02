<?php

namespace App\Http\Controllers;

use App\Events\GenerateTemplated;
use App\Events\UploadInvoice;
use App\Http\Controllers\Principals\PrincipalsUtil;
use Facade\FlareClient\Http\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use ZipArchive;

class InvoicesController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    function index($forTotal = false) {
        // *************************************************
        // $vendor_codes = "";
        // $vcs = DB::table('principals')->where('active', 1)
        //     ->orderBy('id')->pluck('vendor_code');
        // foreach($vcs as $vc) {
        //     if($vendor_codes=="") {
        //         $vendor_codes = $vc;
        //     } else {
        //         $vendor_codes = $vendor_codes. "|$vc";
        //     }
        // }
        // dd($vendor_codes);
        // *************************************************

        // posting date range
        $dates = explode(',', request()->upload_date_range);
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
        // dd($dateFrom. '-----'. $dateTo);
        // /posting date range

        $row_count = request()->row_count ?? 10;
        $search_key = request()->search_key ?? '';
        $principal_code = request()->principal_code ?? '';
        // $vendor_code = request()->vendor_code ?? '';
        $status = request()->status ?? '';
        $terminal = request()->terminal ?? '';

        // dd($principal_code);

        $result = DB::table(PrincipalsUtil::$TBL_INVOICES)
            ->when($search_key != '', function($q) use($search_key) {
                $q->where(function($query) use ($search_key){
                    $query->where(
                            PrincipalsUtil::$TBL_INVOICES.'.doc_no',
                            'like', '%'.$search_key. '%'
                        )
                        ->orWhere(
                            PrincipalsUtil::$TBL_INVOICES.'.customer_code',
                            'like', '%'.$search_key. '%'
                        )
                        // ->orWhere(
                        //     PrincipalsUtil::$TBL_INVOICES.'.posting_date',
                        //     'like', '%'.$search_key. '%'
                        // )
                        // ->orWhere(
                        //     PrincipalsUtil::$TBL_INVOICES.'.shipment_date',
                        //     'like', '%'.$search_key. '%'
                        // )
                        // ->orWhere(
                        //     PrincipalsUtil::$TBL_INVOICES.'.created_at',
                        //     'like', '%'.$search_key. '%'
                        // )

                        ->orWhere(
                            PrincipalsUtil::$TBL_INVOICES.'.item_code',
                            'like', '%'.$search_key. '%'
                        )
                        ->orWhere(
                            PrincipalsUtil::$TBL_INVOICES.'.vendor_code',
                            'like', '%'.$search_key. '%'
                        )
                        ->orWhere(
                            PrincipalsUtil::$TBL_INVOICES.'.customer_name',
                            'like', '%'.$search_key. '%'
                        )
                        ->orWhere(
                            PrincipalsUtil::$TBL_INVOICES.'.sm_code',
                            'like', '%'.$search_key. '%'
                        )

                        ->orWhere('batch_number','like', '%'.$search_key. '%');
                });
            })
            ->when($principal_code != '', function($query) use($principal_code) {
                // if($principal_code != '') {
                if($principal_code=='others') {
                    $query->where(PrincipalsUtil::$TBL_INVOICES.'.vendor_code', null);
                } else {
                    $vendor_codes = DB::table(PrincipalsUtil::$TBL_PRINCIPALS)
                        ->where('main_vendor_code', $principal_code)->pluck('vendor_code')->toArray();
                    $query->whereIn(PrincipalsUtil::$TBL_INVOICES.'.vendor_code', $vendor_codes);
                }
                // }
            })
            ->when($status != '' && $status != 'all', function($q) use($status) {
                $q->where(PrincipalsUtil::$TBL_INVOICES.'.status','like', "%$status%");
            })
            // terminal=group (NAV term)
            ->when($terminal != '' && $terminal != 'all', function($q) use($terminal) {
                $q->where(
                    PrincipalsUtil::$TBL_INVOICES. '.group','like', '%'.$terminal. '%'
                );
            })
            ->whereBetween(
                // DB::raw('DATE('. PrincipalsUtil::$TBL_INVOICES. ".created_at". ')'),
                'posting_date',
                [$dateFrom->startOfDay(), $dateTo->endOfDay()]
            );


        if($forTotal) {
            return $result;
        } else {
            return response()->json([
                'sum' => 0, // wala na ni
                'invoices' => $result->select(PrincipalsUtil::$TBL_INVOICES. '.*')
                    ->paginate($row_count)
            ]);
        }
    }



    function grandTotal() {
        return response()->json([
            'sum' => $this->index(true)->sum(PrincipalsUtil::$TBL_INVOICES. '.amount')
        ]);
    }



    function lookup() {
        $search_key = trim(request()->search_key ?? '');

        // dd($search_key);
        $result = null;

        if($search_key != '') {
            $result = DB::table(PrincipalsUtil::$TBL_INVOICES)
                ->where(function($query) use ($search_key) {
                    $query->where(PrincipalsUtil::$TBL_INVOICES.'.doc_no',$search_key)
                        // ->orWhere(PrincipalsUtil::$TBL_INVOICES.'.ext_doc_no', $search_key)
                        ;
                })

                // ->select(PrincipalsUtil::$TBL_INVOICES. '.*')
                ->get();
        }

        return response()->json($result);
    }



    function groups(Request $request) {
        $groups = DB::table(PrincipalsUtil::$TBL_GROUPS)->get();
        return response()->json($groups);
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

            $filenames = "";

            // unknown files (unmatched group prefix on filename)
            $ufiles = [];

            $fileCount = 0;

            $files = $request->file('files');
            $totalFileCount = count($files);
            $progressMsg = '';

            // invoices/cm text file col counts per line
            $invoice_line_col_count = 15;
            $invoice_header_col_count = 8;
            $cm_line_col_count = 12;
            $cm_header_col_count = 10;

            foreach($files as $file) {
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
                    $ufiles[] = $origFilename;
                    continue;
                }

                $fileCount += 1;
                // if no group keyword found in the filename, skip reading the file...
                // if($group=='NA') {
                //     break;
                // } else {
                //     $fileCount += 1;
                // }
                // dd($group);

                // $fileName = 'invoices-'. time(). '-'. $origFilename;
                $fileName = $origFilename;
                $testFilesPath = "public/invoices/". substr($dateTimeToday, 0, 10);
                Storage::putFileAs($testFilesPath, $file, $fileName);

                if (Storage::exists("$testFilesPath/$fileName")) {
                    $content = Storage::get("$testFilesPath/$fileName");
                    // CONVERT ENCODING  *********************************************
                    // dd(utf8_encode($content));
                    // dd(mb_convert_encoding($content, "UTF-8"));

                    // $rows = explode(PHP_EOL, utf8_encode($content));
                    // $rows = explode("\n", utf8_encode($content));

                    $rows = explode(PHP_EOL, mb_convert_encoding($content, "UTF-8"));
                    // $rows = explode("\n", mb_convert_encoding($content, "UTF-8"));
                    // /CONVERT ENCODING *********************************************

                    $totalRowCount = count($rows);

                    // invoice lines
                    $invoices = [];
                    // invoice headers
                    $invoices_h = [];
                    // CM lines
                    $cm_lines = [];
                    // CM headers
                    $cm_headers = [];

                    $summaryItem['row_count'] = count($rows);

                    // invoices lines
                    $summaryItem['lines_count'] = 0;
                    $summaryItem['lines_count_existing'] = 0;
                    $summaryItem['lines_count_uploaded'] = 0;

                    // invoices headers
                    $summaryItem['headers_count'] = 0;
                    $summaryItem['headers_count_existing'] = 0;
                    $summaryItem['headers_count_uploaded'] = 0;

                    // CM lines
                    $summaryItem['cm_lines_count'] = 0;
                    $summaryItem['cm_lines_count_existing'] = 0;
                    $summaryItem['cm_lines_count_uploaded'] = 0;

                    // CM headers
                    $summaryItem['cm_headers_count'] = 0;
                    $summaryItem['cm_headers_count_existing'] = 0;
                    $summaryItem['cm_headers_count_uploaded'] = 0;

                    $line_number = 0;

                    // remarks lines
                    // $cmRemarks = [];

                    if($totalRowCount > 0) {
                        //set memory limit to unli for heavy stuff processing
                        ini_set('memory_limit', -1);

                        foreach ($rows as $row) {
                            $line_number += 1;

                            $progressPercent = round(($line_number / $totalRowCount) * 100);

                            // $cols = preg_split('/,(?=(?:(?:[^"]*"){2})*[^"]*$)/', $row);
                            $cols = explode('|', $row);

                            // INVOICE LINES ****************************************************************************************
                            $col_count = count($cols);
                            if (
                                // ($col_count == 14 || $col_count == 15 || $col_count == 16 || $col_count == 17)
                                // $col_count == 16
                                ($col_count == $invoice_line_col_count || $col_count == 14)
                                && $cols[0][0] != '#'
                                // && trim(str_replace('"','',$cols[0])) != 'Credit Memo'
                                && trim(str_replace('"','',$cols[0])) != ''
                                && ($shipment_date = trim(str_replace('"','',$cols[6]))) != ''
                            ) {
                                $vendor_code =          trim(str_replace('"','',$cols[0]));
                                $customer_code =        trim(str_replace('"','',$cols[1]));
                                $doc_no =               trim(str_replace('"','',$cols[2]));
                                $item_code =            trim(str_replace('"','',$cols[5]));
                                $shipment_date =        Carbon::createFromFormat('m/d/y', $shipment_date);
                                $shipment_date =        $shipment_date->format('Y-m-d');
                                $item_description =     trim(str_replace('"','',$cols[7]));
                                $uom =                  trim(str_replace('"','',$cols[8]));
                                $quantity =             trim(str_replace('"','',$cols[9]));
                                $quantity =             trim(str_replace(',','',$quantity));
                                $price =                trim(str_replace('"','', str_replace(',','',$cols[10])));
                                $price =                trim(str_replace(',','', $price));
                                $amount =               trim(str_replace('"','', str_replace(',','',$cols[11])));
                                $amount =               trim(str_replace(',','', $amount));
                                $qty_per_uom =          trim(str_replace('"','',$cols[12]));
                                $qty_per_uom =          trim(str_replace(',','',$qty_per_uom));
                                $uom_code =             trim(str_replace('"','',$cols[13]));
                                $discount_percentage =  trim(str_replace('"','',$cols[14] ?? 0));
                                $vat_percentage =       trim(str_replace('"','',$cols[15] ?? 0));

                                UploadInvoice::dispatch(
                                    "($fileCount of $totalFileCount) $origFilename " .
                                    "[invoice_lines: $doc_no] ($progressPercent%) "
                                );

                                if($quantity > 0) {
                                    $summaryItem['lines_count'] += 1;

                                    if (
                                        DB::table(PrincipalsUtil::$TBL_INVOICES)
                                            ->where('vendor_code',$vendor_code)
                                            ->where('doc_no',$doc_no)
                                            ->where('customer_code',$customer_code)
                                            ->where('item_code',$item_code)
                                            ->where('uom',$uom)
                                            ->where('quantity',$quantity)
                                            ->where('shipment_date',$shipment_date)
                                            ->exists()
                                    ) {
                                        $summaryItem['lines_count_existing'] += 1;
                                    } else {
                                        // invoice line
                                        $invoice_l = [
                                            'created_at' => date($dateTimeToday),
                                            'uploaded_by' => auth()->user()->id,
                                            // 'filename' =>  $origFilename,
                                            'filename' =>  '',
                                            'group' =>                  $group,
                                            'batch_number'  =>          $batchNumber,
                                            //
                                            'vendor_code' =>            $vendor_code,
                                            'customer_code' =>          $customer_code,
                                            'doc_no' =>                 $doc_no,
                                            'shipment_date' =>          $shipment_date,
                                            'item_code' =>              $item_code,
                                            'item_description' =>       $item_description,
                                            'uom' =>                    $uom,
                                            'quantity' =>               $quantity,
                                            'price' =>                  $price,
                                            'amount' =>                 $amount,
                                            'qty_per_uom' =>            $qty_per_uom,
                                            'uom_code' =>               $uom_code,
                                            'discount_percentage' =>    $discount_percentage,
                                            'vat_percentage' =>         $vat_percentage,
                                            /**
                                             * // set default posting date temporarily since invoice_lines does not have one,
                                             * it will be updated with the exact posting_date when an invoice_header
                                             * is uploaded which contains the posting_date
                                             */
                                            'posting_date' => '2000-01-01',
                                        ];
                                        DB::table(PrincipalsUtil::$TBL_INVOICES)->insert($invoice_l);
                                        $summaryItem['lines_count_uploaded'] += 1;
                                    }
                                }
                            // INVOICE HEADERS **************************************************************************************
                            } else if (
                                // ($col_count == 8 || $col_count == 9)
                                // $col_count == 9
                                $col_count == $invoice_header_col_count
                                && $cols[0][0] != '#'
                                // && trim(str_replace('"','',$cols[0])) != 'Credit Memo'
                                && trim(str_replace('"','',$cols[0])) != ''
                                && ($posting_date = trim(str_replace('"','',$cols[5]))) != ''
                            ) {
                                $summaryItem['headers_count'] += 1;

                                $doc_no =           trim(str_replace('"','',$cols[0]));
                                $customer_code =    trim(str_replace('"','',$cols[1]));
                                $customer_name =    trim(str_replace('"','',$cols[2]));
                                $u1 =               trim(str_replace('"','',$cols[3]));
                                $u2 =               trim(str_replace('"','',$cols[4]));
                                $posting_date =     Carbon::createFromFormat('m/d/y', $posting_date);
                                $posting_date =     $posting_date->format('Y-m-d');
                                // $shipment_date =    Carbon::createFromFormat('m/d/y', trim(str_replace('"','',$cols[6])));
                                // $shipment_date =    $shipment_date->format('Y-m-d');
                                $sm_code =          trim(str_replace('"','',$cols[7]));
                                $ext_doc_no =       trim(str_replace('"','',($cols[8] ?? '')));
                                // $ext_doc_no =       trim(str_replace('"','',$cols[8] ?? $doc_no));
                                // $ext_doc_no =       $ext_doc_no=='' ? $doc_no : $ext_doc_no;
                                UploadInvoice::dispatch(
                                    "($fileCount of $totalFileCount) $origFilename " .
                                    "[invoice_headers: $doc_no] ($progressPercent%)"
                                );

                                if(
                                    DB::table(PrincipalsUtil::$TBL_INVOICES)
                                    ->where('doc_no',$doc_no)
                                    ->where('customer_code',$customer_code)
                                    // ->whereNull('posting_date')
                                    ->where('posting_date', '2000-01-01')
                                    ->update(
                                        [
                                            'customer_name' => $customer_name,
                                            'posting_date' => $posting_date,
                                            'sm_code' => $sm_code,
                                            'ext_doc_no' => $ext_doc_no,
                                        ]
                                    ) > 0
                                ) {
                                    $summaryItem['headers_count_uploaded'] += 1;
                                } else {
                                    // store skipped headers count temporarily, rename term soon
                                    $summaryItem['headers_count_existing'] += 1;
                                }
                            // CM LINES **********************************************************************************************
                            } else if (
                                // ($col_count == 12 || $col_count == 13 || $col_count == 14)
                                // $col_count == 13
                                $col_count == $cm_line_col_count
                                && $cols[0][0] != '#'
                                // && trim(str_replace('"','',$cols[0])) != ''
                                && ($shipment_date = trim(str_replace('"','',$cols[3]))) != ''
                            ) {
                                $customer_code =        trim(str_replace('"','',$cols[0]));
                                $doc_no =               trim(str_replace('"','',$cols[1]));
                                $item_code =            trim(str_replace('"','',$cols[2]));
                                $shipment_date =        Carbon::createFromFormat('m/d/y', $shipment_date);
                                $shipment_date =        $shipment_date->format('Y-m-d');
                                $item_description =     trim(str_replace('"','',$cols[4]));
                                $uom =                  trim(str_replace('"','',$cols[5]));
                                $quantity =             trim(str_replace('"','',$cols[6]));
                                $quantity =             trim(str_replace(',','',$quantity));
                                $price =                trim(str_replace('"','', str_replace(',','',$cols[7])));
                                $price =                trim(str_replace(',','', $price));
                                $amount =               trim(str_replace('"','', str_replace(',','',$cols[8])));
                                $amount =               trim(str_replace(',','', $amount));
                                $qty_per_uom =          trim(str_replace('"','',$cols[9]));
                                $qty_per_uom =          trim(str_replace(',','',$qty_per_uom));
                                $uom_code =             trim(str_replace('"','',$cols[10]));
                                $discount_percentage =  trim(str_replace('"','',$cols[11] ?? 0));
                                $vat_percentage =       trim(str_replace('"','',$cols[12] ?? 0));
                                // $ext_doc_no =        trim(str_replace('"','',$cols[13] ?? $doc_no));
                                // $ext_doc_no =        $ext_doc_no=='' ? $doc_no : $ext_doc_no;
                                UploadInvoice::dispatch(
                                    "($fileCount of $totalFileCount) $origFilename " .
                                    "[cm_lines: $doc_no]"." ($progressPercent%)"
                                );

                                if($quantity > 0) {
                                    $summaryItem['cm_lines_count'] += 1;

                                    if (
                                        DB::table(PrincipalsUtil::$TBL_CM)
                                            ->where('doc_no',$doc_no)
                                            ->where('customer_code',$customer_code)
                                            ->where('item_code',$item_code)
                                            ->where('uom',$uom)
                                            ->where('quantity',$quantity)
                                            ->where('shipment_date',$shipment_date)
                                            ->exists() == false
                                    ) {
                                        $cm_l = [
                                            'created_at' =>             date($dateTimeToday),
                                            'uploaded_by' =>            auth()->user()->id,
                                            // 'filename' => $origFilename,
                                            'filename' =>  '',
                                            'group' =>                  $group,
                                            'batch_number' =>           $batchNumber,
                                            //
                                            'customer_code' =>          $customer_code,
                                            'doc_no' =>                 $doc_no,
                                            'shipment_date' =>          $shipment_date,
                                            'item_code' =>              $item_code,
                                            'item_description' =>       $item_description,
                                            'uom' =>                    $uom,
                                            'quantity' =>               $quantity,
                                            'price' =>                  $price,
                                            'amount' =>                 $amount,
                                            'qty_per_uom' =>            $qty_per_uom,
                                            'uom_code' =>               $uom_code,
                                            'discount_percentage' =>    $discount_percentage,
                                            'vat_percentage' =>         $vat_percentage,
                                            // 'ext_doc_no' => $ext_doc_no,
                                            'posting_date' =>           '2000-01-01'
                                        ];
                                        DB::table(PrincipalsUtil::$TBL_CM)->insert($cm_l);
                                        $summaryItem['cm_lines_count_uploaded'] += 1;
                                    } else {
                                        $summaryItem['cm_lines_count_existing'] += 1;
                                    }
                                }

                            // -------------------------------------------------------

                            // CM HEADERS ********************************************************************************************
                            } else if (
                                // $col_count == 11
                                $col_count == $cm_header_col_count
                                && $cols[0][0] != '#'
                                && trim(str_replace('"','',$cols[0])) != ''
                                && ($posting_date = trim(str_replace('"','',$cols[4]))) != ''
                            ) {
                                $doc_no =           trim(str_replace('"','',$cols[0]));
                                $customer_code =    trim(str_replace('"','',$cols[1]));
                                // $posting_date =     trim(str_replace('"','',$cols[4]));
                                $posting_date =     Carbon::createFromFormat('m/d/y', $posting_date);
                                $posting_date =     $posting_date->format('Y-m-d');
                                $invoice_doc_no =   trim(str_replace('"','',$cols[8]));
                                $payment_term =     trim(str_replace('"','',$cols[9]));
                                // $return_indicator = trim(str_replace('"','',$cols[10]));
                                // $return_indicator = $return_indicator=='' ? 'not_specified' : $return_indicator;
                                // $return_reason =    trim(str_replace('"','',$cols[11]));
                                // $return_reason =    $return_reason=='' ? 'not_specified' : $return_reason;
                                // $ext_doc_no =       DB::table(PrincipalsUtil::$TBL_INVOICES_H)
                                //                         ->where('doc_no', $invoice_doc_no)->get()->first()->ext_doc_no ?? '';
                                // $ext_doc_no =       DB::table(PrincipalsUtil::$TBL_INVOICES)
                                //                         ->where('doc_no', $invoice_doc_no)->get()->first()->ext_doc_no ?? '';
                                $ext_doc_no = $invoice_doc_no; // temporary

                                UploadInvoice::dispatch(
                                    "($fileCount of $totalFileCount) $origFilename " .
                                    "[cm_headers: $doc_no]"." ($progressPercent%)"
                                );

                                $summaryItem['cm_headers_count'] += 1;

                                if (
                                    DB::table(PrincipalsUtil::$TBL_CM)
                                        ->where('doc_no', $doc_no)
                                        ->where('customer_code', $customer_code)
                                        ->where('posting_date', '2000-01-01')
                                        ->update([
                                            'invoice_doc_no' =>     $invoice_doc_no,
                                            // 'return_indicator' =>   $return_indicator,
                                            // 'remarks' =>            $return_reason,
                                            'payment_term' =>       $payment_term,
                                            'posting_date' =>       $posting_date,
                                            'ext_doc_no' =>         $ext_doc_no,
                                        ]) > 0
                                ) {
                                    $summaryItem['cm_headers_count_uploaded'] += 1;
                                } else {
                                    // cm headers skipped, change term soon...
                                    $summaryItem['cm_headers_count_existing'] += 1;
                                }
                            }
                        }
                    }

                    $summary[] = $summaryItem;
                    $filenames = $filenames . $origFilename . ';';
                }
            }

            // revert to the default memory limit
            ini_set('memory_limit', $memory_limit);

            // if($fileCount>0) {
            //     $res['success'] = true;
            //     $res['message'] = 'Successful';
            // }
            // else {
            //     $res['success'] = false;
            //     $res['message'] = "Unable to read the file(s).
            //         No group keyword found in the filename(s)";
            // }

            $res['success'] = true;
            $res['message'] = 'Successful';

            $res['batch_number'] = $batchNumber;
            $res['summary'] = $summary;
            $res['ufiles'] = $ufiles;

            // write upload log
            UploadInvoice::dispatch("Finishing");
            self::logInvoicesUpload(
                $batchNumber, json_encode($res), $filenames,""
            );

            return response()->json($res, 200);

        } catch (\Throwable $th) {
            dd($th);
            $res['success'] = false;
            $res['message'] = $th->getMessage();
            return response()->json($res, 500);
        }
    }



    public function deleteInvoices(Request $request) {
        $selectedInvoices = $request->selectedInvoices ?? [];
        $res = [];
        try {
            DB::beginTransaction();
            foreach($selectedInvoices as $invoice) {
                DB::table(PrincipalsUtil::$TBL_INVOICES)
                    ->where('id', $invoice['id'])
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
        try {
            DB::beginTransaction();
            foreach($selectedInvoices as $invoice) {
                DB::table(PrincipalsUtil::$TBL_INVOICES)
                    ->where('id', $invoice['id'])
                    ->update([
                        'status'=>PrincipalsUtil::$STATUS_PENDING
                    ]);
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
    // public function invoicesGrandTotal() {
    //     try {
    //         $vendor = DB::table(PrincipalsUtil::$TBL_PRINCIPALS)
    //             ->where('code', request()->principal_code ?? 'NA')
    //             ->first();

    //         $res = DB::table(PrincipalsUtil::$TBL_INVOICES)
    //             ->where('vendor_code', $vendor->vendor_code)
    //             ->where('status','like', "%". request()->status. "%")
    //             ->sum('amount');

    //         return response()->json($res);
    //     } catch (\Throwable $th) {
    //         $res['success'] = false;
    //         $res['message'] = $th->getMessage();
    //         return response()->json($res, 500);
    //     }
    // }



    /**
     * Change invoice's status to 'complete'
     * NOTE: This happens when the user exports the generated templated data
     */
    public function setInvoicesComplete(Request $request)
    {
        set_time_limit(0);
        $dateToday = Carbon::now()->format('Y-m-d H:i:s');

        $generated_data = $request->generated_data;
        // dd($generated_data);

        // generated data
        DB::beginTransaction();
        try {
            foreach ($generated_data as $genData) {
                foreach ($genData['output_template'] as $output_template) {
                    foreach ($output_template[1] as $line) {
                        // dd($line);

                        // strict tagging
                        // if (
                        //     $line['customer_notfound'] == 0 && $line['item_notfound'] == 0
                        //     && $line['salesman_notfound'] == 0
                        // ) {
                        //     // dd($line);
                        //     DB::table(PrincipalsUtil::$TBL_INVOICES)
                        //         ->where('doc_no', $line['doc_no'])
                        //         ->where('item_code', $line['alturas_item_code'])
                        //         ->where('status', 'pending')
                        //         ->update([
                        //             'status' => 'completed',
                        //             'updated_at' => $dateToday
                        //         ]);
                        // }

                        //unstrict tagging
                        if($line['status'] == 'pending') {
                            $isReturn = isset($line['return_indicator']);
                            // DB::table(PrincipalsUtil::$TBL_INVOICES)
                            //     ->where('doc_no', $line['doc_no'])
                            //     ->where('item_code', $line['alturas_item_code'])
                            //     ->where('status', 'pending')
                            //     ->update([
                            //         'status' => 'completed',
                            //         'updated_at' => $dateToday
                            //     ]);

                            // if($line['return_indicator']==null || $line['return_indicator']=='') {
                            //     dd($line['return_indicator']);
                            // }

                            $line['status'] = 'completed';

                            if($isReturn) {
                                DB::table(PrincipalsUtil::$TBL_CM)
                                    ->where('doc_no', $line['doc_no'])
                                    ->where('item_code', $line['alturas_item_code'])
                                    ->where('status', 'pending')
                                    ->update([
                                        'status' => 'completed',
                                        'updated_at' => $dateToday,
                                        'gendata' => $line,
                                    ]);
                            }
                            else {
                                DB::table(PrincipalsUtil::$TBL_INVOICES)
                                    ->where('doc_no', $line['doc_no'])
                                    ->where('item_code', $line['alturas_item_code'])
                                    ->where('status', 'pending')
                                    ->update([
                                        'status' => 'completed',
                                        'updated_at' => $dateToday,
                                        'gendata' => $line,
                                    ]);
                            }
                        }
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
     * Change invoice's status to 'uploaded'
     * NOTE: This happens when the user uploaded the data to BeatRoute
     */
    public function setInvoicesUploaded(Request $request)
    {
        set_time_limit(0);
        // $dateToday = Carbon::now()->format('Y-m-d H:i:s');
        $batch = $request->batch ?? [];

        try {
            if(count($batch)) {
                DB::beginTransaction();
                foreach($batch as $item) {
                    // split external_id and extract vendor_code and actual internal invoice number
                    $external_id_parts = explode("-", $item['external_id']);

                    if(count($external_id_parts) > 0) {
                        // $vendor_code = trim($external_id_parts[0]);
                        // $doc_no = trim(implode('-', array_slice($external_id_parts, 1)));
                        // dd($vendor_code);

                        $doc_no = $item['external_id'];

                        if ($item['success']) {
                            // update sales returns status (CM)
                            DB::table(PrincipalsUtil::$TBL_CM)
                                ->join(
                                    PrincipalsUtil::$TBL_INVOICES,
                                    function($q) {
                                        $q->on(
                                            PrincipalsUtil::$TBL_INVOICES . '.doc_no',
                                            PrincipalsUtil::$TBL_CM . '.invoice_doc_no'
                                        )
                                        ->on(
                                            PrincipalsUtil::$TBL_INVOICES . '.item_code',
                                            PrincipalsUtil::$TBL_CM . '.item_code'
                                        )
                                        ->on(
                                            PrincipalsUtil::$TBL_INVOICES . '.uom',
                                            PrincipalsUtil::$TBL_CM . '.uom'
                                        )
                                        ;
                                    }
                                )
                                ->where(PrincipalsUtil::$TBL_CM . '.doc_no', $doc_no)
                                // ->where(PrincipalsUtil::$TBL_INVOICES . '.vendor_code', $vendor_code)
                                ->update([
                                    PrincipalsUtil::$TBL_CM . '.status' => PrincipalsUtil::$STATUS_UPLOADED
                                ]);

                            // update sales invoices status
                            DB::table(PrincipalsUtil::$TBL_INVOICES)
                                ->where('ext_doc_no', $doc_no)
                                // ->where('vendor_code', $vendor_code)
                                ->update([
                                    'status' => PrincipalsUtil::$STATUS_UPLOADED
                                ]);
                        }
                    }
                }
                DB::commit();
                $response = [
                    'success' => true,
                    'message' => 'Successful',
                    'batch' => $batch
                ];
                return response()->json($response);
            }
        } catch (\Throwable $th) {
            DB::rollBack();
            $response['success'] = false;
            $response['message'] = $th->getMessage();
            return response()->json($response, 500);
        }
    }


    /**
     * Change invoice's status from 'uploaded' back to ''
     * NOTE: This happens when the user uploaded an invoice cancellation
     */
    public function setInvoicesCancelled(Request $request)
    {
        set_time_limit(0);
        $dateToday = Carbon::now()->format('Y-m-d H:i:s');

        $batch = $request->batch ?? [];

        try {
            if(count($batch)) {
                DB::beginTransaction();
                foreach($batch as $item) {
                    // split external_id and extract vendor_code and actual internal invoice number
                    $external_id_parts = explode("-",$item['external_id'], 2);
                    if(count($external_id_parts)) {
                        $vendor_code = trim($external_id_parts[0]);
                        $doc_no = trim($external_id_parts[1]);
                    }
                    if($item['success']) {
                        // $isReturn = $item['isReturn'];

                        // if($isReturn) {
                            DB::table(PrincipalsUtil::$TBL_CM)
                                ->join(
                                    PrincipalsUtil::$TBL_INVOICES,
                                    function($q) {
                                        $q->on(
                                            PrincipalsUtil::$TBL_INVOICES . '.doc_no',
                                            PrincipalsUtil::$TBL_CM . '.invoice_doc_no'
                                        )
                                        ->on(
                                            PrincipalsUtil::$TBL_INVOICES . '.item_code',
                                            PrincipalsUtil::$TBL_CM . '.item_code'
                                        )
                                        ->on(
                                            PrincipalsUtil::$TBL_INVOICES . '.uom',
                                            PrincipalsUtil::$TBL_CM . '.uom'
                                        )
                                        ;
                                    }
                                )
                                ->where(PrincipalsUtil::$TBL_CM . '.doc_no', $doc_no)
                                ->where(PrincipalsUtil::$TBL_INVOICES . '.vendor_code', $vendor_code)
                                ->update([
                                    PrincipalsUtil::$TBL_CM . '.status' => PrincipalsUtil::$STATUS_COMPLETED
                                ]);
                        // } else {

                            // DB::table(PrincipalsUtil::$TBL_INVOICES)
                            //     ->where('doc_no', $doc_no)
                            //     ->where('vendor_code', $vendor_code)
                            //     ->update(['status' => PrincipalsUtil::$STATUS_COMPLETED]);

                            DB::table(PrincipalsUtil::$TBL_INVOICES)->where('ext_doc_no', $doc_no)
                                ->where('vendor_code', $vendor_code)
                                ->update(['status' => PrincipalsUtil::$STATUS_COMPLETED]);
                        // }
                    }
                }
                DB::commit();
                $response = [
                    'success' => true,
                    'message' => 'Successful',
                    'batch' => $batch
                ];
                return response()->json($response);
            }
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

    // public function extract(Request $request) {
    //     set_time_limit(0);
    //     try {
    //         $principal_code = $request->principal_code;

    //         // $dates = explode(',', $request->input('posting_date'));
    //         $dates = $request->input('posting_date');
    //         sort($dates);
    //         $dateFrom = '';
    //         $dateTo = '';
    //         if(count($dates) > 1) {
    //             $dateFrom = $dates[0];
    //             $dateTo = $dates[1];
    //         } else if(count($dates) == 1) {
    //             $dateFrom = $dates[0];
    //             $dateTo = $dates[0];
    //         }
    //         $dateFrom = new Carbon($dateFrom);
    //         $dateTo = new Carbon($dateTo);

    //         $vendor_code = DB::table(PrincipalsUtil::$TBL_PRINCIPALS)
    //             ->where('code', $principal_code)->first()->vendor_code ?? 'NA';

    //         $invoices = DB::table(PrincipalsUtil::$TBL_INVOICES)
    //             ->where('vendor_code', $vendor_code)
    //             ->whereBetween(
    //                 DB::raw("STR_TO_DATE(posting_date, '%m/%d/%Y')"),
    //                 [$dateFrom, $dateTo])
    //             ->orderBy('doc_no')
    //             ->get()
    //             ;

    //         $zip_file = public_path('invoices.zip');
    //         $zip = new ZipArchive();
    //         $zip->open($zip_file, ZipArchive::CREATE | ZipArchive::OVERWRITE);

    //         $groups = [];

    //         foreach($invoices as $inv) {
    //             if(!isset($groups[$inv->group])) {
    //                 $groups[$inv->group]['filename'] =
    //                     $inv->group. '_'. $dateFrom->format('Y-m-d'). '_'.
    //                     $dateTo->format('Y-m-d'). '.txt';
    //                 $groups[$inv->group]['data'] = '';
    //             }
    //             $groups[$inv->group]['data'] = $groups[$inv->group]['data'].
    //                 '"'. $inv->vendor_code. '"|'.
    //                 '"'. $inv->customer_code. '"|'.
    //                 '"'. $inv->doc_no. '"|'.
    //                 '"'. $inv->posting_date. '"|'.
    //                 '"'. $inv->item_code. '"|'.
    //                 '"'. $inv->item_description. '"|'.
    //                 '"'. $inv->uom. '"|'.
    //                 '"'. $inv->quantity. '"|'.
    //                 '"'. $inv->price. '"|'.
    //                 '"'. $inv->amount. '"|'.
    //                 '"'. $inv->qty_per_uom. '"|'.
    //                 '"'. $inv->uom_code. '"'.
    //                 PHP_EOL;
    //         }

    //         foreach($groups as $g) {
    //             Storage::put("public\\test\\$g[filename]", $g['data']);
    //         }

    //         $files = Storage::files('public\\test');
    //         foreach($files as $file) {
    //             $zip->addFile(storage_path("app\\$file"), basename($file));
    //         }

    //         $zip->close();

    //         Storage::deleteDirectory('public\\test');

    //         return response()->download(
    //             $zip_file,
    //             $principal_code. '_invoices_'.
    //                 $dateFrom->format('Y-m-d'). '_'. $dateTo->format('Y-m-d'). '.zip'
    //         );
    //     } catch (\Throwable $th) {
    //         //throw $th;
    //         return response()->json($th->getMessage(), 500);
    //     }
    // }



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
            // $vendor_code = DB::table(PrincipalsUtil::$TBL_PRINCIPALS)
            //     ->where('code', $principal_code)->first()->vendor_code ?? 'NA';
            $vendor_codes = DB::table(PrincipalsUtil::$TBL_PRINCIPALS)
                ->where('main_vendor_code', $principal_code)->pluck('vendor_code')->toArray();

            $invoices = DB::table(PrincipalsUtil::$TBL_INVOICES)
                ->select([
                    PrincipalsUtil::$TBL_INVOICES. '.id',
                    PrincipalsUtil::$TBL_INVOICES. '.created_at',
                    PrincipalsUtil::$TBL_INVOICES. '.updated_at',
                    PrincipalsUtil::$TBL_INVOICES. '.status',
                    // PrincipalsUtil::$TBL_INVOICES. '.filename',
                    PrincipalsUtil::$TBL_INVOICES. '.group',
                    PrincipalsUtil::$TBL_INVOICES. '.batch_number',
                    PrincipalsUtil::$TBL_INVOICES. '.vendor_code',
                    PrincipalsUtil::$TBL_INVOICES. '.customer_code',
                    PrincipalsUtil::$TBL_INVOICES. '.customer_name',
                    PrincipalsUtil::$TBL_INVOICES. '.doc_no',
                    PrincipalsUtil::$TBL_INVOICES. '.posting_date',
                    PrincipalsUtil::$TBL_INVOICES. '.shipment_date',
                    PrincipalsUtil::$TBL_INVOICES. '.item_code',
                    PrincipalsUtil::$TBL_INVOICES. '.item_description',
                    PrincipalsUtil::$TBL_INVOICES. '.uom',
                    PrincipalsUtil::$TBL_INVOICES. '.quantity',
                    PrincipalsUtil::$TBL_INVOICES. '.price',
                    PrincipalsUtil::$TBL_INVOICES. '.amount',
                    PrincipalsUtil::$TBL_INVOICES. '.qty_per_uom',
                    PrincipalsUtil::$TBL_INVOICES. '.uom_code',
                    PrincipalsUtil::$TBL_INVOICES. '.sm_code'
                ])
                ->whereIn('vendor_code', $vendor_codes)
                // ->whereBetween(
                //     DB::raw("STR_TO_DATE(". PrincipalsUtil::$TBL_INVOICES.".posting_date, '%m/%d/%Y')"),
                //     [$dateFrom, $dateTo]
                // )
                ->whereBetween(
                    'posting_date',
                    [$dateFrom->startOfDay(), $dateTo->endOfDay()]
                )
                ->orderBy(PrincipalsUtil::$TBL_INVOICES.'.posting_date')
                ->orderBy(PrincipalsUtil::$TBL_INVOICES.'.customer_code')
                ->orderBy(PrincipalsUtil::$TBL_INVOICES.'.doc_no')
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


    public static function getPendingInvoices($main_vendor_code, $posting_date_range, $status='') {
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

        // set dateTo to today if it is a future date
        $dateToday = new Carbon();
        if($dateTo->isFuture()) {
            $dateTo = $dateToday;
        }
        // /posting date range

        $vendor_codes = DB::table(PrincipalsUtil::$TBL_PRINCIPALS)
            ->where('main_vendor_code', $main_vendor_code)->pluck('vendor_code')->toArray();

        GenerateTemplated::dispatch("Retrieving invoices");

        $res = DB::table(PrincipalsUtil::$TBL_INVOICES)
            ->whereIn('vendor_code', $vendor_codes)
            // ->whereBetween(
            //     DB::raw("STR_TO_DATE(". PrincipalsUtil::$TBL_INVOICES . ".posting_date, '%m/%d/%Y')"),
            //     [$dateFrom, $dateTo]
            // )
            ->when($status != '' && $status != 'all', function($q) use($status) {
                // $q->where(PrincipalsUtil::$TBL_INVOICES.'.status','like', "%$status%");
                $q->where(PrincipalsUtil::$TBL_INVOICES.'.status', $status);
            })
            ->whereBetween(
                'posting_date',
                [$dateFrom->startOfDay(), $dateTo->endOfDay()]
            )
            // ->select([
            //     PrincipalsUtil::$TBL_INVOICES.'.*'
            // ])
            ->cursor();

        return $res;
    }



    public static function getReturns($main_vendor_code, $posting_date_range, $status='') {
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

        // set dateTo to today if it is a future date
        $dateToday = new Carbon();
        if($dateTo->isFuture()) {
            $dateTo = $dateToday;
        }
        // /posting date range

        GenerateTemplated::dispatch("Retrieving returns");

        $vendor_codes = DB::table(PrincipalsUtil::$TBL_PRINCIPALS)
            ->where('main_vendor_code', $main_vendor_code)->pluck('vendor_code')->toArray();

        return DB::table(PrincipalsUtil::$TBL_CM)
            ->join(
                PrincipalsUtil::$TBL_INVOICES,
                function($join) {
                    $join->on(
                        PrincipalsUtil::$TBL_CM.'.invoice_doc_no',
                        PrincipalsUtil::$TBL_INVOICES.'.doc_no'
                    )
                    ->on(
                        PrincipalsUtil::$TBL_CM.'.customer_code',
                        PrincipalsUtil::$TBL_INVOICES.'.customer_code'
                    )
                    ->on(
                        PrincipalsUtil::$TBL_CM.'.item_code',
                        PrincipalsUtil::$TBL_INVOICES.'.item_code'
                    )
                    // ->on(
                    //     PrincipalsUtil::$TBL_CM.'.uom',
                    //     PrincipalsUtil::$TBL_INVOICES.'.uom'
                    // )
                    ;
                }
            )
            ->whereIn('vendor_code', $vendor_codes)
            // ->whereBetween(
            //     DB::raw("STR_TO_DATE(". PrincipalsUtil::$TBL_CM . ".shipment_date, '%m/%d/%Y')"),
            //     [$dateFrom, $dateTo]
            // )
            ->when($status != '' && $status != 'all', function($q) use($status) {
                $q->where(PrincipalsUtil::$TBL_CM.'.status','like', "%$status%");
            })
            ->whereBetween(
                PrincipalsUtil::$TBL_CM.'.posting_date',
                [$dateFrom->startOfDay(), $dateTo->endOfDay()]
            )
            ->select([
                PrincipalsUtil::$TBL_CM.'.*',
                PrincipalsUtil::$TBL_INVOICES.'.vendor_code',
                PrincipalsUtil::$TBL_INVOICES.'.quantity as invoice_quantity',
                PrincipalsUtil::$TBL_INVOICES.'.sm_code',
                PrincipalsUtil::$TBL_INVOICES.'.customer_name',
            ])
            ->cursor();
    }



    public static function logInvoicesUpload($batch_number,$summary ,$filename, $remarks) {
        DB::table(PrincipalsUtil::$TBL_INVOICES_UPLOG)->insert([
            'batch_number' => $batch_number,
            'summary' => $summary,
            'filename' => $filename,
            'remarks' => $remarks,
            'uploaded_by' => auth()->user()->id
        ]);
    }



    public function uploadLogs() {
        $res = DB::table(PrincipalsUtil::$TBL_INVOICES_UPLOG)->limit(50)->latest()->get();
        return response()->json($res);
    }



    // temp
    // public function restoreLines() {
    //     $dtFrom = request()->dtFrom ?? '';
    //     $dtTo = request()->dtTo ?? '';
    //     if($dtFrom == '' || $dtTo == '') {
    //         dd('No date filters');
    //     }
    //     $dateFrom = new Carbon($dtFrom);
    //     $dateTo = new Carbon($dtTo);

    //     set_time_limit(0);
    //     // $memory_limit = ini_get('memory_limit');
    //     // ini_set('memory_limit', 0);

    //     // headers XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
    //     $res = DB::table('invoices_headers_20230315')
    //         ->whereBetween(
    //             DB::raw("STR_TO_DATE(posting_date, '%m/%d/%Y')"),
    //             [$dateFrom, $dateTo]
    //         )
    //         ->get();
    //     foreach($res as $h) {
    //         if (
    //             DB::table(PrincipalsUtil::$TBL_INVOICES_H)
    //                 ->where('doc_no', $h->doc_no)
    //                 ->where('customer_code', $h->customer_code)
    //                 ->exists() == false
    //         ) {
    //             DB::table(PrincipalsUtil::$TBL_INVOICES_H)
    //                 ->insert([
    //                     'doc_no' => $h->doc_no,
    //                     'customer_code' => $h->customer_code,
    //                     'customer_name' => $h->customer_name,
    //                     'u1' => $h->u1,
    //                     'u2' => $h->u2,
    //                     'shipment_date' => $h->shipment_date,
    //                     'posting_date' => $h->posting_date,
    //                     'sm_code' => $h->sm_code,
    //                 ]);
    //         }
    //     }

    //     // lines XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
    //     $res = DB::table('invoices_lines_20230315')
    //         ->whereBetween(
    //             DB::raw("STR_TO_DATE(shipment_date, '%m/%d/%Y')"),
    //             [$dateFrom, $dateTo]
    //         )
    //         ->get();
    //     foreach($res as $i) {
    //         if (
    //             DB::table(PrincipalsUtil::$TBL_INVOICES)
    //                 ->where('vendor_code',$i->vendor_code)
    //                 ->where('customer_code',$i->customer_code)
    //                 ->where('doc_no',$i->doc_no)
    //                 ->where('item_code',$i->item_code)
    //                 ->where('uom',$i->uom)
    //                 ->where('quantity',$i->quantity)
    //                 ->where('shipment_date',$i->shipment_date)

    //                 ->exists() == false
    //         ) {
    //             DB::table(PrincipalsUtil::$TBL_INVOICES)
    //                 ->insert([
    //                     'status' => 'completed',
    //                     'uploaded_by' => 50,
    //                     'filename' => $i->filename,
    //                     'group' => $i->group,
    //                     'batch_number' => $i->batch_number,
    //                     'vendor_code' => $i->vendor_code,
    //                     'customer_code' => $i->customer_code,
    //                     'doc_no' => $i->doc_no,
    //                     'shipment_date' => $i->shipment_date,
    //                     'item_code' => $i->item_code,
    //                     'item_description' => $i->item_description,
    //                     'uom' => $i->uom,
    //                     'quantity' => $i->quantity,
    //                     'price' => $i->price,
    //                     'amount' => $i->amount,
    //                     'qty_per_uom' => $i->qty_per_uom,
    //                     'uom_code' => $i->uom_code,
    //                 ]);
    //         }
    //     }
    //     // dd($res);
    //     // ini_set('memory_limit', $memory_limit);
    //     $res = null;
    //     return response()->json("Done $dtFrom - $dtTo");
    // }
}
