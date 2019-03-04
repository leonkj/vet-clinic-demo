<?php

declare(strict_types=1);


namespace App\Entity;

use App\CustomType\Identifier;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
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
     * @var Clinic
     *
     * @ORM\ManyToOne(targetEntity="Clinic")
     */
    private $clinic;

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

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\Service")
     */
    private $services;

    #endregion Private properties

    /**
     * Appointment constructor.
     *
     * @param DateRange $scheduledAt
     * @param Clinic $clinic
     * @param Client $client
     * @param Doctor $doctor
     */
    private function __construct(DateRange $scheduledAt, Clinic $clinic, Client $client, Doctor $doctor)
    {
        $this->id = new Identifier();
        $this->scheduledAt = $scheduledAt;
        $this->clinic = $clinic;
        $this->client = $client;
        $this->doctor = $doctor;
        $this->services = new ArrayCollection();
    }

    #region Factory methods

    public static function create(DateRange $scheduledAt, Clinic $clinic, Client $client, Doctor $doctor): self
    {
        Assert::true($clinic->equals($doctor->getClinic()), 'Doctor is from different clinic');
        Assert::true($clinic->equals($client->getClinic()), 'Client is from different clinic');

        return new self($scheduledAt, $clinic, $client, $doctor);
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
     * @return Clinic
     */
    public function getClinic(): Clinic
    {
        return $this->clinic;
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

    /**
     * @return Collection|Service[]
     */
    public function getServices(): Collection
    {
        return $this->services;
    }

    public function addService(Service $service): self
    {
        if (!$this->services->contains($service)) {
            $this->services[] = $service;
        }

        return $this;
    }

    public function removeService(Service $service): self
    {
        if ($this->services->contains($service)) {
            $this->services->removeElement($service);
        }

        return $this;
    }

    #endregion Public API
}