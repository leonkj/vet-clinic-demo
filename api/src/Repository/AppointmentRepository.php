<?php

declare(strict_types=1);


namespace App\Repository;

use App\Entity\Appointment;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method Appointment|null find($id, $lockMode = null, $lockVersion = null)
 * @method Appointment|null findOneBy(array $criteria, array $orderBy = null)
 * @method Appointment[]    findAll()
 * @method Appointment[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class AppointmentRepository extends ServiceEntityRepository implements AppointmentRepositoryInterface
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Appointment::class);
    }

    public function findById(string $id): ?Appointment
    {
        return $this->find($id);
    }

    /**
     * @param Appointment $appointment
     */
    public function save(Appointment $appointment): void
    {
        $entityManager = $this->getEntityManager();

        $entityManager->persist($appointment);
        $entityManager->flush($appointment);
    }
}