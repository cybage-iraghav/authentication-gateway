<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Models\MappCloudCustomers;
use \App\Models\SystemUsers;

class ClientController extends Controller
{
    public function list_clients(Request $request, $reseller_id) {
        $page = $request->query('page', 1);
        $perPage = $request->query('limit', 3);
        $searchQuery = $request->query('query', null);
        $users = MappCloudCustomers::where('reseller_id', $reseller_id)->with('systemUser')
                ->where('cloud_type', 'client')
                ->skip(($page-1)*$perPage)
                ->limit($perPage);
        if($searchQuery) {
            $users = $users->where('contact_name','like', '%'. $searchQuery .'%');
        }
        $users = $users->get();
        $totalCount = MappCloudCustomers::where('cloud_type', 'client')
                ->where('reseller_id', $reseller_id);
        if($searchQuery) {
            $totalCount = $totalCount->where('contact_name','like', '%'. $searchQuery .'%');
        }
        $totalCount = $totalCount->count();
        return view('list_clients', [
            'users' => $users, 
            'currentPage' => $page, 
            'perPage' => $perPage,
            'totalPages' => ceil($totalCount/$perPage)
        ]);
}

    public function list_all_clients(Request $request) {
        $page = $request->query('page', 1);
        $perPage = $request->query('limit', 15);
        $searchQuery = $request->query('query', null);
        $users = MappCloudCustomers::with('reseller')->with('systemUser')
                ->where('cloud_type', 'client')
                ->skip(($page-1)*$perPage)
                ->limit($perPage);
        if($searchQuery) {
            $users = $users->where('contact_name','like', '%'. $searchQuery .'%');
        }
        $users = $users->get();
        $totalCount = MappCloudCustomers::all();
        if($searchQuery) {
            $totalCount = $totalCount->where('contact_name','like', '%'. $searchQuery .'%');
        }
        $totalCount = $totalCount->count();
        return view('list_clients', [
            'users' => $users, 
            'currentPage' => $page, 
            'perPage' => $perPage,
            'totalPages' => ceil($totalCount/$perPage)
        ]);
    }

    public function adminEnableClient(Request $request)
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
            return redirect('/clients')->with('status', 'Client enabled successfully!');
        } else {
            return redirect('/clients')->with('status', 'Error enabling client!');
        }
    }

    public function adminDisableClient(Request $request)
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
            return redirect('/clients')->with('status', 'Client disabled successfully!');
        } else {
            return redirect('/clients')->with('status', 'Error disabling client!');;
        }
    }

    public function editClient($client_id) {
        $user = MappCloudCustomers::where('cloud_id', $client_id)->first();
        $resellers = MappCloudCustomers::getCloudTypeReseller();
        return view('admin.edit_client', ['user' => $user, 'resellers' => $resellers, 'client_id' => $client_id]);
    }

    public function updateClient(Request $request, $client_id) {
        $MappCloudCustomers = MappCloudCustomers::where('cloud_id', $client_id)->first();
        $MappCloudCustomers->company_name = $request->get('company_name');
        $MappCloudCustomers->reseller_id = $request->get('reseller_id');
        $MappCloudCustomers->contact_name = $request->get('first_name');
        $MappCloudCustomers->phone_number = $request->get('contact_number');
        $MappCloudCustomers->industry = $request->get('industry');
        $MappCloudCustomers->address_line1 = $request->get('address1');
        $MappCloudCustomers->address_line2 = $request->get('address2');
        $MappCloudCustomers->city = $request->get('city');
        $MappCloudCustomers->state_province = $request->get('state');
        $MappCloudCustomers->postal_code = $request->get('postal_code');
        $MappCloudCustomers->country = $request->get('country');
        $MappCloudCustomers->sales_ids = json_encode([$request->get('salesids')]);
        $MappCloudCustomers->financial_ids = json_encode([$request->get('financial_ids')]);
        // Check if reseller_id is null, set it to null in the database
        if ($request->get('reseller_id') > 0) {
            $MappCloudCustomers->reseller_id = $request->get('reseller_id');
        } else {
            $MappCloudCustomers->reseller_id = 0;
        }
        $MappCloudCustomers->save();
        return redirect("/client/$client_id/edit/")->with("status", "Client Updated Successfully");
    }
}
