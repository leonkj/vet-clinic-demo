<?php

declare(strict_types=1);


namespace App\Entity;


use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\DoctorRepository")
 */
class Doctor extends User implements EntityInterface
{

}