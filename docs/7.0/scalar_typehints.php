<?php
// 参数类型的声明

declare(strict_types = 1);

function setAge(int $age)
{
    var_dump($age);
}

function setIsValid(bool $valid)
{
    var_dump($valid);
}

// 默认会进行自动类型转换
setAge(29); // int(29)
// setAge('29'); // 默认不定义`strict_types=1` 会返回 int(29) ；如果定义则会抛出错误

// 如果不能进行类型转换则会抛出错误
// setAge('abs'); // 抛出错误
// setIsValid('abs'); // 默认不定义`strict_types=1` 会返回 bool(true) ；如果定义则会抛出错误
// setIsValid([]); // 抛出错误
