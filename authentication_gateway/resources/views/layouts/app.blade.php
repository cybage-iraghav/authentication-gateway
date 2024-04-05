<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}" defer></script>
    <script src="{{ asset('js/spinner.js') }}" defer></script>
    @stack('scripts')

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,500,600,700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">

    <!-- jQuery -->
    <script src="{{ asset('js/jquery-3.6.3.min.js') }}"  ></script>
</head>
<body>
    <div id="app">

        <div class="spinner-wrapper">
            <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        </div>

        <nav class="navbar navbar-expand-md navbar-light bg-black shadow-sm">
            <div class="container-fluid">
                <a class="navbar-brand" href="{{ url('/reseller') }}">
                    <span class="app-logo-font">Mapp Customer Catalog</span>
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="{{ __('Toggle navigation') }}">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <!-- Left Side Of Navbar -->
                    <ul class="navbar-nav me-auto">

                    </ul>

                    <!-- Right Side Of Navbar -->
                    <ul class="navbar-nav ms-auto">
                        <!-- Authentication Links -->
                        @guest
                            @if (Route::has('login'))
                                <li class="nav-item">
                                    <a class="nav-link" href="{{ route('login') }}">{{ __('Login') }}</a>
                                </li>
                            @endif
                        @else
                            @can('admin')
                                <li class="nav-item">
                                    <a class="nav-link" href="{{ route('list_resellers') }}"> {{ __('Resellers') }}</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="{{ route('create_reseller') }}"> {{ __('Create Reseller') }}</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="{{ route('list_users') }}"> {{ __('Clients') }}</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="{{ route('create_user') }}"> {{ __('Create Client') }}</a>
                                </li>
                            @endcan
                            @can('reseller')
                                <li class="nav-item">
                                    <a class="nav-link" href="{{ route('list_users') }}"> {{ __('Clients') }}</a>
                                </li>
                            @endcan
                            @can('client')
                            <li class="nav-item">
                                    <a class="nav-link" href="{{ route('stats') }}"> {{ __('Stats') }}</a>
                            </li>
                            <li class="nav-item">
                                    <a class="nav-link" href="{{ route('subscribersDetailView') }}"> {{ __('Subscriber Details') }}</a>
                            </li>
                            @endcan
                            <li class="nav-item">
                                <a class="nav-link" href="{{ route('list_resellers') }}"> {{ __('Resellers') }}</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="{{ route('createUser') }}"> {{ __('Create Reseller') }}</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="{{ route('list_all_clients') }}"> {{ __('Customers') }}</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="{{ route('client_screen') }}"> {{ __('Create Customer') }}</a>
                            </li>
                            <!--<li class="nav-item timezone">
                                <div class="nav-link">
                                    {{ __('Timezone') }} : {{ (empty(Auth::user()->timezone) || Auth::user()->timezone == " ") ? "not selected" : Auth::user()->timezone }}
                                </div>
                            </li> -->
                            <li class="nav-item user">
                                 <a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-pre>
                                    {{ Auth::user()->name }}
                                </a> 
                                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <a class="nav-link" href="http://localhost:8080/realms/master/protocol/openid-connect/logout"
                                        onclick="event.preventDefault();
                                                     document.getElementById('logout-form').submit();">
                                        {{ __('Logout') }}
                                    </a>
                                    <form id="logout-form" action="http://localhost:8080/realms/master/protocol/openid-connect/logout" method="POST" class="d-none">
                                        @csrf
                                    </form>
                                </div>
                            </li>
                        @endguest
                    </ul>
                </div>
            </div>
        </nav>

        <main id="page-content" class="py-5">
            @yield('content')
        </main>

        @include('layouts.footer')
    </div>
</body>
</html>
