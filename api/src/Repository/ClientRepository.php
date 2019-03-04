<?php

declare(strict_types=1);


namespace App\Repository;


use App\CustomType\Identifier;
use App\Entity\Client;
use App\Entity\EntityInterface;
use App\Repository\Traits\EntityFoundTrait;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method Client|null find($id, $lockMode = null, $lockVersion = null)
 * @method Client|null findOneBy(array $criteria, array $orderBy = null)
 * @method Client[]    findAll()
 * @method Client[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ClientRepository extends ServiceEntityRepository implements ClientRepositoryInterface
{
    use EntityFoundTrait;

    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Client::class);
    }

    public function findById(Identifier $id): EntityInterface
    {
        $client = $this->find($id->toString());

        $this->assertEntityFound($client);

        return $client;
    }

    /**
     * @param EntityInterface $client
     */
    public function save(EntityInterface $client): void
    {
        $entityManager = $this->getEntityManager();

        $entityManager->persist($client);
        $entityManager->flush($client);
    }
}