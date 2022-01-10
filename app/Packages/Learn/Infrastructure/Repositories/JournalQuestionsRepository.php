<?php

namespace App\Packages\Learn\Infrastructure\Repositories;

use App\Models\Question;
use App\Packages\Common\Infrastructure\Repositories\AbstractRepository;

class JournalQuestionsRepository extends AbstractRepository
{


    function model()
    {
        return 'App\Models\JournalQuestion';
    }

    function mapProps($model)
    {
        return new Question($model->toArray());
    }
}
