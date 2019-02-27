<?php

declare(strict_types=1);


namespace App\Entity;


use Doctrine\ORM\Mapping as ORM;
use Webmozart\Assert\Assert;

/**
 * @ORM\Embeddable
 */
class DateRange implements DateRangeInterface
{
    #region Private properties

    /**
     * @var \DateTimeImmutable
     *
     * @ORM\Column(type="datetime_immutable")
     */
    private $start;

    /**
     * @var \DateTimeImmutable
     *
     * @ORM\Column(type="datetime_immutable")
     */
    private $end;

    #endregion Private properties

    /**
     * DateRange constructor.
     *
     * @param \DateTimeImmutable $start
     * @param \DateTimeImmutable $end
     */
    private function __construct(\DateTimeImmutable $start, \DateTimeImmutable $end)
    {
        $this->start = $start;
        $this->end = $end;
    }

    #region Factory methods

    public static function create(\DateTimeImmutable $start, \DateTimeImmutable $end): self
    {
        Assert::lessThan($start, $end, 'Start date should be earlier than end date');

        return new self($start, $end);
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