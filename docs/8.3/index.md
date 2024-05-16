# PHP 8.3

PHP 8.3 将在 2023 年 11 月 23 日 发布，安全支持截止于 2027 年 12 月 31 日，主要包含以下新功能：

常量类型定义、新增 `json_validate`函数、支持动态类常量和枚举成员的获取、`gc_status()` 返回额外的 GC 信息、`\Random\Randomizer` 类的新方法 `getBytesFromString`、新的 `\Random\Randomizer::getFloat()` 和 `nextFloat()` 方法、php ini 环境变量语法支持默认值、PHP CLI Lint 支持同时检查多个文件、`class_alias()` 支持为内置的 PHP 类添加别名、新的`stream_context_set_options` 函数。

## 常量类型定义

在 PHP 8.3 及更高版本中，类常量可以在 `const` 关键字之后声明类型：

```php
<?php

class Playground
{
    public const int FORBIDDEN = 403;
}
```

类常量中类型的目的是强制所有覆盖类常量的子类不更改常量的类型。

如果使用与声明类常量不同的类型，则会出现 PHP 致命错误，比如：

```php
<?php

class Playground
{
    public const string FORBIDDEN = 403;
}

# Fatal error: Cannot use int as value for class constant
# playground::FORBIDDEN of type string
```

### 类 class

```php
<?php

class Playground
{
    const int FORBIDDEN = 403; # 整型类型的公开的常量

    protected const int NOT_FOUND = 404; # 整型类型的受保护的常量

    final protected const int OK = 200; # 整型类型最终受保护的常量
}
```

### Trait

```php
<?php

trait Playground
{
    final protected const int OK = 200; # 整型类型最终受保护的常量
}
```

### 接口 Interface

```php
<?php

interface playground
{
    public const int OK = 200; # 整型类型公开的常量
}
```

### 枚举 Enum

```php
<?php

enum playground: int
{
    public const int OK = 200; # 整型类型公开的常量
}
```

## `#[Override]` 属性

使用 `#[Override]` 属性标记方法表示知道该方法正在重写父方法，所以它唯一要做的就是表现出意图。

```php
abstract class Parent
{
    public function methodWithDefaultImplementation(): int
    {
        return 1;
    }
}

final class Child extends Parent
{
    #[Override] //[!code ++]
    public function methodWithDefaultImplementation(): int
    {
        return 2; // The overridden method
    }
} 
```

现在如果父类在某一时刻更改了其方法名称。

```php
abstract class Parent
{
    public function methodWithNewImplementation(): int
    {
        return 1;
    }
}
```

由于检测到不再覆盖任何父类内容，并且会抛出错误 `Child::methodWithDefaultImplementation()`。

它基本上是说“我知道这个方法应该覆盖父方法，如果发生改变，请告诉我”。

## `json_valide()` 函数

PHP 8.3 添加了一个名为 `json_validate` 的新函数，无论给定字符串是有效的 JSON 字符串，该函数都会返回 `true` 或 `false`。

```php
<?php

json_validate('[1, 2, 3]'); # true
json_validate('[1, 2, 3]}'); # false
```

### 添加 flags 参数

`json_validate` 函数接受其第三个参数 `$flags` 的标志位掩码。

```php
json_validate("[\"\xc1\xc1\", 1]"); # false
json_validate("[\"\xc1\xc1\", 1]", flags: JSON_INVALID_UTF8_IGNORE); # true

json_decode("[\"\xc1\xc1\", 1]", flags: JSON_INVALID_UTF8_IGNORE) # [ '', 1]
```

### 验证错误

`json_validate()` 函数仅返回验证结果（布尔值），不会返回验证错误代码。现在可以通过 `json_last_error` 和 `json_last_error_msg` 函数可用于确定验证错误。

```php
<?php

json_validate(""); # false

json_last_error(); # 4
json_last_error_msg(); # "Syntax error"
```

## 动态类常量和枚举成员的获取

PHP 8.3 及更高版本支持使用变量名获取类常量和 Enum 对象。

### 类常量

```php
<?php

class Playground {
    public const int FORBIDDEN = 403;
}

$const_name = 'FORBIDDEN';

echo Playground::{$const_name}; # 403
```

在 PHP 8.3 之前，不允许使用 `ClassName::{$varName}` 语法访问类常量，并且会导致语法错误：
```txt
# Parse error: syntax error, unexpected identifier "FORBIDDEN", expecting
```

### 枚举常量

```php
enum Playground: int 
{
    case Forbidden = 403;
}

$enum_name = 'Forbidden';

echo Playground::{$enum_name}->value; # 403
```

## `:class` 魔法常量

`::class` 魔术常量，它返回 `Class`/`Enum` 的类名：

```php
class Playground {}
$constant = 'class';

echo Playground::{$constant}; # "Playground"
```

如果尝试使用返回除字符串之外的任何类型的表达式来获取类常量或 Enum 成员会导致 `TypeError` 异常。

```php
class Playground {}
$constant = 123;

echo Playground::{$constant}; 
# "Fatal error: Uncaught TypeError: Cannot use value of type int as class constant name"
```

## 额外的 GC 信息

PHP的 `gc_status()` 函数返回PHP垃圾收集器的统计信息，例如GC是否正在运行、GC是否受到保护、缓冲区大小。

```php
print_r(gc_status());
```
在 PHP 8.3 之前 `gc_status` 函数返回一个如下结构的数组：

| 字段          | 类型 | 描述                    |
|-------------|----|-----------------------|
| `runs`      | 整型 | 垃圾收集器运行的次数            |
| `collected` | 整型 | 收集的对象数量               |
| `threshold` | 整型 | 缓冲区中将触发垃圾收集的 root 的数量 |
| `roots`     | 整型 | 当前缓冲区中当前 root 的数量     |

在 PHP 8.3 中，`gc_status` 函数返回八个附加字段：

| 字段                 | 类型  | 描述                                                                  |
|--------------------|-----|---------------------------------------------------------------------|
| `running`          | 布尔值 | 如果垃圾收集器正在运行，则为真，否则为假                                                |
| `protected`        | 布尔值 | 如果垃圾收集器受到保护并且禁止添加 root，则为 true，否则为假                                 |
| `full`             | 布尔值 | 如果垃圾收集器缓冲区大小超过 `GC_MAX_BUF_SIZE`，则为 `true`。当前设置为 0x40000000 (1024³) |
| `buffer_size`      | 整型  | 当前垃圾收集器缓冲区大小                                                        |
| `application_time` | 浮点型 | 总应用时间，以秒为单位（包括 collector_time ）                                     |
| `collector_time`   | 浮点型 | 收集周期所花费的时间，以秒为单位（包括 destructor_time 和 free_time）                    |
| `destructor_time`  | 浮点型 | 在循环收集期间执行析构函数所花费的时间（以秒为单位）                                          |
| `free_time`        | 浮点型 | 在循环收集期间释放值所花费的时间（以秒为单位）                                             |

