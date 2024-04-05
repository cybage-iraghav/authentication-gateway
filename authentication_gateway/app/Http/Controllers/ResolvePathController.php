<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use GuzzleHttp\Cookie\CookieJar;
use Illuminate\Support\Facades\Cookie;


class ResolvePathController extends Controller
{
    public function getRequest(Request $request)
    {
        $path = $request->request->get('oldPath');
        $result = explode("/",$path);
        $backend_domain = env($result[0]);
        array_shift($result);
        $backend_call = implode("/",$result);
        $endpoint = $backend_domain.'/'.$backend_call;

        $cookies = $request->cookie();
        $cookieJar = CookieJar::fromArray($_COOKIE, 'localhost');
        $userAgent = $request->header('user-agent'); 

        $response = Http::withHeaders([
            'Content-Type' => 'application/x-www-form-urlencoded;',
            'Access-Control-Allow-Credentials' => 'true',
            'Access-Control-Allow-Origin' => '*'
        ])->withUserAgent($userAgent)->withOptions([
            'cookies' => $cookieJar, ])->get($endpoint);

        return $response;
    }

    public function postRequest(Request $request)
    {
        $path = $request->request->get('oldPath');
        $result = explode("/",$path);
        $backend_domain = env($result[0]);
        array_shift($result);
        $backend_call = implode("/",$result);
        $endpoint = $backend_domain.'/'.$backend_call;

        $cookies = $request->cookie();
        $cookieJar = CookieJar::fromArray($_COOKIE, 'localhost');
        $userAgent = $request->header('user-agent');

        //to do

        return $response;
    }
}
