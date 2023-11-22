<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Events\UserOffline;
use App\Events\UserOnline;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

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
        $message = $request->input('message');
        $channel = $request->input('channel');
        $files = $request->file('attachments') ?? [];

        $dateTimeToday = Carbon::now()->format('Y-m-d H:i:s');
        $filenames = [];

        foreach($files as $file) {
            $origFilename = $file->getClientOriginalName();
            $customFilename = time() . '_' . $origFilename;
            $filenames[] = $customFilename;

            $testFilesPath = "public/attachments/$channel";
            Storage::putFileAs($testFilesPath, $file, $customFilename);
        }

        $latestMsgID = DB::table('devchat')->insertGetId([
            'user_id' => auth()->user()->id,
            'message' => $message,
            'channel' => $channel,
            'attachments' => json_encode($filenames)
        ]);

        event(new MessageSent($latestMsgID, $request->channel));

        return ['status' => 'Message Sent!'];
    }

}
