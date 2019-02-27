<?php

namespace App\DataFixtures;

use App\Entity\Clinic;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use Faker\Generator;

class LoadClinic extends Fixture
{
    public const REFERENCE_NAME_PREFIX = 'clinic_';
    public const AMOUNT = 10;

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
        for ($i = 1; $i <= self::AMOUNT; $i++) {
            $clinic = Clinic::create($this->generator->company);

            $manager->persist($clinic);
            $this->addReference(self::REFERENCE_NAME_PREFIX . $i, $clinic);
        }

        $manager->flush();
    }
}
