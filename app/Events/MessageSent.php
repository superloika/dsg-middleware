<?php

namespace App\Events;

use App\User;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\DB;

class MessageSent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $message;
    public $channel;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($message_id, $channel)
    {
        // $this->user = $user;
        // $this->message = DB::table('devchat')->where('id', $message_id)->first();
        $res = DB::table('devchat')
            ->select('devchat.*',
                    'users.username',
                    'users.name',
                )
            ->join('users', 'devchat.user_id', 'users.id')
            ->where('devchat.id', $message_id)
            ->first();

        $this->message = $res;
        $this->channel = $channel;

    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new PresenceChannel($this->channel);
    }
}
