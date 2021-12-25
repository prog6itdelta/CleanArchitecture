<?php

namespace App\Packages\Learn\Infrastructure\Repositories;

use App\Packages\Learn\Entities\Course;
use App\Packages\Shared\Infrastructure\Repositories\AbstractRepository;
use App\Packages\Learn\Entities\Curriculum;

class CurriculumRepository extends AbstractRepository
{
    function model()
    {
        return 'App\Models\Curriculum';
    }

    function mapProps($model)
    {
        return new Curriculum($model->toArray());
    }

    function courses($curriculum_id)
    {
        return $this->model->find($curriculum_id)->courses()->get()->map(function ($item) {
            return new Course($item->toArray());
        })->toArray();
    }
}
