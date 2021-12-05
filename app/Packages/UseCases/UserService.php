<?php

namespace App\Packages\UseCases;

use Illuminate\Support\Facades\Auth;
use App\Packages\Infrastructure\DTO\UserDTO;

class UserService implements UserServiceInterface
{

    /**
     * @return UserDTO
     */
    public static function currentUser()
    {
        $user = Auth::user();
        return new UserDTO($user->id, $user->email, $user->name);
    }
}
