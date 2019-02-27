<?php

declare(strict_types=1);


namespace App\Entity;

use App\CustomType\Identifier;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\MappedSuperclass
 */
abstract class User implements UserInterface
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
     * @var UserName
     *
     * @ORM\Embedded(class="App\Entity\UserName")
     */
    private $name;

    /**
     * @var Clinic
     *
     * @ORM\ManyToOne(targetEntity="Clinic")
     */
    private $clinic;

    #endregion Private properties

    /**
     * User constructor.
     *
     * @param UserName $name
     * @param Clinic $clinic
     */
    private function __construct(UserName $name, Clinic $clinic)
    {
        $this->id = new Identifier();
        $this->name = $name;
        $this->clinic = $clinic;
    }

    #region Factory methods

    public static function create(string $firstName, string $lastName, Clinic $clinic): self
    {
        $userName = UserName::create($firstName, $lastName);

        return new static($userName, $clinic);
    }

    #endregion Factory methods

    #region Public API

    /**
     * @return Identifier
     */
    public function getId(): ?Identifier
    {
        return $this->id;
    }

    /**
     * @return UserName
     */
    public function getName(): UserName
    {
        return $this->name;
    }

    /**
     * @return Clinic
     */
    public function getClinic(): Clinic
    {
        return $this->clinic;
    }

    #endregion Public API
}