<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SystemUsers;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class MappCloudCustomerController extends Controller
{
    // Index - Display a listing of the resource
    public function index()
    {
        $userDetails = SystemUsers::getUserDetails();
        //$customers = MappCloudCustomers::all();
        return response()->json($userDetails);
    }
}
