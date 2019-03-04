<?php

namespace App\Repository;

use App\CustomType\Identifier;
use App\Entity\EntityInterface;
use App\Entity\Service;
use App\Repository\Traits\EntityFoundTrait;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method Service|null find($id, $lockMode = null, $lockVersion = null)
 * @method Service|null findOneBy(array $criteria, array $orderBy = null)
 * @method Service[]    findAll()
 * @method Service[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ServiceRepository extends ServiceEntityRepository implements ServiceRepositoryInterface
{
    use EntityFoundTrait;

    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Service::class);
    }

    public function findById(Identifier $id): EntityInterface
    {
        $service = $this->find($id);

        $this->assertEntityFound($service);

        return $service;
    }

    public function save(EntityInterface $entity): void
    {
        $entityManager = $this->getEntityManager();

        $entityManager->persist($entity);
        $entityManager->flush($entity);
    }
}
