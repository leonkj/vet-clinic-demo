<?php

declare(strict_types=1);


namespace App\GraphQL\Resolver;


use App\Entity\Clinic;
use App\Entity\EntityInterface;
use App\Repository\ClinicRepositoryInterface;
use Overblog\GraphQLBundle\Definition\Resolver\AliasedInterface;
use Overblog\GraphQLBundle\Definition\Resolver\ResolverInterface;

class ClinicResolver implements ResolverInterface, AliasedInterface
{
    /** @var ClinicRepositoryInterface */
    private $clinicRepository;

    /** @var BaseEntityResolver */
    private $baseEntityResolver;

    /**
     * ClinicResolverBase constructor.
     *
     * @param ClinicRepositoryInterface $clinicRepository
     * @param BaseEntityResolver $baseEntityResolver
     */
    public function __construct(ClinicRepositoryInterface $clinicRepository, BaseEntityResolver $baseEntityResolver)
    {
        $this->clinicRepository = $clinicRepository;
        $this->baseEntityResolver = $baseEntityResolver;
    }

    public function list(): array
    {
        return $this->baseEntityResolver->getList($this->clinicRepository);
    }

    public function resolve(string $id): EntityInterface
    {
        return $this->baseEntityResolver->findOne($this->clinicRepository, $id);
    }

    public static function getAliases(): array
    {
        return [
            'list' => 'clinics',
            'resolve' => 'clinic'
        ];
    }
}
