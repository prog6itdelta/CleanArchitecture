<?php

namespace App\Http\Controllers;

use App\Packages\Department\UseCases\DepartmentService;
use App\Packages\Learn\UseCases\LearnService;
use App\Packages\Learn\UseCases\JournalService;
use App\Models\Course;
use App\Models\Lesson;
use App\Models\Question;
use App\Models\Answer;
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
    public function courses(Request $request)
    {
        $orderBy = $request->orderby;
        $sort = $request->sort;
        $perPage = $request->perpage;
        if ($request->has('page')) {
            return Course::orderBy($orderBy ?? 'id', $sort ?? 'asc')->paginate($perPage ?? 10);
        }

        return Inertia::render('Admin/Courses', [
            'paginatedCourses' =>  fn () => Course::orderBy($orderBy ?? 'id', $sort ?? 'asc')->paginate($perPage ?? 10)
        ]);
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

    public function lessons(Request $request, $cid)
    {
        $course = LearnService::getCourse($cid);
        $lessons = array_values($course->lessons);
        return Inertia::render('Admin/Lessons', compact('lessons'));
    }

    public function editLesson(Request $request, $cid, $lid)
    {
        $changedFields = [];
        $input = $request->collect();

        foreach ($input as $key => $item) {
            if ($key !== 'id' && $item !== null) {
                $changedFields[$key] = $item;
            }
        }
        Lesson::updateOrCreate(
            ['id' => $lid],
            $changedFields
        );
        return redirect()->route('admin.lessons', [$cid]);
    }

    public function questions(Request $request, $cid, $lid)
    {
        $questions = Question::where('lesson_id', $lid)->get();
        return Inertia::render('Admin/Questions', compact('questions'));
    }

    public function editQuestion(Request $request, $cid, $lid, $qid)
    {
        $changedFields = [];
        $input = $request->collect();

        foreach ($input as $key => $item) {
            if ($key !== 'id' && $item !== null) {
                $changedFields[$key] = $item;
            }
        }
        Question::updateOrCreate(
            ['id' => $qid],
            $changedFields
        );
        return redirect()->route('admin.questions', [$cid, $lid]);
    }

    public function answers(Request $request, $cid, $lid, $qid)
    {
        $answers = Answer::where('question_id', $qid)->get();
        return Inertia::render('Admin/Answers', compact('answers'));
    }

    public function editAnswer(Request $request, $cid, $lid, $qid, $aid)
    {
        $changedFields = [];
        $input = $request->collect();

        foreach ($input as $key => $item) {
            if ($key !== 'id' && $item !== null) {
                $changedFields[$key] = $item;
            }
        }
        Answer::updateOrCreate(
            ['id' => $aid],
            $changedFields
        );
        return redirect()->route('admin.answers', [$cid, $lid, $qid]);
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
