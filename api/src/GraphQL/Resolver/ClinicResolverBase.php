<?php

declare(strict_types=1);


namespace App\GraphQL\Resolver;


use App\Entity\Clinic;
use App\Repository\ClinicRepositoryInterface;
use Overblog\GraphQLBundle\Definition\Resolver\AliasedInterface;
use Overblog\GraphQLBundle\Definition\Resolver\ResolverInterface;

class ClinicResolverBase implements ResolverInterface, AliasedInterface
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

    public function getClinics(): array
    {
        return $this->baseEntityResolver->getList($this->clinicRepository);
    }

    public function findClinic(string $id): Clinic
    {
        return $this->baseEntityResolver->findOne($this->clinicRepository, $id);
    }

    public static function getAliases(): array
    {
        return [
            'getClinics' => 'clinics',
            'findClinic' => 'clinic'
        ];
    }
}