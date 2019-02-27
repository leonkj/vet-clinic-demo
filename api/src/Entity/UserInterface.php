<?php

declare(strict_types=1);


namespace App\Entity;


use App\CustomType\Identifier;

interface UserInterface
{
    public function getId(): ?Identifier;
    public function getName(): UserName;
    public function getClinic(): Clinic;
}
