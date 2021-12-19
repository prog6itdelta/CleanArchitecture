<?php

namespace App\Packages\Shared\Infrastructure\DTO;

class UserDTO
{
    public int $id;
    public string $email;
    public string $name;

    /**
     * @param int $id
     * @param string $email
     * @param string $name
     */
    public function __construct(int $id, string $email, string $name)
    {
        $this->id = $id;
        $this->email = $email;
        $this->name = $name;
    }

}
