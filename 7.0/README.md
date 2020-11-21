## PHP7.0更新

### 类型的声明

可以使用字符串(string), 整数 (int), 浮点数 (float), 以及布尔值 (bool)，来声明函数的参数类型与函数返回值。

```php
<?php
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
// setAge('29'); // 默认不定义`strict_types =1 ` 会返回 int(29) ；如果定义则会抛出错误

// 如果不能进行类型转换则会抛出错误
// setAge('abs'); // 抛出错误
// setIsValid('abs'); // 默认不定义`strict_types =1 ` 会返回 bool(true) ；如果定义则会抛出错误
// setIsValid([]); // 抛出错误
```
> 标量类型声明 有两种模式: 强制 (默认) 和 严格模式。
declare(strict_types=1),必须放在文件的第一行执行代码，当前文件有效！
