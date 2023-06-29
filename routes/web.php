<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return view('layouts.app');
// });

Auth::routes();

// HOME
Route::get('/', 'HomeController@index')->name('home');

// logout using get http method
Route::get('/logout', 'Auth\LogoutController@logout')->name('logout2');

// Flush current session
Route::get('/flush-session', 'Auth\LogoutController@flushSession')->name('flushSession');



// ================= WA NI LABOT, TEST RA NI ====================================================================
// TEST routes
Route::prefix('test')->group(function () {
    Route::get('test1','TestController@test');
    Route::get('test2','TestController@test2');
    Route::get('record-count','TestController@recordCount');

    Route::post('testFileUpload','TestController@testFileUpload');
});
// ================= /WA NI LABOT ====================================================================

// NOTICES
Route::group(['prefix' => 'notices'], function() {
    Route::get('/', 'NoticeController@index');
});

// ACCOUNTS
// Route::prefix('accounts')->group(function() {
Route::group(['prefix' => 'accounts'], function() {
    Route::get('/', 'AccountsController@index');
    Route::post('/', 'AccountsController@store');
    Route::match(['put','patch'], '/update-profile', 'AccountsController@updateProfile');
    Route::match(['put','patch'], '/update-password', 'AccountsController@updatePassword');
    Route::match(['put','patch'], '/update-principal-assignment', 'AccountsController@updatePrincipalAssignment');
    Route::match(['delete'], '/delete', 'AccountsController@delete');
});



// MASTERFILES (Pending)
Route::prefix('master')->group(function(){
    // Products
    // Route::prefix('products')->group(function(){
    //     Route::get('/all', 'MasterProductsController@index');
    //     Route::post('/upload', 'MasterProductsController@upload');
    // });

    // Items
    Route::prefix('items')->group(function(){
        Route::get('/all', 'MasterItemsController@index');
        Route::post('/upload', 'MasterItemsController@upload');
    });

    // Customers
    Route::prefix('customers')->group(function(){
        Route::get('/all', 'MasterCustomersController@index');
        Route::post('/upload', 'MasterCustomersController@upload');
    });

    // Principals
    Route::prefix('principals')->group(function(){
        Route::get('/all', 'MasterPrincipalsController@index');
        Route::post('/upload', 'MasterPrincipalsController@upload');
    });
});


// INVOICES
Route::prefix('invoices')->group(function(){
    // Route::get("/grandtotal", "InvoicesController@invoicesGrandTotal");
    Route::get('/all', 'InvoicesController@index');
    Route::post('/upload', 'InvoicesController@upload');
    Route::post("/delete", "InvoicesController@deleteInvoices");
    Route::post("/reset", "InvoicesController@resetInvoices");
    Route::post("/sync-textfiles", "InvoicesController@syncTextfiles");
    Route::post("/set-invoices-complete", "InvoicesController@setInvoicesComplete");
    // Route::post("/extract", "InvoicesController@extract");
    Route::post("/extract-raw-invoices-to-excel", "InvoicesController@extractRawInvoicesToExcel");
    Route::get("/groups", "InvoicesController@groups");
    Route::get("/invoices-upload-logs", "InvoicesController@uploadLogs");
    Route::get("/grand-total", "InvoicesController@grandTotal");
});



/**
 * ================================================================================================================
 * PRINCIPALS' ROUTES
 * ================================================================================================================
 */
