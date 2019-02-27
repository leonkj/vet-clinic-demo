<?php

declare(strict_types=1);

namespace Tests\Entity;

use App\Entity\UserName;
use PHPUnit\Framework\TestCase;

class UserNameTest extends TestCase
{
    /**
     * @test
     */
    public function create(): void
    {
        $firstName = $this->generateRandomName();
        $lastName = $this->generateRandomName();

        $userName = UserName::create($firstName, $lastName);

        self::assertEquals($firstName, $userName->getFirstName());
        self::assertEquals($lastName, $userName->getLastName());
    }

    /**
     * @test
     */
    public function createEmptyFirstName(): void
    {
        $this->expectException(\InvalidArgumentException::class);

        UserName::create('', $this->generateRandomName());
    }

    /**
     * @test
     */
    public function createEmptyLastName(): void
    {
        $this->expectException(\InvalidArgumentException::class);

        UserName::create($this->generateRandomName(), '');
    }

    /**
     * @return string
     */
    private function generateRandomName(): string
    {
        return bin2hex(random_bytes(random_int(2, 100)));
    }
}
