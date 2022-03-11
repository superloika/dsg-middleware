<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <meta name="token" id="token" value="{{ csrf_token() }}">

    {{-- <meta name="auth-user" content="{{ auth()->user() }}"> --}}

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Scripts -->
    <script>
        window.AuthUser = {!! json_encode(auth()->user()) !!};
        window.CsrfToken = "{!! csrf_token() !!}";
    </script>

    <script src="{{ asset('js/app.js') }}" defer></script>
    {{-- <script src="{{ asset('js/xlsx/xlsx.core.min.js') }}" defer></script> --}}
    {{-- <script src="{{ asset('js/xlsx/shim.min.js') }}"></script> --}}
    <script src="{{ asset('js/xlsx/xlsx.full.min.js') }}" defer></script>

    <!-- Fonts -->
    {{-- <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet"> --}}

    <!-- Styles -->

    <link href="{{ asset('css/app.css') }}" rel="stylesheet">

    {{-- EXTRAS --}}
    <link href="{{ asset('css/materialdesignicons.min.css') }}" rel="stylesheet">

    {{-- <link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900" rel="stylesheet"> --}}
    {{-- <link href="https://cdn.jsdelivr.net/npm/@mdi/font@6.x/css/materialdesignicons.min.css" rel="stylesheet"> --}}

    <style>

    </style>
</head>
<body>
    <div id="app" >
        @auth
        <base-component></base-component>
        @endauth
    </div>
</body>
</html>
