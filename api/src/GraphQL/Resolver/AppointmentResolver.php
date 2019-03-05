<?php

declare(strict_types=1);


namespace App\GraphQL\Resolver;


use App\CustomType\Identifier;
use App\Service\Schedule\AppointmentsFilter;
use App\Entity\Appointment;
use App\Entity\EntityInterface;
use App\Repository\AppointmentRepositoryInterface;
use App\Service\Schedule\ScheduleFactory;
use Overblog\GraphQLBundle\Definition\Resolver\AliasedInterface;
use Overblog\GraphQLBundle\Definition\Resolver\ResolverInterface;

class AppointmentResolver implements ResolverInterface, AliasedInterface
{
    /** @var AppointmentRepositoryInterface */
    private $appointmentRepository;

    /** @var BaseEntityResolver */
    private $baseEntityResolver;

    /**
     * @var ScheduleFactory
     */
    private $scheduleFactory;

    /**
     * AppointmentResolver constructor.
     *
     * @param AppointmentRepositoryInterface $appointmentRepository
     * @param BaseEntityResolver $baseEntityResolver
     * @param ScheduleFactory $scheduleFactory
     */
    public function __construct(
        AppointmentRepositoryInterface $appointmentRepository,
        BaseEntityResolver $baseEntityResolver,
        ScheduleFactory $scheduleFactory
    )
    {
        $this->appointmentRepository = $appointmentRepository;
        $this->baseEntityResolver = $baseEntityResolver;
        $this->scheduleFactory = $scheduleFactory;
    }

    public function list($data): array
    {
        $filter = AppointmentsFilter::fromArray($data);

        $schedule = $this->scheduleFactory->getSchedule($filter);

        return $schedule->getAppointments();
    }

    public function resolve(Identifier $id): EntityInterface
    {
        return $this->baseEntityResolver->findOne($this->appointmentRepository, $id);
    }

    public static function getAliases(): array
    {
        return [
            'list' => 'appointments',
            'resolve' => 'appointment'
        ];
    }
}