// Route::group(['prefix' => 'principals'], function(){
Route::prefix('principals')->group(function(){
    $principalCtrls = [
        ['MeadJohnsonController', 'mead_johnson'],
        // ['ReckittController', 'reckitt'],

        // ['GspiController', 'gspi'],

        ['FoodsphereIncController', 'foodsphere_inc'],
        ['FoodFabricatorsController', 'food_fabricators'],

        // ['SmfiSmisFrozenController', 'smfi_smis_frozen'],

        ['MondelezController', 'mondelez'],
        ['CadburyAdamsController', 'cadbury_adams'],

        ['CenturyCanningController', 'century_canning'],
        ['ColumbusSeafoodsController', 'columbus_seafoods'],
        ['PacificMeatController', 'pacific_meat'],
        ['SnowMountainDairyController', 'snow_mountain_dairy'],
        ['ATungChingcoController', 'a_tung_chingco'],

        ['JnjController', 'jnj'],
        ['ApolloController', 'apollo'],

        ['RfmController', 'rfm'],

        ['MegasoftController', 'megasoft'],

        ['GsmiController', 'gsmi'],

        // working on...
        // ['CleAceCorpController', 'cle_ace_corp'],

        // temp
        // ['AlaskaController', 'alaska'],
        // ['WyethController', 'wyeth'],
        // ['DelMonteController', 'del_monte'],
        // ['EcossentialsController', 'ecossentials'],
        // ['PeerlessController', 'peerless'],
        // ['SplashController', 'splash'],
        // ['GreenCrossController', 'green_cross'],
        // ['PurefoodsController', 'purefoods'],
        // ['JsuController', 'jsu'],
        // ['CleAceController', 'cle_ace'],
        // ['DoleController', 'dole'],
        // ['BeviController', 'bevi'],

        // ['OthersController', 'others'],
        // ['OthersNIController', 'others_ni'],

        ['TemprincipalsController', 'gspi'],
        ['TemprincipalsController', 'alaska_milk'],
        ['TemprincipalsController', 'wyeth_ph'],
        ['TemprincipalsController', 'del_monte_ph'],
        ['TemprincipalsController', 'ecossentials'],
        ['TemprincipalsController', 'peerless'],
        ['TemprincipalsController', 'splash_corp'],
        ['TemprincipalsController', 'green_cross'],
        ['TemprincipalsController', 'jsu'],
        ['TemprincipalsController', 'cle_ace_corp'],
        ['TemprincipalsController', 'dole_ph'],
        ['TemprincipalsController', 'bevi_asia_pacific'],
        ['TemprincipalsController', 'colgate_palmolive'],
        ['TemprincipalsController', 'wellmade_manufacturing'],
        ['TemprincipalsController', 'southern_unicoast'],
        ['TemprincipalsController', '3m_ph'],
        ['TemprincipalsController', 'sunpride_foods'],
        ['TemprincipalsController', 'diamond_instant'],
        ['TemprincipalsController', 'suychicken_corp'],
        ['TemprincipalsController', 'quanta_paper'],
        ['TemprincipalsController', 'philusa_corp'],
        ['TemprincipalsController', 'first_pgmc'],
        ['TemprincipalsController', 'stay_and_shop'],
        ['TemprincipalsController', 'makarios_ph'],
        ['TemprincipalsController', 'marketventure_dist'],
        ['TemprincipalsController', 'fonterra_brands'],
        ['TemprincipalsController', 'benby_enterprises'],
        ['TemprincipalsController', 'symply_g'],
        ['TemprincipalsController', 'permex_producer'],
        ['TemprincipalsController', 'uni_soft'],
        ['TemprincipalsController', 'scpg_asia'],
        ['TemprincipalsController', 'mega_fishing'],
        ['TemprincipalsController', 'goldshine_pharma'],
        ['TemprincipalsController', 'kalbe_international'],
        ['TemprincipalsController', 'uni_president'],
        ['TemprincipalsController', 'diageo_ph'],
        ['TemprincipalsController', 'kareila_management'],
        ['TemprincipalsController', 'wrigley_ph'],
        ['TemprincipalsController', 'gymboree_marketing'],
        ['TemprincipalsController', 'ipi_chemical'],
        ['TemprincipalsController', 'ipi_food'],
        ['TemprincipalsController', 'ipi_soap'],
        ['TemprincipalsController', 'ipi'],
        ['TemprincipalsController', 'enerlife'],
        ['TemprincipalsController', 'arla_foods'],
        ['TemprincipalsController', 'tentay_foods'],
        ['TemprincipalsController', 'jordan_toothbrush'],
        ['TemprincipalsController', 'premier_wine'],
        ['TemprincipalsController', 'candyline_food'],
        ['TemprincipalsController', 'cosmetique_asia'],
        ['TemprincipalsController', 'nutri_asia'],
        ['TemprincipalsController', 'tridharma'],
        ['TemprincipalsController', 'tekson'],
        // ['TemprincipalsController', 'apollo'],
        ['TemprincipalsController', 'magnolia_inc'],
        ['TemprincipalsController', 'the_purefoods_hormel'],
        ['TemprincipalsController', 'hormel_foods'],
        ['TemprincipalsController', 'reckitt'],
        // ['TemprincipalsController', 'a_tung_chingco'],
        ['TemprincipalsController', 'sc_johnson'],
        ['TemprincipalsController', 'urc'],
        ['TemprincipalsController', 'loraines_mktg'],
        ['TemprincipalsController', 'emperador_distillers'],

        ['TemprincipalsController', 'prifood_corp'],
        ['TemprincipalsController', 'kimberly'],

        ['TemprincipalsController', 'suyen_corp'],
        ['TemprincipalsController', 'moondish'],

        ['TemprincipalsController', 'candy_castle_foods'],

        ['TemprincipalsController', 'swedish_match'],
        ['TemprincipalsController', 'procter_gamble'],

        ['TemprincipalsController', 'regent_food_corp'],
    ];
    foreach($principalCtrls as $principalCtrl) {
        $ctrl = "Principals\\". $principalCtrl[0]. '@';

        Route::prefix($principalCtrl[1])->group(function() use ($ctrl){
            // Items
            Route::get("/items", $ctrl. "items");
            Route::post("/items/upload", $ctrl. "uploadMasterItems");

            // Customers
            Route::get("/customers", $ctrl. "customers");
            Route::post("/customers/upload", $ctrl. "uploadMasterCustomers");

            // Salesmen
            Route::get("/salesmen", $ctrl. "salesmen");
            Route::post("/salesmen/upload", $ctrl. "uploadMasterSalesmen");

            // Invoices (import & save)
            Route::get("/generate-templated-data", $ctrl. "generateTemplatedData");
            // Route::post("/set-invoices-complete", $ctrl. "setInvoicesComplete");
            // Route::post("/invoices/import", $ctrl. "importInvoices");
            // Route::post("/invoices/save", $ctrl. "saveInvoices");
        });
    }


    // ================================================================================
    // ================= PrincipalsUtil ===============================================
    // ================================================================================
    // Settings
    Route::get("/settings", "Principals\PrincipalsUtil@settings");
    Route::post("/settings", "Principals\PrincipalsUtil@saveSettings");
    // Route::get("/settings_principal", "Principals\PrincipalsUtil@principalSettings");

    // Invoices
    // Route::get("/invoices", "Principals\PrincipalsUtil@invoices");
    // Route::get("/invoices/grandtotal", "Principals\PrincipalsUtil@invoicesGrandTotal");

    // Generated Data (should be a POST method... gotta change later)
    Route::post("/generated", "Principals\PrincipalsUtil@getGeneratedData");

    // Transaction Report
    Route::get("/transactions", "Principals\PrincipalsUtil@transactions");

    // Pendings
    // Route::post("/pendings", "Principals\PrincipalsUtil@getPendingGendataAndInvoices");
});


// ====================================================================================
// ================= MiscUtils ========================================================
// ====================================================================================
Route::prefix('misc-utils')->group(function () {
    // Route::post('/export-to-txt', "MiscUtils@exportToTxt");
});



// ====================================================================================
// ================= DevChat ========================================================
// ====================================================================================
Route::prefix('devchat')->group(function () {
    Route::get('/fetch-messages', "DevChatController@fetchMessages");
    Route::post('/send-message', "DevChatController@sendMessage");
});


// ====================================================================================
// ================= BeatRoute ========================================================
// ====================================================================================
Route::prefix('br')->group(function () {
    Route::post('/refresh', "BRController@refresh");
    Route::post('/invoiceCreate', "BRController@invoiceCreate");
});


/**
 *
 */
Route::get('{any}', 'HomeController@index')->where('any', '.*');
