<?php

declare(strict_types=1);


namespace App\Shared\DateRange;


use Webmozart\Assert\Assert;

class DateRange implements DateRangeInterface
{
    #region Private properties

    /**
     * @var \DateTimeImmutable
     */
    protected $start;

    /**
     * @var \DateTimeImmutable
     */
    protected $end;

    #endregion Private properties

    /**
     * DateRange constructor.
     *
     * @param \DateTimeImmutable $start
     * @param \DateTimeImmutable $end
     */
    private function __construct(\DateTimeImmutable $start, \DateTimeImmutable $end)
    {
        Assert::lessThan($start, $end, 'Start date should be earlier than end date');

        $this->start = $start;
        $this->end = $end;
    }

    #region Factory methods

    public static function create(\DateTimeImmutable $start, \DateTimeImmutable $end): DateRangeInterface
    {
        return new static($start, $end);
    }

    #endregion Factory methods

    #region Public API

    /**
     * @return \DateTimeImmutable
     */
    public function getStart(): \DateTimeImmutable
    {
        return $this->start;
    }

    /**
     * @return \DateTimeImmutable
     */
    public function getEnd(): \DateTimeImmutable
    {
        return $this->end;
    }

    #endregion Public API
}