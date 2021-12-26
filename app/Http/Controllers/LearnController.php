<?php

namespace App\Http\Controllers;

use App\Packages\Learn\UseCases\LearnService;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use Inertia\Inertia;

//use Illuminate\Support\Facades\Auth;
//use App\Models\User;


class LearnController extends BaseController
{
    /**
     * Select portal.
     *
     * @param int $id
     * @return \Inertia\Response
     */
    public function index()
    {
        $courses = LearnService::getCourses();
        $curriculums = LearnService::getCurriculumsFullList();
        $course_groups = LearnService::getCourseGroups();
        return Inertia::render('Pages/Learning/Courses', compact('courses', 'curriculums', 'course_groups'));
    }

    public function course($id)
    {
        $course = LearnService::getCourse($id);
        return Inertia::render('Pages/Learning/Course', $course);
    }

    public function lesson($id)
    {
        $lesson = LearnService::runLesson($id);
        dd($lesson);
//        return Inertia::render('Pages/Learning/Course', $course);
    }

    public function checkLesson(Request $request, $id)
    {
        dd($request);
//        return Inertia::render('Pages/Learning/Course', $course);
    }
}
