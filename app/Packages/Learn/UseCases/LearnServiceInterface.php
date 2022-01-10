<?php

namespace App\Packages\Learn\UseCases;

use App\Packages\Learn\Entities\Course;

interface LearnServiceInterface
{
    /**
     * list of courses
     *
     * @return array
     */
    public static function getCourses(): array;

    /**
     * Course details
     *
     * @param int $id
     */
    public static function getCourse(int $id): Course;

}
