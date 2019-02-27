<?php

declare(strict_types=1);


namespace App\Repository;


use App\Entity\Appointment;

interface AppointmentRepositoryInterface
{
    public function findById(string $id): ?Appointment;

    public function save(Appointment $appointment): void;
}