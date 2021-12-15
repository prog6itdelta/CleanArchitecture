<?php

namespace App\Packages\Infrastructure\Repositories;

class CourseRepository extends AbstractRepository
{

    function model()
    {
        return 'App\Models\Course';
    }

    function lessons($course_id) {
        return $this->model->find($course_id)->lessons();
    }
}
