<?php

declare(strict_types=1);


namespace App\Shared\DateRange;


interface DateRangeInterface
{
    public function getStart(): \DateTimeImmutable;
    public function getEnd(): \DateTimeImmutable;
}