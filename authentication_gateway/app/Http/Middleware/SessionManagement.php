<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SessionManagement
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
      try {
        if (Auth::check() || $request->path() == 'login' || $request->path() == 'callback') {
          return $next($request);
        } else {
          return redirect('/login');
        }
      } catch(KeycloakCallbackException $e) {
          return redirect('/login');
      }
    }
}
