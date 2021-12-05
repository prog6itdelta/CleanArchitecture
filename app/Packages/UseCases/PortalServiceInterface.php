<?php

namespace App\Packages\UseCases;

use App\Packages\Infrastructure\DTO\PortalDTO;

interface PortalServiceInterface
{
    /**
     * Portals of current User
     *
     * @return array
     */
    public static function getUserPortals(): array;

    /**
     * Set default portal
     *
     * @param int $id
     */
    public static function setDefaultPortal(int $id): void;

    /**
     * Get default portal id
     *
     * @return int
     */
    public static function getDefaultPortal(): PortalDTO;

}
