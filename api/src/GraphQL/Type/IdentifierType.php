<?php

declare(strict_types=1);


namespace App\GraphQL\Type;


use App\CustomType\Identifier;
use GraphQL\Error\Error;
use GraphQL\Language\AST\Node;
use GraphQL\Language\AST\StringValueNode;
use GraphQL\Type\Definition\ScalarType;
use Overblog\GraphQLBundle\Definition\Resolver\AliasedInterface;

class IdentifierType extends ScalarType implements AliasedInterface
{
    /**
     * @param Identifier $value
     * @return string
     */
    public function serialize($value): string
    {
        return $value->toString();
    }

    /**
     * @param string $value
     *
     * @return Identifier
     */
    public function parseValue($value): Identifier
    {
        return Identifier::fromString($value);
    }

    /**
     * @param Node $valueNode
     *
     * @param array|null $variables
     * @return Identifier
     * @throws Error
     */
    public function parseLiteral($valueNode, array $variables = null): Identifier
    {
        if ($valueNode instanceof StringValueNode) {
            return Identifier::fromString($valueNode->value);
        }

        throw new Error('Invalid value node for Identifier type');
    }

    public static function getAliases(): array
    {
        return ['Identifier'];
    }
}