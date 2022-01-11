<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller as BaseController;
//use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;
use App\Models\User;


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
    public function edit(Request $request)
    {
        $path = 'empty';
        if ($request->hasFile('new_avatar') && $request->file('new_avatar')->isValid()) {
            $avatarPath = $request->new_avatar->store('images/avatars');
        } else {
            $avatarPath = $request->avatar;
        }
        $editedUser = $request->collect()->map(function ($item){ if ($item === null){$item = '';} return $item;})->all();
        $currentUser = User::updateOrCreate(
            [
                'id' => 2
            ],
            [
                'avatar' => $avatarPath,
                'name' => $editedUser['name'],
                'last_name' => $editedUser['last_name'],
                'email' => $editedUser['email'],
                'phone' => $editedUser['phone'],
            ]
        );
        return $avatarPath;
    }

}
