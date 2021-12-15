<?php

namespace App\Packages\Infrastructure\Repositories;

use App\Packages\Infrastructure\DTO\PortalDTO;
use Illuminate\Support\Facades\Auth;

class PortalRepository extends AbstractRepository
{

    function model()
    {
        return 'App\Models\Portal';
    }

    function mapProps($model)
    {
        $portal = new PortalDTO($model->id, $model->name);
        return $portal;
    }

    function getUserPortals(int $user_id):array {
        $list = Auth::user()->portals()->get();
        $list = $list->map(fn ($item) => $this->mapProps($item));
        return $list->toArray();
    }
}
