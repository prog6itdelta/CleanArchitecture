<?php

namespace App\Packages\Learn\Entities;

use App\Packages\Common\Application\Interfaces\RepositoryInterface;
//use App\Packages\Learn\Infrastructure\Repositories\QuestionRepository;

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
    public function __construct(RepositoryInterface $rep, $prop)
    {
        $this->rep = $rep;
        foreach ($prop as $key => $value) {
            $this->{$key} = $value;
        }
    }

    function fetchAnswers() {
//        $rep = new QuestionRepository();
        $rep = $this->rep;
        $this->answers = $rep->answers($this->id);
    }

    function checkQuestion(Object $answer): bool {
        if (empty($this->answers)) $this->fetchAnswers();

        return true;
    }

    /**
     * @param int $id
     * @return Question
//     */
//    public static function getById(int $id): Question
//    {
//        $rep = new QuestionRepository();
////        $rep = $this->rep;
//        $question = $rep->find($id);
//        return $question;
//    }
}
