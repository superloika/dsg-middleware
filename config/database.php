<?php

use App\Http\Controllers\NavisionController;
use Illuminate\Support\Str;

$config = [

    /*
    |--------------------------------------------------------------------------
    | Default Database Connection Name
    |--------------------------------------------------------------------------
    |
    | Here you may specify which of the database connections below you wish
    | to use as your default connection for all database work. Of course
    | you may use many connections at once using the Database library.
    |
    */

    'default' => env('DB_CONNECTION', 'mysql'),

    /*
    |--------------------------------------------------------------------------
    | Database Connections
    |--------------------------------------------------------------------------
    |
    | Here are each of the database connections setup for your application.
    | Of course, examples of configuring each database platform that is
    | supported by Laravel is shown below to make development simple.
    |
    |
    | All database work in Laravel is done through the PHP PDO facilities
    | so make sure you have the driver for your particular database of
    | choice installed on your machine before you begin development.
    |
    */

    'connections' => [

        'sqlite' => [
            'driver' => 'sqlite',
            'url' => env('DATABASE_URL'),
            'database' => env('DB_DATABASE', database_path('database.sqlite')),
            'prefix' => '',
            'foreign_key_constraints' => env('DB_FOREIGN_KEYS', true),
        ],

        'mysql' => [
            'driver' => 'mysql',
            'url' => env('DATABASE_URL'),
            'host' => env('DB_HOST', '127.0.0.1'),
            'port' => env('DB_PORT', '3306'),
            'database' => env('DB_DATABASE', 'dsg_middleware'),
            'username' => env('DB_USERNAME', 'dsg_middleware'),
            'password' => env('DB_PASSWORD', ''),
            'unix_socket' => env('DB_SOCKET', ''),
            'charset' => 'utf8mb4',
            'collation' => 'utf8mb4_unicode_ci',
            'prefix' => '',
            'prefix_indexes' => true,
            'strict' => true,
            'engine' => null,
            'options' => extension_loaded('pdo_mysql') ? array_filter([
                PDO::MYSQL_ATTR_SSL_CA => env('MYSQL_ATTR_SSL_CA'),
            ]) : [],
        ],

        'pgsql' => [
            'driver' => 'pgsql',
            'url' => env('DATABASE_URL'),
            'host' => env('DB_HOST', '127.0.0.1'),
            'port' => env('DB_PORT', '5432'),
            'database' => env('DB_DATABASE', 'forge'),
            'username' => env('DB_USERNAME', 'forge'),
            'password' => env('DB_PASSWORD', ''),
            'charset' => 'utf8',
            'prefix' => '',
            'prefix_indexes' => true,
            'schema' => 'public',
            'sslmode' => 'prefer',
        ],

        'sqlsrv' => [
            'driver' => 'sqlsrv',
            'url' => env('SQLSRV_DATABASE_URL'),
            'host' => env('SQLSRV_DB_HOST', 'localhost'),
            'port' => env('SQLSRV_DB_PORT', '1433'),
            'database' => env('SQLSRV_DB_DATABASE', 'forge'),
            'username' => env('SQLSRV_DB_USERNAME', 'forge'),
            'password' => env('SQLSRV_DB_PASSWORD', ''),
            'charset' => 'utf8',
            'prefix' => '',
            'prefix_indexes' => true,
        ],

        // ************************************** NAV invoice servers ******************************************
        // 'WDG PCS' => [
        //     'driver'    => 'odbc',
        //     'dsn'       => 'Driver={SQL Server};Server=172.16.192.1;Database=CWDG_VARIOUS_SI;',
        //     'username'  => 'super',
        //     'password'  => 'fsasya1941',
        //     'database'  => 'CWDG_VARIOUS_SI',
        // ],
        // 'WDG BULK' => [
        //     'driver'    => 'odbc',
        //     'dsn'       => 'Driver={SQL Server};Server=172.16.192.13;Database=WDG_SI_SQL;',
        //     'username'  => 'super',
        //     'password'  => 'fsasya1941',
        //     'database'  => 'WDG_SI_SQL',
        // ],
        // 'WDG UBAY' => [
        //     'driver'    => 'odbc',
        //     'dsn'       => 'Driver={SQL Server};Server=172.16.21.201;Database=SI CONSOLIDATOR;',
        //     'username'  => 'super',
        //     'password'  => 'fsasya1941',
        //     'database'  => 'SI CONSOLIDATOR',
        // ],
        // 'DELICA BULK' => [
        //     'driver'    => 'odbc',
        //     'dsn'       => 'Driver={SQL Server};Server=172.16.192.3;Database=OPLAN_SO_SRV;',
        //     'username'  => 'super',
        //     'password'  => 'fsasya1941',
        //     'database'  => 'OPLAN_SO_SRV',
        // ],
        // 'DELICA PCS' => [
        //     'driver'    => 'odbc',
        //     'dsn'       => 'Driver={SQL Server};Server=172.16.192.1;Database=CLDI SI SRV_VARIOUS;',
        //     'username'  => 'super',
        //     'password'  => 'fsasya1941',
        //     'database'  => 'CLDI SI SRV_VARIOUS',
        // ],
        // 'HORECA BULK' => [
        //     'driver'    => 'odbc',
        //     'dsn'       => 'Driver={SQL Server};Server=172.16.192.30;Database=HORECA BULK;',
        //     'username'  => 'super',
        //     'password'  => 'fsasya1941',
        //     'database'  => 'HORECA BULK',
        // ],
        // 'HORECA PCS' => [
        //     'driver'    => 'odbc',
        //     'dsn'       => 'Driver={SQL Server};Server=172.16.192.1;Database=HORECA_SRV;',
        //     'username'  => 'super',
        //     'password'  => 'fsasya1941',
        //     'database'  => 'HORECA_SRV',
        // ],
        // '3PS' => [
        //     'driver'    => 'odbc',
        //     'dsn'       => 'Driver={SQL Server};Server=172.16.192.3;Database=3PS_NEW;',
        //     'username'  => 'super',
        //     'password'  => 'fsasya1941',
        //     'database'  => '3PS_NEW',
        // ],
        // 'STORE WITHDRAWAL' => [
        //     'driver'    => 'odbc',
        //     'dsn'       => 'Driver={SQL Server};Server=172.16.192.4;Database=CDC_SRV_SQL;',
        //     'username'  => 'super',
        //     'password'  => 'fsasya1941',
        //     'database'  => 'CDC_SRV_SQL',
        // ],
        // 'CVS BULK' => [
        //     'driver'    => 'odbc',
        //     'dsn'       => 'Driver={SQL Server};Server=172.16.192.12;Database=LDI_BCVS;',
        //     'username'  => 'super',
        //     'password'  => 'fsasya1941',
        //     'database'  => 'LDI_BCVS',
        // ],
        // 'CVS PCS ' => [
        //     'driver'    => 'odbc',
        //     'dsn'       => 'Driver={SQL Server};Server=172.16.192.12;Database=LDI_VCVS;',
        //     'username'  => 'super',
        //     'password'  => 'fsasya1941',
        //     'database'  => 'LDI_VCVS',
        // ],
        // 'MAS BULK  ' => [
        //     'driver'    => 'odbc',
        //     'dsn'       => 'Driver={SQL Server};Server=172.16.192.12;Database=LDI_BMAS;',
        //     'username'  => 'super',
        //     'password'  => 'fsasya1941',
        //     'database'  => 'LDI_BMAS',
        // ],
        // 'MAS PCS  ' => [
        //     'driver'    => 'odbc',
        //     'dsn'       => 'Driver={SQL Server};Server=172.16.192.12;Database=LDI_VMAS;',
        //     'username'  => 'super',
        //     'password'  => 'fsasya1941',
        //     'database'  => 'LDI_VMAS',
        // ],
        // ************************************** /NAV invoice servers ******************************************

    ],

    /*
    |--------------------------------------------------------------------------
    | Migration Repository Table
    |--------------------------------------------------------------------------
    |
    | This table keeps track of all the migrations that have already run for
    | your application. Using this information, we can determine which of
    | the migrations on disk haven't actually been run in the database.
    |
    */

    'migrations' => 'migrations',

    /*
    |--------------------------------------------------------------------------
    | Redis Databases
    |--------------------------------------------------------------------------
    |
    | Redis is an open source, fast, and advanced key-value store that also
    | provides a richer body of commands than a typical key-value system
    | such as APC or Memcached. Laravel makes it easy to dig right in.
    |
    */

    'redis' => [

        'client' => env('REDIS_CLIENT', 'phpredis'),

        'options' => [
            'cluster' => env('REDIS_CLUSTER', 'redis'),
            'prefix' => env('REDIS_PREFIX', Str::slug(env('APP_NAME', 'laravel'), '_').'_database_'),
        ],

        'default' => [
            'url' => env('REDIS_URL'),
            'host' => env('REDIS_HOST', '127.0.0.1'),
            'password' => env('REDIS_PASSWORD', null),
            'port' => env('REDIS_PORT', '6379'),
            'database' => env('REDIS_DB', '0'),
        ],

        'cache' => [
            'url' => env('REDIS_URL'),
            'host' => env('REDIS_HOST', '127.0.0.1'),
            'password' => env('REDIS_PASSWORD', null),
            'port' => env('REDIS_PORT', '6379'),
            'database' => env('REDIS_CACHE_DB', '1'),
        ],

    ],

];

foreach(NavisionController::serverConfigs() as $c) {
    $config['connections'][$c['server_name']] = [
        'driver'    => 'odbc',
        'dsn'       => $c['dsn'],
        'username'  => 'super',
        'password'  => 'fsasya1941',
        'database'  => $c['database'],
    ];
}

return $config;
