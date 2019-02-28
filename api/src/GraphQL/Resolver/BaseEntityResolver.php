<?php

declare(strict_types=1);


namespace App\GraphQL\Resolver;


use Webmozart\Assert\Assert;

class BaseEntityResolver
{
    public function getList($repository): array
    {
        // TODO pagination
        return $repository->findAll();
    }

    public function findOne($repository, string $id)
    {
        $entity = $repository->findById($id);

        // TODO throw anoher error to handle further
        Assert::notEmpty($entity);

        return $entity;
    }
}