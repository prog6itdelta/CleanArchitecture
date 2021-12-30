<?php

namespace App\Packages\Common\Infrastructure\Integrations;

use Illuminate\Http\RedirectResponse;
use Laravel\Socialite\Facades\Socialite;

class IntegrationService
{
    /**
     * @return false|RedirectResponse
     *
     * Check integration existing, redirect to the login page
     */
    public static function checkIntegration(): false|RedirectResponse
    {
        $tenant = app('currentTenant');
        $options = json_decode($tenant?->options);
        $integration = $options?->integration ?? null;
        switch ($integration?->type) {
            case 'bitrix24':
                return Socialite::driver('bitrix24')->redirect();
            case 'intrum':
        }
        return false;
    }
}
