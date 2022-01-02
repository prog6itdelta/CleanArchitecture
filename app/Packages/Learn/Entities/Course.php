<?php

namespace App\Packages\Learn\Entities;

use App\Packages\Learn\Infrastructure\Repositories\CourseRepository;
use App\Packages\Learn\Infrastructure\Repositories\LessonRepository;
use App\Packages\Learn\Infrastructure\Repositories\QuestionRepository;

class Course
{
    public $id;

    public $name;

    public $description;

    public $image;

    public $options;

    public $group_id;

    public $active;

    public $sort;

    public $lessons;

    /**
     * @param $prop
     */
    public function __construct($prop)
    {
        foreach ($prop as $key => $value) {
            $this->{$key} = $value;
        }
    }

    function fetchLessons() {
        $rep = new CourseRepository();
        $this->lessons = $rep->lessons($this->id);
    }
//
//    function lessons() {
//        $rep = new CourseRepository();
//        return $rep->lessons($this->id);
//    }
}
