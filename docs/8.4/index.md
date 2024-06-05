# PHP 8.4

PHP 8.4 将于 2024 年 11 月 21 日发布。主要包括如下新特性：

- 新的数组查找函数
- Property Hooks
- new 不带括号
- 新 DOM HTML5 支持

## 新的数组查找函数

[PHP 8.4](https://www.php.net/releases/8.4/zh.php)将引入四个新的数组函数，它们是用于检查数组中是否存在符合特定条件的元素的辅助函数。新函数包括：

- `array_find()`
- `array_find_key()`
- `array_any()`
- `array_all()`

### `array_find()`

`array_find()` 函数返回数组中第一个满足指定条件的元素的值。如果没有找到符合条件的元素，则返回 `null`。

```php
<?php

$array = [
    'a' => 'dog',
    'b' => 'cat',
    'c' => 'cow',
    'd' => 'duck',
    'e' => 'goose',
    'f' => 'elephant'
];

array_find($array, fn(string $value) => strlen($value) > 4); // "goose"

array_find($array, fn(string $value) => str_starts_with($value, 'f')); // null

// 找到数组键为该动物第一个字符的第一个动物
array_find($array, fn(string $value, $key) => $value[0] === $key); // "cow"
```

相当于 [`Collection`](https://github.com/laravel/framework/blob/master/src/Illuminate/Collections/Collection.php) 的 [`first()`](https://github.com/laravel/framework/blob/master/src/Illuminate/Collections/Collection.php#L383) 方法。

### `array_find_key()`

`array_find_key()` 函数返回数组中第一个满足指定条件的元素的键。如果没有找到符合条件的元素，则返回 `null`。

```php
<?php
$array = [
    'a' => 'dog',
    'b' => 'cat',
    'c' => 'cow',
    'd' => 'duck',
    'e' => 'goose',
    'f' => 'elephant'
];

array_find_key($array, fn(string $value) => strlen($value) > 4); // string(1) "e"

array_find_key($array, fn(string $value) => str_starts_with($value, 'f')); // null

array_find_key($array, fn(string $value, $key) => $value[0] === $key); // string(1) "c"
```

相当于 [`Collection`](https://github.com/laravel/framework/blob/master/src/Illuminate/Collections/Collection.php) 的 [`search()`](https://github.com/laravel/framework/blob/master/src/Illuminate/Collections/Collection.php#L1101) 方法。


### `array_any()`

`array_any()` 函数检查数组中是否存在至少一个满足指定条件的元素。如果找到符合条件的元素，则返回 `true`，否则返回 `false`。

```php
$array = [
    'a' => 'dog',
    'b' => 'cat',
    'c' => 'cow',
    'd' => 'duck',
    'e' => 'goose',
    'f' => 'elephant'
];

// 检查是否有任何动物的名字超过5个字母
array_any($array, fn (string $value) => strlen($value) > 5); // bool(true)

// 检查是否有任何动物的名字少于3个字母
array_any($array, fn (string $value) => strlen($value) < 3); // bool(false)
```

### `array_all()`

`array_all()` 函数检查数组中的所有元素是否都满足指定条件。如果所有元素都满足条件，则返回 `true`，否则返回 `false`。


```php
$array = [
    'a' => 'dog',
    'b' => 'cat',
    'c' => 'cow',
    'd' => 'duck',
    'e' => 'goose',
    'f' => 'elephant'
];

// 检查是否所有数组值都少于12个字母
array_all($array, fn (string $value) => strlen($value) < 12); // bool(true)

// 检查是否所有数组值都超过5个字母
array_all($array, fn (string $value) => strlen($value) > 5); // bool(false)
```




## Property Hooks

定义属性挂钩 Property Hooks 的能力，消除了对大量重复代码。

### 在类中定义

在类中定义属性的 `getter` 和 `setter` 让代码更简洁清晰。 

```php
<?php
class User
{
    public function __construct(public string $first, public string $last) {}

    public string $fullName {
        get {
            return "$this->first $this->last";
        }
        set (string $value) {
            [$this->first, $this->last] = explode(' ', $value, 2);
        }
    }

}

$u = new User('Larry', 'Garfield');

var_dump($u->fullName); // Larry Garfield

$u->fullName = 'Ilija Tovilo';

var_dump($u->first, $u->last); // "Ilija" "Tovilo"
```

### 在接口中定义

```php
interface Named
{
    public string $fullName { get; set; }
}
```

详情可以参考这个 [rfc](https://wiki.php.net/rfc/property-hooks)。


## `new` 不带括号

实例化对象的同时调用常量、属性、静态方法、方法和魔术方法可以不用括号包裹。

当前这个 [rfc](https://wiki.php.net/rfc/new_without_parentheses) 正在投票状态。

```php
<?php
class MyClass
{
    const CONSTANT = 'constant';
    public static $staticProperty = 'staticProperty';
    public static function staticMethod(): string { return 'staticMethod'; }
    public $property = 'property';
    public function method(): string { return 'method'; }
    public function __invoke(): string { return '__invoke'; }
}

var_dump(
    new MyClass()::CONSTANT,        // string(8)  "constant"
    new MyClass()::$staticProperty, // string(14) "staticProperty"
    new MyClass()::staticMethod(),  // string(12) "staticMethod"
    new MyClass()->property,        // string(8)  "property"
    new MyClass()->method(),        // string(6)  "method"
    new MyClass()(),                // string(8)  "__invoke"
);
```


## 新 DOM HTML5 支持

PHP 8.4 添加了一个 `\DOM\HTMLDocument` 能够正确解析 HTML5 代码的类，旧 `\DOMDocument` 类仍然可用于向后兼容。

```php
$doc = new \DOM\HTMLDocument();

$doc->loadHTML($contents);
```