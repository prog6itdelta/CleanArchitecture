<?php

namespace App\Packages\Learn\UseCases;

use App\Packages\Shared\Infrastructure\Repositories\PortalRepository;
use App\Packages\Shared\Infrastructure\DTO\PortalDTO;
use App\Packages\Utils\ConfigStorage;

class PortalService implements PortalServiceInterface
{
    public static function getDefaultPortal(): PortalDTO
    {
        $id = ConfigStorage::get('currentPortal', false);

        if ($id) {
            $rep = new PortalRepository();
            return $rep->find($id);
        } else {
            $list = self::getUserPortals();
            if (count($list)) {
                self::setDefaultPortal($list[0]->id);
                return $list[0];
            }
        }

        throw new \Exception('Portal has not set.');
    }

    /**
     * @return array
     */
    public static function getUserPortals(): array
    {
        $currentUser = UserService::currentUser();
        $rep = new PortalRepository();
        $portals = $rep->getUserPortals($currentUser->id);
        return $portals;
    }

    public static function setDefaultPortal(int $id): void
    {
        ConfigStorage::set('currentPortal', $id);
    }
}
