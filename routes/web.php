<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\LearnAdminController;
use App\Http\Controllers\LearnController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AccessController;
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

        // Common part
        Route::get('/access', [AccessController::class, 'index'])
            ->name('admin.access');

        Route::get('/departments', [AdminController::class, 'departments'])
            ->name('admin.departments');

        Route::get('/departments/create', [AdminController::class, 'editDepartment'])
            ->name('admin.departments.create');

        Route::post('/departments/create', [AdminController::class, 'createDepartment'])
            ->name('admin.departments.create');

        Route::get('/departments/{id}', [AdminController::class, 'editDepartment'])
            ->name('admin.departments.edit');

        Route::post('/departments/{id}', [AdminController::class, 'saveEditedDepartment'])
            ->name('admin.departments.edit');

        Route::post('/departments/{id}/delete', [AdminController::class, 'deleteDepartment'])
            ->name('admin.departments.delete');


        // Learn packege
        Route::get('/', function () {
            return redirect()->route('admin.courses');
        })->name('admin.index');

        Route::get( '/courses', [LearnAdminController::class, 'courses'])
            ->name('admin.courses');

        Route::get('/courses/create', [LearnAdminController::class, 'editCourse'])
            ->name('admin.course.create');

        Route::post('/courses/create', [LearnAdminController::class, 'createCourse'])
            ->name('admin.course.create');

        Route::get('/courses/{id}', [LearnAdminController::class, 'editCourse'])
            ->name('admin.course.edit');

        Route::post('/courses/{id}', [LearnAdminController::class, 'saveEditedCourse'])
            ->name('admin.course.edit');

        Route::post('/courses/{id}/delete', [LearnAdminController::class, 'deleteCourse'])
            ->name('admin.course.delete');

        Route::get( '/courses/{cid}/lessons', [LearnAdminController::class, 'lessons'])
            ->name('admin.lessons');

        Route::get('/courses/{cid}/lessons/create', [LearnAdminController::class, 'editLesson'])
            ->name('admin.lesson.create');

        Route::post('/courses/{cid}/lessons/create', [LearnAdminController::class, 'createLesson'])
            ->name('admin.lesson.create');

        Route::get('/courses/{cid}/lessons/{lid}', [LearnAdminController::class, 'editLesson'])
            ->name('admin.lesson.edit');

        Route::post('/courses/{cid}/lessons/{lid}', [LearnAdminController::class, 'saveEditedLesson'])
            ->name('admin.lesson.edit');

        Route::post('/courses/{cid}/lessons/{lid}/delete', [LearnAdminController::class, 'deleteLesson'])
            ->name('admin.lesson.delete');

        Route::get( '/courses/{cid}/lessons/{lid}/questions', [LearnAdminController::class, 'questions'])
            ->name('admin.questions');

        Route::get('/courses/{cid}/lessons/{lid}/questions/create', [LearnAdminController::class, 'editQuestion'])
            ->name('admin.question.create');

        Route::post('/courses/{cid}/lessons/{lid}/questions/create', [LearnAdminController::class, 'createQuestion'])
            ->name('admin.question.create');

        Route::get('/courses/{cid}/lessons/{lid}/questions/{qid}', [LearnAdminController::class, 'editQuestion'])
            ->name('admin.question.edit');

        Route::post('/courses/{cid}/lessons/{lid}/questions/{qid}', [LearnAdminController::class, 'saveEditedQuestion'])
            ->name('admin.question.edit');

        Route::post('/courses/{cid}/lessons/{lid}/questions/{qid}/delete', [LearnAdminController::class, 'deleteQuestion'])
            ->name('admin.question.delete');

        Route::get('/courses/{cid}/lessons/{lid}/questions/{qid}/answers', [LearnAdminController::class, 'answers'])
            ->name('admin.answers');

        Route::get('/courses/{cid}/lessons/{lid}/questions/{qid}/answers/create', [LearnAdminController::class, 'editAnswer'])
            ->name('admin.answer.create');

        Route::post('/courses/{cid}/lessons/{lid}/questions/{qid}/answers/create', [LearnAdminController::class, 'createAnswer'])
            ->name('admin.answer.create');

        Route::get('/courses/{cid}/lessons/{lid}/questions/{qid}/answers/{aid}', [LearnAdminController::class, 'editAnswer'])
            ->name('admin.answer.edit');

        Route::post('/courses/{cid}/lessons/{lid}/questions/{qid}/answers/{aid}', [LearnAdminController::class, 'saveEditedAnswer'])
            ->name('admin.answer.edit');

        Route::post('/courses/{cid}/lessons/{lid}/questions/{qid}/answers/{aid}/delete', [LearnAdminController::class, 'deleteAnswer'])
            ->name('admin.answer.delete');

         Route::get('/curriculums', [LearnAdminController::class, 'curriculums'])
            ->name('admin.curriculums');

        Route::get('/curriculums/create', [LearnAdminController::class, 'editCurriculum'])
            ->name('admin.curriculums.create');

        Route::post('/curriculums/create', [LearnAdminController::class, 'createCurriculum'])
            ->name('admin.curriculums.create');

        Route::get('/curriculums/{id}', [LearnAdminController::class, 'editCurriculum'])
            ->name('admin.curriculums.edit');

        Route::post('/curriculums/{id}', [LearnAdminController::class, 'saveEditedCurriculum'])
            ->name('admin.curriculums.edit');

        Route::post('/curriculums/{id}/delete', [LearnAdminController::class, 'deleteCurriculum'])
            ->name('admin.curriculums.delete');

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

