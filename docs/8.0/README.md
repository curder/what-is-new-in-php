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
