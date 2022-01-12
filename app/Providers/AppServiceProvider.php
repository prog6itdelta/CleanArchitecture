<?php

namespace App\Providers;

use App\Packages\Common\Application\Interfaces\RepositoryInterface;
use App\Packages\Common\Application\Services\IAuthorisationService;
use App\Packages\Common\Infrastructure\Services\AuthorisationService;
use App\Packages\Learn\Entities\Question;
use App\Packages\Learn\Infrastructure\Repositories\QuestionRepository;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(IAuthorisationService::class, AuthorisationService::class);

        $this->app->when(Question::class)
            ->needs(RepositoryInterface::class)
            ->give(function () {
                return new QuestionRepository();
            });
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
