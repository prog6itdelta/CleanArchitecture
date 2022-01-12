<?php

namespace App\Http\Controllers;

use App\Packages\Department\UseCases\DepartmentService;
use Illuminate\Routing\Controller as BaseController;
use Inertia\Inertia;

//use Illuminate\Support\Facades\Auth;
//use App\Models\User;


class AdminController extends BaseController
{
    /**
     * Select portal.
     *
     * @param int $id
     * @return \Inertia\Response
     */
    public function index()
    {
        return Inertia::render('Admin/Index');
    }

    /**
     * Get departments.
     *
     * @param int $id
     * @return \Inertia\Response
     */
    public function departments()
    {
        $departments = DepartmentService::getDepartments();

        return Inertia::render('Admin/Department', $departments);
    }
}
