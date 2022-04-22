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


<CodeGroup>
  <CodeGroupItem title="Switch">

```php
class Conversation {}
$object = new Conversation;

switch (get_class($object)) {
    case 'Conversation':
        $type = 'started_conversation';
        break;

    case 'Reply':
        $type = 'replied_to_conversation';
        break;

    case 'Comment':
        $type = 'commented_to_conversation';
        break;
}

// started_conversation
```

  </CodeGroupItem>

  <CodeGroupItem title="Match" active>

```php
class Conversation {}
$object = new Conversation;

return match ($object::class) {
    'Conversation' => 'stated_conversation',
    'Reply' => 'replied_to_conversation',
    'Comment' => 'commented_to_conversation',
};

// stated_conversation
```

  </CodeGroupItem>
</CodeGroup>

### 强类型检查

与 `switch` 语句不同，比较是检查 `===` 而不是弱相等检查 `==`。

```php
$php = 8.0;

return match($php) {
    '8.0' => 'No Match 😭',
    8.0 => 'Matched 🥰',
}

// Matched 🥰
```

### 未匹配错误

如果未找到匹配项，则会抛出 `UnhandledMatchError`。如果愿意，可以通过 try/catch 捕获错误。

```php
$fruit = '🍔';

return match($fruit) {
    '🍎' => 'Fruit is an apple',
    '🍌' => 'Fruit is a banana',
    '🍐' => 'Fruit is a pear',
};

// ❌ Fatel error
// Uncaught UnhandledMatchError
```

### 匹配默认值
不必从默认模式返回值。相反，可能会在未找到匹配项时引发自定义错误或异常。

```php
$fruit = '🍔';

return match($fruit) {
    '🍎' => 'Fruit is an apple',
    '🍌' => 'Fruit is a banana',
    '🍐' => 'Fruit is a pear',
    default => throw new InvalidFruitException,
};
```

### 匹配多个

匹配表达式臂可以包含多个用逗号分隔的表达式。相当于逻辑 OR，并且是具有相同右侧的多个匹配的简写。

```php
$food = '🍎';

return match ($food) {
    '🍎', '🍌', '🍊' => 'Food is a Fruit',
    '🍔' => 'Food is a burger',
    '🍣' => 'Food is a sushi',
}

// Food is a Fruit
```

### 范围匹配
通过使用 `true` 作为匹配的表达式，可以使用匹配表达式来处理条件情况。

此外，还有默认值，此模式匹配以前未匹配的任何内容。

```php
$age = 23;

return match (true) {
    $age >= 65 => 'Senior',
    $age >= 25 => 'Adult',
    $age >= 18 => 'Young adult',
    default => 'Child',
}

// Young adult
```

### 匹配数组

匹配表达式也可以匹配数组。

```php
$meal = ['🍔', '🍟'];

return match($meal) {
    ['🍔', '🍕'] => 'Burger and pizza',
    ['🍔', '🥙'] => 'Burger and tacos',
    ['🍔', '🍟'] => 'Burger and fries',
}

// Burger and fries
```


## [构造器属性提升](https://www.php.net/releases/8.0/zh.php#constructor-property-promotion)

在 PHP 8.0 中我们可以通过编写更少的代码来定义并初始化类属性。

```php
<?php
class User
{
    public function __construct(protected string $name) { }
}

class Plan
{
    public function __construct(protected string $name = 'monthly') { }
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
    ) { }
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
class Conversation { }
$object = new Conversation;
var_dump($object::class, get_class($object)); // "Conversation" "Conversation"
```

> 在语法上类似于类常量访问，更加直观地期望语法 `$object::class` 也能正常工作并提供与 `get_class($object)` 相同的结果。
                                         
## [命名参数](https://www.php.net/releases/8.0/zh.php#named-arguments)

这个新的 PHP 8 特性允许您根据参数名称传递函数参数，而不是它们的顺序。 

- 仅仅指定必填参数，跳过可选参数。
- 参数的顺序无关、自己就是文档（self-documented）
                                                 

