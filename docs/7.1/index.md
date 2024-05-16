---
sidebarDepth: 3
sidebar: auto
---


# PHP 7.1

::: danger 重要提示
安全修复结束时间为：2019 年 12 月 1 日。如果正在使用当前版本，强烈建议升级到[当前版本](https://www.php.net/supported-versions)。
:::

## 可为空（Nullable）类型

参数以及返回值的类型现在可以通过在类型前加上一个问号使之允许为空。

当启用这个特性时，传入的参数或者函数返回的结果要么是给定的类型，要么是 null 。

```php
<?php

function testReturn(): ?string
{
    return 'elePHPant';
}

var_dump(testReturn()); // string(10) "elePHPant"

function testReturn(): ?string
{
    return null;
}

var_dump(testReturn()); // NULL

function test(?string $name)
{
    var_dump($name);
}

test('elePHPant'); // string(10) "elePHPant" 
test(null); // NULL
test(); // Uncaught Error
```

## 函数忽略类型


一个新的返回值类型void被引入。 

返回值声明为 void 类型的方法要么干脆省去 return 语句，要么使用一个空的 return 语句。 

对于 void 函数来说，null 不是一个合法的返回值。


```php
<?php
function swap(&$left, &$right) : void
{
    if ($left === $right) {
        return;
    }

    $tmp = $left;
    $left = $right;
    $right = $tmp;
}

$a = 1;
$b = 2;
var_dump(swap($a, $b), $a, $b); // null  int(2)  int(1)
```

试图去获取一个 `void` 方法的返回值会得到 null ，并且不会产生任何警告。


## 数组解构

当我们需要解构数组的时候，通常会有如下操作：

```php
$person = ['curder', 29];
list($name, $age) = $person;
var_dump($name, $age); // string(6) "curder" int(29)
```

上面的例子可以写为：

```php
$person = ['curder', 29];
[$name, $age] = $person;
var_dump($name, $age); // string(6) "curder" int(29)
```



针对`key` => `value`键值队的解构如下：

```php
$person = ['name' => 'curder', 'age' => 29, 'hobby' => "study"];
['name' => $name, 'hobby' => $hobby, 'age' => $age] = $person;
var_dump($name, $age, $hobby); // string(6) "curder" int(29) string(5) "study"
```

多维数组的解构

```php
$persons = [
  ["name" => "curder", "age" => 29, "hobby" => "study"],
  ["name" => "lily", "age" => 25, "hobby" => "shopping"]
];
['name' => $name, 'hobby' => $hobby, 'age' => $age] = $persons[1];
var_dump($name, $age, $hobby); // string(4) "lily" int(25) string(8) "shopping"
```



在`foreach`循环中同时进行解构赋值

```php
$persons = [
  ["name" => "curder", "age" => 29, "hobby" => "study"],
  ["name" => "lily", "age" => 25, "hobby" => "shopping"]
];

foreach($persons as ['name' => $name, 'hobby' => $hobby, 'age' => $age]) {
  var_dump($name, $age, $hobby);
}

// [] style
foreach ($data as [$name, $age, $hobby]) {
    // logic here with $name and $age and $hobby
}
```


## 类常量可见性

PHP 7.1 起支持设置类常量的可见性。


```php
<?php
class ConstDemo
{
    const PUBLIC_CONST_A = 1; // 默认为 public
    public const PUBLIC_CONST_B = 2;
    protected const PROTECTED_CONST = 3;
    private const PRIVATE_CONST = 4;
}
```



## Iterable 伪类



`iterable` 被称为伪类，它可以被用在参数或者返回值类型中。

```php
<?php

function dump(iterable $items)
{
    foreach($items as $item) {
        var_dump($item);
    }
}

class Collection implements IteratorAggregate
{
    protected $items;

    public function __construct($items)
    {
        $this->items = $items;
    }

    public function getIterator()
    {
        return new ArrayIterator($this->items);
    }
}

var_dump(["one", 'two', 'three']); // string(3) "one" string(3) "two" string(5) "three"
var_dump(new Collection([1, 2, 3])); // int(1) int(2) int(3)
```


## [多错误处理](https://www.php.net/manual/en/migration71.new-features.php#migration71.new-features.mulit-catch-exception-handling)

之前处理错误时，会使用 `try` `catch`关键字对各种错误进行处理，但是有时候我们的逻辑需要对一些错误做统一的处理，在php7.1中可以使用`|`来分割多个错误进行统一处理。

```php
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
} catch (ChargeRejected | NotEnoughFounds $e) { // 当try里的逻辑抛出 ChargeRejected 或者 NotEnoughFounds 错误时都会执行下面的逻辑
    flash("Failed");
}

function flash($message){ var_dump($message); }
```



## list() 支持键名

现在 `list()` 和它的新的[]语法支持在它内部去指定键名。

这意味着它可以将任意类型的数组 都赋值给一些变量（与短数组语法类似）


```php
<?php
$data = [
    ["id" => 1, "name" => 'Tom'],
    ["id" => 2, "name" => 'Fred'],
];

// list() style
list("id" => $id1, "name" => $name1) = $data[0];

// [] style
["id" => $id1, "name" => $name1] = $data[0];

// list() style
foreach ($data as list("id" => $id, "name" => $name)) {
    // logic here with $id and $name
}

// [] style
foreach ($data as ["id" => $id, "name" => $name]) {
    // logic here with $id and $name
}
```


## 支持为负的字符串偏移量

现在所有支持偏移量的字符串操作函数都支持接受负数作为偏移量，包括通过[]或{}操作字符串下标。

在这种情况下，一个负数的偏移量会被理解为一个从字符串结尾开始的偏移量。

```php
<?php
var_dump("abcdef"[-2]); // string (1) "e"
var_dump(strpos("aabbcc", "b", -3)); // int(3)

$string = 'bar';
echo "The last character of '$string' is '$string[-1]'.\n"; // The last character of 'bar' is 'r'.
```

## `Closure::fromCallable()` 将callables转为闭包

Closure 新增了一个静态方法，用于将 callable 快速地转为一个 Closure 对象。

```php
<?php
class Test
{
    public function exposeFunction()
    {
        return Closure::fromCallable([$this, 'privateFunction']);
    }

    private function privateFunction($param)
    {
        var_dump($param);
    }
}

$privFunc = (new Test)->exposeFunction();
$privFunc('some value'); // string(10) "some value"
```
