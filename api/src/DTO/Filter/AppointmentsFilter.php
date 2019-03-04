<?php

declare(strict_types=1);


namespace App\DTO\Filter;


use App\CustomType\Identifier;
use App\Shared\DateRange\DateRange;
use App\Shared\DateRange\DateRangeInterface;
use DateTimeImmutable;
use Webmozart\Assert\Assert;

class AppointmentsFilter
{
    private const CLINIC_ID = 'clinicId';
    private const DOCTOR_ID = 'doctorId';
    private const CLIENT_ID = 'clientId';
    private const START = 'start';
    private const STOP = 'stop';

    /**
     * @var Identifier
     */
    private $clinicId;

    /**
     * @var Identifier|null
     */
    private $doctorId;

    /**
     * @var Identifier|null
     */
    private $clientId;

    /** @var DateRangeInterface */
    private $range;

    /**
     * AppointmentsFilter constructor.
     *
     * @param Identifier $clinicId
     * @param Identifier|null $doctorId
     * @param Identifier|null $clientId
     * @param DateTimeImmutable $start
     * @param DateTimeImmutable $stop
     */
    private function __construct(Identifier $clinicId, ?Identifier $doctorId, ?Identifier $clientId, DateTimeImmutable $start, DateTimeImmutable $stop)
    {
        $this->clinicId = $clinicId;

        if (null !== $doctorId) {
            $this->doctorId = $doctorId;
        }

        if (null !== $clientId) {
            $this->clientId = $clientId;
        }

        $this->range = DateRange::create($start, $stop);
    }

    public static function fromArray(array $parameters): AppointmentsFilter
    {
        /** @var Identifier $clinicId */
        $clinicId = $parameters[self::CLINIC_ID] ?? null;
        Assert::notEmpty($clinicId);

        /** @var Identifier|null $clientId */
        $clientId = $parameters[self::CLIENT_ID] ?? null;

        /** @var Identifier|null $doctorId */
        $doctorId = $parameters[self::DOCTOR_ID] ?? null;

        /** @var DateTimeImmutable $start */
        $start = $parameters[self::START] ?? null;
        Assert::notEmpty($start);

        /** @var DateTimeImmutable $stop */
        $stop = $parameters[self::STOP] ?? null;
        Assert::notEmpty($stop);

        return new self($clinicId, $doctorId, $clientId, $start, $stop);
    }

    /**
     * @return Identifier
     */
    public function getClinicId(): Identifier
    {
        return $this->clinicId;
    }

    /**
     * @return Identifier|null
     */
    public function getDoctorId(): ?Identifier
    {
        return $this->doctorId;
    }

    /**
     * @return Identifier|null
     */
    public function getClientId(): ?Identifier
    {
        return $this->clientId;
    }

    /**
     * @return DateRangeInterface
     */
    public function getRange(): DateRangeInterface
    {
        return $this->range;
    }
}