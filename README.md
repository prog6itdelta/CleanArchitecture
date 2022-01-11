#Installation
composer install  
yarn
yarn watch

add to /etc/hosts   
127.0.0.1 tenant1.localhost

##Database
CREATE DATABASE landlord DEFAULT CHARACTER SET utf8 DEFAULT COLLATE utf8_general_ci;  
CREATE USER 'landlord'@'localhost' IDENTIFIED BY '123';  
GRANT ALL PRIVILEGES ON landlord.* TO 'landlord'@'localhost';  

CREATE DATABASE db_tenant1 DEFAULT CHARACTER SET utf8 DEFAULT COLLATE utf8_general_ci;  
CREATE USER 'tenant_user'@'localhost' IDENTIFIED BY '123';  
GRANT ALL PRIVILEGES ON db_tenant1.* TO 'tenant_user'@'localhost';  

FLUSH PRIVILEGES;

##Laravel
php artisan key:generate  
php artisan migrate --path=database/migrations/landlord --database=landlord --seed
php artisan tenants:artisan "migrate --database=tenant --seed"
php artisan storage:link

After migration and seeding user is:
user@aa.com
123

##Bitrix24
add to .env
BITRIX24_ENDPOINT_URI='https://itdelta.bitrix24.ru'
BITRIX24_CLIENT_ID='client_id_here'
BITRIX24_CLIENT_SECRET='secret_here'
BITRIX24_REDIRECT_URI='${APP_URL}/auth/bitrix24/callback'

PS. To install php-casbin/laravel-authz I had to remove "psr/log": 2.0.0 from composer.lock
