<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class NoticeController extends Controller
{
    public function index() {
        $res = DB::table('notices')->orderBy('id','desc')->get();
        return response()->json($res);
    }


}
