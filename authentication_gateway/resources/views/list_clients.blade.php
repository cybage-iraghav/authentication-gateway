@extends('layouts.app')

@section('content')

<script type="application/javascript">
    function searchClient(event) {
        var searchTerm = document.getElementById("search-text").value;
        if(searchTerm) {
            var currentUrl = new URL(window.location.href);
            currentUrl.searchParams.append('query', encodeURIComponent(searchTerm));
            window.location.href = currentUrl.toString();
        }
    };
</script>


<script type="application/javascript">
    $(document).ready(function() {
        var enableUserModal = document.getElementById('enableUserModal');

        enableUserModal.addEventListener('show.bs.modal', function (event) {
            // link that opened the modal
            var userLink = event.relatedTarget;
            // get info from data-bs-* attributes
            var user = userLink.getAttribute('data-bs-user');
            var action = userLink.getAttribute('data-bs-action');
            // Update the modal's content.
            var modalTitle = enableUserModal.querySelector('.modal-title');
            var modalBody = enableUserModal.querySelector('.modal-body');
            var primaryActionButton = enableUserModal.querySelector('.btn-modal-action');

            modalTitle.textContent = action + ' Client';
            primaryActionButton.textContent = action;
            primaryActionButton.setAttribute('onclick', 'enableUser("' + action + '", "' + user + '")');

            modalBody.innerHTML = 'Are you sure you want to ' + action + ' client <b>' + user + '</b>?';
        });
    });

    function enableUser(action, user) {
        window.location.href = '/admin_' + action + '_client?username=' + encodeURIComponent(user);
    }
</script>
@if (session('status'))
    <div class="alert alert-success">
        {{ session('status') }}
    </div>
@endif

<div class="row justify-content-center">
    <div class="col-md-11">
        <div class="card list">
            <div class="card-header">
                <div class="row mb-3">
                    <div class='col-md-8'>
                        Customers
                    </div>
                </div>
                <!--<div class="row">
                    <div class="col-sm-3"> <input id="search-text" type="text" class="form-control" autofocus placeholder="Client ID"></div>
                    <div class="col-sm-3"> <input id="search-text" type="text" class="form-control" autofocus placeholder="Username"></div>
                    <div class="col-sm-3"> <input id="search-text" type="text" class="form-control" autofocus placeholder="Client Name"></div>
                    <div class="col-sm-3"> <input id="search-text" type="text" class="form-control" autofocus placeholder="Client Email"></div>
                </div>
                <div    accesskey=" " class="col-md-2">
                        <button type="submit" id="search-client" class="btn btn-primary" onclick="searchClient()">
                            {{ __('Search') }}
                        </button>
                </div> -->
            </div>
            @if(count($users) > 0)
                <table class="table task-table" id="users">
                    <thead>
                        <tr>
                            <th> Customer Id </th>
                            <th> Username </th>
                            <th> Customer Name</th>
                            <th> Customer Email  </th>
                            <th> Reseller Name  </th>
                            <th> Enabled </th>
                            <th> Edit </th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($users as $user)
                            <tr>
                                <td> {{$user['cloud_id']}} </td>
                                <td> {{$user['systemUser']['username']}} </td>
                                <td> {{$user['contact_name']}} </td>
                                <td> {{$user['contact_email']}} </td>
                                @if (count($user['reseller']) > 0)
                                    <td> {{$user['reseller'][0]['contact_name']}} </td>
                                @else
                                    <td>NA</td>
                                @endif
                                <td>
                                        <div>
                                            @if($user['systemUser']['status'] == 'ACTIVE')
                                                <a class="btn-link" data-bs-toggle="modal" data-bs-target="#enableUserModal" data-bs-user="{{$user['systemUser']['username']}}" data-bs-action="disable">
                                                                {{ __('Yes') }}
                                                </a>
                                            @else
                                                <a class="btn-link" data-bs-toggle="modal" data-bs-target="#enableUserModal" data-bs-user="{{$user['systemUser']['username']}}" data-bs-action="enable">
                                                                    {{ __('No') }}
                                                </a>
                                            @endif
                                        </div>
                                </td>
                                <td>
                                        <div>
                                            <a class="btn-link icon-link" href="/client/{{$user['cloud_id']}}/edit/">
                                                <span class="material-symbols-outlined">edit</span>
                                            </a>
                                        </div>
                                    </td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            @else
                <div class="row">
                    <h3> No users found..</h3>
                </div>
            @endif
        </div> 
        @if (count($users) > 0)
            @include('layouts.pagination')
        @endif
    </div>
</div>
 <!-- User Enabled Modal -->
 <div class="modal fade" id="enableUserModal" tabindex="-1" aria-labelledby="enableUserModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="enableUserModalLabel">Modal title</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    ...
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary btn-modal-action" onclick="" data-bs-dismiss="modal">Apply</button>
                </div>
                </div>
            </div>
        </div>
@endsection
