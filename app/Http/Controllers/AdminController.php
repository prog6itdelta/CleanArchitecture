<?php

namespace App\Http\Controllers;

use App\Packages\Department\UseCases\DepartmentService;
use App\Packages\Learn\UseCases\LearnService;
use App\Packages\Learn\UseCases\JournalService;
use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use Inertia\Inertia;

//use Illuminate\Support\Facades\Auth;
//use App\Models\User;


class AdminController extends BaseController
{
    /**
     * Select portal.
     *
     * @param int $id
     * @return \Inertia\Response
     */
    public function courses()
    {
        $courses = LearnService::getCourses();
        return Inertia::render('Admin/Courses', compact('courses'));
    }

    public function lessons()
    {
        $lessons = LearnService::getLessons();
        return Inertia::render('Admin/Lessons', compact('lessons'));
    }

    public function questions()
    {
        $lessons = LearnService::getLessons();
        return Inertia::render('Admin/Lessons', compact('lessons'));
    }

    public function answers()
    {
        $lessons = LearnService::getLessons();
        return Inertia::render('Admin/Lessons', compact('lessons'));
    }

    /**
     * Get departments.
     *
     * @param int $id
     * @return \Inertia\Response
     */
    public function departments()
    {
        $departments = DepartmentService::getDepartments();

        return Inertia::render('Admin/Department', $departments);
    }

    public function editCourse(Request $request, $id)
    {
        $input = $request->collect();
        $changedFields = [];

        foreach ($input as $key => $item) {
            if ($key !== 'id' && $item !== null) {
                $changedFields[$key] = $item;
            }
        }
        Course::updateOrCreate(
            ['id' => $id],
            $changedFields
        );
        return redirect()->route('admin.index');
    }
}
