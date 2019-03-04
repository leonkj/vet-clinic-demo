<?php

declare(strict_types=1);


namespace App\Entity;


use App\Shared\DateRange\DateRange as BaseDateRange;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Embeddable
 */
class DateRange extends BaseDateRange
{
    #region Private properties

    /**
     * @var \DateTimeImmutable
     *
     * @ORM\Column(type="datetime_immutable")
     */
    protected $start;

    /**
     * @var \DateTimeImmutable
     *
     * @ORM\Column(type="datetime_immutable")
     */
    protected $end;

    #endregion Private properties
}