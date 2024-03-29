@extends('layouts.app')

@section('content')

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

            modalTitle.textContent = action + ' Reseller';
            primaryActionButton.textContent = action;
            primaryActionButton.setAttribute('onclick', 'enableUser("' + action + '", "' + user + '")');

            modalBody.innerHTML = 'Are you sure you want to ' + action + ' reseller <b>' + user + '</b>?';
        });
    });

    function searchReseller(event) {
        var searchTerm = document.getElementById("username").value;
        console.log('search text');
        console.log(searchTerm);
        if(searchTerm) {
            window.location.href = '/reseller?query=' + encodeURIComponent(searchTerm);
        }
    };

    function enableUser(action, user) {
        window.location.href = '/admin_' + action + '_reseller?username=' + encodeURIComponent(user);
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
                        Reseller
                    </div>
                    <div class='col-md-4 row'>
                        <div class="col-md-10">
                            <input id="username" type="text" class="form-control" name="username" autofocus placeholder="Search reseller">
                        </div>
                        <div class="col-md-2">
                        <button type="submit" id="search_reseller" class="btn btn-primary" onclick="searchReseller()">
                            {{ __('Search') }}
                        </button>
                        </div>
                    </div>
                </div>
            </div>
            @if(count($users) > 0)
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table task-table" id="users">
                            <thead>
                                <tr>
                                    <th> Reseller Id </th>
                                    <th> Username </th>
                                    <th> Reseller Name </th>
                                    <th> Reseller Email </th>
                                    <th> Enabled </th>
                                    <th> Edit </th>
                                </tr>
                            </thead>
                            <tbody>
                                @foreach($users as $user)
                                <tr>
                                    <td> <a href="/reseller/{{$user['cloud_id']}}/clients">{{$user['cloud_id']}} <a></td>
                                    <td> {{$user['systemUser']['username']}} </td>
                                    <td> {{$user['contact_name']}} </td>
                                    <td> {{$user['contact_email']}} </td>
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
                                            <a class="btn-link icon-link" href="/reseller/{{$user['cloud_id']}}/edit/">
                                                <span class="material-symbols-outlined">edit</span>
                                            </a>
                                        </div>
                                    </td>
                                </tr>
                                @endforeach
                            </tbody>
                        </table>
                    </div>
                </div>
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
