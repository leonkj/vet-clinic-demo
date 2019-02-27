<?php

declare(strict_types=1);


namespace App\Repository;


use App\Entity\Doctor;

interface DoctorRepositoryInterface
{
    public function findById(string $id): ?Doctor;

    public function save(Doctor $doctor): void;
}