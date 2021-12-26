<?php

namespace App\Packages\Learn\Infrastructure\Repositories;

use App\Packages\Common\Infrastructure\Repositories\AbstractRepository;
use App\Packages\Learn\Entities\Answer;
use App\Packages\Learn\Entities\Question;

class QuestionRepository extends AbstractRepository
{
    function model()
    {
        return 'App\Models\Question';
    }

    function mapProps($model)
    {
        return new Question($model->toArray());
    }

    function answers($question_id)
    {
        return $this->model->find($question_id)->answers()->get()->map(function ($item) {
            return new Answer($item->toArray());
        })->toArray();
    }
}
