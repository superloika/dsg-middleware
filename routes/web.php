<?php

use App\Http\Controllers\Principals\PrincipalsUtil;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
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
    Route::post('/lookup', 'InvoicesController@lookup');
    Route::post('/upload', 'InvoicesController@upload');
    Route::post("/delete", "InvoicesController@deleteInvoices");
    Route::post("/reset", "InvoicesController@resetInvoices");
    Route::post("/sync-textfiles", "InvoicesController@syncTextfiles");
    Route::post("/set-invoices-complete", "InvoicesController@setInvoicesComplete");
    Route::post("/setInvoicesUploaded", "InvoicesController@setInvoicesUploaded");
    Route::post("/setInvoicesCancelled", "InvoicesController@setInvoicesCancelled");
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
    $mainPrincipals = PrincipalsUtil::principalRoutes();

    foreach($mainPrincipals as $mainPrincipal) {
        $ctrl = "Principals\\". $mainPrincipal->controller. '@';

        Route::prefix($mainPrincipal->main_vendor_code)->group(function() use ($ctrl){
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
            Route::get("/generateReturns", $ctrl. "generateReturns");

            // // Update settings (after templated data export)
            // Route::post("/updateSettings", $ctrl. "updateSettings");

            Route::get("/configs", $ctrl. "configs");

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
    Route::get('/dbDetails', "MiscUtils@dbDetails");
});



// ====================================================================================
// ================= DevChat ========================================================
// ====================================================================================
Route::prefix('devchat')->group(function () {
    Route::get('/fetch-messages', "DevChatController@fetchMessages");
    Route::post('/send-message', "DevChatController@sendMessage");
    // Route::get('/fetchOnlineUsers', "DevChatController@fetchOnlineUsers");
    // Route::post('/userOnline', "DevChatController@userOnline");
    // Route::post('/userOffline', "DevChatController@userOffline");
});


// ====================================================================================
// ================= BeatRoute ========================================================
// ====================================================================================
Route::prefix('br')->group(function () {
    Route::post('/refresh', "BRController@refresh");
    Route::post('/invoiceCreate', "BRController@invoiceCreate");
});

// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX TEMP XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
Route::prefix('ppfb')->group(function () {
    Route::get("resetInvoicesToPending", "Principals\PurefoodsController@resetInvoicesToPending");
    Route::get("principalRoutes", "PrincipalsUtil@principalRoutes");
});

// restore archived
// Route::get("/restoreLines", "InvoicesController@restoreLines");

/**
 *
 */
Route::get('{any}', 'HomeController@index')->where('any', '.*');
