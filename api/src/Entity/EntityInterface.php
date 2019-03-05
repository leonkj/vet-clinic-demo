<?php

declare(strict_types=1);


namespace App\Entity;


use App\CustomType\Identifier;

interface EntityInterface
{
    public function getId(): Identifier;
}