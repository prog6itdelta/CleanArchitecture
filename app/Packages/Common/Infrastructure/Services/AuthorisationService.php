<?php

namespace App\Packages\Common\Infrastructure\Services;

use App\Packages\Common\Application\Services\IAuthorisationService;
use Enforcer;

class AuthorisationService implements IAuthorisationService
{

    public static function authorized(string $obj, string $act): bool
    {
        $user_id = UserService::currentUser()->id;
        $sub = "U$user_id";
        return AuthorisationService::checkPermission($sub, $obj, $act);
    }


    public static function checkPermission(string $sub, string $obj, string $act): bool
    {
        return Enforcer::enforce($sub, $obj, $act);
    }

    public static function DeleteUser(string $obj)
    {
        // TODO: Implement DeleteUser() method.
    }

    public static function DeleteRole(string $obj)
    {
        // TODO: Implement DeleteRole() method.
    }

    public static function DeletePermission(string $obj)
    {
        // TODO: Implement DeletePermission() method.
    }

    public static function AddPolicy(string $sub, string $obj, string $act): bool
    {
        // TODO: Implement AddPolicy() method.
    }

    public static function RemovePolicy(string $sub, string $obj, string $act): bool
    {
        // TODO: Implement RemovePolicy() method.
    }

    public static function AddGroupingPolicy(string $group1, string $group2): bool
    {
        // TODO: Implement AddGroupingPolicy() method.
    }

    public static function RemoveGroupingPolicy(string $group1, string $group2): bool
    {
        // TODO: Implement RemoveGroupingPolicy() method.
    }
}
