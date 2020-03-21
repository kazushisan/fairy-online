<?php

namespace App\Http\Controllers;

use \Firebase\JWT\JWT;

class AuthController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->general_user_name = env('GENERAL_USER_NAME');
        $this->general_user_password = env('GENERAL_USER_PASSWORD');

        $this->admin_user_name = env('ADMIN_USER_NAME');
        $this->admin_user_password = env('ADMIN_USER_PASSWORD');

        $this->jwt_key = env('JWT_KEY');
    }

    public function login()
    {
        $this->validate($request, [
            'user' => 'required|string',
            'password' => 'required|string',
        ]);

        $current_time = time();
        $expiry = $current_time + (24 * 60 * 60);

        if (
            $request->input('user') == $this->general_user_name
            && password_verify($request->input('password'), $this->general_user_password)
        ) {
            $token = [
                "iat" => $current_time,
                "exp" => $expiry,
                "user" => $this->general_user_name
            ];

            $jwt = JWT::encode($token, $key, 'HS256');

            return response()->json([
                'jwt' => $jwt
            ]);
        }

        if (
            $request->input('user') == $this->admin_user_name
            && password_verify($request->input('password'), $this->admin_user_password)
        ) {
            $token = [
                "iat" => $current_time,
                "exp" => $expiry,
                "user" => $this->admin_user_name
            ];

            $jwt = JWT::encode($token, $key, 'HS256');

            return response()->json([
                'jwt' => $jwt
            ]);
        }

        abort(401, 'User not found.');
    }
}
