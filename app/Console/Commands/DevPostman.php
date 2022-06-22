<?php

namespace App\Console\Commands;

use App\User;
use Illuminate\Console\Command;
use Illuminate\Contracts\Http\Kernel as HttpKernel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

class DevPostman extends Command
{
    protected $signature = 'dev:postman {guard} {user?}';
    protected $description = 'Generating access for Postman.';

    public function handle()
    {
        if (!App::environment('local')) {
            $this->warn("It works only in local environment.");
            return 1;
        }
        if (!User::query()->count()) {
            $this->warn("Users table is empty.");
            return 1;
        }

        $user = $this->argument('user')
            ? User::query()->findOrFail($this->argument('user'))
            : User::query()->firstOrFail()
        ;

        if ($this->argument('guard') === "api") {
            $this->output->writeln($user->createToken('test')->plainTextToken);
            return 0;
        }

        Route::get('/login', function () use ($user) {
            Auth::login($user);
            return response("Hello mevelix.");
        })->middleware('web');

        $request = Request::create('/login');
        $kernel = app()->make(HttpKernel::class);
        $response = $kernel->handle($request);
        $cookies = $response->headers->getCookies('array');
        // $cookie1 = $cookies[""]["/"]['laravel_session'];
        $cookie1 = $cookies[""]["/"]['dsg_middleware_dev_session'];
        $cookie2 = $cookies[""]["/"]['XSRF-TOKEN'];
        $laravelSession = $cookie1->getValue();
        $xsrfToken = $cookie2->getValue();

        $result = '
            pm.request.addHeader({key: "Cookie", value: "dsg_middleware_dev_session='.$laravelSession.'"});
            pm.request.addHeader({key: "X-XSRF-TOKEN", value: "'.$xsrfToken.'"});
        ';

        $this->output->writeln($result);
        return 0;
    }
}
