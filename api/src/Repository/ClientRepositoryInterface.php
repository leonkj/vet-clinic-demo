<?php

declare(strict_types=1);


namespace App\Repository;


use App\Entity\Client;

interface ClientRepositoryInterface
{
    public function findById(string $id): ?Client;

    public function save(Client $client): void;
}