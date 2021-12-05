<?php

namespace App\Packages\Utils;

class ConfigStorage
{
    public static function get(string $key, mixed $default): mixed {
        return session($key, $default);
    }

    public static function set(string $key, mixed $value): void {
        session()->put($key, $value);
    }

}
