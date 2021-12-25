<?php

namespace App\Packages\Learn\UseCases;

use App\Packages\Learn\Infrastructure\Repositories\CourseRepository;
use App\Packages\Learn\Infrastructure\Repositories\CurriculumRepository;
use App\Packages\Learn\Infrastructure\Repositories\CourseGroupRepository;
use App\Packages\Learn\Infrastructure\Repositories\LessonRepository;

class LearnService implements LearnServiceInterface
{

    public static function getCourses(): array
    {
        $rep = new CourseRepository();
        $list = $rep->all()->toArray();
        return $list;
    }

    public static function getCourse(int $id): array
    {
        $rep = new CourseRepository();
        $course = $rep->find($id);
        $lessons = $course->lessons();
        return compact('course', 'lessons');
    }

    public static function getCourseGroups(): array
    {
        $rep = new CourseGroupRepository();
        $list = $rep->all()->toArray();
        return $list;
    }

    public static function getCurriculumsFullList(): array
    {
        $rep = new CurriculumRepository();
        $list = $rep->all()->each(function ($item) {
            $item->fetchCourses();
        })->toArray();
        return $list;
    }

    public static function runLesson(int $id) {
        $rep = new LessonRepository();
        $lesson = $rep->find($id);
        $lesson->fetchQuestions();
        foreach ($lesson->questions as $value) {
            $value->fetchAnswers();
            // delete right answer from the frontend side
            foreach ($value->answers as $value) {
                unset($value->correct);
            }
        }
        return $lesson;
    }

}
