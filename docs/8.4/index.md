# PHP 8.4

PHP 8.4 将于 2024 年 11 月 21 日发布。主要包括如下新特性：

- Property Hooks
- new 不带括号
- 新 DOM HTML5 支持

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