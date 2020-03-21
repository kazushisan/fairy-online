<?php

namespace App\Providers;

use \Firebase\JWT\JWT;
use Illuminate\Support\Str;
use Illuminate\Auth\GenericUser;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Boot the authentication services for the application.
     *
     * @return void
     */
    public function boot()
    {
        // Here you may define how you wish users to be authenticated for your Lumen
        // application. The callback which receives the incoming request instance
        // should return either a User instance or null. You're free to obtain
        // the User instance via an API token or any other method necessary.

        $this->app['auth']->viaRequest('api', function ($request) {
            $auth_header = $request->header('Authorization', '');

            if (!Str::startsWith($auth_header, 'Bearer ')) {
                abort(400, 'Authorization bearer missing.');
            }

            $token = JWT::decode(Str::substr($auth_header, 7), env('JWT_KEY'), array('HS256'));

            return new GenericUser([
                'user' => $token->user,
            ]);
        });
    }
}
