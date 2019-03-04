<?php

declare(strict_types=1);


namespace App\DataFixtures;


use App\Entity\Service;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;

class LoadService extends Fixture
{
    public const NAME_PREFIX = 'service_';

    public function load(ObjectManager $manager): void
    {
        $names = [
            'Examination',
            'Vaccination',
            'Treatment'
        ];

        foreach ($names as $name) {
            $service = Service::create($name);
            $manager->persist($service);

            $this->addReference(self::NAME_PREFIX . $name, $service);
        }

        $manager->flush();
    }
}