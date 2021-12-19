<?php

namespace App\Http\Controllers;

use App\Packages\Learn\UseCases\LearnService;
use App\Packages\Learn\UseCases\PortalService;
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
        return Inertia::render('Pages/Learning/Courses', compact('courses'));
    }

    public function course($id)
    {
        $course = LearnService::getCourse($id);
//        dd($course);
        return Inertia::render('Pages/Learning/Course', $course);
    }
}
