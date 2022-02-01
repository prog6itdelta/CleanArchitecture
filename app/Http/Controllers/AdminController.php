<?php

namespace App\Http\Controllers;

use App\Models\Question;
use App\Packages\Department\UseCases\DepartmentService;
use App\Packages\Learn\UseCases\LearnService;
use App\Packages\Learn\UseCases\JournalService;
use App\Models\Course;
use App\Models\Lesson;
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

    public function editCourse(Request $request, $id)
    {
        $path = 'empty';
        $changedFields = [];
        if ($request->hasFile('image') && $request->file('image')->isValid()) {
            $imagePath = '/' . $request->image->store('images/'. explode('.', $_SERVER['HTTP_HOST'])[0].'/course_images');
            $changedFields['image'] = $imagePath;
        }

        $input = $request->collect();

        foreach ($input as $key => $item) {
            if ($key !== 'id' && strpos($key, 'image') === false && $item !== null) {
                $changedFields[$key] = $item;
            }
        }
        Course::updateOrCreate(
            ['id' => $id],
            $changedFields
        );
        return redirect()->route('admin.courses');
    }

    public function lessons()
    {
        $lessons = LearnService::getLessons();
        return Inertia::render('Admin/Lessons', compact('lessons'));
    }

    public function editLesson(Request $request, $id)
    {
        $changedFields = [];
        $input = $request->collect();

        foreach ($input as $key => $item) {
            if ($key !== 'id' && $item !== null) {
                $changedFields[$key] = $item;
            }
        }
        Lesson::updateOrCreate(
            ['id' => $id],
            $changedFields
        );
        return redirect()->route('admin.lessons');
    }

    public function questions()
    {
        $questions = LearnService::getAllQuestions();
        return Inertia::render('Admin/Questions', compact('questions'));
    }

    public function editQuestion(Request $request, $id)
    {
        $changedFields = [];
        $input = $request->collect();

        foreach ($input as $key => $item) {
            if ($key !== 'id' && $item !== null) {
                $changedFields[$key] = $item;
            }
        }
        Question::updateOrCreate(
            ['id' => $id],
            $changedFields
        );
        return redirect()->route('admin.questions');
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
}
