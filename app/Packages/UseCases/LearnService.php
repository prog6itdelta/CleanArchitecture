<?php

namespace App\Packages\UseCases;

use App\Packages\Infrastructure\Repositories\CourseRepository;
use App\Packages\Infrastructure\Repositories\LessonRepository;

class LearnService implements LearnServiceInterface
{

    public static function getCourses(): array
    {
        $rep = new CourseRepository();
        $list = $rep->all(['id', 'name', 'description', 'sort', 'image'])->toArray();
        return $list;
    }

    public static function getCourse(int $id): array
    {
        $rep = new CourseRepository();
        $result = $rep->find($id, ['id', 'name', 'description', 'image']);
        $lessons = $rep->lessons($id)->get();
        $result['lessons'] = $lessons->toArray();
        return $result;
    }
}
