<?php

declare(strict_types=1);


namespace App\Repository;

use App\CustomType\Identifier;
use App\Entity\Appointment;
use App\Entity\Client;
use App\Entity\Clinic;
use App\Entity\Doctor;
use App\Entity\EntityInterface;
use App\Shared\DateRange\DateRangeInterface;
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

    public function findById(Identifier $id): EntityInterface
    {
        return $this->find($id);
    }

    public function findAppointments(Clinic $clinic, DateRangeInterface $dateRange, ?Doctor $doctor, ?Client $client): array
    {
        $queryBuilder = $this->createQueryBuilder('appointments');
        $queryBuilder
            ->where('appointments.clinic = :clinic')
            ->andWhere('appointments.scheduledAt.start BETWEEN :start AND :end')
            ->andWhere('appointments.scheduledAt.end BETWEEN :start AND :end')
            ->setParameters([
                ':clinic' => $clinic,
                ':start' => $dateRange->getStart(),
                ':end' => $dateRange->getEnd(),
            ])
        ;

        if (null !== $doctor) {
            $queryBuilder
                ->andWhere('appointments.doctor = :doctor')
                ->setParameter('doctor', $doctor)
            ;
        }

        if (null !== $client) {
            $queryBuilder
                ->andWhere('appointments.client = :client')
                ->setParameter('client', $client)
            ;
        }

        return $queryBuilder->getQuery()->getResult();
    }

    /**
     * @param EntityInterface $appointment
     */
    public function save(EntityInterface $appointment): void
    {
        $entityManager = $this->getEntityManager();

        $entityManager->persist($appointment);
        $entityManager->flush($appointment);
    }
}