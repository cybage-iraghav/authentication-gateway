<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MappCloudCustomerController;
use App\Http\Controllers\CloudInstanceController;
use App\Http\Controllers\SystemUserController;
use App\Http\Controllers\SystemUserPermissionController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// MappCloudCustomer routes
Route::get('/mapp-cloud-customers', [MappCloudCustomerController::class, 'index']);
Route::post('/mapp-cloud-customers', [MappCloudCustomerController::class, 'store']);
Route::get('/mapp-cloud-customers/{customer}', [MappCloudCustomerController::class, 'show']);
Route::put('/mapp-cloud-customers/{customer}', [MappCloudCustomerController::class, 'update']);
Route::delete('/mapp-cloud-customers/{customer}', [MappCloudCustomerController::class, 'destroy']);


// CloudInstance routes
Route::get('/cloud-instances', [CloudInstanceController::class, 'index']);
Route::post('/cloud-instances', [CloudInstanceController::class, 'store']);
Route::put('/cloud-instances/{instance}', [CloudInstanceController::class, 'update']);
Route::delete('/cloud-instances/{instance}', [CloudInstanceController::class, 'destroy']);

// SystemUser routes
Route::get('/system-users', [SystemUserController::class, 'index']);
Route::post('/system-users', [SystemUserController::class, 'store']);
Route::put('/system-users/{user_id}', [SystemUserController::class, 'update']);
Route::delete('/system-users/{user_id}', [SystemUserController::class, 'destroy']);

//system user permission
Route::get('/system-user-permissions', [SystemUserPermissionController::class, 'index']);
Route::post('/system-user-permissions', [SystemUserPermissionController::class, 'store']);
Route::put('/system-user-permissions/{permission_id}', [SystemUserPermissionController::class, 'update']);
Route::delete('/system-user-permissions/{permission_id}', [SystemUserPermissionController::class, 'destroy']);
