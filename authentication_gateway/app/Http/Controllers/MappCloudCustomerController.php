<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MappCloudCustomers;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class MappCloudCustomerController extends Controller
{
    // Index - Display a listing of the resource
    public function index()
    {
        $user = Auth::user();
        $customers = MappCloudCustomers::all();
        return response()->json($user);
    }
    // Store - Store a newly created resource in storage
    public function store(Request $request)
    {
        $request->validate([
            'company_name' => 'required|max:255',
            'contact_email' => 'required|email|max:100',
            // Add validation rules for other fields as needed
        ]);
        $data = $request->all();
        $customer = MappCloudCustomers::create($data);
        return response()->json($customer, Response::HTTP_CREATED);
    }
    // Show - Display the specified resource
    public function show(MappCloudCustomers $customer)
    {
        return response()->json($customer);
    }
    // Update - Update the specified resource in storage
    public function update(Request $request, MappCloudCustomers $customer)
    {
        $request->validate([
            'company_name' => 'max:255',
            'contact_email' => 'email|max:100',
            // Add validation rules for other fields as needed
        ]);
        $customer->update($request->all());
        return response()->json($customer);
    }
    // Destroy - Remove the specified resource from storage
    public function destroy(MappCloudCustomers $customer)
    {
        $customer->delete();
        return response()->json(null, Response::HTTP_NO_CONTENT);
    }
}
