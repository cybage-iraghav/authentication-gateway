<?php

namespace App\Http\Controllers;

use App\Models\SystemUser;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;

class SystemUserController extends Controller
{
    public function index()
    {
        return response()->json(SystemUser::all());
    }
    public function store(Request $request)
    {
        $request->validate([
            'username' => 'required',
            'email' => 'required',
            'mapp_internal' => 'required',
            'active' => 'required',
        ]);
        $user = SystemUser::create($request->all());
        return response()->json($user, 201);
    }
    public function update(Request $request, $user_id)
    {
        try {
            $user = SystemUser::where('user_id', $user_id)->firstOrFail();
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'User not found'], 404);
        }
        // dd($user);
        // $request->validate([
        //     'username' => 'required|unique:system_users,username,' . $user->user_id,
        //     'email' => 'required|email|unique:system_users,email,' . $user->user_id,
        //     'mapp_internal' => 'required|boolean',
        //     'active' => 'required|boolean',
        // ]);
        $user->update($request->all());
        return response()->json($user);
    }
    public function destroy($user_id)
    {
        try {
            $user = SystemUser::where('user_id', $user_id)->firstOrFail();
            $user->delete();
            return response()->json(null, 204);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'User not found'], 404);
        }
    }
}
