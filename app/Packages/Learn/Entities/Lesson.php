<?php

namespace App\Packages\Learn\Entities;

use App\Packages\Learn\Infrastructure\Repositories\LessonRepository;

class Lesson
{
    public $id;

    public $name;

    public $description;

    public $image;

    public $options;

    public $group_id;

    public $active;

    public $sort;

    public $detail_text;

    public $questions;


    /**
     * @param $prop
     */
    public function __construct($prop)
    {
        foreach ($prop as $key => $value) {
            $this->{$key} = $value;
        }
    }

    function fetchQuestions() {
        $rep = new LessonRepository();
        $this->questions = $rep->questions($this->id);
    }

    function checkLesson(Object $answers): bool {
        if (empty($this->questions)) $this->fetchQuestions();

        return true;
    }

    /**
     * @param int $id
     * @return Lesson
     */
    public static function getById(int $id): Lesson
    {
        $rep = new LessonRepository();
        $lesson = $rep->find($id);
        return $lesson;
    }
}
