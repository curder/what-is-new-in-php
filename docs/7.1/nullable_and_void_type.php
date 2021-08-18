<?php

class User
{
    public function subscribe(?callable $callback = null): void
    {
        var_dump("subscribing here");

        if ($callback) $callback();
    }
}

$age = (new User(29))->subscribe();

