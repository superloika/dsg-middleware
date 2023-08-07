<?php

use Illuminate\Support\Facades\Broadcast;

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

Broadcast::channel('App.User.{id}', function ($user, $id) {
    return ((int) $user->id === (int) $id);
});

Broadcast::channel('dev_group_chat', function ($user) {
    return $user;
});

// Broadcast::channel('mead_johnson', function ($user) {
//     return $user;
// });

// Broadcast::channel('wyeth', function ($user) {
//     return $user;
// });

// Broadcast::channel('invoices', function ($user) {
//     return $user;
// });
