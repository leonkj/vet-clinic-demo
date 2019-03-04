<?php

declare(strict_types=1);


namespace App\DataFixtures;


use App\Entity\Client;
use App\Entity\Clinic;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use Faker\Generator;

class LoadClient extends Fixture implements DependentFixtureInterface
{
    public const AMOUNT = 10;
    public const REFERENCE_NAME_PREFIX = 'client_';

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
            for ($clientNumber = 1; $clientNumber <= self::AMOUNT; $clientNumber++) {
                /** @var Clinic $clinic */
                $clinic = $this->getReference(LoadClinic::REFERENCE_NAME_PREFIX . $clinicNumber);

                $client = Client::create($this->generator->firstName, $this->generator->lastName, $clinic);

                $manager->persist($client);
                $this->setReference(self::REFERENCE_NAME_PREFIX . (10 * ($clinicNumber - 1) + $clientNumber), $client);
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