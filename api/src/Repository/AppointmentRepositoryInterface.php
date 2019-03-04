<?php

declare(strict_types=1);


namespace App\Repository;


use App\Entity\Client;
use App\Entity\Clinic;
use App\Entity\Doctor;
use App\Shared\DateRange\DateRangeInterface;

interface AppointmentRepositoryInterface extends EntityRepositoryInterface
{
    public function findAppointments(Clinic $clinic, DateRangeInterface $dateRange, ?Doctor $doctor, ?Client $client): array;
}