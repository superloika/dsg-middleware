<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Scripts -->
    <script>
        window.AuthUser = {!! json_encode(auth()->user()) !!};
        window.CsrfToken = "{!! csrf_token() !!}";
    </script>

    <script src="{{ asset('js/app.js') }}" defer></script>

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">

    {{-- EXTRAS --}}
    <link href="{{ asset('css/materialdesignicons.min.css') }}" rel="stylesheet">

    <!-- Fonts -->
    {{-- <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet"> --}}

    {{-- EXTRAS --}}
    {{-- <link href="{{ asset('css/materialdesignicons.min.css') }}" rel="stylesheet"> --}}

    <style>
        .v - text - field--outlined fieldset {
            color: red!important;
        }
    </style>
</head>
<body>
    <div id="app">
        <v-app>
            <v-main>
                <v-container fluid class="fluid fill-height">
                    <v-layout align-center justify-center>
                            @php
                                $error_username = '';
                                $error_password = '';
                                $old_username = old('username');
                            @endphp
                        @error('username')
                            @php
                                $error_username = $message;
                            @endphp
                        @enderror

                        @error('password')
                            @php
                                $error_password = $message;
                            @endphp
                        @enderror

                        <login-component
                            old_username='{{ $old_username }}'
                            error_username='{{ $error_username }}'
                            error_password='{{ $error_password }}'
                        >
                        </login-component>
                    </v-layout>
                </v-container>
            </v-main>
        </v-app>
    </div>
</body>
</html>
