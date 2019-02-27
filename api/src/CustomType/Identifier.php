<?php

declare(strict_types=1);

namespace App\CustomType;

use Ramsey\Uuid\Uuid;
use Webmozart\Assert\Assert;

class Identifier
{
    /** @var string */
    private $value;

    /**
     * @param string $value
     * @return Identifier
     * @throws \InvalidArgumentException
     */
    public static function fromString(string $value): Identifier
    {
        Assert::stringNotEmpty($value);
        Assert::uuid($value);

        $userId = new self;
        $userId->value = $value;

        return $userId;
    }

    /**
     * UserId constructor.
     */
    public function __construct()
    {
        $this->value = $this->generateValue();
    }

    /**
     * @return string
     */
    public function __toString(): string
    {
        return $this->toString();
    }

    /**
     * @return string
     */
    public function toString(): string
    {
        return $this->value;
    }

    /**
     * @return string
     */
    private function generateValue(): string
    {
        return Uuid::uuid4()->toString();
    }
}