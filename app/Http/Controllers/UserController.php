<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller as BaseController;
//use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

use Illuminate\Support\Facades\Auth;
//use App\Models\User;


class UserController extends BaseController
{
    /**
     * User profile.
     *
     * @return \Inertia\Response
     */
    public function profile()
    {
//        dd(Auth::user());
        return Inertia::render('Pages/Profile', [
            'user' => Auth::user()
        ]);
    }

}
