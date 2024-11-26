# PHP 8.4

PHP 8.4 作为一个主要版本更新，带来了许多新特性、性能改进和 bug 修复，发布于 2024 年 11 月 21 日。

主要包括如下新特性：

- 属性钩子
- `#[\Deprecated]` 属性
- new 不带括号
- 新的 DOM API 和 HTML5 支持
- BCMath 对象 API
- 新的数组查找函数


## 属性钩子

PHP 8.4 引入了属性钩子，支持计算属性，可以被 IDE 和静态分析工具原生理解，无需编写可能过时的 docblock 注释。

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

## #[\Deprecated] 属性

新增的 `#[\Deprecated]` 属性使 PHP 现有的弃用机制可用于用户定义的函数、方法和类常量。

```php
class PhpVersion {
    #[\Deprecated(
        message: "使用 PhpVersion::getVersion() 替代",
        since: "8.4",
    )]
    public function getPhpVersion(): string {
        return $this->getVersion();
    }
}
```

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

## 新的 DOM API 和 HTML5 支持

提供了新的 DOM API，包括符合标准的 HTML5 文档解析支持：

```php
$dom = Dom\HTMLDocument::createFromString(<<<HTML
    <main>
        <article class="featured">PHP 8.4 新特性</article>
    </main>
HTML
);

$node = $dom->querySelector('main > article');
var_dump($node->classList->contains("featured")); // bool(true)
```

## BCMath 对象 API

新增 `BcMath\Number` 对象，支持面向对象使用方式和标准数学运算符：

```php
use BcMath\Number;

$num1 = new Number('0.12345');
$num2 = new Number('2');
$result = $num1 + $num2;

echo $result; // '2.12345'
```

## 新的数组查找函数

[PHP 8.4](https://www.php.net/releases/8.4/zh.php)将引入四个新的数组函数，它们是用于检查数组中是否存在符合特定条件的元素的辅助函数。

新函数包括：

- `array_find()` 函数返回数组中第一个满足指定条件的元素的值。如果没有找到符合条件的元素，则返回 `null`。相当于 [`Collection`](https://github.com/laravel/framework/blob/master/src/Illuminate/Collections/Collection.php) 的 [`first()`](https://github.com/laravel/framework/blob/master/src/Illuminate/Collections/Collection.php#L383) 方法。
- `array_find_key()` 函数返回数组中第一个满足指定条件的元素的键。如果没有找到符合条件的元素，则返回 `null`。相当于 [`Collection`](https://github.com/laravel/framework/blob/master/src/Illuminate/Collections/Collection.php) 的 [`search()`](https://github.com/laravel/framework/blob/master/src/Illuminate/Collections/Collection.php#L1101) 方法。
- `array_any()` 函数检查数组中是否存在至少一个满足指定条件的元素。如果找到符合条件的元素，则返回 `true`，否则返回 `false`。
- `array_all()` 函数检查数组中的所有元素是否都满足指定条件。如果所有元素都满足条件，则返回 `true`，否则返回 `false`。


:::code-group
```php [array_find()]
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

```php [array_find_key()]
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

```php [array_any()]
<?php
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

```php [array_all()]
<?php
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
:::

## 其他重要更新

1. 新的类和接口：
    - 新增惰性对象（Lazy Objects）
    - 基于 IR Framework 的新 JIT 实现

2. 新增函数：
    - request_parse_body()
    - bcceil(), bcdivmod(), bcfloor(), bcround()
    - mb_trim(), mb_ltrim(), mb_rtrim()
    - pcntl_getcpu(), pcntl_getcpuaffinity()

3. 弃用和向后兼容性破坏：
    - IMAP, OCI8, PDO_OCI 和 pspell 扩展已移至 PECL
    - 隐式可空参数类型已弃用
    - 使用 `_` 作为类名已弃用
    - E_STRICT 常量已弃用