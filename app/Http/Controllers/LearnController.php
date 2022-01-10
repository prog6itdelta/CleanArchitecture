<?php

namespace App\Http\Controllers;

use App\Packages\Learn\UseCases\JournalService;
use App\Packages\Learn\UseCases\LearnService;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use phpDocumentor\Reflection\DocBlock\Tags\Reference\Reference;

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
        return Inertia::render('Pages/Learning/Course', compact('course'));
    }

    public function lesson($cid, $id)
    {
        $lesson = LearnService::runLesson($id);
        $answers = JournalService::getAnswers($id);

        return Inertia::render('Pages/Learning/Lesson', [
            'course_id' => $cid,
            'lesson' => $lesson,
            'answers' => $answers,
            'status' => JournalService::getLessonStatus($id)
        ]);
    }

    public function checkLesson(Request $request, $cid, $id)
    {
        $result = LearnService::checkLesson($id, $request->all());
        if ($result) {
            $nextLesson = LearnService::nextLesson($cid, $id);
            if ($nextLesson)
                return redirect()->route('lesson', [$cid, $nextLesson->id]);
            else
                // TODO: Congrat
                return redirect()->route('course', [$cid + 1]);
        }
        throw \Illuminate\Validation\ValidationException::withMessages(['error' => 'Fail']);
    }
}
