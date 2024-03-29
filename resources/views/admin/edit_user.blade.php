@extends('layouts.app')

@section('content')
@if(!empty($status))
  <div class="alert alert-success"> {{ $status }}</div>
@endif
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">{{ __('Edit Reseller') }}</div>
                @if (Session::has('error'))
                    <div class="alert alert-danger">
                        {{ Session::get('error') }}
                    </div>
                @endif
                
                @if (session('status'))
                    <div class="alert alert-success">
                        {{ session('status') }}
                    </div>
                @endif
                <div class="card-body">
                    <form method="POST" action="">
                        @csrf           
                        <div class="row mb-3">
                            <label for="username" class="col-md-4 col-form-label text-md-end required">{{ __('Username') }}</label>

                            <div class="col-md-6">
                                <input id="username" type="text" class="disabled form-control @error('username') is-invalid @enderror" style="background-color:#e9ecef !important" name="username" value="{{ $user->systemuser->username }}" disabled>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <label for="company_name" class="col-md-4 col-form-label text-md-end required">{{ __('Company Name') }}</label>

                            <div class="col-md-6">
                                <input id="company_name" type="text" class="form-control @error('company_name') is-invalid @enderror" name="company_name" value="{{ $user->company_name }}">

                                @error('company_name')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>
                        
                        <div class="row mb-3">
                            <label for="first_name" class="col-md-4 col-form-label text-md-end">{{ __('Contact Name') }}</label>

                            <div class="col-md-6">
                                <input id="first_name" type="text" class="form-control @error('first_name') is-invalid @enderror" name="first_name" value="{{ $user->contact_name }}">

                                @error('first_name')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>

                        <div class="row mb-3">
                            <label for="contact_email" class="col-md-4 col-form-label text-md-end required">{{ __('Contact Email') }}</label>

                            <div class="col-md-6">
                                <input id="email" type="email" class="form-control @error('contact_email') is-invalid @enderror" style="background-color:#e9ecef !important" name="contact_email" value="{{ $user->contact_email }}" disabled>

                            </div>
                        </div>
                        
                        <div class="row mb-3">
                            <label for="contact_number" class="col-md-4 col-form-label text-md-end">{{ __('Contact Number') }}</label>

                            <div class="col-md-6">
                                <input id="contact_number" type="text" class="form-control @error('contact_number') is-invalid @enderror" name="contact_number" value="{{ $user->phone_number }}">

                                @error('contact_number')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>
                        
                        <div class="row mb-3">
                            <label for="industry" class="col-md-4 col-form-label text-md-end">{{ __('Industry') }}</label>
                            <div class="col-md-6">
                                <input id="industry" type="text" class="form-control @error('industry') is-invalid @enderror" name="industry" value="{{ $user->industry }}">

                                @error('industry')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>
                        
                        <div class="row mb-3">
                            <label for="address1" class="col-md-4 col-form-label text-md-end">{{ __('Address1') }}</label>

                            <div class="col-md-6">
                                <input id="address1" type="text" class="form-control @error('address1') is-invalid @enderror" name="address1" value="{{ $user->address_line1 }}" autocomplete="name" autofocus>

                                @error('address1')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>
                        
                        <div class="row mb-3">
                            <label for="address2" class="col-md-4 col-form-label text-md-end">{{ __('Address2') }}</label>

                            <div class="col-md-6">
                                <input id="address2" type="text" class="form-control @error('address2') is-invalid @enderror" name="address2" value="{{ $user->address_line2 }}" autocomplete="name" autofocus>

                                @error('address2')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>
                        
                        <div class="row mb-3">
                            <label for="city" class="col-md-4 col-form-label text-md-end">{{ __('City') }}</label>

                            <div class="col-md-6">
                                <input id="city" type="text" class="form-control @error('city') is-invalid @enderror" name="city" value="{{ $user->city }}">

                                @error('username')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>

                        <!-- <div class="row mb-3">
                            <label for="custom:timezone" class="col-md-4 col-form-label text-md-end">{{ __('Timezone') }}</label>
                            <div class="col-md-6">
                                <div class="form-select-wrapper">
                                    <select id="custom:timezone" class="form-control form-select" name="custom:timezone" >
                                    <option value="America/Los_Angeles">{{ __('--Select One') }}</option>
                                    @if(!empty($timezones))
                                        @foreach ($timezones as $timezone=>$offset)
                                            <option value="{{ $timezone }}" {{ ($timezone == 'America/Los_Angeles') ? 'selected' : '' }}> {{ $timezone }} ({{ $offset }})</option>
                                        @endforeach
                                    @endif
                                    </select>
                                </div>
                            </div>
                        </div> -->
                        
                        <div class="row mb-3">
                            <label for="state" class="col-md-4 col-form-label text-md-end">{{ __('State') }}</label>
                            <div class="col-md-6">
                                <input id="state" type="text" class="form-control @error('state') is-invalid @enderror" name="state" value="{{ $user->state_province }}">

                                @error('username')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>
                        
                        
                        <div class="row mb-3">
                            <label for="postal_code" class="col-md-4 col-form-label text-md-end">{{ __('Postal Code') }}</label>

                            <div class="col-md-6">
                                <input id="postal_code" type="text" class="form-control @error('postal_code') is-invalid @enderror" name="postal_code" value="{{ $user->postal_code }}">

                                @error('postal_code')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>
                        
                        <div class="row mb-3">
                            <label for="country" class="col-md-4 col-form-label text-md-end">{{ __('Country') }}</label>

                            <div class="col-md-6">
                                <input id="country" type="text" class="form-control @error('country') is-invalid @enderror" name="country" value="{{ $user->country }}">

                                @error('country')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>
                        
                        <div class="row mb-3">
                            <label for="salesids" class="col-md-4 col-form-label text-md-end">{{ __('Sales Ids') }}</label>

                            <div class="col-md-6">
                                <input id="salesids" type="text" class="form-control @error('salesids') is-invalid @enderror" name="salesids" value="{{ implode(',',json_decode($user->sales_ids, true)) }}">

                                @error('salesids')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>
                        
                        <div class="row mb-3">
                            <label for="financial_ids" class="col-md-4 col-form-label text-md-end">{{ __('Financial Ids') }}</label>

                            <div class="col-md-6">
                                <input id="financial_ids" type="text" class="form-control @error('financial_ids') is-invalid @enderror" name="financial_ids" value="{{ implode(',',json_decode($user->financial_ids, true)) }}">

                                @error('financial_ids')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>
                        <div class="action-footer">
                            <div>
                                <button type="button" class="btn btn-secondary" onclick="history.back()">
                                    {{ __('Cancel') }}
                                </button>
                                <button type="submit" class="btn btn-primary">
                                    {{ __('Update') }}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
