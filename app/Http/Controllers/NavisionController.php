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
        return [
            [
                'server_name'           => 'WDG PCS',
                'dsn'                   => 'Driver={SQL Server};Server=172.16.192.1;Database=CWDG_VARIOUS_SI;',
                'database'              => 'CWDG_VARIOUS_SI',
                'invoice_headers_tbl'   => 'ALTURAS SUPERMARKET CORP_$Sales Invoice Header',
                'invoice_lines_tbl'     => 'ALTURAS SUPERMARKET CORP_$Sales Invoice Line',
                'cm_headers_tbl'        => 'ALTURAS SUPERMARKET CORP_$Sales Cr_Memo Header',
                'cm_lines_tbl'          => 'ALTURAS SUPERMARKET CORP_$Sales Cr_Memo Line',
                'sm_tbl'                => 'ALTURAS SUPERMARKET CORP_$Salesperson_Purchaser',
                'group_name'            => 'CWDG_PCS',
            ],
            [
                'server_name'           => 'WDG BULK',
                'dsn'                   => 'Driver={SQL Server};Server=172.16.192.13;Database=WDG_SI_SQL;',
                'database'              => 'WDG_SI_SQL',
                'invoice_headers_tbl'   => 'ALTURAS SUPERMARKET CORP_$Sales Invoice Header',
                'invoice_lines_tbl'     => 'ALTURAS SUPERMARKET CORP_$Sales Invoice Line',
                'cm_headers_tbl'        => 'ALTURAS SUPERMARKET CORP_$Sales Cr_Memo Header',
                'cm_lines_tbl'          => 'ALTURAS SUPERMARKET CORP_$Sales Cr_Memo Line',
                'sm_tbl'                => 'ALTURAS SUPERMARKET CORP_$Salesperson_Purchaser',
                'group_name'            => 'CWDG_BULK',
            ],
            [
                'server_name'           => 'WDG UBAY',
                'dsn'                   => 'Driver={SQL Server};Server=172.16.21.201;Database=SI CONSOLIDATOR;',
                'database'              => 'SI CONSOLIDATOR',
                'invoice_headers_tbl'   => 'ALTURAS SUPERMARKET CORP_ - SI$Sales Invoice Header',
                'invoice_lines_tbl'     => 'ALTURAS SUPERMARKET CORP_ - SI$Sales Invoice Line',
                'cm_headers_tbl'        => 'ALTURAS SUPERMARKET CORP_ - SI$Sales Cr_Memo Header',
                'cm_lines_tbl'          => 'ALTURAS SUPERMARKET CORP_ - SI$Sales Cr_Memo Line',
                'sm_tbl'                => 'ALTURAS SUPERMARKET CORP_ - SI$Salesperson_Purchaser',
                'group_name'            => 'UWDG_BULK',
            ],
            [
                'server_name'           => 'DELICA BULK',
                'dsn'                   => 'Driver={SQL Server};Server=172.16.192.3;Database=OPLAN_SO_SRV;',
                'database'              => 'OPLAN_SO_SRV',
                'invoice_headers_tbl'   => 'LDI_OPLAN SALES ORDER$Sales Invoice Header',
                'invoice_lines_tbl'     => 'LDI_OPLAN SALES ORDER$Sales Invoice Line',
                'cm_headers_tbl'        => 'LDI_OPLAN SALES ORDER$Sales Cr_Memo Header',
                'cm_lines_tbl'          => 'LDI_OPLAN SALES ORDER$Sales Cr_Memo Line',
                'sm_tbl'                => 'LDI_OPLAN SALES ORDER$Salesperson_Purchaser',
                'group_name'            => 'DELICA_BULK',
            ],
            [
                'server_name'           => 'DELICA PCS',
                'dsn'                   => 'Driver={SQL Server};Server=172.16.192.1;Database=CLDI SI SRV_VARIOUS;',
                'database'              => 'CLDI SI SRV_VARIOUS',
                'invoice_headers_tbl'   => 'LEONARDO DISTRIBUTORS INCORP_$Sales Invoice Header',
                'invoice_lines_tbl'     => 'LEONARDO DISTRIBUTORS INCORP_$Sales Invoice Line',
                'cm_headers_tbl'        => 'LEONARDO DISTRIBUTORS INCORP_$Sales Cr_Memo Header',
                'cm_lines_tbl'          => 'LEONARDO DISTRIBUTORS INCORP_$Sales Cr_Memo Line',
                'sm_tbl'                => 'LEONARDO DISTRIBUTORS INCORP_$Salesperson_Purchaser',
                'group_name'            => 'DELICA_PCS',
            ],
            [
                'server_name'           => 'HORECA BULK',
                'dsn'                   => 'Driver={SQL Server};Server=172.16.192.3;Database=HORECA BULK;',
                'database'              => 'HORECA BULK',
                'invoice_headers_tbl'   => 'LDI_HORECA BULK$Sales Invoice Header',
                'invoice_lines_tbl'     => 'LDI_HORECA BULK$Sales Invoice Line',
                'cm_headers_tbl'        => 'LDI_HORECA BULK$Sales Cr_Memo Header',
                'cm_lines_tbl'          => 'LDI_HORECA BULK$Sales Cr_Memo Line',
                'sm_tbl'                => 'LDI_HORECA BULK$Salesperson_Purchaser',
                'group_name'            => 'HORECA_BULK',
            ],
            [
                'server_name'           => 'HORECA PCS',
                'dsn'                   => 'Driver={SQL Server};Server=172.16.192.1;Database=HORECA_srv;',
                'database'              => 'HORECA_srv',
                'invoice_headers_tbl'   => 'HORECA CONSOL SRV$Sales Invoice Header',
                'invoice_lines_tbl'     => 'HORECA CONSOL SRV$Sales Invoice Line',
                'cm_headers_tbl'        => 'HORECA CONSOL SRV$Sales Cr_Memo Header',
                'cm_lines_tbl'          => 'HORECA CONSOL SRV$Sales Cr_Memo Line',
                'sm_tbl'                => 'HORECA CONSOL SRV$Salesperson_Purchaser',
                'group_name'            => 'HORECA_PCS',
            ],
            [
                'server_name'           => '3PS',
                'dsn'                   => 'Driver={SQL Server};Server=172.16.192.3;Database=3PS_NEW;',
                'database'              => '3PS_NEW',
                'invoice_headers_tbl'   => '3PS BULK$Sales Invoice Header',
                'invoice_lines_tbl'     => '3PS BULK$Sales Invoice Line',
                'cm_headers_tbl'        => '3PS BULK$Sales Cr_Memo Header',
                'cm_lines_tbl'          => '3PS BULK$Sales Cr_Memo Line',
                'sm_tbl'                => '3PS BULK$Salesperson_Purchaser',
                'group_name'            => '3PS_BULK',
            ],
            [
                'server_name'           => 'SEC',
                'dsn'                   => 'Driver={SQL Server};Server=172.16.192.3;Database=LDI_SEC;',
                'database'              => 'LDI_SEC',
                'invoice_headers_tbl'   => 'LDI-DSG SPECIAL EXTERNAL CUST_$Sales Invoice Header',
                'invoice_lines_tbl'     => 'LDI-DSG SPECIAL EXTERNAL CUST_$Sales Invoice Line',
                'cm_headers_tbl'        => 'LDI-DSG SPECIAL EXTERNAL CUST_$Sales Cr_Memo Header',
                'cm_lines_tbl'          => 'LDI-DSG SPECIAL EXTERNAL CUST_$Sales Cr_Memo Line',
                'sm_tbl'                => 'LDI-DSG SPECIAL EXTERNAL CUST_$Salesperson_Purchaser',
                'group_name'            => 'SEC_BULK',
            ],
            [
                'server_name'           => 'STORE WITHDRAWAL',
                'dsn'                   => 'Driver={SQL Server};Server=172.16.192.4;Database=CDC_SRV_SQL;',
                'database'              => 'CDC_SRV_SQL',
                'invoice_headers_tbl'   => 'ALTURAS_CDC$Sales Invoice Header',
                'invoice_lines_tbl'     => 'ALTURAS_CDC$Sales Invoice Line',
                'cm_headers_tbl'        => 'ALTURAS_CDC$Sales Cr_Memo Header',
                'cm_lines_tbl'          => 'ALTURAS_CDC$Sales Cr_Memo Line',
                'sm_tbl'                => 'ALTURAS_CDC$Salesperson_Purchaser',
                'group_name'            => 'STORE',
            ],
            [
                'server_name'           => 'CVS BULK',
                'dsn'                   => 'Driver={SQL Server};Server=172.16.192.12;Database=LDI_BCVS;',
                'database'              => 'LDI_BCVS',
                'invoice_headers_tbl'   => 'LDI_CVS Bulk$Sales Invoice Header',
                'invoice_lines_tbl'     => 'LDI_CVS Bulk$Sales Invoice Line',
                'cm_headers_tbl'        => 'LDI_CVS Bulk$Sales Cr_Memo Header',
                'cm_lines_tbl'          => 'LDI_CVS Bulk$Sales Cr_Memo Line',
                'sm_tbl'                => 'LDI_CVS Bulk$Salesperson_Purchaser',
                'group_name'            => 'CVS_BULK',
            ],
            [
                'server_name'           => 'CVS PCS',
                'dsn'                   => 'Driver={SQL Server};Server=172.16.192.12;Database=LDI_VCVS;',
                'database'              => 'LDI_VCVS',
                'invoice_headers_tbl'   => 'LDI_CVS Various$Sales Invoice Header',
                'invoice_lines_tbl'     => 'LDI_CVS Various$Sales Invoice Line',
                'cm_headers_tbl'        => 'LDI_CVS Various$Sales Cr_Memo Header',
                'cm_lines_tbl'          => 'LDI_CVS Various$Sales Cr_Memo Line',
                'sm_tbl'                => 'LDI_CVS Various$Salesperson_Purchaser',
                'group_name'            => 'CVS_PCS',
            ],
            [
                'server_name'           => 'MAS BULK',
                'dsn'                   => 'Driver={SQL Server};Server=172.16.192.12;Database=LDI_BMAS;',
                'database'              => 'LDI_BMAS',
                'invoice_headers_tbl'   => 'LDI_MAS Bulk$Sales Invoice Header',
                'invoice_lines_tbl'     => 'LDI_MAS Bulk$Sales Invoice Line',
                'cm_headers_tbl'        => 'LDI_MAS Bulk$Sales Cr_Memo Header',
                'cm_lines_tbl'          => 'LDI_MAS Bulk$Sales Cr_Memo Line',
                'sm_tbl'                => 'LDI_MAS Bulk$Salesperson_Purchaser',
                'group_name'            => 'MAS_BULK',
            ],
            [
                'server_name'           => 'MAS PCS',
                'dsn'                   => 'Driver={SQL Server};Server=172.16.192.12;Database=LDI_VMAS;',
                'database'              => 'LDI_VMAS',
                'invoice_headers_tbl'   => 'LDI_MAS Various$Sales Invoice Header',
                'invoice_lines_tbl'     => 'LDI_MAS Various$Sales Invoice Line',
                'cm_headers_tbl'        => 'LDI_MAS Various$Sales Cr_Memo Header',
                'cm_lines_tbl'          => 'LDI_MAS Various$Sales Cr_Memo Line',
                'sm_tbl'                => 'LDI_MAS Various$Salesperson_Purchaser',
                'group_name'            => 'MAS_PCS',
            ],
        ];
    }


    public function downloadInvoices(Request $request) {
        set_time_limit(0);
        $memory_limit = ini_get('memory_limit');
        ini_set('memory_limit', -1);

        try {
            $configs = self::serverConfigs();
            $loopCounter = 0;
            $configsLen = count($configs);
            $vendor_codes = $request->vendor_codes;
            $vendor_codes_imp = implode(',', array_map(fn($item) => "'$item'", $vendor_codes));
            $posting_date_from = '2024-03-01';
            $posting_date_to = '2024-03-31';
            $dateTimeToday = Carbon::now()->format('Y-m-d H:i:s');
            $result = [
                'sales_invoices' => [],
                'sales_returns' => []
            ];

            foreach($configs as $config) {
                $server_name = $config['server_name'];
                $invoice_headers_tbl = $config['invoice_headers_tbl'];
                $invoice_lines_tbl = $config['invoice_lines_tbl'];
                $cm_headers_tbl = $config['cm_headers_tbl'];
                $cm_lines_tbl = $config['cm_lines_tbl'];
                $sm_tbl = $config['sm_tbl'];
                $group_name = $config['group_name'];
                $existingSalesInvoices = 0;
                $newSalesInvoices = 0;
                $existingSalesReturns = 0;
                $newSalesReturns = 0;

                $loopCounter++;

                ///////////////////////////// Sales Invoices ///////////////////////////////////////////
                // retrieve invoices from NAV
                DownloadInvoice::dispatch(
                    "($loopCounter/$configsLen: $server_name) Retrieving sales invoices from Navision"
                );
                $sales_invoices = DB::connection($server_name)
                ->select(
                    "SELECT
                        -- header
                        [$invoice_headers_tbl].[No_] as doc_no,
                        [$invoice_headers_tbl].[Sell-to Customer No_] as customer_code,
                        [$invoice_headers_tbl].[Bill-to Name] as customer_name,
                        [$invoice_headers_tbl].[Posting Date] as posting_date,
                        [$invoice_headers_tbl].[Salesperson Code] as sm_code,
                        [$invoice_headers_tbl].[External Document No_] as ext_doc_no,
                        -- line
                        [Vendor No_] as vendor_code,
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
                    JOIN [$invoice_headers_tbl]
                        ON [$invoice_headers_tbl].[No_] = [$invoice_lines_tbl].[Document No_]
                    LEFT JOIN [$sm_tbl]
                        ON [$sm_tbl].[Code] = [$invoice_headers_tbl].[Salesperson Code]
                    WHERE [$invoice_lines_tbl].[Shipment Date] >= '$posting_date_from 00:00:00.000'
                    AND [$invoice_lines_tbl].[Shipment Date] <= '$posting_date_to 23:59:59.999'
                    AND [$invoice_lines_tbl].[Quantity] > 0
                    AND [$invoice_lines_tbl].[Vendor No_] IN ($vendor_codes_imp)
                    ;
                    "
                )
                ;

                // save retrieved invoices to local db
                foreach($sales_invoices as $si) {
                    // convert encodings
                    $si->doc_no = mb_convert_encoding($si->doc_no, 'utf-8');
                    $si->customer_code = mb_convert_encoding($si->customer_code, 'utf-8');
                    $si->customer_name = mb_convert_encoding($si->customer_name, 'utf-8');
                    $si->sm_code = mb_convert_encoding($si->sm_code, 'utf-8');
                    $si->ext_doc_no = mb_convert_encoding($si->ext_doc_no, 'utf-8');
                    $si->vendor_code = mb_convert_encoding($si->vendor_code, 'utf-8');
                    $si->item_code = mb_convert_encoding($si->item_code, 'utf-8');
                    $si->item_code = mb_convert_encoding($si->item_code, 'utf-8');
                    $si->item_description = mb_convert_encoding($si->item_description, 'utf-8');
                    $si->item_description = mb_convert_encoding($si->item_description, 'utf-8');
                    $si->sm_name = mb_convert_encoding($si->sm_name, 'utf-8');

                    if (
                        DB::table(PrincipalsUtil::$TBL_INVOICES)
                            ->where('doc_no',$si->doc_no)
                            ->where('item_code',$si->item_code)
                            ->where('customer_code',$si->customer_code)
                            ->where('vendor_code',$si->vendor_code)
                            ->where('uom',$si->uom)
                            ->where('quantity',$si->quantity)
                            ->exists()
                    ) {
                        // existing entries counter
                        $existingSalesInvoices++;
                    } else {
                        DownloadInvoice::dispatch(
                            "($loopCounter/$configsLen: $server_name) Saving sales invoice to local database {$si->doc_no}, {$si->item_code}"
                        );
                        DB::table(PrincipalsUtil::$TBL_INVOICES)->insert([
                            'created_at' => date($dateTimeToday),
                            'uploaded_by' => auth()->user()->id,
                            // 'filename' =>  $origFilename,
                            'filename' =>  '',
                            'group' =>                  $group_name,
                            'batch_number'  =>          'test',
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
                            'ext_doc_no' =>             $si->ext_doc_no,
                        ]);
                        $newSalesInvoices++;
                    }
                }

                // summary
                $result['sales_invoices'][$server_name] = [
                    'existing' => $existingSalesInvoices,
                    'new' => $newSalesInvoices,
                ];

                ///////////////////////////// Sales Returns ///////////////////////////////////////////
                // retrieve sales returns from Nav
                DownloadInvoice::dispatch(
                    "($loopCounter/$configsLen: $server_name) Retrieving sales returns from Navision"
                );
                $sales_returns = DB::connection($server_name)
                ->select(
                    "SELECT
                        -- header
                        [$cm_headers_tbl].[No_] as doc_no,
                        [$cm_headers_tbl].[Bill-to Customer No_] as customer_code,
                        [$cm_headers_tbl].[Bill-to Name] as customer_name,
                        [$cm_headers_tbl].[Posting Date] as posting_date,
                        [$cm_headers_tbl].[Shipment Date] as shipment_date,
                        [$cm_headers_tbl].[Salesperson Code] as sm_code,
                        [$cm_headers_tbl].[External Document No_] as invoice_doc_no,
                        [$cm_headers_tbl].[External Document No_] as ext_doc_no,
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
                        [$invoice_lines_tbl].[Vendor No_] as vendor_code,
                        -- salesperson
                        [$sm_tbl].[Name] as sm_name
                    FROM [$cm_lines_tbl]
                    JOIN [$cm_headers_tbl]
                        ON [$cm_headers_tbl].[No_] = [$cm_lines_tbl].[Document No_]
                    LEFT JOIN [$invoice_lines_tbl]
                        ON [$invoice_lines_tbl].[Document No_] = [$cm_headers_tbl].[External Document No_]
                        AND [$invoice_lines_tbl].[No_] = [$cm_lines_tbl].[No_]
                        AND [$invoice_lines_tbl].[Unit of Measure] = [$cm_lines_tbl].[Unit of Measure]
                    LEFT JOIN [$sm_tbl]
                        ON [$sm_tbl].[Code] = [$cm_headers_tbl].[Salesperson Code]
                    WHERE [$cm_headers_tbl].[Posting Date] >= '$posting_date_from 00:00:00.000'
                    AND [$cm_headers_tbl].[Posting Date] <= '$posting_date_to 23:59:59.999'
                    AND [$invoice_lines_tbl].[Quantity] > 0
                    AND [$cm_lines_tbl].[Quantity] > 0
                    AND [$invoice_lines_tbl].[Vendor No_] IN ($vendor_codes_imp)
                    ;
                    "
                )
                ;

                // save retrieved sales returns to local db
                foreach($sales_returns as $sr) {
                    $sr->doc_no = mb_convert_encoding($sr->doc_no, 'utf-8');
                    $sr->customer_code = mb_convert_encoding($sr->customer_code, 'utf-8');
                    $sr->customer_name = mb_convert_encoding($sr->customer_name, 'utf-8');
                    $sr->sm_code = mb_convert_encoding($sr->sm_code, 'utf-8');
                    $sr->invoice_doc_no = mb_convert_encoding($sr->invoice_doc_no, 'utf-8');
                    $sr->ext_doc_no = mb_convert_encoding($sr->ext_doc_no, 'utf-8');
                    $sr->item_code = mb_convert_encoding($sr->item_code, 'utf-8');
                    $sr->item_description = mb_convert_encoding($sr->item_description, 'utf-8');
                    $sr->item_description = mb_convert_encoding($sr->item_description, 'utf-8');
                    $sr->sm_name = mb_convert_encoding($sr->sm_name, 'utf-8');

                    if (
                        DB::table(PrincipalsUtil::$TBL_CM)
                            ->where('doc_no',$sr->doc_no)
                            ->where('item_code',$sr->item_code)
                            ->where('customer_code',$sr->customer_code)
                            ->where('uom',$sr->uom)
                            ->where('quantity',$sr->quantity)
                            ->exists()
                    ) {
                        // existing entries counter
                        $existingSalesReturns++;
                    } else {
                        DownloadInvoice::dispatch(
                            "($loopCounter/$configsLen: $server_name) Saving sales return to local database {$sr->doc_no}, {$sr->item_code}"
                        );
                        DB::table(PrincipalsUtil::$TBL_CM)->insert([
                            'created_at' =>             date($dateTimeToday),
                            'uploaded_by' =>            auth()->user()->id,
                            // 'filename' => $origFilename,
                            'filename' =>               '',
                            'group' =>                  $group_name,
                            'batch_number' =>           'test',
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
                            'sm_code' =>                $sr->sm_code,
                            'sm_name' =>                $sr->sm_name,
                        ]);
                        $newSalesReturns++;
                    }
                }

                // summary
                $result['sales_returns'][$server_name] = [
                    'existing' => $existingSalesReturns,
                    'new' => $newSalesReturns,
                ];
            }

            ini_set('memory_limit', $memory_limit);

            return response()->json($result);
        } catch (\Throwable $th) {
            $res['success'] = false;
            $res['message'] = $server_name . ': ' . $th->getMessage();
            return response()->json($res, 500);
        }
    }
}
