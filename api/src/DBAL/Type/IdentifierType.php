<?php

declare(strict_types=1);

namespace App\DBAL\Type;

use App\CustomType\Identifier;
use Doctrine\DBAL\Types\Type;
use Doctrine\DBAL\Platforms\AbstractPlatform;

class IdentifierType extends Type
{
    /** @var string */
    private const TYPE_NAME = 'identifier';

    /**
     * {@inheritdoc}
     */
    public function convertToDatabaseValue($value, AbstractPlatform $platform): ?string
    {
        if ($this->databaseValueAlreadyOfAppropriateType($value)) {
            return $value;
        }

        /** @var Identifier $value */
        return $value->toString();
    }

    /**
     * {@inheritdoc}
     */
    public function convertToPHPValue($value, AbstractPlatform $platform): ?Identifier
    {
        if (
            // When creating a new object
            null === $value
            // When $value is just generated it is already instance of an appropriate type
            || $value instanceof Identifier
        ) {
            return $value;
        }

        // otherwise it is a string retrieved from DB
        return Identifier::fromString($value);
    }

    /**
     * {@inheritdoc}
     */
    public function getSQLDeclaration(array $fieldDeclaration, AbstractPlatform $platform): string
    {
        return $platform->getClobTypeDeclarationSQL($fieldDeclaration);
    }

    /**
     * {@inheritdoc}
     */
    public function getName(): string
    {
        return self::TYPE_NAME;
    }

    /**
     * @param mixed $value
     * @return bool
     */
    private function databaseValueAlreadyOfAppropriateType($value): bool
    {
        return ! $value instanceof Identifier;
    }
}
