<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\ResellerController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\MappCloudCustomerController;
use App\Http\Controllers\KeycloakAuthController;
use App\Http\Controllers\ResolvePathController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::get('/', [ResellerController::class, 'list_resellers'])->name('list_resellers');
Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
Route::get('/admin', [AdminController::class, 'show']);
Route::get('/admin/create-user', [AdminController::class, 'createUser'])->name('createUser');
Route::get('/admin/client_screen', [AdminController::class, 'createClientScreen'])->name('client_screen');
Route::get('/admin/delete-user', [AdminController::class, 'createUser']);
Route::get('/admin_update_reseller', [UserController::class, 'adminUpdateReseller'])->name('admin_update_reseller');
Route::post('/admin/register-user', [AdminController::class, 'registerUser'])->name('registerUser');
Route::get('/reseller', [ResellerController::class, 'list_resellers'])->name('list_resellers');
Route::get('/clients', [ClientController::class, 'list_all_clients'])->name('list_all_clients');
Route::get('/reseller/{reseller_id}/clients', [ClientController::class, 'list_clients']);
Route::get('/reseller/{reseller_id}/delete/', [ResellerController::class, 'deleteReseller']);
Route::get('/reseller/{reseller_id}/edit/', [ResellerController::class, 'editReseller']);
Route::get('/client/{client_id}/edit/', [ClientController::class, 'editClient']);
Route::post('/client/{client_id}/edit/', [ClientController::class, 'updateClient'])->name('updateClient');
Route::get('/client', [ClientController::class, 'list']);
Route::post('/admin/systemuser/create', [AdminController::class, 'create_system_user'])->name('createSystemUser');
Route::post('/reseller/{reseller_id}/edit/', [ResellerController::class, 'updateReseller'])->name('updateReseller');

//enable-disable
Route::get('/admin_enable_reseller', [ResellerController::class, 'adminEnableReseller']);
Route::get('/admin_disable_reseller', [ResellerController::class, 'adminDisableReseller']);
Route::get('/admin_enable_client', [ClientController::class, 'adminEnableClient']);
Route::get('/admin_disable_client', [ClientController::class, 'adminDisableClient']);

Route::get('/mapp-cloud-customers', [MappCloudCustomerController::class, 'index']);

//keycloak routes
Route::get('/login', [KeycloakAuthController::class, 'login'])->name('keycloak.login');
Route::get('/logout', [KeycloakAuthController::class, 'logout'])->name('keycloak.logout');
Route::get('/callback', [KeycloakAuthController::class, 'callback'])->name('keycloak.callback');
Route::get('/login_status', [KeycloakAuthController::class, 'loginStatus']);
Route::get('/keep_alive', [KeycloakAuthController::class, 'keepAlive']);

Route::get('/resolve_path',[ResolvePathController::class, 'getRequest'])->name('resolve_path');
Route::post('/resolve_path',[ResolvePathController::class, 'postRequest'])->name('resolve_path');