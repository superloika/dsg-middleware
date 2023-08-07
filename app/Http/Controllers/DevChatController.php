<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Events\UserOffline;
use App\Events\UserOnline;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DevChatController extends Controller
{
    public function __construct() {
        $this->middleware('auth');
    }

    public function fetchMessages(Request $request) {
        $res = DB::table('devchat')
            ->select('devchat.*',
                'users.username',
                'users.name',
            )
            ->where('devchat.channel', $request->channel)
            ->join('users', 'devchat.user_id', 'users.id')
            ->orderBy('devchat.id','DESC')
            ->get();
        return response()->json($res);
    }

    public function sendMessage(Request $request) {
        $latestMsgID = DB::table('devchat')->insertGetId([
            'user_id' => auth()->user()->id,
            'message' => $request->message,
            'channel' => $request->channel,
        ]);

        event(new MessageSent($latestMsgID, $request->channel));

        return ['status' => 'Message Sent!'];
    }

}
