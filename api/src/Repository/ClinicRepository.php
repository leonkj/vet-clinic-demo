<?php

declare(strict_types=1);


namespace App\Repository;


use App\Entity\Clinic;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method Clinic|null find($id, $lockMode = null, $lockVersion = null)
 * @method Clinic|null findOneBy(array $criteria, array $orderBy = null)
 * @method Clinic[]    findAll()
 * @method Clinic[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ClinicRepository extends ServiceEntityRepository implements ClinicRepositoryInterface
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Clinic::class);
    }

    public function findById(string $id): ?Clinic
    {
        return $this->find($id);
    }

    /**
     * @param Clinic $clinic
     */
    public function save(Clinic $clinic): void
    {
        $entityManager = $this->getEntityManager();

        $entityManager->persist($clinic);
        $entityManager->flush($clinic);
    }
}