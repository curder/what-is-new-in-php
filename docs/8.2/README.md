---
sidebarDepth: 3
sidebar: auto
---

# PHP 8.2

PHP 8.2 是 PHP 语言的重大更新。

它包含许多新功能，包括只读类、作为独立类型的 `null`、`false` 和 `true`、弃用的动态属性、性能改进等。

## 新的只读类

PHP 8.1
引入了 [readonly 类属性的特性](https://www.php.net/manual/zh/language.oop5.properties.php#language.oop5.properties.readonly-properties)。

PHP 8.2
已添加对将[整个类声明为 readonly ](https://www.php.net/manual/zh/language.oop5.basic.php#language.oop5.basic.class.readonly)。

如果需要将一个类声明为 `readonly`，它的所有属性将自动继承该 `readonly` 特性。

因此声明一个类 `readonly` 与将每个类属性声明为 `readonly` 相同，好处是当我们明确某个类的所有属性均为只读的话则可以将类定义为只读类。

这样做的好处是，每当我们添加新属性时，都不用在对应类的属性设置为只读。

例如，在 PHP 8.1 中，必须编写这段乏味的代码来将所有类属性声明为 `readonly`：

```php
<?php

class MyClass
{
    public readonly string $myValue;
    public readonly int $myOtherValue;
    public readonly string $myAnotherValue;
    public readonly int $myYetAnotherValue;
}
```

使用 PHP 8.2，可以这样写：

```php
readonly class MyClass
{
public string $myValue;
public int $myOtherValue;
public string $myAnotherValue;
public int $myYetAnotherValue;
}
```

还可以将抽象类或最终类声明为 `readonly`，并且 `readonly` 关键字的顺序无关紧要。

```php
<?php
// 定义抽象类
abstract readonly class Foo
{
    //
}

// 定义终极类
final readonly class Bar
{
    //
}
```

PHP 允许声明一个 `readonly` 但没有属性的类，这可以防止动态属性，同时仍然允许子类 `readonly` 显式声明它们的属性。

```php
<?php
// 1. 声明一个没有任何属性的只读类
readonly class Team { }

// 2. 继承自只读类的子类可以重新定义只读属性
readonly class Person extends Team
{
    public function __construct(public string $name) { }
}
```

`readonly` 类只能包含类型化属性，这与声明单个只读属性的规则相同。

尝试声明一个 `readonly` 没有指定类型的属性的类将导致致命错误：

```php
<?php

readonly class Type
{
    public function __construct(public string $name, public $age) // PHP Fatal error:  Readonly property Type::$age must have type in ... on line 5
    {
    }
}
```

此外，不能 `readonly` 为某些 PHP 功能声明：

- 枚举 `enum` （因为它不能包含任何属性）
- `Trait`
- 接口 `Interface`

在 PHP 8.2 中尝试声明这些功能中的任何一个 `readonly` 都将导致解析错误。

```php
<?php
readonly interface Filesystem {} // Parse error: syntax error, unexpected token "interface", expecting "abstract" or "final" or "readonly" or "class"
```

与所有 PHP 关键字一样，`readonly` 关键字不区分大小写。

```php
<?php

ReadOnly class  Person { } // readonly 关键字不区分大小写
```

对 `readonly` 类动态添加属性会导致致命错误：

```php
<?php

readonly class Person
{

}

$person = new Person;

$person->name = 'Curder'; // Fatal error: Uncaught Error: Cannot create dynamic property Person::$name
```

## 析取范式 (DNF) 类型

PHP 8.2 支持不相交范式 (DNF) 类型——现在可以组合[联合类型 (PHP 8.0)](https://php.watch/versions/8.0/union-types)
和[交集类型 (PHP 8.1)](https://php.watch/versions/8.1/intersection-types)，从而可以声明精确且富有表现力的参数、返回和属性类型。

DNF
类型允许我们结合[并集](https://www.php.net/manual/zh/language.types.type-system.php#language.types.type-system.composite.union)
和[交集](https://www.php.net/manual/zh/language.types.type-system.php#language.types.type-system.composite.intersection)
类型，遵循一个严格的规则：当结合并集和交集类型时，交集类型必须用括号分组。

比如如一下函数定义：

```php
<?php

function generateSlug((HasTitle&HasId)|null $post) 
{
    if ($post === null) {
        return '';
    }

    return strtolower($post->getTitle()) . $post->getId();
}
```

## 允许`null`、`false`和`true`作为独立类型

PHP 8.2 添加了三种新类型，它们分别是`null`、`false` 和 `true`。

常见的例子是 PHP 的内置函数，其中 `false` 用作发生错误时的返回类型。

例如在 `file_get_contents`：

```php
<?php

file_get_contents(/* … */): string|false
```

在 PHP 8.2 之前，已经可以将 `null` 跟其他类型作为联合使用；

但现在它也可以用作独立类型，例如：

```php
<?php

function alwaysReturnNull(): null { return null; }
```

现在同样适用于 `true` 或者 `false`。

## 新的随机扩展

PHP 8.2 内置了一个随机类 `Randomizer`，它增加了一种更适合面向对象的方式来处理随机数生成和其他随机化操作。

可以使用此特性来打乱字符串或者打乱一个数组，在指定的数值范围获取随机数。

```php
<?php

use Random\Randomizer;

$randomizer = new Randomizer(); // 参数接收一个engine, 分别是 Mt19937，PcgOneseq128XslRr64，Xoshiro256StarStar 和 Secure

echo $randomizer->shuffleBytes('hello world'); // eh wdolroll

var_dump($randomizer->shuffleArray(['a', 'b', 'c', 'd'])); // ["a", "b", "d", "c"]

echo $randomizer->getInt(1, 100); // 73
```

`Randomizer` 类接受一个随机发生器引擎，可以根据需要更改该引擎。 例如区分生产环境和测试环境生成随机数：

```php
<?php
$is_production = false;

$rng = $is_production
    ? new Random\Engine\Secure()
    : new Random\Engine\Mt19937(1234);

$randomizer = new Random\Randomizer($rng);

var_dump(get_class($randomizer->engine)); // Random\Engine\Mt19937

echo $randomizer->shuffleBytes('hello'), "\n"; // lhloe
```

> 当使用 `Mt19937` 引擎为种子设置值时，随机生成的值每次都是相同的。

## 在 const 表达式中获取枚举的属性

此建议允许使用 `->` 或 `?->` 来获取常量表达式中枚举的属性。

此更改的主要动机是允许在不允许枚举对象的地方获取名称和值属性，例如数组键：

```php
enum A: string 
{
    case B = 'B';
    
    const C = [self::B->value => self::B];
}
```

## Trait中的常量

PHP 包含一种重用代码的方法，称为 `Trait`，它非常适合跨类的代码重用。

```php
<?php

trait Foo 
{
    public const CONSTANT = 1;
 
    public function bar(): int 
    {
        return self::CONSTANT;
    }
}
```

我们无法通过 Trait 名称访问这个常量，无论是从 Trait 外部还是从 Trait 内部。

```php
trait Foo 
{
    public const CONSTANT = 1;
 
    public function bar(): int 
    {
        return Foo::CONSTANT;
    }
}

Foo::CONSTANT;
```

但是可以通过使用 Trait 的类来访问常量，前提是在 Trait 中定义的常量是公共的：

```php
<?php

class MyClass
{
    use Foo;
}

echo MyClass::CONSTANT;
```

## 隐去回溯中的敏感参数

PHP允许您在出现问题时查看堆栈跟踪以及与每个堆栈帧关联的所有参数。这对调试非常有帮助。

但对敏感数据来说可能是灾难性的，这些堆栈跟踪可能包含敏感信息，例如环境变量、密码或用户名。

假设您的登录函数中存在密码，密码现在包含在由异常创建的堆栈跟踪中。

PHP 8.2 允许使用 `#[SensitiveParameter]` 属性标记此类“敏感参数”，这样就不必担心在出现问题时它们会被列在堆栈跟踪中。

```php {5}
<?php

function login(
    string                       $name,
    #[SensitiveParameter] string $password
)
{
    throw new Exception('Whoops!');
}

login('curder', 'secret');

/*
PHP Fatal error:  Uncaught Exception: Whoops! in playground.php:8
Stack trace:
#0 playground.php(11): login('curder', Object(SensitiveParameterValue))
#1 {main}
  thrown in playground.php on line 8
*/
```

## DateTime 更改

在 PHP 8.2 中，这些方法返回值类型更改如下：

```php
<?php

DateTime::createFromImmutable(): static
DateTimeImmutable::createFromMutable(): static
```

之前的返回值为 `DateTime` 和 `DateTimeImmutable`：
```php
<?php

DateTime::createFromImmutable(): DateTime;
DateTimeImmutable::createFromMutable(): DateTimeImmutable;
```

## 弃用 utf8_encode()和utf8_decode()

PHP 8.2弃用了 `utf8_encode()` 和 `utf8_decode()` 函数。

如果调用它们，会看到这些弃用通知：

```php
Deprecated: Function utf8_encode() is deprecated
Deprecated: Function utf8_decode() is deprecated
```

建议改用 `mb_convert_encoding()`。




## 弃用动态属性（和新的#[AllowDynamicProperties] 属性）

动态属性在 PHP 8.2 中被弃用。

```php
<?php

class Post
{
    //
}

$post = new Post;

$post->title = 'Hello world'; // PHP Deprecated:  Creation of dynamic property Post::$title is deprecate
```

当实现魔法 `__get()` 或 `__set()` 方法时，获取和设置对象的动态属性仍然有效。

```php
class Post
{
    private array $properties = [];
    
    public function __set(string $name, mixed $value): void
    {
        $this->properties[$name] = $value;
    }
}

$post = new Post;

$post->title = 'Hello world'; 
```

也可以通过将 `[#AllowDynamicProperties]` 属性添加到类定义前来启用动态属性的功能。

```php {3}
<?php

#[AllowDynamicProperties] class Post
{
    //
}

$post = new Post;

$post->title = 'Hello world';
```

最后，只读类永远不能有动态属性。将 `[#AllowDynamicProperties]` 属性添加到只读类将导致错误。

```php
<?php

#[AllowDynamicProperties] // PHP Fatal error:  Cannot apply #[AllowDynamicProperties] to readonly class Post in ... on line 4
readonly class Post
{
    //
}
```

## 弃用字符串插值

PHP 有几种在字符串中嵌入变量的方法。PHP 8.2 弃用了两种这样做的方式，因为它们很少使用，并且经常导致混淆：

```php
<?php
const world = 'world';
$world = 'world';

var_dump("Hello ${world}!");
var_dump("Hello ${(world)}!");
```

下面的两种流行的字符串插值方式仍然有效：

```php
var_dump("Hello {$world}!");
var_dump("Hello $world!");
```

## 弃用部分支持的 Callable

PHP 8.2 弃用了一些可调用的语法，因为它们不一致。这些语法可以与 callable 类型、函数 `is_callable()` 和 `call_user_func()`
一起使用。

- 不可用

```php
"self::method"
"parent::method"
"static::method"
["self", "method"]
["parent", "method"]
["static", "method"]
["Foo", "Bar::method"]
[new Foo, "Bar::method"]
```

- 可用

```php
'strlen';
['MyClass', 'myMethod'];
'MyClass::myMethod'];
Closure::fromCallable();
[new MyClass(), 'myMethod'];
strlen(...);
[$this, 'myMethod'];
```

示例如下：

```php
<?php

class Foo
{
    public function __construct()
    {
//        var_dump(is_callable([$this, 'bar']));
//        var_dump(is_callable("self::bar"));
//        var_dump(is_callable('static::bar'));
//        var_dump(is_callable(["self", "bar"]));
//        var_dump(is_callable(["static", "bar"]));
    }

    public static function bar(): void
    {
        //
    }

    public function myMethod(): void
    {
        //
    }
}

class subFoo extends Foo
{
    public function __construct()
    {
        parent::__construct();
//        var_dump(is_callable('parent::bar'));
//        var_dump(is_callable(["parent", "bar"]));
//        var_dump(is_callable(['Foo', "Foo::bar"]));
//        var_dump(is_callable([new Foo(), "Foo::bar"]));
    }
}

// 可用
// var_dump(is_callable('strlen'));
// var_dump(is_callable(['Foo', 'bar']));
// var_dump(is_callable([Foo::class, 'bar']));
// var_dump(is_callable(Closure::fromCallable(...)));
// var_dump(is_callable([new Foo(), 'myMethod']));
// var_dump(is_callable(strlen(...)));
// new Foo(); // is_callable([$this, 'myMethod'])

// 不可用
// new Foo(); // is_callable("self::bar")
// new Foo(); // is_callable('static::bar')
// new Foo(); // is_callable(["self", "bar"])
// new Foo(); // is_callable(["static", "bar"])
// new subFoo(); // is_callable('parent::bar')
// new subFoo(); // is_callable(["parent", "bar"])
// new subFoo(); // is_callable(['Foo', "Foo::bar"])
// new subFoo(); // is_callable([new Foo(), "Foo::bar"])
```

## 扩展阅读

- [PHP 8.2 - php.net](https://www.php.net/releases/8.2/zh.php)
- [What’s New in PHP 8.2 — New Features, Deprecations, Changes, and More](https://kinsta.com/blog/php-8-2/)
- [PHP 8.2: What's New and Changed](https://php.watch/versions/8.2)
- [What's new in PHP 8.2](https://stitcher.io/blog/new-in-php-82)
- [PHP 8.2已发布所有新特性概览](https://www.myfreax.com/new-features-in-php-8-2-released/)
