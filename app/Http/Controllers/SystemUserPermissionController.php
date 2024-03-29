<?php

namespace App\Http\Controllers;

use App\Models\SystemUserPermission;
use Illuminate\Http\Request;

class SystemUserPermissionController extends Controller
{
    public function index()
    {
        $permissions = SystemUserPermission::all();
        return response()->json($permissions);
    }
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:system_users,user_id',
            'mapp_cloudid' => 'required|exists:mapp_cloud_customers,cloud_id',
            'cloud_instanceid' => 'required|exists:cloud_instances,instance_id',
            'permission_type' => 'required|in:read,write,admin',
            'default_cloudinstance_permissions' => 'required|boolean',
        ]);
        $permission = SystemUserPermission::create($request->all());
        return response()->json($permission, 201);
    }
    public function update(Request $request, $permission_id)
    {
        try {
            $permission = SystemUserPermission::where('permission_id', $permission_id)->firstOrFail();
        } catch (\Exception $e) {
            return response()->json(['error' => 'Permission not found'], 404);
        }
        $request->validate([
            'mapp_cloudid' => 'required',
            'cloud_instanceid' => 'required',
            'permission_type' => 'required',
            'default_cloudinstance_permissions' => 'required',
        ]);
        $permission->update($request->all());
        // Return a JSON response after the update
        return response()->json($permission);
    }
    public function destroy($permission_id)
    {
        try {
            $permission = SystemUserPermission::where('permission_id', $permission_id)->firstOrFail();
            $permission->delete();
            return response()->json(null, 204);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Permission not found'], 404);
        }
    }
}
