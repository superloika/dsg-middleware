<?php

namespace App\Http\Controllers;

use App\Events\DownloadInvoice;
use App\Http\Controllers\Principals\PrincipalsUtil;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class NavisionController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }


    public static function serverConfigs() {
        // temp (test DB - for ppfb demo)
        // return [
        //     [
        //         'server_name'           => 'DEMO',
        //         'dsn'                   => 'Driver={SQL Server};Server=172.16.192.18;Database=DEMO_LDI BACKEND DB;',
        //         'database'              => 'DEMO_LDI BACKEND DB',
        //         'tbl_prefix'            => 'LEONARDO DISTRIB_, INC_ - DEMO$',
        //         'group_name'            => 'DEMO',
        //     ],
        // ];

        // live NAV
        return [
            // ******************************************************************************************
            // ASC
            // ******************************************************************************************
            [
                'server_name'           => 'ASC_UWDG',
                'dsn'                   => 'Driver={SQL Server};Server=172.16.21.201;Database=SI CONSOLIDATOR;',
                'database'              => 'SI CONSOLIDATOR',
                'tbl_prefix'            => 'ALTURAS SUPERMARKET CORP_ - SI$',
                'group_name'            => 'ASC_UWDG',
            ],
            [
                'server_name'           => 'ASC_CWDG_PCS',
                'dsn'                   => 'Driver={SQL Server};Server=172.16.192.1;Database=CWDG_VARIOUS_SI;',
                'database'              => 'CWDG_VARIOUS_SI',
                'tbl_prefix'            => 'ALTURAS SUPERMARKET CORP_$',
                'group_name'            => 'ASC_CWDG_PCS',
            ],
            [
                'server_name'           => 'ASC_CWDG_BULK',
                'dsn'                   => 'Driver={SQL Server};Server=172.16.192.13;Database=WDG_SI_SQL;',
                'database'              => 'WDG_SI_SQL',
                'tbl_prefix'            => 'ALTURAS SUPERMARKET CORP_$',
                'group_name'            => 'ASC_CWDG_BULK',
            ],
            [
                'server_name'           => 'ASC_UDC',
                'dsn'                   => 'Driver={SQL Server};Server=172.16.21.201;Database=UBAY_DC_SQL;',
                'database'              => 'UBAY_DC_SQL',
                'tbl_prefix'            => 'Ubay Distribution Center$',
                'group_name'            => 'ASC_UDC',
            ],
            [
                'server_name'           => 'ASC_CDC',
                'dsn'                   => 'Driver={SQL Server};Server=172.16.192.4;Database=CDC_SRV_SQL;',
                'database'              => 'CDC_SRV_SQL',
                'tbl_prefix'            => 'ALTURAS_CDC$',
                'group_name'            => 'ASC_CDC',
            ],

            // ******************************************************************************************
            // LDI
            // ******************************************************************************************
            [
                'server_name'           => 'LDI_DELICA_BULK',
                'dsn'                   => 'Driver={SQL Server};Server=172.16.192.3;Database=OPLAN_BULK_TERM1;',
                'database'              => 'OPLAN_BULK_TERM1',
                'tbl_prefix'            => 'LDI_Oplan Bulk$',
                'group_name'            => 'LDI_DELICA_BULK',
            ],
            [
                'server_name'           => 'LDI_DELICA_PCS',
                'dsn'                   => 'Driver={SQL Server};Server=172.16.192.1;Database=CLDI SI SRV_VARIOUS;',
                'database'              => 'CLDI SI SRV_VARIOUS',
                'tbl_prefix'            => 'LEONARDO DISTRIBUTORS INCORP_$',
                'group_name'            => 'LDI_DELICA_PCS',
            ],
            [
                'server_name'           => 'LDI_DELICA_ICM',
                'dsn'                   => 'Driver={SQL Server};Server=172.16.161.27;Database=OPLAN_ICM;',
                'database'              => 'OPLAN_ICM',
                'tbl_prefix'            => 'OPLAN DELICA ICM$',
                'group_name'            => 'LDI_DELICA_ICM',
            ],
            [
                'server_name'           => 'LDI_HORECA_BULK',
                'dsn'                   => 'Driver={SQL Server};Server=172.16.192.3;Database=HORECA BULK;',
                'database'              => 'HORECA BULK',
                'tbl_prefix'            => 'LDI_HORECA BULK$',
                'group_name'            => 'LDI_HORECA_BULK',
            ],
            [
                'server_name'           => 'LDI_HORECA_PCS',
                'dsn'                   => 'Driver={SQL Server};Server=172.16.192.1;Database=HORECA_TERM1;',
                'database'              => 'HORECA_TERM1',
                'tbl_prefix'            => 'HORECA_1$',
                'group_name'            => 'LDI_HORECA_PCS',
            ],
            [
                'server_name'           => 'LDI_HORECA_ICM',
                'dsn'                   => 'Driver={SQL Server};Server=172.16.161.27;Database=HORECA_TERM2;',
                'database'              => 'HORECA_TERM2',
                'tbl_prefix'            => 'HORECA_ICM$',
                'group_name'            => 'LDI_HORECA_ICM',
            ],
            [
                'server_name'           => 'LDI_3PS',
                'dsn'                   => 'Driver={SQL Server};Server=172.16.192.3;Database=3PS_NEW;',
                'database'              => '3PS_NEW',
                'tbl_prefix'            => '3PS BULK$',
                'group_name'            => 'LDI_3PS',
            ],
            [
                'server_name'           => 'LDI_SEC',
                'dsn'                   => 'Driver={SQL Server};Server=172.16.192.3;Database=LDI_SEC;',
                'database'              => 'LDI_SEC',
                'tbl_prefix'            => 'LDI-DSG SPECIAL EXTERNAL CUST_$',
                'group_name'            => 'LDI_SEC',
            ],
            [
                'server_name'           => 'LDI_CVS_BULK',
                'dsn'                   => 'Driver={SQL Server};Server=172.16.192.12;Database=LDI_BCVS;',
                'database'              => 'LDI_BCVS',
                'tbl_prefix'            => 'LDI_CVS Bulk$',
                'group_name'            => 'LDI_CVS_BULK',
            ],
            [
                'server_name'           => 'LDI_CVS_PCS',
                'dsn'                   => 'Driver={SQL Server};Server=172.16.192.12;Database=LDI_VCVS;',
                'database'              => 'LDI_VCVS',
                'tbl_prefix'            => 'LDI_CVS Various$',
                'group_name'            => 'LDI_CVS_PCS',
            ],
            [
                'server_name'           => 'LDI_MAS_BULK',
                'dsn'                   => 'Driver={SQL Server};Server=172.16.192.12;Database=LDI_BMAS;',
                'database'              => 'LDI_BMAS',
                'tbl_prefix'            => 'LDI_MAS Bulk$',
                'group_name'            => 'LDI_MAS_BULK',
            ],
            [
                'server_name'           => 'LDI_MAS_PCS',
                'dsn'                   => 'Driver={SQL Server};Server=172.16.192.12;Database=LDI_VMAS;',
                'database'              => 'LDI_VMAS',
                'tbl_prefix'            => 'LDI_MAS Various$',
                'group_name'            => 'LDI_MAS_PCS',
            ],
            [
                'server_name'           => 'LDI_UDC',
                'dsn'                   => 'Driver={SQL Server};Server=172.16.22.2;Database=LDI_UDC_SQL;',
                'database'              => 'LDI_UDC_SQL',
                'tbl_prefix'            => 'LDI_UDC$',
                'group_name'            => 'LDI_UDC',
            ],
            [
                'server_name'           => 'LDI_CDC',
                'dsn'                   => 'Driver={SQL Server};Server=172.16.192.16;Database=LDI_CDC;',
                'database'              => 'LDI_CDC',
                'tbl_prefix'            => 'LDI_CDC$',
                'group_name'            => 'LDI_CDC',
            ],

            // ******************************************************************************************
            // MDPI
            // ******************************************************************************************
            [
                'server_name'           => 'MPDI_UDC',
                'dsn'                   => 'Driver={SQL Server};Server=172.16.22.2;Database=MPDI_UDC_SQL;',
                'database'              => 'MPDI_UDC_SQL',
                'tbl_prefix'            => 'MPDI_UDC$',
                'group_name'            => 'MPDI_UDC',
            ],
            [
                'server_name'           => 'MPDI_CDC',
                'dsn'                   => 'Driver={SQL Server};Server=172.16.192.16;Database=MPDI BACKEND SQL;',
                'database'              => 'MPDI BACKEND SQL',
                'tbl_prefix'            => 'MPDI_CDC$',
                'group_name'            => 'MPDI_CDC',
            ],


            // ******************************************************************************************
            // NDI
            // ******************************************************************************************
            [
                'server_name'           => 'NDI_UDC',
                'dsn'                   => 'Driver={SQL Server};Server=172.16.22.2;Database=NDI_UDC_SQL;',
                'database'              => 'NDI_UDC_SQL',
                'tbl_prefix'            => 'NDI_UDC$',
                'group_name'            => 'NDI_UDC',
            ],
            [
                'server_name'           => 'NDI_CDC',
                'dsn'                   => 'Driver={SQL Server};Server=172.16.192.16;Database=NDI_CDC_SQL;',
                'database'              => 'NDI_CDC_SQL',
                'tbl_prefix'            => 'NDI_CDC$',
                'group_name'            => 'NDI_CDC',
            ],
            [
                'server_name'           => 'NDI_DELICA_BULK',
                'dsn'                   => 'Driver={SQL Server};Server=172.16.192.18;Database=NETMAN_BULK;',
                'database'              => 'NETMAN_BULK',
                'tbl_prefix'            => 'Netman Bulk$',
                'group_name'            => 'NDI_DELICA_BULK',
            ],
            [
                'server_name'           => 'UBAY_SEC',
                'dsn'                   => 'Driver={SQL Server};Server=172.16.21.202;Database=UBAY SEC;',
                'database'              => 'UBAY SEC',
                'tbl_prefix'            => 'LDI SPECIAL EXTERNAL CUSTOMER$',
                'group_name'            => 'UBAY_SEC',
            ],
        ];
    }


    public function downloadInvoices(Request $request) {
        set_time_limit(0);
        $memory_limit = ini_get('memory_limit');
        ini_set('memory_limit', -1);

        // try {
            $configs = self::serverConfigs();
            $loopCounter = 0;
            $configsLen = count($configs);
            $vendor_codes = $request->vendor_codes;
            $vendor_codes_imp = implode(',', array_map(fn($item) => "'$item'", $vendor_codes));
            $terminals = $request->terminals;
            // posting date range ----------------------------------------
            $dates = $request->posting_date_range;
            sort($dates);
            $posting_date_from = '';
            $posting_date_to = '';
            if(count($dates) > 1) {
                $posting_date_from = $dates[0];
                $posting_date_to = $dates[1];
            } else if(count($dates) == 1) {
                $posting_date_from = $dates[0];
                $posting_date_to = $dates[0];
            }
            // set posting_date_to to today if it is a future date
            $posting_date_to = new Carbon($posting_date_to);
            if($posting_date_to->isFuture()) {
                $posting_date_to = Carbon::now();
            }
            $posting_date_to = $posting_date_to->format('Y-m-d');
            // /posting date range ----------------------------------------
            $dateTimeToday = Carbon::now()->format('Y-m-d H:i:s');
            $batchNum = "NAV" . time();
            $result = [
                'sales_invoices' => [],
                'sales_returns' => [],
                'unreachable' => [],
            ];
            $new_si = 0;
            $new_cm = 0;

            foreach($configs as $config) {
                $server_name = $config['server_name'];
                $dsn = $config['dsn'];
                $database = $config['database'];
                $invoice_headers_tbl = $config['tbl_prefix'] . 'Sales Invoice Header';
                $invoice_lines_tbl = $config['tbl_prefix'] . 'Sales Invoice Line';
                $cm_headers_tbl = $config['tbl_prefix'] . 'Sales Cr_Memo Header';
                $cm_lines_tbl = $config['tbl_prefix'] . 'Sales Cr_Memo Line';
                $sm_tbl = $config['tbl_prefix'] . 'Salesperson_Purchaser';
                $group_name = $config['group_name'];
                $existingSalesInvoices = 0;
                $newSalesInvoices = 0;
                $existingSalesReturns = 0;
                $newSalesReturns = 0;

                // if not found in selected terminals, skip
                if(!in_array($group_name, $terminals)) continue;

                // establish db connection, skip if server unreachable
                try {
                    $dbCon = DB::connection($server_name);
                } catch (\Throwable $th) {
                    array_push($result['unreachable'], $server_name);
                    continue;
                }

                $loopCounter++;

                ///////////////////////////// Sales Invoices ///////////////////////////////////////////
                ///////////////////////////// Sales Invoices ///////////////////////////////////////////
                ///////////////////////////// Sales Invoices ///////////////////////////////////////////
                ///////////////////////////// Sales Invoices ///////////////////////////////////////////
                ///////////////////////////// Sales Invoices ///////////////////////////////////////////
                ///////////////////////////// Sales Invoices ///////////////////////////////////////////
                // retrieve invoices from NAV
                DownloadInvoice::dispatch(
                    "($loopCounter/$configsLen: $server_name) Retrieving sales invoices from Navision"
                );
                $sales_invoices = $dbCon->select(
                    "SELECT
                        -- header
                        [$invoice_headers_tbl].[No_] as doc_no,
                        [$invoice_headers_tbl].[Sell-to Customer No_] as customer_code,
                        [$invoice_headers_tbl].[Bill-to Name] as customer_name,
                        [$invoice_headers_tbl].[Posting Date] as posting_date,
                        [$invoice_headers_tbl].[Salesperson Code] as sm_code,
                        [$invoice_headers_tbl].[External Document No_] as ext_doc_no,
                        [$invoice_headers_tbl].[Order No_] as order_no,
                        [$invoice_headers_tbl].[Order Date] as order_date,
                        -- line
                        [$invoice_lines_tbl].[Vendor No_] as vendor_code,
                        [$invoice_lines_tbl].[No_] as item_code,
                        [$invoice_lines_tbl].[Shipment Date] as shipment_date,
                        [$invoice_lines_tbl].[Description] as item_description,
                        [$invoice_lines_tbl].[Unit of Measure] as uom,
                        [$invoice_lines_tbl].[Quantity] as quantity,
                        [$invoice_lines_tbl].[Unit Price] as price,
                        [$invoice_lines_tbl].[Amount Including VAT] as amount,
                        [$invoice_lines_tbl].[Qty_ per Unit of Measure] as qty_per_uom,
                        [$invoice_lines_tbl].[Unit of Measure Code] as uom_code,
                        [$invoice_lines_tbl].[Line Discount %] as discount_percentage,
                        [$invoice_lines_tbl].[VAT %] as vat_percentage,
                        -- salesperson
                        [$sm_tbl].[Name] as sm_name
                    FROM [$invoice_lines_tbl]
                    JOIN [$invoice_headers_tbl] ON [$invoice_headers_tbl].[No_] = [$invoice_lines_tbl].[Document No_]
                    LEFT JOIN [$sm_tbl] ON [$sm_tbl].[Code] = [$invoice_headers_tbl].[Salesperson Code]
                    WHERE [$invoice_lines_tbl].[Quantity] > 0
                        AND [$invoice_lines_tbl].[Vendor No_] IN ($vendor_codes_imp)
                        -- AND [$invoice_lines_tbl].[Shipment Date] >= '$posting_date_from 00:00:00.000'
                        -- AND [$invoice_lines_tbl].[Shipment Date] <= '$posting_date_to 00:00:00.000'
                        AND [$invoice_headers_tbl].[Posting Date] >= '$posting_date_from 00:00:00.000'
                        AND [$invoice_headers_tbl].[Posting Date] <= '$posting_date_to 00:00:00.000'
                    ;
                    "
                );

                $sales_invoices_len = count($sales_invoices);
                $si_counter = 0;
                $progress_percentage = 0;

                // save retrieved invoices to local db
                foreach($sales_invoices as $si) {
                    // calc progress percentage
                    if($sales_invoices_len > 0) {
                        $progress_percentage = round(($si_counter / $sales_invoices_len) * 100);
                    }
                    $si_counter++;

                    // convert encodings
                    foreach($si as $key => $val) {
                        $si->$key = mb_convert_encoding($val, 'UTF-8', 'ISO-8859-1');
                    }

                    $si_line = [
                        // 'updated_at' =>             date($dateTimeToday),
                        'uploaded_by' =>            auth()->user()->id,
                        // 'filename' =>            $origFilename,
                        'filename' =>  '',
                        'group' =>                  $group_name,
                        'batch_number'  =>          $batchNum,
                        //
                        'vendor_code' =>            $si->vendor_code,
                        'customer_code' =>          $si->customer_code,
                        'doc_no' =>                 $si->doc_no,
                        'shipment_date' =>          $si->shipment_date,
                        'posting_date' =>           $si->posting_date,
                        'item_code' =>              $si->item_code,
                        'item_description' =>       $si->item_description,
                        'uom' =>                    $si->uom,
                        'quantity' =>               $si->quantity,
                        'price' =>                  $si->price,
                        'amount' =>                 $si->amount,
                        'qty_per_uom' =>            $si->qty_per_uom,
                        'uom_code' =>               $si->uom_code,
                        'discount_percentage' =>    $si->discount_percentage,
                        'vat_percentage' =>         $si->vat_percentage,
                        'customer_name' =>          $si->customer_name,
                        'sm_code' =>                $si->sm_code,
                        'sm_name' =>                $si->sm_name,
                        'ext_doc_no' =>             $si->ext_doc_no,
                        'order_no' =>               $si->order_no,
                        'order_date' =>             $si->order_date,
                    ];

                    $si_line_local = DB::table(PrincipalsUtil::$TBL_INVOICES)
                        ->where('doc_no',$si->doc_no)
                        ->where('item_code',$si->item_code)
                        ->where('customer_code',$si->customer_code)
                        ->where('vendor_code',$si->vendor_code)
                        ->where('uom',$si->uom)
                        ->where('quantity',$si->quantity)
                        ->first();

                    if (
                        $si_line_local != null
                    ) {
                        // update pending lines to patch adjustments from NAV
                        if($si_line_local->status == 'pending') {
                            if(in_array($progress_percentage, [1,10,30,50,70,90,95,96,97,98,99,100])) {
                                DownloadInvoice::dispatch(
                                    "($loopCounter/$configsLen: $server_name)
                                    Updating sales invoice to the local database ({$progress_percentage}%)"
                                );
                            }
                            DB::table(PrincipalsUtil::$TBL_INVOICES)
                                ->where('id', $si_line_local->id)
                                ->update($si_line);
                        }

                        // existing entries counter
                        $existingSalesInvoices++;
                    } else {
                        if(in_array($progress_percentage, [1,10,30,50,70,90,95,96,97,98,99,100])) {
                            DownloadInvoice::dispatch(
                                "($loopCounter/$configsLen: $server_name)
                                Saving sales invoice to the local database ({$progress_percentage}%)"
                            );
                        }
                        DB::table(PrincipalsUtil::$TBL_INVOICES)->insert($si_line);
                        $newSalesInvoices++;
                    }
                }

                // summary
                // if($existingSalesInvoices > 0 || $newSalesInvoices > 0) {
                    $result['sales_invoices'][$server_name] = [
                        'dsn' => $dsn,
                        'database' => $database,
                        'existing' => $existingSalesInvoices,
                        'new' => $newSalesInvoices,
                        'posting_date_from' => $posting_date_from,
                        'posting_date_to' => $posting_date_to
                    ];
                // }
                $new_si += $newSalesInvoices;

                ///////////////////////////// Sales Returns ///////////////////////////////////////////
                ///////////////////////////// Sales Returns ///////////////////////////////////////////
                ///////////////////////////// Sales Returns ///////////////////////////////////////////
                ///////////////////////////// Sales Returns ///////////////////////////////////////////
                ///////////////////////////// Sales Returns ///////////////////////////////////////////
                ///////////////////////////// Sales Returns ///////////////////////////////////////////
                // retrieve sales returns from Nav
                DownloadInvoice::dispatch(
                    "($loopCounter/$configsLen: $server_name) Retrieving sales returns from Navision"
                );
                $sales_returns = $dbCon->select(
                    "SELECT
                        -- header
                        [$cm_headers_tbl].[No_] as doc_no,
                        [$cm_headers_tbl].[Bill-to Customer No_] as customer_code,
                        -- [$cm_headers_tbl].[Bill-to Name] as customer_name,
                        [$cm_headers_tbl].[Posting Date] as posting_date,
                        [$cm_headers_tbl].[Shipment Date] as shipment_date,
                        -- [$cm_headers_tbl].[Salesperson Code] as sm_code,

                        -- use Applies-to Doc_ No_ (temp)
                        -- [$cm_headers_tbl].[External Document No_] as invoice_doc_no,
                        -- [$cm_headers_tbl].[External Document No_] as ext_doc_no,
                        [$cm_headers_tbl].[Applies-to Doc_ No_] as invoice_doc_no,
                        [$cm_headers_tbl].[Applies-to Doc_ No_] as ext_doc_no,
                        -- return/CM stuff ===========================================
                        -- from live ****
                        'not_specified' as return_indicator, --test (temp for live db)
                        NULL as remarks, --test (temp for live db)
                        -- from test db ****
                        -- [$cm_headers_tbl].[Return Indicators] as return_indicator,
                        -- [$cm_headers_tbl].[CM Reason Code] as remarks,
                        -- return/CM stuff ===========================================
                        -- line
                        [$cm_lines_tbl].[No_] as item_code,
                        [$cm_lines_tbl].[Description] as item_description,
                        [$cm_lines_tbl].[Unit of Measure] as uom,
                        [$cm_lines_tbl].[Quantity] as quantity,
                        [$cm_lines_tbl].[Unit Price] as price,
                        [$cm_lines_tbl].[Amount Including VAT] as amount,
                        [$cm_lines_tbl].[Qty_ per Unit of Measure] as qty_per_uom,
                        [$cm_lines_tbl].[Unit of Measure Code] as uom_code,
                        [$cm_lines_tbl].[Line Discount %] as discount_percentage,
                        [$cm_lines_tbl].[VAT %] as vat_percentage,
                        -- sales invoice line
                        [$invoice_lines_tbl].[Vendor No_] as vendor_code
                        -- salesperson
                        -- [$sm_tbl].[Name] as sm_name
                    FROM [$cm_lines_tbl]
                    JOIN [$cm_headers_tbl]
                        ON [$cm_headers_tbl].[No_] = [$cm_lines_tbl].[Document No_]
                    JOIN [$invoice_lines_tbl]
                        -- use Applies-to Doc_ No_ (temp)
                        -- ON [$invoice_lines_tbl].[Document No_] = [$cm_headers_tbl].[External Document No_]
                        ON [$invoice_lines_tbl].[Document No_] = [$cm_headers_tbl].[Applies-to Doc_ No_]
                        AND [$invoice_lines_tbl].[No_] = [$cm_lines_tbl].[No_]
                        AND [$invoice_lines_tbl].[Unit of Measure] = [$cm_lines_tbl].[Unit of Measure]
                    -- LEFT JOIN [$sm_tbl] ON [$sm_tbl].[Code] = [$cm_headers_tbl].[Salesperson Code]
                    WHERE [$invoice_lines_tbl].[Vendor No_] IN ($vendor_codes_imp)
                        AND [$invoice_lines_tbl].[Quantity] > 0
                        AND [$cm_lines_tbl].[Quantity] > 0
                        AND [$cm_headers_tbl].[Posting Date] >= '$posting_date_from 00:00:00.000'
                        AND [$cm_headers_tbl].[Posting Date] <= '$posting_date_to 00:00:00.000'
                    ;
                    "
                );

                // store doc_nos here temporarily
                // $sr_docnos = [];

                $sales_returns_len = count($sales_returns);
                $cm_counter = 0;
                $progress_percentage = 0;

                // save retrieved sales returns to local db
                foreach($sales_returns as $sr) {
                    // calc progress percentage
                    if($sales_returns_len > 0) {
                        $progress_percentage = round(($cm_counter / $sales_returns_len) * 100);
                    }
                    $cm_counter++;

                    // convert encodings
                    foreach($sr as $key => $val) {
                        $sr->$key = mb_convert_encoding($val, 'UTF-8', 'ISO-8859-1');
                    }

                    $cm_line = [
                        'uploaded_by' =>            auth()->user()->id,
                        // 'filename' => $origFilename,
                        'filename' =>               '',
                        'group' =>                  $group_name,
                        'batch_number' =>           $batchNum,
                        //
                        'customer_code' =>          $sr->customer_code,
                        'doc_no' =>                 $sr->doc_no,
                        'shipment_date' =>          $sr->shipment_date,
                        'item_code' =>              $sr->item_code,
                        'item_description' =>       $sr->item_description,
                        'uom' =>                    $sr->uom,
                        'quantity' =>               $sr->quantity,
                        'price' =>                  $sr->price,
                        'amount' =>                 $sr->amount,
                        'qty_per_uom' =>            $sr->qty_per_uom,
                        'uom_code' =>               $sr->uom_code,
                        'discount_percentage' =>    $sr->discount_percentage,
                        'vat_percentage' =>         $sr->vat_percentage,
                        'invoice_doc_no' =>         $sr->invoice_doc_no,
                        'posting_date' =>           $sr->posting_date,
                        'ext_doc_no' =>             $sr->ext_doc_no,
                        // 'sm_code' =>                $sr->sm_code,
                        // 'sm_name' =>                $sr->sm_name,
                        'return_indicator' =>       $sr->return_indicator,
                        'remarks' =>                $sr->remarks,
                    ];

                    $cm_line_local = DB::table(PrincipalsUtil::$TBL_CM)
                        ->where('doc_no',$sr->doc_no)
                        ->where('item_code',$sr->item_code)
                        ->where('customer_code',$sr->customer_code)
                        ->where('uom',$sr->uom)
                        // ->where('quantity',$sr->quantity)
                        ->first();

                    if (
                        $cm_line_local != null
                    ) {
                        // if cm line still pending, update it
                        if($cm_line_local->status=='pending') {
                            if(in_array($progress_percentage, [1,10,30,50,70,90,95,96,97,98,99,100])) {
                                DownloadInvoice::dispatch(
                                    "($loopCounter/$configsLen: $server_name)
                                    Updating sales return to the local database ({$progress_percentage}%)"
                                );
                            }
                            DB::table(PrincipalsUtil::$TBL_CM)
                                ->where('id', $cm_line_local->id)
                                ->update($cm_line);
                        }

                        // existing entries counter
                        $existingSalesReturns++;
                    } else {
                        if(
                            trim($sr->doc_no) != ''
                            && trim($sr->item_code) != ''
                            && trim($sr->item_description) != ''
                        ) {
                            if(in_array($progress_percentage, [1,10,30,50,70,90,95,96,97,98,99,100])) {
                                DownloadInvoice::dispatch(
                                    "($loopCounter/$configsLen: $server_name)
                                    Saving sales return to the local database ({$progress_percentage}%)"
                                );
                            }
                            DB::table(PrincipalsUtil::$TBL_CM)->insert($cm_line);
                            $newSalesReturns++;
                        }
                    }

                    // $sr_docnos[] = $sr->doc_no;
                }

                // get cm remarks and patch to local db
                // $sr_docnos = array_unique($sr_docnos);
                // if(count($sr_docnos) > 0) {
                //     DownloadInvoice::dispatch(
                //         "($loopCounter/$configsLen: $server_name)
                //         Patching sales return remarks"
                //     );
                //     $sr_docnos_imp = implode(',', array_map(fn($item) => "'$item'", $sr_docnos));
                //     $sr_remarks = $dbCon->select(
                //         "SELECT
                //             [Document No_] as doc_no,
                //             [Description] as item_description
                //         FROM [$cm_lines_tbl]
                //         WHERE [Document No_] IN ($sr_docnos_imp)
                //             AND [No_] = ''
                //             AND [Description] <> ''
                //         ;
                //         "
                //     );
                //     // dd($sr_remarks);
                //     foreach($sr_remarks as $srr) {
                //         // dd($srr);
                //         DB::table(PrincipalsUtil::$TBL_CM)
                //         ->where('doc_no', $srr->doc_no)
                //         ->whereNull('remarks')
                //         ->update([
                //             'remarks' => $srr->item_description
                //         ]);
                //     }
                // }
                // /get cm remarks and patch to local db

                // summary
                // if($existingSalesReturns > 0 || $newSalesReturns > 0) {
                    $result['sales_returns'][$server_name] = [
                        'dsn' => $dsn,
                        'database' => $database,
                        'existing' => $existingSalesReturns,
                        'new' => $newSalesReturns,
                        'posting_date_from' => $posting_date_from,
                        'posting_date_to' => $posting_date_to
                    ];
                // }
                $new_cm += $newSalesReturns;
            }

            // save logs
            DownloadInvoice::dispatch("Saving download logs");
            DB::table(PrincipalsUtil::$TBL_INVOICES_DLLOG)->insert([
                'batch_number' => $batchNum,
                'summary' => json_encode($result),
                'new_si' => $new_si,
                'new_cm' => $new_cm,
                'posting_date_from' => $posting_date_from,
                'posting_date_to' => $posting_date_to,
                'unreachable' => count($result['unreachable']),
                'main_vendor_code' => $request->main_vendor_code,
                'uploaded_by' => auth()->user()->id
            ]);

            ini_set('memory_limit', $memory_limit);
            return response()->json($result);
        // } catch (\Throwable $th) {
            // $res['success'] = false;
            // $res['message'] = $server_name ?? '' . ': ' . $th->getMessage();
            // return response()->json($res, 500);
        // }
    }


    public function dlLogs(Request $request) {
        $res = DB::table(PrincipalsUtil::$TBL_INVOICES_DLLOG)
            ->select(
                PrincipalsUtil::$TBL_INVOICES_DLLOG . '.*',
                PrincipalsUtil::$TBL_USERS . '.name as user_fn',
                PrincipalsUtil::$TBL_USERS . '.username as user_un',
            )
            ->leftJoin(PrincipalsUtil::$TBL_USERS, function($join) {
                $join->on(
                    PrincipalsUtil::$TBL_INVOICES_DLLOG. '.uploaded_by',
                    PrincipalsUtil::$TBL_USERS. '.id',
                );
            })
            ->where('main_vendor_code', $request->main_vendor_code)
            ->orderBy('created_at', 'desc')
            ->get();
        return response()->json($res);
    }


    // public function extractInvoices(Request $request) {
    //     set_time_limit(0);
    //     $memory_limit = ini_get('memory_limit');
    //     ini_set('memory_limit', -1);

    //     // try {
    //         $configs = self::serverConfigs();
    //         $loopCounter = 0;
    //         $configsLen = count($configs);
    //         $vendor_codes = explode("|", $request->vendor_codes);
    //         // dd($vendor_codes);
    //         $vendor_codes_imp = implode(',', array_map(fn($item) => "'$item'", $vendor_codes));
    //         $terminals = $request->terminals;
    //         // posting date range ----------------------------------------
    //         $dates = $request->posting_date_range;
    //         sort($dates);
    //         $posting_date_from = '';
    //         $posting_date_to = '';
    //         if(count($dates) > 1) {
    //             $posting_date_from = $dates[0];
    //             $posting_date_to = $dates[1];
    //         } else if(count($dates) == 1) {
    //             $posting_date_from = $dates[0];
    //             $posting_date_to = $dates[0];
    //         }
    //         // set posting_date_to to today if it is a future date
    //         $posting_date_to = new Carbon($posting_date_to);
    //         if($posting_date_to->isFuture()) {
    //             $posting_date_to = Carbon::now();
    //         }
    //         $posting_date_to = $posting_date_to->format('Y-m-d');
    //         // /posting date range ----------------------------------------
    //         $dateTimeToday = Carbon::now()->format('Y-m-d H:i:s');
    //         $batchNum = "NAV" . time();
    //         $result = [
    //             'sales_invoices' => [],
    //             'sales_returns' => [],
    //             'unreachable' => [],
    //         ];
    //         $new_si = 0;
    //         $new_cm = 0;

    //         foreach($configs as $config) {
    //             $server_name = $config['server_name'];
    //             $dsn = $config['dsn'];
    //             $database = $config['database'];
    //             $invoice_headers_tbl = $config['invoice_headers_tbl'];
    //             $invoice_lines_tbl = $config['invoice_lines_tbl'];
    //             $cm_headers_tbl = $config['cm_headers_tbl'];
    //             $cm_lines_tbl = $config['cm_lines_tbl'];
    //             $sm_tbl = $config['sm_tbl'];
    //             $group_name = $config['group_name'];
    //             $existingSalesInvoices = 0;
    //             $newSalesInvoices = 0;
    //             $existingSalesReturns = 0;
    //             $newSalesReturns = 0;

    //             // if not found in selected terminals, skip
    //             if(!in_array($group_name, $terminals)) continue;

    //             // establish db connection, skip if server unreachable
    //             try {
    //                 $dbCon = DB::connection($server_name);
    //             } catch (\Throwable $th) {
    //                 array_push($result['unreachable'], $server_name);
    //                 continue;
    //             }

    //             $loopCounter++;

    //             ///////////////////////////// Sales Invoices ///////////////////////////////////////////
    //             ///////////////////////////// Sales Invoices ///////////////////////////////////////////
    //             ///////////////////////////// Sales Invoices ///////////////////////////////////////////
    //             // retrieve invoices from NAV
    //             DownloadInvoice::dispatch(
    //                 "($loopCounter/$configsLen: $server_name) Retrieving sales invoices from Navision"
    //             );
    //             $sales_invoices = $dbCon->select(
    //                 "SELECT
    //                     -- header
    //                     [$invoice_headers_tbl].[No_] as doc_no,
    //                     [$invoice_headers_tbl].[Sell-to Customer No_] as customer_code,
    //                     [$invoice_headers_tbl].[Bill-to Name] as customer_name,
    //                     [$invoice_headers_tbl].[Posting Date] as posting_date,
    //                     [$invoice_headers_tbl].[Salesperson Code] as sm_code,
    //                     [$invoice_headers_tbl].[External Document No_] as ext_doc_no,
    //                     -- line
    //                     [$invoice_lines_tbl].[Vendor No_] as vendor_code,
    //                     [$invoice_lines_tbl].[No_] as item_code,
    //                     [$invoice_lines_tbl].[Shipment Date] as shipment_date,
    //                     [$invoice_lines_tbl].[Description] as item_description,
    //                     [$invoice_lines_tbl].[Unit of Measure] as uom,
    //                     [$invoice_lines_tbl].[Quantity] as quantity,
    //                     [$invoice_lines_tbl].[Unit Price] as price,
    //                     [$invoice_lines_tbl].[Amount Including VAT] as amount,
    //                     [$invoice_lines_tbl].[Qty_ per Unit of Measure] as qty_per_uom,
    //                     [$invoice_lines_tbl].[Unit of Measure Code] as uom_code,
    //                     [$invoice_lines_tbl].[Line Discount %] as discount_percentage,
    //                     [$invoice_lines_tbl].[VAT %] as vat_percentage,
    //                     -- salesperson
    //                     [$sm_tbl].[Name] as sm_name
    //                 FROM [$invoice_lines_tbl]
    //                 JOIN [$invoice_headers_tbl] ON [$invoice_headers_tbl].[No_] = [$invoice_lines_tbl].[Document No_]
    //                 LEFT JOIN [$sm_tbl] ON [$sm_tbl].[Code] = [$invoice_headers_tbl].[Salesperson Code]
    //                 WHERE [$invoice_lines_tbl].[Quantity] > 0
    //                     AND [$invoice_lines_tbl].[Vendor No_] IN ($vendor_codes_imp)
    //                     -- AND [$invoice_lines_tbl].[Shipment Date] >= '$posting_date_from 00:00:00.000'
    //                     -- AND [$invoice_lines_tbl].[Shipment Date] <= '$posting_date_to 00:00:00.000'
    //                     AND [$invoice_headers_tbl].[Posting Date] >= '$posting_date_from 00:00:00.000'
    //                     AND [$invoice_headers_tbl].[Posting Date] <= '$posting_date_to 00:00:00.000'
    //                 ;
    //                 "
    //             );

    //             // save retrieved invoices to local db
    //             foreach($sales_invoices as $si) {
    //                 // convert encodings
    //                 foreach($si as $key => $val) {
    //                     $si->$key = mb_convert_encoding($val, 'UTF-8','ISO-8859-1');
    //                 }

    //                 DownloadInvoice::dispatch(
    //                     "($loopCounter/$configsLen: $server_name) Retrieving sales invoices from Navision >>" .
    //                     $si->vendor_code . ': ' . $si->doc_no . ', ' . $si->item_code
    //                 );
    //             }
    //             // summary
    //             // if($existingSalesInvoices > 0 || $newSalesInvoices > 0) {
    //                 $result['sales_invoices'][$server_name] = [
    //                     'dsn' => $dsn,
    //                     'database' => $database,
    //                     'existing' => $existingSalesInvoices,
    //                     'new' => $newSalesInvoices,
    //                     'posting_date_from' => $posting_date_from,
    //                     'posting_date_to' => $posting_date_to
    //                 ];
    //             // }
    //             $new_si += $newSalesInvoices;

    //             ///////////////////////////// Sales Returns ///////////////////////////////////////////
    //             ///////////////////////////// Sales Returns ///////////////////////////////////////////
    //             ///////////////////////////// Sales Returns ///////////////////////////////////////////
    //             // retrieve sales returns from Nav
    //             DownloadInvoice::dispatch(
    //                 "($loopCounter/$configsLen: $server_name) Retrieving sales returns from Navision"
    //             );
    //             $sales_returns = $dbCon->select(
    //                 "SELECT
    //                     -- header
    //                     [$cm_headers_tbl].[No_] as doc_no,
    //                     [$cm_headers_tbl].[Bill-to Customer No_] as customer_code,
    //                     -- [$cm_headers_tbl].[Bill-to Name] as customer_name,
    //                     [$cm_headers_tbl].[Posting Date] as posting_date,
    //                     [$cm_headers_tbl].[Shipment Date] as shipment_date,
    //                     -- [$cm_headers_tbl].[Salesperson Code] as sm_code,
    //                     [$cm_headers_tbl].[External Document No_] as invoice_doc_no,
    //                     [$cm_headers_tbl].[External Document No_] as ext_doc_no,
    //                     -- line
    //                     [$cm_lines_tbl].[No_] as item_code,
    //                     [$cm_lines_tbl].[Description] as item_description,
    //                     [$cm_lines_tbl].[Unit of Measure] as uom,
    //                     [$cm_lines_tbl].[Quantity] as quantity,
    //                     [$cm_lines_tbl].[Unit Price] as price,
    //                     [$cm_lines_tbl].[Amount Including VAT] as amount,
    //                     [$cm_lines_tbl].[Qty_ per Unit of Measure] as qty_per_uom,
    //                     [$cm_lines_tbl].[Unit of Measure Code] as uom_code,
    //                     [$cm_lines_tbl].[Line Discount %] as discount_percentage,
    //                     [$cm_lines_tbl].[VAT %] as vat_percentage,
    //                     -- sales invoice line
    //                     [$invoice_lines_tbl].[Vendor No_] as vendor_code
    //                     -- salesperson
    //                     -- [$sm_tbl].[Name] as sm_name
    //                 FROM [$cm_lines_tbl]
    //                 JOIN [$cm_headers_tbl]
    //                     ON [$cm_headers_tbl].[No_] = [$cm_lines_tbl].[Document No_]
    //                 JOIN [$invoice_lines_tbl]
    //                     ON [$invoice_lines_tbl].[Document No_] = [$cm_headers_tbl].[External Document No_]
    //                     AND [$invoice_lines_tbl].[No_] = [$cm_lines_tbl].[No_]
    //                     AND [$invoice_lines_tbl].[Unit of Measure] = [$cm_lines_tbl].[Unit of Measure]
    //                 -- LEFT JOIN [$sm_tbl] ON [$sm_tbl].[Code] = [$cm_headers_tbl].[Salesperson Code]
    //                 WHERE [$invoice_lines_tbl].[Vendor No_] IN ($vendor_codes_imp)
    //                     AND [$invoice_lines_tbl].[Quantity] > 0
    //                     AND [$cm_lines_tbl].[Quantity] > 0
    //                     AND [$cm_headers_tbl].[Posting Date] >= '$posting_date_from 00:00:00.000'
    //                     AND [$cm_headers_tbl].[Posting Date] <= '$posting_date_to 00:00:00.000'
    //                 ;
    //                 "
    //             );

    //             // store doc_nos here temporarily
    //             $sr_docnos = [];

    //             // save retrieved sales returns to local db
    //             foreach($sales_returns as $sr) {
    //                 // convert encodings
    //                 foreach($sr as $key => $val) {
    //                     $sr->$key = mb_convert_encoding($val, 'UTF-8', 'ISO-8859-1');
    //                 }

    //                 $sr_docnos[] = $sr->doc_no;
    //             }

    //             // summary
    //             // if($existingSalesReturns > 0 || $newSalesReturns > 0) {
    //                 $result['sales_returns'][$server_name] = [
    //                     'dsn' => $dsn,
    //                     'database' => $database,
    //                     'existing' => $existingSalesReturns,
    //                     'new' => $newSalesReturns,
    //                     'posting_date_from' => $posting_date_from,
    //                     'posting_date_to' => $posting_date_to
    //                 ];
    //             // }
    //             $new_cm += $newSalesReturns;
    //         }

    //         // save logs
    //         // DB::table(PrincipalsUtil::$TBL_INVOICES_DLLOG)->insert([
    //         //     'batch_number' => $batchNum,
    //         //     'summary' => json_encode($result),
    //         //     'new_si' => $new_si,
    //         //     'new_cm' => $new_cm,
    //         //     'posting_date_from' => $posting_date_from,
    //         //     'posting_date_to' => $posting_date_to,
    //         //     'unreachable' => count($result['unreachable']),
    //         //     'main_vendor_code' => $request->main_vendor_code,
    //         //     'uploaded_by' => auth()->user()->id
    //         // ]);

    //         ini_set('memory_limit', $memory_limit);
    //         return response()->json($result);
    //     // } catch (\Throwable $th) {
    //         // $res['success'] = false;
    //         // $res['message'] = $server_name ?? '' . ': ' . $th->getMessage();
    //         // return response()->json($res, 500);
    //     // }
    // }


    public function uomsLookup(Request $request) {
        $configs = self::serverConfigs();
        $config_index = 1;
        $server_name = $configs[$config_index]['server_name'];
        $tblUOM = $configs[$config_index]['tbl_prefix'] . 'Item Unit of Measure';
        $item_code = $request->item_code;
        try {
            $dbCon = DB::connection($server_name);
        } catch (\Throwable $th) {
            return response()->json('Unable to connect to the server');
        }
        try {
            $uoms = $dbCon->select("
                SELECT
                    [Code] as uom_code,
                    [Qty_ per Unit of Measure] as qty_per_uom
                FROM [$tblUOM]
                WHERE [Item No_] = '$item_code'
                ;
            ");

            // convert malformed encoding
            foreach($uoms as $uom) {
                foreach($uom as $key => $val) {
                    $uom->$key = mb_convert_encoding($val, 'UTF-8', 'ISO-8859-1');
                }
            }

            return response()->json($uoms);
        } catch (\Throwable $th) {
            return response()->json($th->getMessage());
        }

    }
}
