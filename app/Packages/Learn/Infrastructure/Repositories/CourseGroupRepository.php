<?php

namespace App\Packages\Learn\Infrastructure\Repositories;

use App\Packages\Common\Infrastructure\Repositories\AbstractRepository;
use App\Packages\Learn\Entities\Course;
use App\Packages\Learn\Entities\CourseGroup;

class CourseGroupRepository extends AbstractRepository
{
    function model()
    {
        return 'App\Models\CourseGroup';
    }

    function mapProps($model)
    {
        return new CourseGroup($model->toArray());
    }

    function courses($group_id)
    {
        return $this->model->find($group_id)->courses()->get()->map(function ($item) {
            return new Course($item->toArray());
        })->toArray();
    }
}
