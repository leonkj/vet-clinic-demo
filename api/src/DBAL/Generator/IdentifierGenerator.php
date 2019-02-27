<?php

declare(strict_types=1);

namespace App\DBAL\Generator;

use App\CustomType\Identifier;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\Id\AbstractIdGenerator;

class IdentifierGenerator extends AbstractIdGenerator
{
    /**
     * {@inheritdoc}
     */
    public function generate(EntityManager $em, $entity): Identifier
    {
        return new Identifier();
    }
}