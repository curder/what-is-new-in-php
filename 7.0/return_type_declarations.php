<?php

class User {}

// 可以使用字符串(string), 整数 (int), 浮点数 (float), 以及布尔值 (bool)，来声明函数返回值。
function getUser(): User
{
    // return []; // 如果定义了返回值类型，则不允许返回其他数据类型
    return new User;
}

var_dump(getUser());
