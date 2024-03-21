<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

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
                'group_name'            => 'WDG UBAY',
            ],
            [
                'server_name'           => 'DELICA BULK',
                'dsn'                   => 'Driver={SQL Server};Server=172.16.192.3;Database=OPLAN_SO_SRV;',
                'database'              => 'OPLAN_SO_SRV',
                'invoice_headers_tbl'   => 'LDI_OPLAN SALES ORDER$Sales Invoice Header',
                'invoice_lines_tbl'     => 'LDI_OPLAN SALES ORDER$Sales Invoice Line',
                'cm_headers_tbl'        => 'LDI_OPLAN SALES ORDER$Sales Cr_Memo Header',
                'cm_lines_tbl'          => 'LDI_OPLAN SALES ORDER$Sales Cr_Memo Line',
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
                'group_name'            => 'DELICA_PCS',
            ],
            [
                'server_name'           => 'HORECA BULK',
                'dsn'                   => 'Driver={SQL Server};Server=172.16.192.30;Database=HORECA BULK;',
                'database'              => 'HORECA BULK',
                'invoice_headers_tbl'   => 'LDI_HORECA BULK$Sales Invoice Header',
                'invoice_lines_tbl'     => 'LDI_HORECA BULK$Sales Invoice Line',
                'cm_headers_tbl'        => 'LDI_HORECA BULK$Sales Cr_Memo Header',
                'cm_lines_tbl'          => 'LDI_HORECA BULK$Sales Cr_Memo Line',
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
                'group_name'            => '3PS_BULK',
            ],
            [
                'server_name'           => 'SEC',
                'dsn'                   => 'Driver={SQL Server};Server=172.16.192.1;Database=CWDG_VARIOUS_SI;',
                'database'              => 'CWDG_VARIOUS_SI',
                'invoice_headers_tbl'   => 'LDI-DSG SPECIAL EXTERNAL CUST_$Sales Invoice Header',
                'invoice_lines_tbl'     => 'LDI-DSG SPECIAL EXTERNAL CUST_$Sales Invoice Line',
                'cm_headers_tbl'        => 'LDI-DSG SPECIAL EXTERNAL CUST_$Sales Cr_Memo Header',
                'cm_lines_tbl'          => 'LDI-DSG SPECIAL EXTERNAL CUST_$Sales Cr_Memo Line',
                'group_name'            => 'SEC',
            ],
            [
                'server_name'           => 'STORE WITHDRAWAL',
                'dsn'                   => 'Driver={SQL Server};Server=172.16.192.4;Database=CDC_SRV_SQL;',
                'database'              => 'CDC_SRV_SQL',
                'invoice_headers_tbl'   => 'ALTURAS_CDC$Sales Invoice Header',
                'invoice_lines_tbl'     => 'ALTURAS_CDC$Sales Invoice Line',
                'cm_headers_tbl'        => 'ALTURAS_CDC$Sales Cr_Memo Header',
                'cm_lines_tbl'          => 'ALTURAS_CDC$Sales Cr_Memo Line',
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
                'group_name'            => 'MAS_PCS',
            ],
        ];
    }
}
