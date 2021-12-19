<?php

namespace App\Packages\Shared\Infrastructure\DTO;

class PortalDTO
{
    public $id;

    public $name;

    public function __construct(int $id, string $name)
    {
        $this->id = $id;
        $this->name = $name;
    }

//    public function __get($property) {
//        if (property_exists($this, $property)) {
//            return $this->$property;
//        }
//    }
//
//    public function __set($property, $value) {
//        if (property_exists($this, $property)) {
//            $this->$property = $value;
//        }
//
//        return $this;
//    }
}
