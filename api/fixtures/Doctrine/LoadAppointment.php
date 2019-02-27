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
    private const AMOUNT = 10;

    /**
     * {@inheritdoc}
     */
    public function load(ObjectManager $manager): void
    {
        for ($appointmentNumber = 1; $appointmentNumber <= self::AMOUNT; $appointmentNumber++) {
            /** @var Doctor $doctor */
            $doctor = $this->getReference(LoadDoctor::REFERENCE_NAME_PREFIX . random_int(1, LoadDoctor::AMOUNT));
            /** @var Client $client */
            $client = $this->getReference(LoadClient::REFERENCE_NAME_PREFIX . random_int(1, LoadClient::AMOUNT));

            $start = new \DateTimeImmutable('today +' . random_int(0, 2880) . ' minutes');
            $dateRange = DateRange::create($start, $start->modify('+' . random_int(30, 120) . ' minutes'));

            $appointment = Appointment::create($dateRange, $client, $doctor);

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