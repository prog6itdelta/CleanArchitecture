<?php

use App\Http\Controllers\Api\SearchController;
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

Route::get('/resource-users', [AccessController::class, 'getResourceUsers'])->name('access.getResourceUsers');

// routes to provide search results
Route::get('/users', [SearchController::class, 'getAllUsers'])->name('getAllUsers');
Route::get('/departments', [SearchController::class, 'getAllDepartments'])-> name('getAllDepartments');
Route::get('/courses', [SearchController::class, 'getAllCourses'])-> name('getAllCourses');
Route::get('/lessons', [SearchController::class, 'getAllLessons'])-> name('getAllLessons');
