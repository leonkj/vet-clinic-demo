<?php

declare(strict_types=1);


namespace App\Entity;


interface DateRangeInterface
{
    public function getStart(): \DateTimeImmutable;
    public function getEnd(): \DateTimeImmutable;
}