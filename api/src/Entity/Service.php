<?php

namespace App\Entity;

use App\CustomType\Identifier;
use Doctrine\ORM\Mapping as ORM;
use Webmozart\Assert\Assert;

/**
 * @ORM\Entity(repositoryClass="App\Repository\ServiceRepository")
 */
class Service implements EntityInterface
{
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
     * @ORM\Column(type="string", length=255)
     */
    private $name;

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

    public function getId(): Identifier
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }
}
