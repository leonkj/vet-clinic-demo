<?php

declare(strict_types=1);


namespace App\Repository;


use App\Entity\Clinic;

interface ClinicRepositoryInterface
{
    public function findById(string $id): ?Clinic;

    public function save(Clinic $clinic): void;
}