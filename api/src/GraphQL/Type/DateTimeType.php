<?php

declare(strict_types=1);


namespace App\GraphQL\Type;


use DateTimeInterface;
use GraphQL\Error\Error;
use GraphQL\Language\AST\Node;
use GraphQL\Language\AST\StringValueNode;
use GraphQL\Type\Definition\ScalarType;
use Overblog\GraphQLBundle\Definition\Resolver\AliasedInterface;

class DateTimeType extends ScalarType implements AliasedInterface
{
    private $dateFormat = DateTimeInterface::ATOM;

    /**
     * @param DateTimeInterface $value
     * @return string
     */
    public function serialize($value): string
    {
        return $value->format($this->dateFormat);
    }

    /**
     * @param string $value
     *
     * @return \DateTimeInterface
     */
    public function parseValue($value): \DateTimeInterface
    {
        return new \DateTimeImmutable($value);
    }

    /**
     * @param Node $valueNode
     *
     * @param array|null $variables
     * @return \DateTimeInterface
     * @throws Error
     */
    public function parseLiteral($valueNode, array $variables = null): \DateTimeInterface
    {
        if ($valueNode instanceof StringValueNode) {
            return new \DateTimeImmutable($valueNode->value);
        }

        throw new Error('Invalid value node for DateTime type');
    }

    public static function getAliases(): array
    {
        return ['DateTime'];
    }
}