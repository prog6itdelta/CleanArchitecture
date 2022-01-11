<?php

namespace App\Packages\Department\UseCases;

use Illuminate\Pagination\Paginator;

interface DepartmentServiceInterface
{
    /**
     * list of departments
     *
     * @return array
     */
    public static function getDepartments(): Paginator;

    /**
     * Department details
     *
     * @param int $id
     */
    public static function getDepartment(int $id): array;

}
