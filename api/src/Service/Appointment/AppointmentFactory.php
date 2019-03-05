<?php

declare(strict_types=1);


namespace App\Service\Appointment;


use App\Entity\Appointment;
use App\Entity\Client;
use App\Entity\Clinic;
use App\Entity\Doctor;
use App\Repository\ClientRepositoryInterface;
use App\Repository\ClinicRepositoryInterface;
use App\Repository\DoctorRepositoryInterface;
use App\Repository\ServiceRepositoryInterface;
use App\Entity\DateRange;
use DateTimeImmutable;
use Webmozart\Assert\Assert;

class AppointmentFactory
{
    private const CLINIC_ID = 'clinicId';
    private const DOCTOR_ID = 'doctorId';
    private const CLIENT_ID = 'clientId';
    private const START = 'start';
    private const STOP = 'stop';
    private const SERVICES = 'services';

    /** @var ClinicRepositoryInterface */
    private $clinicRepository;

    /** @var ClientRepositoryInterface */
    private $clientRepository;

    /** @var DoctorRepositoryInterface */
    private $doctorRepository;

    /** @var ServiceRepositoryInterface */
    private $serviceRepository;

    /**
     * AppointmentFactory constructor.
     *
     * @param ClinicRepositoryInterface $clinicRepository
     * @param ClientRepositoryInterface $clientRepository
     * @param DoctorRepositoryInterface $doctorRepository
     * @param ServiceRepositoryInterface $serviceRepository
     */
    public function __construct(
        ClinicRepositoryInterface $clinicRepository,
        ClientRepositoryInterface $clientRepository,
        DoctorRepositoryInterface $doctorRepository,
        ServiceRepositoryInterface $serviceRepository
    )
    {
        $this->clinicRepository = $clinicRepository;
        $this->clientRepository = $clientRepository;
        $this->doctorRepository = $doctorRepository;
        $this->serviceRepository = $serviceRepository;
    }

    public function fromArray(array $data): Appointment
    {
        $this->assertDataValid($data);

        /** @var Clinic $clinic */
        $clinic = $this->clinicRepository->findById($data[self::CLINIC_ID]);

        /** @var Client $client */
        $client = $this->clientRepository->findById($data[self::CLIENT_ID]);

        /** @var Doctor $doctor */
        $doctor = $this->doctorRepository->findById($data[self::DOCTOR_ID]);

        /** @var DateTimeImmutable $start */
        $start = $data[self::START];

        /** @var DateTimeImmutable $stop */
        $stop = $data[self::STOP];

        /** @var DateRange $range */
        $range = DateRange::create($start, $stop);
        
        $services = [];

        foreach ($data[self::SERVICES] as $serviceId) {
            $services[] = $this->serviceRepository->findById($serviceId);
        }
        
        return Appointment::create($range, $clinic, $client, $doctor, $services);
    }

    private function assertDataValid(array $data): void
    {
        $requiredFields = [
            $data[self::CLINIC_ID] ?? null,
            $data[self::CLIENT_ID] ?? null,
            $data[self::DOCTOR_ID] ?? null,
            $data[self::START] ?? null,
            $data[self::STOP] ?? null,
            $data[self::SERVICES] ?? null,
        ];

        foreach ($requiredFields as $requiredField) {
            Assert::notEmpty($requiredField);
        }
    }
}