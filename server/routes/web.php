<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DataGraphController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return "API is running";
});

Route::get("/status", function () {
    return response()->json([
        "status" => "OK"
    ], 200);
});

Route::get('/channels/read', [DataGraphController::class, 'read']);

Route::post('/channels/create', [DataGraphController::class, 'create']);

Route::put('/channels/update/{id}', [DataGraphController::class, 'update']);

Route::delete('/channels/delete/{id}', [DataGraphController::class, 'delete']);
