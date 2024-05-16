---
sidebarDepth: 3
sidebar: auto
---


# PHP 7.4

::: danger 重要提示
PHP 7.4 发布于 2019 年 11 月 28 日，安全修复结束时间为：2022 年 11 月 28 日。如果正在使用当前版本，强烈建议升级到[当前版本](https://www.php.net/supported-versions)。
:::

它可能是自 PHP 7.0 以来最大胆的版本，带来了重大语法和性能改进。

## 箭头函数

箭头函数也称为"短闭包"，它允许较少冗长的单行函数。

```php
// 之前的写法：
array_map(function (User $user) { 
    return $user->id; 
}, $users);

// 现在的写法：
array_map(fn (User $user) => $user->id, $users)
```

## 类型属性

类型的声明，类型提示，以及指定确定类型的变量传递给函数或类的方法。

```php
class User {
    public int $id;
    public string $name;
}
```

除了 `void` 和 `callable` 外，所有的类型都支持。


```php
public int $scalarType;
protected ClassName $classType;
private ?ClassName $nullableClassType;
```
为什么不支持 void 和 callable？下面是 RFC 的解释

>The void type is not supported, because it is not useful and has unclear semantics.
> 不支持 void 类型，是因为它没用，并且语义不清晰。
> 
> The callable type is not supported, because its behavior is context dependent.
> 不支持 callable 类型，因为其行为取决于上下文。


因此，我们可以放心使用 bool，int，float，string，array，object，iterable，self，parent，当然还有我们很少使用的 nullable 空允许 (?type)

```php
// 静态属性的类型
public static iterable $staticProp;

// var 中声明属性
var bool $flagl

// 设置默认的值
// 注意，只有 nullable 的类型，才能设置默认值为 null
public string $str = "foo";
public ?string $nullableStr = null;

// 多个同类型变量的声明
public float $x, $y;
```


如果传递不符合给定类型的变量，会发生什么?

```php
class User {
    public int $id;
    public string $name;
}

$user = new User;
$user->id = 10;
$user->name = []; // 这个会产生一个致命的错误 Fatal error: Uncaught TypeError: Typed property User::$name must be string, array used in /app/types.php:9
```


## 改进的类型差异

```php
class ParentType {}
class ChildType extends ParentType {}

class A
{
    public function covariantReturnTypes(): ParentType
    { /* … */ }
}

class B extends A
{
    public function covariantReturnTypes(): ChildType
    { /* … */ }
}
```

```php
class A
{
    public function contraVariantArguments(ChildType $type)
    { /* … */ }
}

class B extends A
{
    public function contraVariantArguments(ParentType $type)
    { /* … */ }
}
```

## Null 合并运算符

```php
// 之前
$data['date'] = $data['date'] ?? new DateTime();

// 现在
$data['date'] ??= new DateTime();
```

## 数组展开运算符

```php
$arrayA = [1, 2, 3];

$arrayB = [4, 5];

$result = [0, ...$arrayA, ...$arrayB, 6 ,7]; // [0, 1, 2, 3, 4, 5, 6, 7]
```

> **注意：** 仅适用于带数字键的数组。自 PHP8.1 开始支持带字符串的键的数组展开。


## 数值分隔符

PHP 7.4允许使用下划线在视觉上分隔数字值。 看起来像这样:

```php
$unFormattedNumber = 107925284.88;
$formattedNumber = 107_925_284.88;
```

下划线仅被引擎忽略。

## 三元运算符弃用

该RFC为嵌套三元语句添加了弃用警告。 在PHP 8中，此弃用将转换为编译时错误。

```php
1 ? 2 : 3 ? 4 : 5;   // deprecated
(1 ? 2 : 3) ? 4 : 5; // ok
```

## 串联优先

如果要编写这样的内容:
```php
echo "sum: " . $a + $b;
```

PHP以前会这样解释它:
```php
echo ("sum: " . $a) + $b;
```

PHP 8将使其如此解释:
```php
echo "sum: " . ($a + $b);
```

当遇到在 `+` 或 `-` 符号之前的包含的未括号表达式时，PHP 7.4 添加了弃用警告。

## 无效的数组访问警告

如果要对一个整数使用数组访问语法； PHP以前会返回 null 。 从PHP 7.4开始，将发出通知。

```php
$i = 1;

$i[0]; // Notice
```

## strip_tags 接受数组

```php
// 过去只能剥离多个标签
strip_tags($string, '<a><p>')

// PHP 7.4 还允许使用数组
strip_tags($string, ['a', 'p'])
```
