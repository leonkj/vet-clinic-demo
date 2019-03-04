<?php

declare(strict_types=1);


namespace App\Repository;


use App\CustomType\Identifier;
use App\Entity\EntityInterface;
use App\Repository\Exception\NotFoundException;

interface EntityRepositoryInterface
{
    /** @return EntityInterface[] */
    public function findAll();

    /**
     * @param Identifier $id
     * @return EntityInterface
     * @throws NotFoundException
     */
    public function findById(Identifier $id): EntityInterface;

    public function save(EntityInterface $entity): void;
}