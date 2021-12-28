<?php

namespace App\Packages\Common\Application\Services;

interface IAuthorisationService
{
    /**
     * @param string $sub
     * @param string $obj
     * @param string $act
     * @return bool
     */
    public static function checkPermission(string $sub, string $obj, string $act): bool;

    /**
     * @param string $obj
     * @param string $act
     * @return bool
     */
    public static function authorized(string $obj, string $act): bool;

    // Users
    public static function DeleteUser(string $obj);

    public static function DeleteRole(string $obj);

    public static function DeletePermission(string $obj);

    // Policies
    public static function AddPolicy(string $sub, string $obj, string $act): bool;

    public static function RemovePolicy(string $sub, string $obj, string $act): bool;

    public static function AddGroupingPolicy(string $group1, string $group2): bool;

    public static function RemoveGroupingPolicy(string $group1, string $group2): bool;

}
