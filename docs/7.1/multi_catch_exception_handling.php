<?php

// 定义两个自定义的错误类
class ChargeRejected extends Exception {}
class NotEnoughFounds extends Exception {}

class User
{
    public function subscribe()
    {
        var_dump('subscrbing');
        // throw new ChargeRejected;
        throw new NotEnoughFounds;
    }
}

try {
    (new User())->subscribe();
} catch (ChargeRejected | NotEnoughFounds $e) {
    flash("Failed");
}

function flash($message){ var_dump($message); }
