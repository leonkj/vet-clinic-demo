<?php

declare(strict_types=1);

namespace Tests\Schedule;

use App\Entity\DateRange;
use PHPUnit\Framework\TestCase;

class DateRangeTest extends TestCase
{
    /**
     * @return \Generator
     */
    public function provideCreate(): \Generator
    {
        yield 'Check create for requested range' => [
            new \DateTimeImmutable('today'),
            new \DateTimeImmutable('tomorrow')
        ];

        yield 'Check create for another requested range' => [
            new \DateTimeImmutable('+1 day'),
            new \DateTimeImmutable('+1 week')
        ];
    }

    /**
     * @test
     * @dataProvider provideCreate
     *
     * @param \DateTimeImmutable $start
     * @param \DateTimeImmutable $end
     */
    public function create(\DateTimeImmutable $start, \DateTimeImmutable $end): void
    {
        $dateRange = DateRange::create(
            $start,
            $end
        );

        self::assertEquals($start->format(DATE_ATOM), $dateRange->getStart()->format(DATE_ATOM));
        self::assertEquals($end->format(DATE_ATOM), $dateRange->getEnd()->format(DATE_ATOM));
    }

    /**
     * @test
     */
    public function createStartLaterThanEnd(): void
    {
        $this->expectException(\InvalidArgumentException::class);

        DateRange::create(
            new \DateTimeImmutable('tomorrow'),
            new \DateTimeImmutable('today')
        );
    }

    /**
     * @return \Generator
     */
    public function provideCreateOneDay(): \Generator
    {
        yield 'Check create for for one day range' => [
            new \DateTimeImmutable('today'),
            new \DateTimeImmutable('today'),
            new \DateTimeImmutable('tomorrow'),
        ];

        yield 'Check that start date is truncated to the start of the requested day' => [
            new \DateTimeImmutable('now'),
            new \DateTimeImmutable('today'),
            new \DateTimeImmutable('tomorrow'),
        ];
    }
}
