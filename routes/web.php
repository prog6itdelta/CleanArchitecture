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

use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Public/Index');
})->name('home');

Route::middleware(['auth'])->group(function () {

    Route::prefix('learning')->group(function () {
        Route::get('/courses', [LearnController::class, 'index'])
            ->name('courses');

        Route::get('/programs', [LearnController::class, 'index'])
            ->name('programs');

        Route::get('/course/{id}', [LearnController::class, 'course'])
            ->name('course');

        Route::get('/course/{cid}/lesson/{id}', [LearnController::class, 'lesson'])
            ->name('lesson');
        Route::post('/course/{cid}/lesson/{id}', [LearnController::class, 'checkLesson'])
            ->name('check-lesson');

        Route::get('/course/{id}/success', [LearnController::class, 'success'])
        ->name('success');

    });

    Route::redirect('/learning', '/learning/courses')->name('learning');

    Route::get('/profile', [UserController::class, 'profile'])
        ->name('profile');

    Route::post('/profile/edit', [UserController::class, 'edit']);

//    Route::post('/portal/{id}', [UserController::class, 'setPortal'])
//        ->name('setPortal');



});

// admin panel
Route::middleware(['auth'])->group(function () {

    Route::prefix('admin')->group(function () {
        Route::get('/', function () {
            return redirect()->route('admin.courses');
        })->name('admin.index');

        Route::match(['get', 'post'], '/courses', [AdminController::class, 'courses'])
            ->name('admin.courses');

        Route::post('/courses/{id}/edit', [AdminController::class, 'editCourse'])
            ->name('admin.courses.edit');

        Route::post('/courses/{id}/delete', [AdminController::class, 'deleteCourse'])
            ->name('admin.courses.delete');

        Route::post('/courses/create', [AdminController::class, 'createCourse'])
            ->name('admin.courses.create');

        Route::match(['get', 'post'], '/courses/{cid}/lessons', [AdminController::class, 'lessons'])
            ->name('admin.lessons');

        Route::post('/courses/{cid}/lessons/{lid}/edit', [AdminController::class, 'editLesson'])
            ->name('admin.lessons.edit');

        Route::post('/courses/{cid}/lessons/{lid}/delete', [AdminController::class, 'deleteLesson'])
            ->name('admin.lessons.delete');

        Route::post('/courses/{cid}/lessons/create', [AdminController::class, 'createLesson'])
            ->name('admin.lessons.create');

        Route::match(['get', 'post'], '/courses/{cid}/lessons/{lid}/questions', [AdminController::class, 'questions'])
            ->name('admin.questions');

        Route::post('/courses/{cid}/lessons/{lid}/questions/{qid}/edit', [AdminController::class, 'editQuestion'])
            ->name('admin.questions.edit');

        Route::post('/courses/{cid}/lessons/{lid}/questions/{qid}/delete', [AdminController::class, 'deleteQuestion'])
            ->name('admin.questions.delete');

        Route::post('/courses/{cid}/lessons/{lid}/questions/create', [AdminController::class, 'createQuestion'])
            ->name('admin.questions.create');

        Route::match(['get', 'post'],'/courses/{cid}/lessons/{lid}/questions/{qid}/answers', [AdminController::class, 'answers'])
            ->name('admin.answers');

        Route::post('/courses/{cid}/lessons/{lid}/questions/{qid}/answers/{aid}/edit', [AdminController::class, 'editAnswer'])
            ->name('admin.answers.edit');

        Route::post('/courses/{cid}/lessons/{lid}/questions/{qid}/answers/{aid}/delete', [AdminController::class, 'deleteAnswer'])
            ->name('admin.answers.delete');

        Route::post('/courses/{cid}/lessons/{lid}/questions/{qid}/answers/create', [AdminController::class, 'createAnswer'])
            ->name('admin.answers.create');

        Route::get('/departments', [AdminController::class, 'departments'])
            ->name('admin.departments');

    });

});

// Bitrix24 integration
//Route::get('/bitrix24', fn() => Socialite::driver('bitrix24')->redirect())
//    ->name('bitrix24');
Route::get('/auth/bitrix24/callback', function (Request $request) {
    \App\Packages\Common\Infrastructure\Integrations\IntegrationService::setConfig();
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

