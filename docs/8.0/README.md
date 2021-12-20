---
sidebarDepth: 3
sidebar: auto
---

# PHP 8.0

## [Nullsafe 运算符](https://www.php.net/releases/8.0/zh.php#nullsafe-operator)

现在可以用新的 nullsafe 运算符链式调用，而不需要条件检查 null。 如果链条中的一个元素失败了，整个链条会中止并认定为 Null。

```php
<?php
class User
{
    public function profile()
    {
        return null; // return new Profile;
    }
}
class Profile
{
    public function employment()
    {
        return 'web development';
    }
}


$user = new User;

// 之前的写法，先判断是否存在，再进行调用
if ($profile = $user->profile()) {
    var_dump($profile->employment());
}

// 8.0 允许通过 nullsafe 进行链式调用
var_dump($user->profile()?->employment() ?? 'Not Provider');
```

## [Match 表达式](https://www.php.net/releases/8.0/zh.php#match-expression)

新的 `match` 类似于 `switch`，并具有以下功能：

- Match 是一个表达式，它可以储存到变量中亦可以直接返回。
- Match 分支仅支持单行，它不需要一个 `break;` 语句。
- Match 使用严格比较。

```php
<?php
class Conversation
{
    //
}

$object = new Conversation;

//switch (get_class($object)) {
//    case 'Conversation':
//        $type = 'started_conversation';
//        break;
//
//    case 'Reply':
//        $type = 'replied_to_conversation';
//        break;
//
//    case 'Comment':
//        $type = 'commented_to_conversation';
//        break;
//}

// 使用match表达式简化写法
$type = match (get_class($object)) {
    'Conversation' => 'stated_conversation',
    'Reply' => 'replied_to_conversation',
    'Comment' => 'commented_to_conversation',
};

echo $type;
```
                                                       

## [构造器属性提升](https://www.php.net/releases/8.0/zh.php#constructor-property-promotion)

在 PHP 8.0 中我们可以通过编写更少的代码来定义并初始化类属性。

```php
<?php
class User
{
    public function __construct(protected string $name)
    {
    }
}

class Plan
{
    public function __construct(protected string $name = 'monthly')
    {
    }
}

class Signup
{
    /**
     * @param  User  $user
     * @param  Plan  $plan
     */
    public function __construct(
        protected User $user,
        protected Plan $plan
    )
    {
    }
}

$user   = new User('jone_doe');
$plan   = new Plan();
$signup = new Signup($user, $plan);
var_dump($signup);
```

> 在类的构造函数中可以初始化类属性类型，属性的可访问性，以及赋默认值。

## [允许对象的 `::class`](https://wiki.php.net/rfc/class_name_literal_on_object)

```php
<?php
class Conversation
{
    //
}

$object = new Conversation;
var_dump($object::class, get_class($object)); // "Conversation" "Conversation"
```

> 在语法上类似于类常量访问，更加直观地期望语法 `$object::class` 也能正常工作并提供与 `get_class($object)` 相同的结果。
                                         
## [命名参数](https://www.php.net/releases/8.0/zh.php#named-arguments)

这个新的 PHP 8 特性允许您根据参数名称传递函数参数，而不是它们的顺序。 

- 仅仅指定必填参数，跳过可选参数。
- 参数的顺序无关、自己就是文档（self-documented）
                                                 

```php
<?php


class Invoice
{
    public function __construct(
        private $description,
        private $total,
        private $date,
        private $paid,
    )
    {
        //
    }
}

$invoice = new Invoice(
    description: 'Customer installation',
    total: 10000,
    date: new DateTime,
    paid: true,
);


var_dump($invoice);


```

> 命名参数有一个问题是当我们修改了函数命名的时候，则在调用函数的时候的命名参数也需要一同作修改，否则会抛出：`Uncaught Error: Unknown named parameter` 的错误

## 新的内建函数

### 字符串 [str_starts_with()](https://wiki.php.net/rfc/add_str_starts_with_and_ends_with_functions)、 [str_ends_with()](https://wiki.php.net/rfc/str_contains)、[str_contains()](https://wiki.php.net/rfc/add_str_starts_with_and_ends_with_functions) 函数


