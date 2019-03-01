<?php

declare(strict_types=1);


namespace App\GraphQL\Resolver;


use App\Entity\Client;
use App\Repository\ClientRepositoryInterface;
use Overblog\GraphQLBundle\Definition\Resolver\AliasedInterface;
use Overblog\GraphQLBundle\Definition\Resolver\ResolverInterface;

class ClientResolver implements ResolverInterface, AliasedInterface
{
    /** @var ClientRepositoryInterface */
    private $clientRepository;

    /** @var BaseEntityResolver */
    private $baseEntityResolver;

    /**
     * ClientResolver constructor.
     *
     * @param ClientRepositoryInterface $clientRepository
     * @param BaseEntityResolver $baseEntityResolver
     */
    public function __construct(ClientRepositoryInterface $clientRepository, BaseEntityResolver $baseEntityResolver)
    {
        $this->clientRepository = $clientRepository;
        $this->baseEntityResolver = $baseEntityResolver;
    }

    public function getClients(string $clinicId): array
    {
        return $this->clientRepository->findBy(['clinic' => $clinicId]);
    }

    public function findClient(string $id): Client
    {
        return $this->baseEntityResolver->findOne($this->clientRepository, $id);
    }

    public static function getAliases(): array
    {
        return [
            'getClients' => 'clients',
            'findClient' => 'client'
        ];
    }
}
