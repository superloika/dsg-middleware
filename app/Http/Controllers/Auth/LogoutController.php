<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LogoutController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function logout() {
        Auth::logout();
        return redirect()->route('login');
    }


    public function flushSession(Request $request) {
        $request->session()->invalidate();
        // return redirect()->route('login');
        return redirect('/');

    }
}