```php
# str_starts_with

$id = 'inv_asdasdasdasdasdasd';
var_dump(str_starts_with($id, 'inv_')); // true

# str_ends_with
$id = 'asdasdasdasdasdasd_payment';
var_dump(str_ends_with($id, '_payment')); // true

# str_contains
$url = 'https://example.com?foo=bar';
var_dump(str_contains($url, '?')); // true
```

### [get_debug_type 函数](https://wiki.php.net/rfc/get_debug_type)

`get_debug_type` 函数返回给定变量的数据类型。 下面是跟 `gettype` 函数返回的数据类型对比：

```php
<?php
// 字符串
$string = 'I am a string';
var_dump(get_debug_type($string)); // string(6) "string" 、string(6) "string"

// 整型
$int = 1;
var_dump(get_debug_type($int), gettype($int)); // string(3) "int" 、string(7) "integer"

// 浮点型
$float = 0.1;
var_dump(get_debug_type($float), gettype($float)); // string(5) "float" 、string(6) "double"

// 数组
$array = [1,2];
var_dump(get_debug_type($array), gettype($array)); // string(5) "array" 、string(5) "array"

// 对象
class User {}
$object = new User;
var_dump(get_debug_type($object), gettype($object)); // string(4) "User" 、string(6) "object"
```
                                      
## [Weak Map 类](https://wiki.php.net/rfc/weak_maps)


```php
<?php
interface Event {}

class SomeEvent implements Event {}

class AnotherEvent implements Event {}

class Dispatcher
{
    protected WeakMap $dispatchCount;

    public function __construct()
    {
        $this->dispatchCount = new WeakMap;
    }
    public function dispatch(Event $event)
    {
        if (!isset($this->dispatchCount[$event])) {
            $this->dispatchCount[$event] = 0;
        }

        $this->dispatchCount[$event] ++;
    }
}

$dispatcher = new Dispatcher;

$event = new SomeEvent;

$dispatcher->dispatch($event);
$dispatcher->dispatch($event);

$anotherEvent = new AnotherEvent;
$dispatcher->dispatch($anotherEvent);

var_dump($dispatcher);
```
                              
## [联合类型](https://www.php.net/releases/8.0/zh.php#union-types)

相较于以前的 PHPDoc 声明类型的组合，现在可以用原生支持的联合类型声明取而代之，并在运行时得到校验。

```php
<?php

class User
{
    protected User|null $user; // 可以在定义类属性时定义对应属性类型为联合类型

    public function makeFriendsWith(User|null $user) // 联合类型声明,在php8之前不允许这样定义参数类型
    {
        $this->user = $user;
        var_dump('Yay friends');
    }

    public function getFirends() : ?User
    {
        return $this->user;
    }
}

$joe = new User;
$sam = new User;

$joe->makeFriendsWith(null);
```
                     
## [Attributes 注解](https://www.php.net/manual/zh/language.attributes.overview.php) 

注解功能提供了代码中的声明部分都可以添加结构化、机器可读的元数据的能力， 注解的目标可以是类、方法、函数、参数、属性、类常量。 

通过 [反射 API](https://www.php.net/manual/zh/book.reflection.php) 可在运行时获取注解所定义的元数据。

因此注解可以成为直接嵌入代码的配置式语言。


```php
<?php
#[Attribute]
class ApplyMiddleware
{
    public function __construct(private string $middleware)
    {
        //
    }
    public function getMiddleware() : string
    {
        return $this->middleware;
    }
}


#[ApplyMiddleware('class')]
class MyController
{
    #[ApplyMiddleware('property')]
    protected $myProperty;


    #[ApplyMiddleware('method')]
    public function index() {}
}

$controller      = new MyController;
$reflectionClass = new ReflectionClass($controller);

// 类
$attributes      = $reflectionClass->getAttributes(ApplyMiddleware::class);
$middleware      = $attributes[ 0 ]?->newInstance()->getMiddleware();
var_dump($middleware); // string(5) "class"

// 方法
$attributes      = $reflectionClass->getMethod('index')->getAttributes();
$middleware = $attributes[0] ?->newInstance()->getMiddleware();
var_dump($middleware); // string(6) "method"

// 属性
$attributes = $reflectionClass->getProperty('myProperty')->getAttributes();
$middleware = $attributes[0]?->newInstance()->getMiddleware();
var_dump($middleware); // string(8) "property"
```
