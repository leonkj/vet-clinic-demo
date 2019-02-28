<?php

declare(strict_types=1);


namespace App\GraphQL\Resolver;


use App\Entity\Appointment;
use App\Repository\AppointmentRepositoryInterface;
use Overblog\GraphQLBundle\Definition\Resolver\AliasedInterface;
use Overblog\GraphQLBundle\Definition\Resolver\ResolverInterface;

class AppointmentResolver implements ResolverInterface, AliasedInterface
{
    /** @var AppointmentRepositoryInterface */
    private $appointmentRepository;

    /** @var BaseEntityResolver */
    private $baseEntityResolver;

    /**
     * AppointmentResolver constructor.
     *
     * @param AppointmentRepositoryInterface $appointmentRepository
     * @param BaseEntityResolver $baseEntityResolver
     */
    public function __construct(AppointmentRepositoryInterface $appointmentRepository, BaseEntityResolver $baseEntityResolver)
    {
        $this->appointmentRepository = $appointmentRepository;
        $this->baseEntityResolver = $baseEntityResolver;
    }

    public function getAppointments(): array
    {
        return $this->baseEntityResolver->getList($this->appointmentRepository);
    }

    public function findAppointment(string $id): Appointment
    {
        return $this->baseEntityResolver->findOne($this->appointmentRepository, $id);
    }

    public static function getAliases(): array
    {
        return [
            'getAppointments' => 'appointments',
            'findAppointment' => 'appointment'
        ];
    }
}
