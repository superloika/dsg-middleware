<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MiscUtils extends Controller
{
    //
    public function __construct()
    {
        $this->middleware('auth');
    }

    // public function exportToTxt(Request $request) {
    //     try {
    //         $data = $request->data ?? 'test';
    //         $filename = $request->filename ?? 'test.txt';

    //         return response()->streamDownload(function() use ($data) {
    //             echo $data;
    //         }, $filename);
    //     } catch (\Throwable $th) {
    //         //throw $th;
    //         return response()->json([
    //             'success' => false,
    //             'message' => $th->getMessage(),
    //         ]);
    //     }
    // }

    /**
     * MVC = main vendor code KEKW
     */
    public function overrideMVC(Request $request) {

    }
}
