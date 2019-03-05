<?php

declare(strict_types=1);


namespace App\DataFixtures;


use App\Entity\Appointment;
use App\Entity\Client;
use App\Entity\DateRange;
use App\Entity\Doctor;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;

class LoadAppointment extends Fixture implements DependentFixtureInterface
{
    private const AMOUNT = 100;

    /**
     * {@inheritdoc}
     */
    public function load(ObjectManager $manager): void
    {
        $service = $this->getReference(LoadService::NAME_PREFIX . 'Examination');

        for ($appointmentNumber = 1; $appointmentNumber <= self::AMOUNT; $appointmentNumber++) {
            /** @var Doctor $doctor */
            $doctor = $this->getReference(LoadDoctor::REFERENCE_NAME_PREFIX . $appointmentNumber);
            /** @var Client $client */
            $client = $this->getReference(LoadClient::REFERENCE_NAME_PREFIX . $appointmentNumber);

            $start = new \DateTimeImmutable('today +' . random_int(0, 2880) . ' minutes');
            /** @var DateRange $dateRange */
            $dateRange = DateRange::create($start, $start->modify('+' . random_int(30, 120) . ' minutes'));

            $appointment = Appointment::create($dateRange, $doctor->getClinic(), $client, $doctor, [$service]);

            $manager->persist($appointment);
        }

        $manager->flush();
    }

    /**
     * {@inheritdoc}
     */
    public function getDependencies(): array
    {
        return [
            LoadClinic::class,
            LoadClient::class,
            LoadDoctor::class
        ];
    }
}