```php
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

return new Invoice(
    description: 'Customer installation',
    total: 10000,
    date: new DateTime,
    paid: true,
);
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

Weak map 允许存储链接到对象的任意数据，而不会泄漏任何内存。

```php
<?php

class User {}

$map = new WeakMap();

$user = new User();
$map[$user]  = [1, 2, 3];

var_dump(count($map)); // int(1)

unset($user);

var_dump(count($map)); // int(0)
```

[更多相关查看这里](https://php.watch/versions/8.0/weakmap)

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

    public function getFriends() : ?User
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

## [throw 作为表达式](https://wiki.php.net/rfc/throw_expression)

允许在接受表达式的任何上下文中使用 `throw` 关键字。

```php
<?php
// callable
$callable = fn() => throw new Exception();

// $value 的值仅不为null
$value = $nullableVariable ?? throw new InvalidArgumentException();

// $value 的值仅为true
$value = $falsableValue ?: throw new InvalidArgumentException();

// 跟使用if表达式一样，让代码变得简洁
$condition && throw new Exception();
$condition || throw new Exception();
$condition and throw new Exception();
$condition or throw new Exception();
```
              
## [无变量捕捉](https://php.watch/versions/8.0/catch-exception-type)

PHP 8.0 及更高版本允许使用 try/catch 块，其中 catch() 语句不会将异常本身捕获到变量中。

在 PHP 8.0 之前，典型的 PHP try/catch 块必须在 catch 语句中捕获异常：

```php {4}
try {
  // try something
}
catch (\InvalidArgumentException $ex) { // "$ex" is required
  // handle the exception
}
```

有时，异常类型（如`\InvalidArgumentException`）足以决定异常的处理方式，并将异常捕获到一个变量中（如上例中的$ex），PHP 8.0 允许删除异常捕获。

```php {3}
try {
    throw new InvalidArgumentException();
} catch (InvalidArgumentException) {
    echo "Something went wrong.";
}
```

确保在程序中捕获的异常类型的粒度足以传达异常的含义。 例如，如果打算记录事件，则在不捕获异常的情况下捕获通配符 `\Exception` 或 `\Throwable` 可能不是一个好习惯。

## [新的混合伪类型](https://php.watch/versions/8.0/mixed-type)
       
当函数的参数和返回值没有定义时，默认为 `mixed` 类型的返回值。

`mixed` 等同于联合类型 `string|int|float|bool|null|array|object|callable|resource`

```php {1}
function dump(mixed $var) {
    var_dump($var);
}

dump('test');
```

> 注意：`mixed` 不能跟其他类型一起组合成联合类型。例如：`function (mixed|FooClass $bar): int|mixed {}` 会抛出错误：`Fatal error: Type mixed can only be used as a standalone type in ... on line ...`


## [新 Stringable 接口](https://php.watch/versions/8.0/stringable)

```php
class User
{
    public function __toString() : string
    {
        return 'The username';
    }
    public function passString(string|Stringable $string): string|Stringable
    {
        return $string;
    }
}
var_dump(
    (string) (new User), // string(12) "The username"
    (new User) instanceof Stringable, // bool(true) 
    (new User)->passString(new User) // object(User)#2 (0) {}
);
```

## [尾随逗号](https://php.watch/versions/8.0/trailing-comma-parameter-use-list)

PHP 8.0 语法允许在参数列表和闭包使用列表中留下尾随逗号。

```php{8,16}
<?php
class User
{
    public function __construct(
        public string $name,
        protected int $age,
        private string $email,
        public bool $is_admin = false,
    ) {}
}

$user = new User(
    'Curder',
    30,
    'q.curder@gmail.com',
    true,
);

function() use ($foo, $bar,) {}
```
             
## [ValueError 错误类型](https://php.watch/versions/8.0/ValueError)


PHP 8 引入了一种称为 `ValueError` 的新型异常。

```php {4}
try {
    $random_element = array_rand([1, 2, 3,], 4); // 函数传递错误的参数
    var_dump($random_element);
} catch (ValueError) {
    // Something went error
}
```
