<?php

declare(strict_types=1);


namespace App\Entity;

use App\CustomType\Identifier;
use Doctrine\ORM\Mapping as ORM;
use Webmozart\Assert\Assert;

/**
 * @ORM\Entity(repositoryClass="App\Repository\AppointmentRepository")
 */
class Appointment implements EntityInterface
{
    #region Private properties

    /**
     * @var Identifier
     *
     * @ORM\Id()
     * @ORM\Column(type="identifier", unique=true)
     * @ORM\GeneratedValue(strategy="CUSTOM")
     * @ORM\CustomIdGenerator(class="App\DBAL\Generator\IdentifierGenerator")
     */
    private $id;

    /**
     * @var DateRange
     *
     * @ORM\Embedded(class="App\Entity\DateRange")
     */
    private $scheduledAt;

    /**
     * @var Client
     *
     * @ORM\ManyToOne(targetEntity="Client")
     */
    private $client;

    /**
     * @var Doctor
     *
     * @ORM\ManyToOne(targetEntity="Doctor")
     */
    private $doctor;

    #endregion Private properties

    /**
     * Appointment constructor.
     *
     * @param DateRange $scheduledAt
     * @param Client $client
     * @param Doctor $doctor
     */
    private function __construct(DateRange $scheduledAt, Client $client, Doctor $doctor)
    {
        $this->id = new Identifier();
        $this->scheduledAt = $scheduledAt;
        $this->client = $client;
        $this->doctor = $doctor;
    }

    #region Factory methods

    public static function create(DateRange $scheduledAt, Client $client, Doctor $doctor): self
    {
        Assert::true($client->getClinic()->equals($doctor->getClinic()), 'Client and doctor are from different clinics');

        return new self($scheduledAt, $client, $doctor);
    }

    #endregion Factory methods

    #region Public API

    /**
     * @return Identifier
     */
    public function getId(): Identifier
    {
        return $this->id;
    }

    /**
     * @return DateRange
     */
    public function getScheduledAt(): DateRange
    {
        return $this->scheduledAt;
    }

    /**
     * @return Client
     */
    public function getClient(): Client
    {
        return $this->client;
    }

    /**
     * @return Doctor
     */
    public function getDoctor(): Doctor
    {
        return $this->doctor;
    }

    #endregion Public API
}