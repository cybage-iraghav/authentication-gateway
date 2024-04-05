<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;

class LoginController extends Controller
{
    public function index(Request $request)
    {
        $urlpath = Cookie::get('urlpath');
        $referer = Request()->getSchemeAndHttpHost().'/'.$urlpath;
        return Redirect::away('http://localhost:8000/login?referer='.urlencode($referer));
    }
    
    public function logout(Request $request)
    {
        //$referer = Request()->getSchemeAndHttpHost();
        //return Redirect::away('http://localhost:8000/logout?referer='.urlencode($referer));
        return Redirect::away('http://localhost:8000/logout');
    }
}