<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Models\MappCloudCustomers;
use App\Models\SystemUsers;




class ResellerController extends Controller
{
    public function list_resellers(Request $request) {
        // code to get from keycloak
//        $client = new \GuzzleHttp\Client(['base_uri' => 'http://localhost:8080']);
//        $session =  $request->session();
//        $access_token = $session->get('_keycloak_token')['access_token'];
//        $headers = [
//            'Authorization' => 'Bearer ' . $access_token,        
//            'Accept'        => 'application/json',
//        ];
//        
//        $response = $client->request('GET', '/admin/realms/master/users', [
//            'query' => 'q=user_type:reseller',
//            'headers' => $headers
//        ]);
//
//
//        $users = json_decode($response->getBody()->getContents(), true);
//
//        return view('list_resellers', ['users' => $users]);

         //code to get from database
         $page = $request->query('page', 1);
         $perPage = $request->query('limit', 15);
         $searchQuery = $request->query('query', null);
         $users = MappCloudCustomers::where('cloud_type', 'reseller')
                 ->skip(($page-1)*$perPage)
                 ->limit($perPage);
         if($searchQuery) {
             $users = $users->where('contact_name','like', '%'. $searchQuery .'%');
         }
         $users = $users->get();
         $totalResellerCount = MappCloudCustomers::where('cloud_type', 'reseller');
         if($searchQuery) {
             $totalResellerCount = $totalResellerCount->where('contact_name','like', '%'. $searchQuery .'%');
         }
         $totalResellerCount = $totalResellerCount->count();
         $resellers = [
            'users' => $users,
            'currentPage' => $page,
            'perPage' => $perPage,
            'totalPages' => ceil($totalResellerCount/$perPage)
         ];
        return response()->json($resellers);
         return view('list_resellers', [
             'users' => $users,
             'currentPage' => $page,
             'perPage' => $perPage,
             'totalPages' => ceil($totalResellerCount/$perPage)
         ]);
    }
    
    public function editReseller($resellerId) {
        $user = MappCloudCustomers::where('cloud_id', $resellerId)->first();
        return view('admin.edit_user', ['user' => $user]);
    }    
    
    public function updateReseller(Request $request,$resellerId) {
        $MappCloudCustomers = MappCloudCustomers::where('cloud_id', $resellerId)->first();
        $MappCloudCustomers->company_name = $request->get('company_name');
        $MappCloudCustomers->contact_name = $request->get('first_name');
        $MappCloudCustomers->phone_number = $request->get('contact_number');
        $MappCloudCustomers->industry = $request->get('industry');
        $MappCloudCustomers->address_line1 = $request->get('address1');
        $MappCloudCustomers->address_line2 = $request->get('address2');
        $MappCloudCustomers->city = $request->get('city');
        $MappCloudCustomers->state_province = $request->get('state');
        $MappCloudCustomers->postal_code = $request->get('postal_code');
        $MappCloudCustomers->country = $request->get('country');
        $MappCloudCustomers->sales_ids = json_encode(array($request->get('salesids')));
        $MappCloudCustomers->financial_ids = json_encode(array($request->get('financial_ids')));
        $MappCloudCustomers->save();
        return redirect("/reseller/$resellerId/edit/")->with('status', 'Reseller updated Successfully');
    }
    
    public function deleteReseller(Request $request, $reseller_id) {
        $client = new \GuzzleHttp\Client(['base_uri' => 'http://localhost:8080']);
        $session =  $request->session();
        $access_token = $session->get('_keycloak_token')['access_token'];

        $headers = [
            'Authorization' => 'Bearer ' . $access_token,        
            'Accept'        => 'application/json',
        ];
        
        $response = $client->request('DELETE', '/admin/realms/master/users/'.$reseller_id, [
            'headers' => $headers
        ]);
        return redirect('/reseller');
    }

    public function adminEnableReseller(Request $request)
    {
        $username = $request->input('username');
        $client = new \GuzzleHttp\Client(['base_uri' => 'http://localhost:8080']);
        $session =  $request->session();
        $access_token = $session->get('_keycloak_token')['access_token'];

        $headers = [
            'Authorization' => 'Bearer ' . $access_token,
            'Accept'        => 'application/json',
            'Content-Type' => 'application/json'
        ];

        $data = [
            'enabled'=> true
        ];

        $response = $client->request('GET', '/admin/realms/master/users', [
            'query' => 'q=username:' . $username,
            'headers' => $headers
        ]);

        $users = json_decode($response->getBody()->getContents(), true);
        $reseller_id = $users[0]['id'];

        $api_response = $client->request('PUT', '/admin/realms/master/users/'.$reseller_id, [
            'body' => json_encode($data),
            'headers' => $headers
        ]);

        $db_response = SystemUsers::where('username', $username)
                        ->update(['status' => 'ACTIVE']);
        if ($db_response && $api_response) {
            return redirect('/reseller')->with('status', 'Reseller enabled successfully!');
        } else {
            return redirect('/reseller')->with('status', 'Error enabling reseller!');
        }
    }

    public function adminDisableReseller(Request $request)
    {
        $username = $request->input('username');
        $client = new \GuzzleHttp\Client(['base_uri' => 'http://localhost:8080']);
        $session =  $request->session();
        $access_token = $session->get('_keycloak_token')['access_token'];

        $headers = [
            'Authorization' => 'Bearer ' . $access_token,
            'Accept'        => 'application/json',
            'Content-Type' => 'application/json'
        ];

        $data = [
            'enabled'=> false
        ];

        $response = $client->request('GET', '/admin/realms/master/users', [
            'query' => 'q=username:' . $username,
            'headers' => $headers
        ]);

        $users = json_decode($response->getBody()->getContents(), true);
        $reseller_id = $users[0]['id'];

        $api_response = $client->request('PUT', '/admin/realms/master/users/'.$reseller_id, [
            'body' => json_encode($data),
            'headers' => $headers
        ]);

        $db_response = SystemUsers::where('username', $username)
                        ->update(['status' => 'DEACTIVE']);
        if ($db_response && $api_response) {
            return redirect('/reseller')->with('status', 'Reseller disabled successfully!');
        } else {
            return redirect('/reseller')->with('status', 'Error disabling reseller!');
        }
    }
}
