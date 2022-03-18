<?php

namespace App\Packages\Common\Infrastructure\Repositories;

use App\Packages\Common\Domain\Department;
use App\Packages\Common\Infrastructure\Repositories\AbstractRepository;

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
