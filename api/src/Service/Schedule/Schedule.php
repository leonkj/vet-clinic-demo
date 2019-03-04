<?php

declare(strict_types=1);


namespace App\Service\Schedule;


class Schedule
{
    /** @var array */
    private $appointments;

    /**
     * Schedule constructor.
     *
     * @param array $appointments
     */
    public function __construct(array $appointments)
    {
        $this->appointments = $appointments;
    }

    /**
     * @return array
     */
    public function getAppointments(): array
    {
        return $this->appointments;
    }
}