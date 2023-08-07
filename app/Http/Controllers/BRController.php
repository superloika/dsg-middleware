<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;

class BRController extends Controller
{
    private $configs = null;

    public function __construct() {
        $this->middleware('auth');

        $this->configs = DB::table('br_config')
            ->where('bu', request()->bu)
            // ->where('env', 'production')
            ->where('env', 'local')
            ->get()->first();
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
            return response()->json(
                [
                    'success' => true,
                    'message' => 'BeatRoute login credentials refreshed'
                ]
            );
        } else {
            return response()->json($this->login());
        }
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
                DB::table('br_config')
                    ->where('bu', request()->bu)
                    // ->where('env', 'production')
                    ->where('env', 'local')
                    ->update([
                        'api_token'=>$d->data->token
                    ]);
                return ['success' => true, 'message' => 'Logged in to BeatRoute'];
            } else {
                return $d;
            }
        } catch (\Throwable $th) {
            return $d;
        }

    }


    public function invoiceCreate() {
        try {
            //code...
            $data = request()->data;
            $res = Http::withHeaders([
                'Content-Type'=>'application/json',
                'Authorization'=>"Bearer ". $this->configs->api_token
            ])->post($this->configs->api_url_invoice_create, $data);
            return response()->json($res->json());
        } catch (\Throwable $th) {
            //throw $th;
            return response()->json(['success' => false,'message' => $th->getMessage()]);
        }
    }
}
