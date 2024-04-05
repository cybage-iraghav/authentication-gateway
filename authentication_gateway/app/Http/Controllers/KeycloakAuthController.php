<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Vizir\KeycloakWebGuard\Controllers\AuthController;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;
use Vizir\KeycloakWebGuard\Facades\KeycloakWeb;
use Vizir\KeycloakWebGuard\Exceptions\KeycloakCallbackException;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Session;

class KeycloakAuthController extends AuthController
{
    /**
     * Redirect to login
     *
     * @return view
     */
    public function login()
    {
        $url = KeycloakWeb::getLoginUrl();
        KeycloakWeb::saveState();

        Cookie::queue('origin', setOriginRedirectUrl(), 10, null, null, false, false);
        return redirect($url);
    }

    /**
     * Redirect to logout
     *
     * @return view
     */
    public function logout()
    {
        Cookie::forget('origin');
        $url = KeycloakWeb::getLogoutUrl();
        $pathInfo = parse_url($url);
        $queryString = $pathInfo['query'];
        parse_str($queryString, $queryArray);
        $origin = getLogoutRedirectUrl($queryArray['post_logout_redirect_uri']);
        $queryArray['post_logout_redirect_uri'] = $origin;

        $newQueryStr = http_build_query($queryArray);
        $newUrl = $pathInfo['scheme'].'://'.$pathInfo['host'].':'.$pathInfo['port'].$pathInfo['path'].'?'.$newQueryStr;

        return redirect($newUrl);
    }

    /**
     * Keycloak callback page
     *
     * @throws KeycloakCallbackException
     *
     * @return view
     */
    public function callback(Request $request)
    {
        $origin = Cookie::get('origin');
        // Check for errors from Keycloak
        if (! empty($request->input('error'))) {
            $error = $request->input('error_description');
            $error = ($error) ?: $request->input('error');

            throw new KeycloakCallbackException($error);
        }

        // Check given state to mitigate CSRF attack
        $state = $request->input('state');
        if (empty($state) || ! KeycloakWeb::validateState($state)) {
            KeycloakWeb::forgetState();
            throw new KeycloakCallbackException('Invalid state');

        }

        // Change code for token
        $code = $request->input('code');
        if (! empty($code)) {
            $token = KeycloakWeb::getAccessToken($code);
            if (Auth::validate($token)) {
                $redirectUrl = !empty($origin)?getOriginRedirectUrl($origin):config('keycloak-web.redirect_url', '/admin');
                $url = $redirectUrl;
                return redirect()->intended($url);
            }
        }

        return redirect(route('keycloak.login'));
    }

    public function keepAlive()
    {
        
    }

    /**
     * check if user is logged in
     */
    public function loginStatus(){
        return json_encode(Auth::user());
    }
}