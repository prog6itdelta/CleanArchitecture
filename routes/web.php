<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LearnController;
use App\Http\Controllers\PortalController;
use App\Http\Controllers\AdminController;
//use Inertia\Inertia;

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

//    Route::get('/', function () {
//        return Inertia::render('Index');
//    })->name('home');

Route::middleware(['auth'])->group(function () {

    Route::get('/', function () {
        return redirect()->route('getSelectForm');
    })->name('home');

    Route::prefix('learning')->group(function () {
        Route::get('/courses', [LearnController::class, 'index'])
            ->name('courses');

        Route::get('/course/{id}', [LearnController::class, 'course'])
            ->name('course');
    });

    Route::get('/select/portal', [PortalController::class, 'getSelectForm'])
        ->name('getSelectForm');

    Route::post('/select/portal', [PortalController::class, 'postSelectForm'])
        ->name('postSelectForm');

    Route::get('/portal', [PortalController::class, 'index'])
        ->name('selectPortal');

    Route::post('/portal/{id}', [PortalController::class, 'setPortal'])
        ->name('setPortal');

});

// admin panel
Route::middleware(['auth'])->group(function () {

    Route::prefix('admin')->group(function () {
        Route::get('/', [AdminController::class, 'index'])
            ->name('admin.index');
    });

});
require __DIR__.'/auth.php';
