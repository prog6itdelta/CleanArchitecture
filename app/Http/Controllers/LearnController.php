<?php

namespace App\Http\Controllers;

use App\Packages\Learn\UseCases\JournalService;
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
        $statuses = JournalService::getLessonsStatuses();
        return Inertia::render('Pages/Learning/Course', compact('course', 'statuses'));
    }

    public function lesson(Request $request, $cid, $id)
    {
        $lesson = LearnService::runLesson($id);
        $answers = JournalService::getAnswers($id);
        $course = LearnService::getCourse($cid);
        $statuses = JournalService::getLessonsStatuses();

        return Inertia::render('Pages/Learning/Lesson', [
            'course_id' => $cid,
            'lesson' => $lesson,
            'answers' => $answers,
            'status' => JournalService::getLessonStatus($id),
            'course' => $course,
            'statuses' => $statuses
        ]);//->toResponse($request)->header('Cache-Control','no-cache, max-age=0, must-revalidate, no-store');
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
