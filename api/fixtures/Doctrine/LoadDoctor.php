<?php

declare(strict_types=1);


namespace App\DataFixtures;


use App\Entity\Clinic;
use App\Entity\Doctor;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use Faker\Generator;

class LoadDoctor extends Fixture implements DependentFixtureInterface
{
    private const NAME_PREFIX = 'Dr. ';

    public const AMOUNT = 10;
    public const REFERENCE_NAME_PREFIX = 'doctor_';

    /** @var Generator */
    private $generator;

    /**
     * LoadClinic constructor.
     *
     * @param Generator $generator
     */
    public function __construct(Generator $generator)
    {
        $this->generator = $generator;
    }

    /**
     * {@inheritdoc}
     */
    public function load(ObjectManager $manager): void
    {
        for ($clinicNumber = 1; $clinicNumber <= LoadClinic::AMOUNT; $clinicNumber++) {
            for ($doctorNumber = 1; $doctorNumber <= self::AMOUNT; $doctorNumber++) {
                /** @var Clinic $clinic */
                $clinic = $this->getReference(LoadClinic::REFERENCE_NAME_PREFIX . $clinicNumber);

                $doctor = Doctor::create(self::NAME_PREFIX . $this->generator->firstName, $this->generator->lastName, $clinic);

                $manager->persist($doctor);
                $this->setReference(self::REFERENCE_NAME_PREFIX . $doctorNumber, $doctor);
            }
        }

        $manager->flush();
    }

    /**
     * {@inheritdoc}
     */
    public function getDependencies(): array
    {
        return [
            LoadClinic::class
        ];
    }
}