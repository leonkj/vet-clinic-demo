<?php

declare(strict_types=1);


namespace App\GraphQL\Resolver;


use App\Entity\Doctor;
use App\Repository\DoctorRepositoryInterface;
use Overblog\GraphQLBundle\Definition\Resolver\AliasedInterface;
use Overblog\GraphQLBundle\Definition\Resolver\ResolverInterface;

class DoctorResolver implements ResolverInterface, AliasedInterface
{
    /** @var DoctorRepositoryInterface */
    private $doctorRepository;

    /** @var BaseEntityResolver */
    private $baseEntityResolver;

    /**
     * DoctorResolver constructor.
     *
     * @param DoctorRepositoryInterface $doctorRepository
     * @param BaseEntityResolver $baseEntityResolver
     */
    public function __construct(DoctorRepositoryInterface $doctorRepository, BaseEntityResolver $baseEntityResolver)
    {
        $this->doctorRepository = $doctorRepository;
        $this->baseEntityResolver = $baseEntityResolver;
    }

    public function getDoctors(string $clinicId): array
    {
        return $this->doctorRepository->findBy(['clinic' => $clinicId]);
    }

    public function findDoctor(string $id): Doctor
    {
        return $this->baseEntityResolver->findOne($this->doctorRepository, $id);
    }

    public static function getAliases(): array
    {
        return [
            'getDoctors' => 'doctors',
            'findDoctor' => 'doctor'
        ];
    }
}
