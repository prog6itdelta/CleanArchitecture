<?php

namespace App\Packages\Learn\UseCases;

use App\Packages\Shared\Infrastructure\DTO\UserDTO;
use Illuminate\Support\Facades\Auth;

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
