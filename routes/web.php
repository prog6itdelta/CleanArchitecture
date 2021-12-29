<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\LearnController;
use App\Http\Controllers\PortalController;
use Illuminate\Support\Facades\Route;
use Laravel\Socialite\Facades\Socialite;

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
        return redirect()->route('courses');
    })->name('home');

    Route::prefix('learning')->group(function () {
        Route::get('/courses', [LearnController::class, 'index'])
            ->name('courses');

        Route::get('/programs', [LearnController::class, 'index'])
            ->name('programs');

        Route::get('/course/{id}', [LearnController::class, 'course'])
            ->name('course');

        Route::get('/lesson/{id}', [LearnController::class, 'lesson'])
            ->name('lesson');
        Route::post('/lesson/{id}', [LearnController::class, 'checkLesson'])
            ->name('check-lesson');

    });

    Route::redirect('/learning', '/learning/courses')->name('learning');

//    Route::get('/portal', [PortalController::class, 'index'])
//        ->name('selectPortal');
//
//    Route::post('/portal/{id}', [PortalController::class, 'setPortal'])
//        ->name('setPortal');

    // Bitrix24 integration
    Route::get('/bitrix24', fn() => Socialite::driver('bitrix24')->redirect())
        ->name('bitrix24');
    Route::get('/auth/bitrix24/callback', function () {
        $bitrix24_user = Socialite::driver('bitrix24')->user();
        dd($bitrix24_user);
    });



});

// admin panel
Route::middleware(['auth'])->group(function () {

    Route::prefix('admin')->group(function () {
        Route::get('/', [AdminController::class, 'index'])
            ->name('admin.index');
    });

});

require __DIR__ . '/auth.php';

