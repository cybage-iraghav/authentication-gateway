<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CloudInstance;
use Illuminate\Http\Response;

class CloudInstanceController extends Controller
{
    public function index()
    {
        $instances = CloudInstance::all();
        return response()->json($instances);
    }
    // Store - Store a newly created resource in storage
    public function store(Request $request)
    {
        $request->validate([
            'instance_type' => 'required',
            // Add validation rules for other fields as needed
        ]);
        $instance = CloudInstance::create($request->all());
        return response()->json($instance, Response::HTTP_CREATED);
    }
    // Show - Display the specified resource
    public function show(CloudInstance $instance)
    {
        return response()->json($instance);
    }
    // Update - Update the specified resource in storage
    public function update(Request $request, CloudInstance $instance)
    {
        $request->validate([
            'instance_type' => 'required',
            // Add validation rules for other fields as needed
        ]);
        info('Updating instance:', $request->all()); // Log the data
        $instance->update($request->all());
        return response()->json($instance);
    }
    // Destroy - Remove the specified resource from storage
    public function destroy(CloudInstance $instance)
    {
        $instance->delete();
        return response()->json(null, Response::HTTP_NO_CONTENT);
    }
}
