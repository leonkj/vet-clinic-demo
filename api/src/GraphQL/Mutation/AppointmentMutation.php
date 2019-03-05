<?php

declare(strict_types=1);


namespace App\GraphQL\Mutation;


use App\Entity\Appointment;
use App\Entity\DateRange;
use App\Repository\AppointmentRepositoryInterface;
use App\Service\Appointment\AppointmentFactory;
use Overblog\GraphQLBundle\Definition\Resolver\AliasedInterface;
use Overblog\GraphQLBundle\Definition\Resolver\MutationInterface;

class AppointmentMutation implements MutationInterface, AliasedInterface
{
    /** @var AppointmentFactory */
    private $appointmentFactory;

    /** @var AppointmentRepositoryInterface */
    private $appointmentRepository;

    /**
     * AppointmentMutation constructor.
     *
     * @param AppointmentFactory $appointmentFactory
     * @param AppointmentRepositoryInterface $appointmentRepository
     */
    public function __construct(AppointmentFactory $appointmentFactory, AppointmentRepositoryInterface $appointmentRepository)
    {
        $this->appointmentFactory = $appointmentFactory;
        $this->appointmentRepository = $appointmentRepository;
    }

    public function create(array $input)
    {
        $appointment = $this->appointmentFactory->fromArray($input);
        $this->appointmentRepository->save($appointment);

        return ['mutatedId' => $appointment->getId()];
    }

    public function update(array $input)
    {
        // TODO move to service

        /** @var Appointment $appointment */
        $appointment = $this->appointmentRepository->findById($input['id']);

        /** @var DateRange $range */
        $range = DateRange::create($input['start'], $input['stop']);

        $appointment->updateScheduledAt($range);
        $this->appointmentRepository->save($appointment);

        return ['mutatedId' => $appointment->getId()];
    }

    public static function getAliases()
    {
        return [
            'create' => 'create_appointment',
            'update' => 'update_appointment'
        ];
    }
}
