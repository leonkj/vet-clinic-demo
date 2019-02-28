<?php

declare(strict_types=1);


namespace App\Entity;

use App\CustomType\Identifier;
use Doctrine\ORM\Mapping as ORM;
use Webmozart\Assert\Assert;

/**
 * @ORM\Entity(repositoryClass="App\Repository\ClinicRepository")
 */
class Clinic implements EntityInterface
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
     * @var string
     *
     * @ORM\Column(type="string")
     */
    private $name;

    #endregion Private properties

    /**
     * Clinic constructor.
     *
     * @param string $name
     */
    private function __construct(string $name)
    {
        $this->id = new Identifier();
        $this->name = $name;
    }

    #region Factory methods

    public static function create(string $name): self
    {
        Assert::stringNotEmpty($name);

        return new self($name);
    }

    #endregion Factory methods

    #region Public API

    public function equals(Clinic $clinic): bool
    {
        return $this->getId() === $clinic->getId();
    }

    /**
     * @return Identifier
     */
    public function getId(): Identifier
    {
        return $this->id;
    }

    /**
     * @return string
     */
    public function getName(): string
    {
        return $this->name;
    }

    #endregion Public API
}