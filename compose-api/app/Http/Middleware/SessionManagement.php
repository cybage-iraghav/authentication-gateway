<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use GuzzleHttp\Cookie\CookieJar;
use Illuminate\Support\Facades\Cookie;

class SessionManagement
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        //var_dump($request->cookie());
//exit;
        /*$cookies = $request->cookie();
        $cookieJar = CookieJar::fromArray($_COOKIE, 'localhost');
        $userAgent = $request->header('user-agent'); 
        $endpoint = "http://localhost:8000/login_status";

        $response = Http::withHeaders([
            'Content-Type' => 'application/x-www-form-urlencoded;',
            'Access-Control-Allow-Credentials' => 'true',
            'Access-Control-Allow-Origin' => '*'
        ])->withUserAgent($userAgent)->withOptions([
            'cookies' => $cookieJar, ])->get($endpoint);
        $response = json_decode($response->body());
        $auth_id = $response->id??'';
        Cookie::forget('urlpath');

        try {
            if(!empty($auth_id) || $request->path() == 'login' || $request->path() == 'callback'){
                return $next($request);
            }else{
                Cookie::queue('urlpath', $request->path(), 1, null, null, false, false);
                return redirect('/login');
            }
        } catch(KeycloakCallbackException $e) {
            Cookie::queue('urlpath', $request->path(), 1, null, null, false, false);
            return redirect('/login');
        }*/
        return $next($request);
    }
}