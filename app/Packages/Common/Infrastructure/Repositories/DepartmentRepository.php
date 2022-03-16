<?php

namespace App\Packages\Common\Infrastructure\Repositories;

use App\Packages\Common\Infrastructure\Repositories\AbstractRepository;
use App\Packages\Department\Entities\Department;

class DepartmentRepository extends AbstractRepository
{

    function model()
    {
        return 'App\Models\Department';
    }

    function mapProps($model)
    {
        return new Department($model->toArray());
    }

}
