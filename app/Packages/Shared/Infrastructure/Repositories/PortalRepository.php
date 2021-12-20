<?php

namespace App\Packages\Shared\Infrastructure\Repositories;

use App\Packages\Shared\Infrastructure\DTO\PortalDTO;
use Illuminate\Support\Facades\Auth;

class PortalRepository extends AbstractRepository
{

    function model()
    {
        return 'App\Models\Portal';
    }

    function mapProps($model)
    {
        return new PortalDTO($model->id, $model->name);
    }

    function getUserPortals(int $user_id):array {
        $list = Auth::user()->portals()->get();
        $list = $list->map(fn ($item) => $this->mapProps($item));
        return $list->toArray();
    }
}
