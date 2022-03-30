<?php

namespace App\Http\Controllers\Api;

use App\Models\Course;
use Illuminate\Http\Request;
use App\Models\Department;
use App\Models\User;
use Illuminate\Routing\Controller as BaseController;

class SearchController extends BaseController
{

    public function getAllUsers(Request $request)
    {
        if ($request->has('search')) {
            $search = '%' . $request->search . '%';
            $users = User::where('name', 'like', $search)->select('id', 'name')->paginate(10);
        } else {
            $users = User::select('id', 'name')->paginate(10);
        }

        return json_encode($users);
    }

    public function getAllDepartments(Request $request)
    {
        if ($request->has('search')) {
            $search = '%' . $request->search . '%';
            $departments = Department::where('name', 'like', $search)->select('id', 'name')->paginate(10);
        } else {
            $departments = Department::select('id', 'name')->paginate(10);
        }
        return json_encode($departments);
    }

    public function getAllCourses(Request $request)
    {
        if ($request->has('search')) {
            $search = '%' . $request->search . '%';
            $courses = Course::where('name', 'like', $search)->select('id', 'name')->paginate(10);
        } else {
            $courses = Course::select('id', 'name')->paginate(10);
        }
        return json_encode($courses);
    }

    public function getAllLessons(Request $request)
    {
        if ($request->has('search')) {
            $search = '%' . $request->search . '%';
            $lessons = Course::where('name', 'like', $search)->select('id', 'name')->paginate(10);
        } else {
            $lessons = Course::select('id', 'name')->paginate(10);
        }
        return json_encode($lessons);
    }
}
