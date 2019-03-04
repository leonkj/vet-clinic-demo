<?php

declare(strict_types=1);


namespace App\Service\Schedule;


use App\DTO\Filter\AppointmentsFilter;
use App\Entity\Client;
use App\Entity\Clinic;
use App\Entity\Doctor;
use App\Repository\AppointmentRepositoryInterface;
use App\Repository\ClientRepositoryInterface;
use App\Repository\ClinicRepositoryInterface;
use App\Repository\DoctorRepositoryInterface;
use Webmozart\Assert\Assert;

class ScheduleFactory
{
    /** @var ClinicRepositoryInterface */
    private $clinicRepository;

    /** @var ClientRepositoryInterface */
    private $clientRepository;

    /** @var DoctorRepositoryInterface */
    private $doctorRepository;

    /** @var AppointmentRepositoryInterface */
    private $appointmentRepository;

    /**
     * ScheduleFactory constructor.
     *
     * @param ClinicRepositoryInterface $clinicRepository
     * @param ClientRepositoryInterface $clientRepository
     * @param DoctorRepositoryInterface $doctorRepository
     * @param AppointmentRepositoryInterface $appointmentRepository
     */
    public function __construct(
        ClinicRepositoryInterface $clinicRepository,
        ClientRepositoryInterface $clientRepository,
        DoctorRepositoryInterface $doctorRepository,
        AppointmentRepositoryInterface $appointmentRepository
    )
    {
        $this->clinicRepository = $clinicRepository;
        $this->clientRepository = $clientRepository;
        $this->doctorRepository = $doctorRepository;
        $this->appointmentRepository = $appointmentRepository;
    }

    /**
     * @param AppointmentsFilter $filter
     * @return Schedule
     */
    public function getSchedule(AppointmentsFilter $filter): Schedule
    {
        /** @var Clinic $clinic */
        $clinic = $this->clinicRepository->findById($filter->getClinicId());

        /** @var Client $client */
        $client = null !== $filter->getClientId() ? $this->clientRepository->findById($filter->getClientId()) : null;
        if ($client) {
            Assert::true($clinic->equals($client->getClinic()));
        }

        /** @var Doctor $doctor */
        $doctor = null !== $filter->getDoctorId() ? $this->doctorRepository->findById($filter->getDoctorId()) : null;
        if ($doctor) {
            Assert::true($clinic->equals($doctor->getClinic()));
        }

        $appointments = $this->appointmentRepository->findAppointments($clinic, $filter->getRange(), $doctor, $client);

        return new Schedule($appointments);
    }
}