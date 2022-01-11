<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\LearnController;
use App\Http\Controllers\UserController;
use App\Providers\RouteServiceProvider;
use Illuminate\Support\Facades\Route;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Http\Request;
//use Enforcer;

//use Inertia\Inertia;

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

    Route::get('/profile', [UserController::class, 'profile'])
        ->name('profile');

//    Route::post('/portal/{id}', [UserController::class, 'setPortal'])
//        ->name('setPortal');



});

// admin panel
Route::middleware(['auth'])->group(function () {

    Route::prefix('admin')->group(function () {
        Route::get('/', [AdminController::class, 'index'])
            ->name('admin.index');

        Route::get('/departments', [AdminController::class, 'departments'])
            ->name('admin.departments');
    });

});

// Bitrix24 integration
//Route::get('/bitrix24', fn() => Socialite::driver('bitrix24')->redirect())
//    ->name('bitrix24');
Route::get('/auth/bitrix24/callback', function (Request $request) {

    $bitrix24_user = Socialite::driver('bitrix24')->user();
    $user = User::updateOrCreate(
        [
            'email' => $bitrix24_user->email
        ],
        [
            'name'  =>  $bitrix24_user->name,
            'password' => md5(rand(1, 10000)),
        ]
    );
    Enforcer::addRoleForUser("U$user->id", 'AU');

    Auth::login($user, true);
    session()->invalidate();

    return redirect()->intended(RouteServiceProvider::HOME);

});


require __DIR__ . '/auth.php';

