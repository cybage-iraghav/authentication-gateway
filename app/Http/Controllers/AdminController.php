<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\MappCloudCustomers;
use App\Models\CloudInstances;
use App\Models\SystemUsers;
use App\Models\SystemuserPermissions;

class AdminController extends Controller
{
    public function show(Request $request) {
        if(Auth::hasRole('Admin') ){
            return redirect('/reseller');
        }else{
            echo 'I am not system admin user';
        }
    }

    public function create_system_user(Request $request){
        $client = new \GuzzleHttp\Client(['base_uri' => 'http://localhost:8080']);
        $session =  $request->session();
        $access_token = $session->get('_keycloak_token')['access_token'];
        
        if($request->has('reseller_id')){
            $type = 'client';
            $reseller_id = $request->get('reseller_id');
        }else{
            $type = 'reseller';
            $reseller_id = '0';
        }

        $pwd = bin2hex(openssl_random_pseudo_bytes(4));
        
        $data = [
            'origin'=>'customer_catalog',
            'username'=> $request->get('username'),
            'email' => $request->get('contact_email'),
            'enabled'=> true,
            'credentials' => [['type' => "password","value" => $pwd,"temporary" => true]],
        ];
        
        $headers = [
            'Authorization' => 'Bearer ' . $access_token,        
            'Accept'        => 'application/json',
            'Content-Type' => 'application/json'
        ];
        /*post user details to keyclock*/
        $response = $client->request('POST', '/admin/realms/master/users', [
            'body' => json_encode($data),
            'headers' => $headers
        ]);

        /*fetch keyclock user_id fro created user*/
        $response = $client->request('GET', '/admin/realms/master/users', [
            'query' => 'q=username:' . $request->get('username'),
            'headers' => $headers
        ]);
        $user = json_decode($response->getBody()->getContents(), true);

        /*call verfy email Keyclock API for new created user*/
        $response = $client->request('PUT', '/admin/realms/master/users/'.$user[0]["id"].'/send-verify-email', [
            'headers' => $headers
        ]);

        $MappCloudCustomers = new MappCloudCustomers();
        $MappCloudCustomers->company_name = $request->get('company_name');
        $MappCloudCustomers->contact_name = $request->get('first_name');
        $MappCloudCustomers->contact_email = $request->get('contact_email');
        $MappCloudCustomers->phone_number = $request->get('contact_number');
        $MappCloudCustomers->industry = $request->get('industry');
        $MappCloudCustomers->address_line1 = $request->get('address1');
        $MappCloudCustomers->address_line2 = $request->get('address2');
        $MappCloudCustomers->city = $request->get('city');
        $MappCloudCustomers->state_province = $request->get('state');
        $MappCloudCustomers->postal_code = $request->get('postal_code');
        $MappCloudCustomers->country = $request->get('country');
        $MappCloudCustomers->reseller_id = $reseller_id;
        $MappCloudCustomers->cloud_type = $type;
        $MappCloudCustomers->sales_ids = json_encode(array($request->get('salesids')));
        $MappCloudCustomers->financial_ids = json_encode(array($request->get('financial_ids')));
        if ($request->get('reseller_id') > 0) {
            $MappCloudCustomers->reseller_id = $request->get('reseller_id');
        } else {
            $MappCloudCustomers->reseller_id = 0;
        }
        $MappCloudCustomers->save();

        $CloudInstances = new CloudInstances();
        $CloudInstances->instance_name  = 'customer_catalog';
        $CloudInstances->instance_type = 'TIERS';
        $CloudInstances->mapp_cloud_id = $MappCloudCustomers->cloud_id;
        $CloudInstances->engage_project_id = 0;
        $CloudInstances->engage_customer_id = 0;
        $CloudInstances->intelligence_company_id = 0;
        $CloudInstances->intelligence_track_id = 0;
        $CloudInstances->cloud_instance_id = 0;
        $CloudInstances->linked_campaign_dashboard_track_id = 0;
        $CloudInstances->origin = 'CREATED';
        $CloudInstances->status = 'ACTIVE';
        $CloudInstances->save();

        $SystemUsers = new SystemUsers();
        $SystemUsers->username = $request->get('username');
        $SystemUsers->email = $request->get('contact_email');
        $SystemUsers->mapp_internal  = false;
        $SystemUsers->last_login  = date("Y-m-d h:i:s");
        $SystemUsers->last_password_change  = date("Y-m-d h:i:s");
        $SystemUsers->status = 'ACTIVE';
        $SystemUsers->status_changed_at  = date("Y-m-d h:i:s");
        $SystemUsers->save();

        $SystemUserPermissions = new SystemuserPermissions();
        $SystemUserPermissions->user_id = $SystemUsers->user_id;
        $SystemUserPermissions->mapp_cloud_id = $MappCloudCustomers->cloud_id;
        $SystemUserPermissions->cloud_instance_id = $CloudInstances->instance_id;
        $SystemUserPermissions->permission_type  = 'admin';
        $SystemUserPermissions->default_cloudinstance_permissions  = false;
        $SystemUserPermissions->save();

        $isClient = $MappCloudCustomers->isClient($type);
        
        if($isClient){
            return redirect('/clients')->with('status', 'Client Created Successfully');
        }
        
        return redirect('/reseller')->with('status', 'Reseller Created Successfully');
    }
    
    public function createUser(Request $request) {
        if(!Auth::user()) {
            return redirect('/login');
        }     
        return view('admin.create_user', ['message' => []]);
    }

    public function createClientScreen(Request $request) {
        if(!Auth::user()) {
            return redirect('/login');
        }
        $resellers = MappCloudCustomers::getCloudTypeReseller();
        $message = []; // or any other message you want to pass
        return view('admin.client_screen', compact('resellers', 'message'));
    }
    
    public function registerUser(Request $request) {
        if(!Auth::user()) {
            return redirect('/login');
        }
        return view('admin.create_user', ['message' => ['user is created']]);
    }
}

