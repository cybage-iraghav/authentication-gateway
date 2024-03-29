<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class ResolveRoute
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
        if(str_contains($request->path(), 'engage') || str_contains($request->path(), 'intelligence')) {
            $updatedUri = '/resolve_path';
            
            $body_content = $request->getContent();
            $final_request = Request::create($updatedUri, $request->method(), $request->query->all(), $request->cookies->all(), $request->allFiles(), $request->server->all(), $body_content);
            $final_request->request->add(['oldPath' => $request->path()]);
            return $next($final_request);
          }
          return $next($request);
    }
}
