<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Cookie;

class SystemUsers extends Model
{
    use HasFactory;
    protected $primaryKey = 'user_id';

    public static function getUserDetails()
    {
        $gatewaySessionId = Cookie::get('laravel_session');
        $data = DB::table('sessions')->where(['id'=>$gatewaySessionId])->get();
        $userDetails = SystemUsers::where('email',$data[0]->user_id) -> first();  
        return $userDetails;
    }
}
