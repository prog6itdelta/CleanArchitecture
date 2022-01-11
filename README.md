#Installation
composer install  
yarn

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

##ENV
DB_DATABASE_LANDLORD=Created landlord database
DB_USERNAME_LANDLORD=Created landlord user
DB_PASSWORD_LANDLORD=Password for landlord user

##Laravel
php artisan key:generate  
php artisan migrate --path=database/migrations/landlord --database=landlord --seed
php artisan tenants:artisan "migrate --database=tenant --seed"

After migration and seeding user is:
user@aa.com
123

PS. To install php-casbin/laravel-authz I had to remove "psr/log": 2.0.0 from composer.lock
