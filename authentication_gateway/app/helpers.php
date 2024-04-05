<?php 
use Illuminate\Support\Facades\Crypt;

function setOriginRedirectUrl()
{
    $origin = request()->header('referer');
    if(empty($origin)){
        $origin = Request()->input('referer');
    }
    return !empty($origin)?Crypt::encryptString($origin):'';
}

function getOriginRedirectUrl($encodedUrl)
{
    return Crypt::decryptString($encodedUrl);
}

function getLogoutRedirectUrl($originalUrl)
{
    $origin = request()->header('referer');
    if(empty($origin)){
        $origin = Request()->input('referer');
    }
    return !empty($origin)?$origin:$originalUrl;
}