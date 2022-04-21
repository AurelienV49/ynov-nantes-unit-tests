<?php

use PHPUnit\Framework\TestCase;

require_once('./src/TempTracker.php');

class TempTrackerTest extends TestCase
{
    public function test_something()
    {

        $this->assertEquals(42, 42);
    }

    public function testFailure3()
    {
        $this->assertEquals("foo\nbah\nbaz\n", "foo\nbah\nbaz\n");
    }

    public function test_insert()
    {
        $tempTracker = new TempTracker();
        $tempTracker->insert(45);
        $this->assertEquals($tempTracker->get_temps(), [45]);
    }

    public function test_insert_outofbound()
    {
        $tempTracker = new TempTracker();
        $this->expectException(ValueError::class);
        $tempTracker->insert(-10);
    }

    public function test_insert_wrong_typing_1()
    {
        $tempTracker = new TempTracker();
        $this->expectException(ValueError::class);
        $this->expectException($tempTracker->insert("-10"));
    }

    public function test_insert_wrong_typing_2()
    {
        $tempTracker = new TempTracker();
        $this->expectException(ValueError::class);
        $this->expectException($tempTracker->insert("string"));
    }
}
