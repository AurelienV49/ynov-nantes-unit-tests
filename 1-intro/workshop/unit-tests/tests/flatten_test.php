<?php

use PHPUnit\Framework\TestCase;

require_once('./src/flatten.php');

class FlattenTest extends TestCase
{
    public function test_something()
    {
        $this->assertEqual(1337, 1337);
    }

    public function test_insert()
    {
        $info = array(1, 2, [1, 2]);
        $tempTracker = flatten($info);
        $this->assertEquals($tempTracker, array(1, 2, [1, 2]));
    }
}
