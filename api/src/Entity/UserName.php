<?php

declare(strict_types=1);


namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Webmozart\Assert\Assert;

/**
 * @ORM\Embeddable
 */
final class UserName
{
    #region Private properties

    /**
     * @var string
     *
     * @ORM\Column(type="string")
     */
    private $firstName;

    /**
     * @var string
     *
     * @ORM\Column(type="string")
     */
    private $lastName;

    #endregion Private properties

    /**
     * UserName constructor.
     *
     * @param string $firstName
     * @param string $lastName
     */
    private function __construct(string $firstName, string $lastName)
    {
        $this->firstName = $firstName;
        $this->lastName = $lastName;
    }

    #region Factory methods

    public static function create(string $firstName, string $lastName): self
    {
        Assert::stringNotEmpty($firstName);
        Assert::stringNotEmpty($lastName);

        return new self($firstName, $lastName);
    }

    #endregion Factory methods

    #region Public API

    /**
     * @return string
     */
    public function getFirstName(): string
    {
        return $this->firstName;
    }

    /**
     * @return string
     */
    public function getLastName(): string
    {
        return $this->lastName;
    }

    public function toString(): string
    {
        return $this->getFirstName() . ' ' . $this->getLastName();
    }

    #endregion Public API
}