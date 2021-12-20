<?php

namespace App\Packages\Learn\Entities;

use App\Packages\Learn\Infrastructure\Repositories\AbstractRepository;
use App\Packages\Learn\Infrastructure\Repositories\CourseRepository;
use App\Packages\Learn\Infrastructure\Repositories\LessonRepository;

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

    /**
     * @param $prop
     */
    public function __construct($prop)
    {
        foreach ($prop as $key => $value) {
            $this->{$key} = $value;
        }
    }

    function lessons() {
        $rep = new CourseRepository();
        return $rep->lessons($this->id);
    }
}
