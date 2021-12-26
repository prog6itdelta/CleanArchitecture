composer install
yarn

create database
check .env file and set DB options

php artisan key:generate
php artisan migrate
php artisan db:seed

After migration and seeding user is:
user@aa.com
123

PS. To install php-casbin/laravel-authz I had to remove "psr/log": 2.0.0 from composer.lock
