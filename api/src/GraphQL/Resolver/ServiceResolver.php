<?php

declare(strict_types=1);


namespace App\GraphQL\Resolver;


use App\CustomType\Identifier;
use App\Entity\EntityInterface;
use App\Repository\ServiceRepositoryInterface;
use Overblog\GraphQLBundle\Definition\Resolver\AliasedInterface;
use Overblog\GraphQLBundle\Definition\Resolver\ResolverInterface;

class ServiceResolver implements ResolverInterface, AliasedInterface
{
    /** @var ServiceRepositoryInterface */
    private $serviceRepository;

    /** @var BaseEntityResolver */
    private $baseEntityResolver;

    /**
     * ServiceResolver constructor.
     *
     * @param ServiceRepositoryInterface $serviceRepository
     * @param BaseEntityResolver $baseEntityResolver
     */
    public function __construct(ServiceRepositoryInterface $serviceRepository, BaseEntityResolver $baseEntityResolver)
    {
        $this->serviceRepository = $serviceRepository;
        $this->baseEntityResolver = $baseEntityResolver;
    }

    public function list(): array
    {
        return $this->serviceRepository->findAll();
    }

    public function resolve(Identifier $identifier): EntityInterface
    {
        return $this->baseEntityResolver->findOne($this->serviceRepository, $identifier);
    }

    public static function getAliases()
    {
        return [
            'list' => 'services',
            'resolve' => 'service'
        ];
    }
}