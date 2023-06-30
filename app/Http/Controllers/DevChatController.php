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
        $latestMsgId = DB::table('devchat')->insertGetId([
            'user_id' => auth()->user()->id,
            'message' => $request->message,
            'channel' => $request->channel,
        ]);

        event(new MessageSent($latestMsgId, $request->channel));

        return ['status' => 'Message Sent!'];
    }

    public function userOnline(Request $request) {
        DB::table('users')
        ->where('id',$request->user_id)
        ->update([
            'isOnline' => 1,
        ])
        ;

        event(new UserOnline($request->channel));

        return ['status' => 'User online'];
    }

    public function userOffline(Request $request) {
        DB::table('users')
        ->where('id',$request->user_id)
        ->update([
            'isOnline' => 0,
        ])
        ;

        event(new UserOffline($request->channel));

        return ['status' => 'User offline'];
    }

    public function fetchOnlineUsers(Request $request) {
        $res = DB::table('users')
            ->where('isOnline', 1)
            ->get();
        return response()->json($res);
    }

}
