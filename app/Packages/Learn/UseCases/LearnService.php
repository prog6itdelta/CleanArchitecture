<?php

namespace App\Packages\Learn\UseCases;

use App\Packages\Learn\Infrastructure\Repositories\CourseRepository;

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
}
