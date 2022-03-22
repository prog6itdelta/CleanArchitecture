<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AccessController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});

Route::get('/users', [AccessController::class, 'getAllUsers'])->name('access.getAllUsers');
Route::get('/departments', [AccessController::class, 'getAllDepartments'])-> name('access.getAllDepartments');
Route::get('/resource-users', [AccessController::class, 'getResourceUsers'])->name('access.getResourceUsers');
