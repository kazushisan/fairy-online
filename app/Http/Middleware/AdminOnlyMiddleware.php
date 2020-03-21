<?php

namespace App\Http\Middleware;

use Closure;

class AdminOnlyMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $user = $request->user();

        if ($user['name'] !== 'admin') {
            abort(401, 'Unauthorized; general user not allowed.');
        }

        return $next($request);
    }
}
