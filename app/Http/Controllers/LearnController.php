<?php

namespace App\Http\Controllers;

use App\Packages\UseCases\PortalService;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;

use App\Packages\UseCases\LearnService;

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
        return Inertia::render('Pages/Learning/Course', compact('course'));
    }
}
