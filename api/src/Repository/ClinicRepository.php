<?php

declare(strict_types=1);


namespace App\Repository;


use App\CustomType\Identifier;
use App\Entity\Clinic;
use App\Entity\EntityInterface;
use App\Repository\Traits\EntityFoundTrait;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;;
use Symfony\Bridge\Doctrine\RegistryInterface;

class ClinicRepository extends ServiceEntityRepository implements EntityRepositoryInterface, ClinicRepositoryInterface
{
    use EntityFoundTrait;

    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Clinic::class);
    }

    /**
     * {@inheritdoc}
     */
    public function findById(Identifier $id): EntityInterface
    {
        /** @var Clinic $clinic */
        $clinic = $this->find($id);

        $this->assertEntityFound($clinic);

        return $clinic;
    }

    /**
     * @param EntityInterface $clinic
     */
    public function save(EntityInterface $clinic): void
    {
        $entityManager = $this->getEntityManager();

        $entityManager->persist($clinic);
        $entityManager->flush($clinic);
    }
}