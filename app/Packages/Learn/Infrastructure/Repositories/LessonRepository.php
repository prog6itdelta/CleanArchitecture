<?php

namespace App\Packages\Learn\Infrastructure\Repositories;

use App\Packages\Shared\Infrastructure\Repositories\AbstractRepository;
use App\Packages\Learn\Entities\Lesson;

class LessonRepository extends AbstractRepository
{

    function model()
    {
        return 'App\Models\Lesson';
    }

    function mapProps($model)
    {
        return new Lesson(
            $model->id,
            $model->name,
            $model->description,
            $model->image,
            $model->options,
            $model->group_id,
            $model->activ,
            $model->sort,
            $model->detail_text
        );
    }
}
