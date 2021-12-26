<?php

namespace App\Packages\Learn\Infrastructure\Repositories;

use App\Packages\Common\Infrastructure\Repositories\AbstractRepository;

class AnswerRepository extends AbstractRepository
{
    function model()
    {
        return 'App\Models\Answer';
    }

    function mapProps($model)
    {
        return new CourseGroup($model->toArray());
    }

}
