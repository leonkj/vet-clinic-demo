<?php

declare(strict_types=1);


namespace App\Repository\Traits;


use App\Entity\EntityInterface;
use App\Repository\Exception\NotFoundException;

trait EntityFoundTrait
{
    private function assertEntityFound(?EntityInterface $entity): void
    {
        if (null === $entity) {
            throw new NotFoundException('Entity not found');
        }
    }
}