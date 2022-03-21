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

// expenditures
Route::prefix('api_expenses')->group(function () {
    Route::get('index','ExpendituresController@index')->name('expenses_index');
    Route::post('store','ExpendituresController@store')->name('expenses_store');
    Route::post('delete/{expense_id}','ExpendituresController@delete')->name('expenses_delete');
    Route::get('particulars','ExpendituresController@particulars')->name('expenses_particulars');
    Route::get('firstdate','ExpendituresController@firstEntryDate')->name('expenses_firstdate');
    Route::get('tags','ExpendituresController@expensesTags')->name('expenses_tags');
});
// ================= /WA NI LABOT ====================================================================


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
    Route::prefix('products')->group(function(){
        Route::get('/all', 'MasterProductsController@index');
        Route::post('/upload', 'MasterProductsController@upload');
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


// PRINCIPALS - dynamic routes (test)
Route::group(['prefix' => 'principals'], function(){
    $principalCtrls = [
        ['MeadJohnsonController', 'mead_johnson'],
        ['CenturyController', 'century'],
    ];
    foreach($principalCtrls as $principalCtrl) {
        $ctrl = "Principals\\". $principalCtrl[0]. '@';

        Route::group(['prefix' => $principalCtrl[1]], function() use ($ctrl){
            // Products
            Route::get("/products", $ctrl. "products");
            Route::post("/products/upload", $ctrl. "uploadMasterProducts");

            // Customers
            Route::get("/customers", $ctrl. "customers");
            Route::post("/customers/upload", $ctrl. "uploadMasterCustomers");

            // Invoices
            Route::post("/invoices/import", $ctrl. "importInvoices");
            Route::post("/invoices/save", $ctrl. "saveInvoices");
        });
    }


    // ================================================================================
    // ================= PrincipalsUtil ===============================================
    // ================================================================================
    // Settings
    Route::get("/settings", "Principals\PrincipalsUtil@settings");
    Route::post("/settings", "Principals\PrincipalsUtil@saveSettings");

    // Invoices
    Route::get("/invoices", "Principals\PrincipalsUtil@invoices");
    Route::get("/invoices/grandtotal", "Principals\PrincipalsUtil@invoicesGrandTotal");

    // Generated Data
    Route::get("/generated", "Principals\PrincipalsUtil@getGeneratedData");

    // Transaction Report
    Route::get("/transactions", "Principals\PrincipalsUtil@transactions");
});


// ====================================================================================
// ================= MiscUtils ========================================================
// ====================================================================================
Route::prefix('misc-utils')->group(function () {
    // Route::post('/export-to-txt', "MiscUtils@exportToTxt");
});


// PRINCIPALS
// Route::group(['prefix' => 'principals'], function(){

//     // MEAD JOHNSON
//     Route::group(['prefix' => 'mead_johnson'], function() {
//         // Products
//         Route::get("/products", "Principals\MeadJohnsonController@products");
//         Route::post("/products/upload", "Principals\MeadJohnsonController@uploadMasterProducts");

//         // Customers
//         Route::get("/customers", "Principals\MeadJohnsonController@customers");
//         Route::post("/customers/upload", "Principals\MeadJohnsonController@uploadMasterCustomers");

//         // Invoices
//         Route::get("/invoices", "Principals\MeadJohnsonController@invoices");
//         Route::post("/invoices/import", "Principals\MeadJohnsonController@importInvoices");
//         Route::post("/invoices/save", "Principals\MeadJohnsonController@saveInvoices");
//         Route::get("/invoices/grandtotal", "Principals\MeadJohnsonController@invoicesGrandTotal");

//         // Generated Data
//         Route::get("/generated", "Principals\MeadJohnsonController@getGeneratedData");

//         // Settings
//         Route::get("/settings", "Principals\MeadJohnsonController@settings");
//         Route::post("/settings", "Principals\MeadJohnsonController@saveSettings");

//         // Transaction Report
//         Route::get("/transactions", "Principals\MeadJohnsonController@transactions");
//     });

// });


/**
 *
 */
Route::get('{any}', 'HomeController@index')->where('any', '.*');
