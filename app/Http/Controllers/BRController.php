<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;

class BRController extends Controller
{
    private $configs = null;
    public function __construct() {
        $this->configs = DB::table('br_config')->get()->first();
    }


    public function refresh() {
        $res = Http::withHeaders([
            'Content-Type'=>'application/json',
            'Authorization'=>"Bearer ". $this->configs->api_token
        ])->post($this->configs->api_url_refresh,[
            'username'=>$this->configs->api_un,
        ]);
        $d = json_decode($res->body());
        if($d->success) {
            return response()->json(['success'=>true]);
        } else {
            $this->login();
        }
        return response()->json($d);
    }


    public function login() {
        try {
            $res = Http::withHeaders([
                'Content-Type'=>'application/json',
            ])->post($this->configs->api_url_login,[
                'username'=>$this->configs->api_un,
                'password'=>$this->configs->api_pw,
                'device'=>$this->configs->api_device,
            ]);
            $d = json_decode($res->body());
            if($d->success) {
                DB::table('br_config')->update([
                    'api_token'=>$d->data->token
                ]);
                $this->configs = DB::table('br_config')->get()->first();
                // return response()->json(['success'=>true]);
            } else {
                // return response()->json($d);
            }
        } catch (\Throwable $th) {
            //throw $th;
            return response()->json($th->getMessage(), 500);
        }

    }


    public function invoiceCreate() {
        // beatroute test **************************************************************
        // [
        //     "retailer_br_id"=> "",
        //     "retailer_external_id"=> "160614-API-000007",
        //     "erp_invoice_number"=> "INV-101",
        //     "invoice_date"=> "2023-06-02",
        //     "status"=> 1,
        //     "order_id"=> "",
        //     "external_order_id"=> "",
        //     "ship_to_external_id"=> "",
        //     "order_status"=> "",
        //     "total_tax"=> "",
        //     "total_value"=> "",
        //     "remarks"=> "",
        //     "payment_due_date"=> "",
        //     "invoice_level_discount"=> "",
        //     "details"=> [
        //         [
        //             "sku_external_id"=> "000000000000159626",
        //             "quantity"=> "2",
        //             "sku_uom"=> "",
        //             "price_per_item"=> "1",
        //             "discount_value"=> "",
        //             "gross_value"=> "",
        //             "tax_code"=> "",
        //             "tax"=> ""
        //         ],
        //         [
        //             "sku_external_id"=> "000000501120020002",
        //             "quantity"=> "1",
        //             "sku_uom"=> "",
        //             "price_per_item"=> "1",
        //             "discount_value"=> "",
        //             "gross_value"=> "",
        //             "tax_code"=> "",
        //             "tax"=> ""
        //         ]
        //     ],
        //     "customFields"=> [
        //         [
        //             "id"=> "629",
        //             "value"=> "Test DSP"
        //         ]
        //     ]
        // ]
        $data = request()->data;
        // dd($data);
        $res = Http::withHeaders([
            'Content-Type'=>'application/json',
            'Authorization'=>"Bearer ". $this->configs->api_token
        // ])->post($this->configs->api_url_invoice_create,[
        //     [
        //         "retailer_external_id"=> "160614-API-000007",
        //         "erp_invoice_number"=> "INV-101",
        //         "invoice_date"=> "2023-06-02",
        //         "details"=> [
        //             [
        //                 "sku_external_id"=> "000000000000159626",
        //                 "quantity"=> "10",
        //                 "sku_uom"=> "",
        //                 "price_per_item"=> "1",
        //                 "discount_value"=> "",
        //                 "gross_value"=> "",
        //             ],
        //             [
        //                 "sku_external_id"=> "000000501120020002",
        //                 "quantity"=> "20",
        //                 "sku_uom"=> "",
        //                 "price_per_item"=> "1",
        //                 "discount_value"=> "",
        //                 "gross_value"=> "",
        //             ]
        //         ],
        //         "customFields"=> [
        //             [
        //                 "id"=> "629",
        //                 "value"=> "Test DSP"
        //             ]
        //         ]
        //     ]
        // ]);
        ])->post($this->configs->api_url_invoice_create, $data);
        return response()->json($res->json());
        // dd($createInvoice->json());
        // /beatroute test **************************************************************
    }
}
