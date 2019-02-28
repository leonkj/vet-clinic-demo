<?php

declare(strict_types=1);


namespace App\GraphQL\Resolver;


use App\Entity\EntityInterface;
use App\Repository\EntityRepositoryInterface;
use Webmozart\Assert\Assert;

class BaseEntityResolver
{
    public function getList(EntityRepositoryInterface $repository): array
    {
        // TODO pagination
        return $repository->findAll();
    }

    public function findOne(EntityRepositoryInterface $repository, string $id): EntityInterface
    {
        $entity = $repository->findById($id);

        // TODO throw another error to handle further
        Assert::notEmpty($entity);

        return $entity;
    }
}
