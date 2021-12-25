<?php

namespace App\Packages\Learn\Entities;

use App\Packages\Learn\Infrastructure\Repositories\QuestionRepository;

class Question
{
    public $id;

    public $name;

    public $type;

    public $point;

    public $lesson_id;

    public $active;

    public $sort;

    public $answers;

    /**
     * @param $prop
     */
    public function __construct($prop)
    {
        foreach ($prop as $key => $value) {
            $this->{$key} = $value;
        }
    }

    function fetchAnswers() {
        $rep = new QuestionRepository();
        $this->answers = $rep->answers($this->id);
    }
}
