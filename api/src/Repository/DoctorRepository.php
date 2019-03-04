<?php

declare(strict_types=1);


namespace App\Repository;

use App\CustomType\Identifier;
use App\Entity\Doctor;
use App\Entity\EntityInterface;
use App\Repository\Traits\EntityFoundTrait;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method Doctor|null find($id, $lockMode = null, $lockVersion = null)
 * @method Doctor|null findOneBy(array $criteria, array $orderBy = null)
 * @method Doctor[]    findAll()
 * @method Doctor[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class DoctorRepository extends ServiceEntityRepository implements EntityRepositoryInterface, DoctorRepositoryInterface
{
    use EntityFoundTrait;

    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Doctor::class);
    }

    public function findById(Identifier $id): EntityInterface
    {
        $doctor = $this->find($id);

        $this->assertEntityFound($doctor);

        return $doctor;
    }

    /**
     * @param EntityInterface $doctor
     */
    public function save(EntityInterface $doctor): void
    {
        $entityManager = $this->getEntityManager();

        $entityManager->persist($doctor);
        $entityManager->flush($doctor);
    }
}