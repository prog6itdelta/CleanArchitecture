<?php

namespace App\Http\Controllers;

use App\Packages\Department\UseCases\DepartmentService;
use Illuminate\Routing\Controller as BaseController;
use Inertia\Inertia;
use Enforcer;

class AdminController extends BaseController
{
    /**
     * Get departments.
     *
     * @param int $id
     * @return \Inertia\Response
     */
    public function departments()
    {
        $departments = DepartmentService::getDepartments();

        return Inertia::render('Admin/Department', compact('departments'));
    }
}
