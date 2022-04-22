<?php

use PHPUnit\Framework\TestCase;

require_once('./src/flatten.php');

class FlattenTest extends TestCase
{
    public function test_something()
    {
        $this->assertEquals(1337, 1337);
    }

    public function test_insert()
    {
        $stack = [];
        array_push($stack, [1, 2, [1, 2]]);

        $tempTracker = flatten($stack);

        $this->assertEquals($tempTracker, [1, 2, [1, 2]], "-------------->>>> Les tableaux sont différents !\n");
    }
}
