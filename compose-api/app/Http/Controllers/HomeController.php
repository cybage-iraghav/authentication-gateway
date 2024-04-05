<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SystemUsers;

class HomeController extends Controller
{
    public function index()
    {
        $userDetails = SystemUsers::getUserDetails();
        
        return view('home',[
            'user' => $userDetails,
        ]);
    }
}