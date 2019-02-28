<?php

declare(strict_types=1);


namespace App\Repository;


use App\Entity\EntityInterface;

interface EntityRepositoryInterface
{
    /** @return EntityInterface[] */
    public function findAll();

    public function findById(string $id): ?EntityInterface;

    public function save(EntityInterface $entity): void;
}