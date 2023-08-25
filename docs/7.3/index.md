---
sidebarDepth: 3
sidebar: auto
---


# PHP 7.3

## 灵活的 Heredoc 和 Nowdoc 语法

[Heredoc](https://www.php.net/manual/en/language.types.string.php#language.types.string.syntax.heredoc) 和 [Nowdoc](https://www.php.net/manual/en/language.types.string.php#language.types.string.syntax.nowdoc) 语法能够在使用多行长字符串时起到很大帮助。它要求结束标识符应当为出现在新行的首个字符串。


```php
// 除了这样：

$query = <<<SQL

SELECT *

FROM `table`

WHERE `column` = true;

SQL;

// 这样也可以：

$query = <<<SQL

   SELECT *

   FROM `table`

   WHERE `column` = true;

   SQL;
   ```

总的来说，此更新提出了两项改进，如下：

- 闭合标识符前支持缩进
- 闭合标识符后不再强制换行

在上面的例子里，可以很容易地看出这些改动。

## 函数调用中允许尾部逗号

在参数、元素、变量列表结尾，追加尾部逗号。有时我们在数组内以及函数调用（尤其是可变参函数）时需要传递大量元素，若是漏掉一个逗号，便会报错。

鉴于如上情况，尾部逗号便显得十分有用。这个特性已经允许在数组内使用，并且从 PHP 7.2 开始，分组命名空间（Grouped Namespaces）语法也开始支持尾部逗号。

```php
use Foo\Bar\{
   Foo,
   Bar,
};

$foo = [
   'foo',
   'bar',
];
```

当新值需要被追加在此处时，尾部逗号便显得十分实用。在可变参函数例如 `unset()` 内，更是如此。

```php
unset(
    $foo,
    $bar,
    $baz,
);
```
同时，使用 `compact()` 函数给模版引擎传递一批变量时，也是个能用到的例子。

```php
echo $this->view(
    'index',
    compact(
        'title',
        'body',
        'comments',
        )
    );
```

在某些需要构造连续或分组数据情况下，经常要使用 `array_merge()` 函数合并数组。也可以利用尾部逗号：

```php
$newArray = array_merge(
    $arrayOne,
    $arrayTwo,
    ['foo', 'bar'],
);
```

同样，也可以在调用任意方法、函数以及闭包时使用此特性。

```php
class Foo
{
 public function __construct(...$args) {
   //
 }

 public function bar(...$args) {
   //
 }

 public function __invoke(...$args) {
   //
 }
}

$foo = new Foo(
 'constructor',
 'bar',
);

$foo->bar(
 'method',
 'bar',
);

$foo(
 'invoke',
 'bar',
);
```

## JsonException异常

解析 JSON 响应数据，有 `json_encode()` 以及 `json_decode()` 两个函数可供使用。 不幸的是，它们都没有恰当的错误抛出表现。

`json_encode` 失败时仅会返回 `false`；`json_decode` 失败时则会返回 `null`，而 `null` 可作为合法的 JSON 数值。

唯一获取错误的方法是，调用 `json_last_error()` 或 `json_last_error_msg()`，它们将分别返回机器可读和人类可读的全局错误状态。

该 RFC 提出的解决方案是为 JSON 函数新增 `JSON_THROW_ON_ERROR` 常量用于忽略全局错误状态。

当错误发生时，JSON 函数将会抛出 `JsonException` 异常，异常消息（message）为 `json_last_error()` 的返回值，异常代码（code）为 `json_last_error_msg()` 的返回值。

如下是调用例子：

```php
json_encode($data, JSON_THROW_ON_ERROR);

json_decode("invalid json", null, 512, JSON_THROW_ON_ERROR);
// 抛出 JsonException 异常
```

## 升级 PCRE2

PHP 使用 PCRE 作为正则表达式引擎。 但从 PHP 7.3 开始，PCRE2 将作为新的正则引擎大显身手。

所以，需要将现有的正则表达式迁移到符合 PCRE2 的规则。这些规则比以前更具侵入性。请看以下实例：

```php
preg_match('/[\w-.]+/', '');
```

这个表达式在新版 PHP 内将会匹配失败且不会触发警告。因为 PCRE2 现严格要求，若需匹配连字符（`-`）而非用于表示范围，则必须移动到末尾或将其转义。

更新到 PCRE2 10.x 后，支持了以下以及更多特性：

- 相对后向引用 `\g{+2}`（等效于已存在的 `\g{-2}`）
- PCRE2 版本检查 `(?(VERSION>=x)...)`
- `(*NOTEMPTY)` 和 `(*NOTEMPTY_ATSTART)` 告知引擎勿返回空匹配
- `(*NO_JIT)` 禁用 `JIT` 优化
- `(*LIMIT_HEAP=d)` 限制堆大小为 `d` KB
- `(*LIMIT_DEPTH=d)` 设置回溯深度限制为 `d`
- `(*LIMIT_MATCH=d)` 设置匹配数量限制为 `d`

## list() 赋值引用

PHP 中的 `list()` 现在可以赋值给引用，在 PHP 7.3 之前的版本中 `list()` 中赋值不能使用引用，在 PHP 7.3 中将允许使用引用，新改进的语法如下：

```php
$array = [1, 2];
list($a, &$b) = $array;
```

相当于

```php
$array = [1, 2];
$a = $array[0];
$b = &$array[1];
```

在 PHP 7.3 的变更中，我们还可以与 `foreach()` 方法一起嵌套使用

```php
$array = [[1, 2], [3, 4]];
foreach ($array as list(&$a, $b)) {
    $a = 7;
}
var_dump($array);
```



## is_countable 函数

在 PHP 7.2 中，用 `count()` 获取对象和数组的数量。如果对象不可数，PHP 会抛出警告⚠️ 。

所以需要检查对象或者数组是否可数。 

PHP 7.3 提供新的函数 `is_countable()` 来解决这个问题。

该 RFC 提供新的函数 `is_countable()`，对数组类型或者实现了 Countable 接口的实例的变量返回 `true` 。

之前:
```php
if (is_array($foo) || $foo instanceof Countable) {
    // $foo 是可数的                                               
}
```

之后:

```php
if (is_countable($foo)) {
    // $foo 是可数的
}
```


## array_key_first(), array_key_last()

PHP 7.3 之前版本的 PHP 允许使用 `reset()` ，`end()` 和 `key()` 等方法，通过改变数组的内部指针来获取数组首尾的键和值。

现在，为了避免这种内部干扰，PHP 7.3 推出了新的函数来解决这个问题：

```php
$key = array_key_first($array); // 获取数组第一个元素的键名
$key = array_key_last($array); // 获取数组最后一个元素的键名
```


```php
// 关联数组的用法
$array = ['a' => 1, 'b' => 2, 'c' => 3];

$firstKey = array_key_first($array);
$lastKey = array_key_last($array);

assert($firstKey === 'a');
assert($lastKey === 'c');

// 索引数组的用法
$array = [1 => 'a', 2 => 'b', 3 => 'c'];

$firstKey = array_key_first($array);
$lastKey = array_key_last($array);

assert($firstKey === 1);
assert($lastKey === 3);
```

## Argon2 和 Hash 密码加密性能增强

在 PHP 的早期版本中，我们增加了 Argon2 和哈希密码加密算法，这是一种使用哈希加密算法来保护密码的现代算法。

它有三种不同的类型，`Argon2i`，`Argon2d` 和 `Argon 2id`。

我们针对 `Argon2i` 密码散列和基于密码的密钥生成进行了优化。

`Argon2d` 性能更快，并使用依赖于内存的数据访问。 Argon2i 使用与内存无关的数据访问。 `Argon2id` 是 `Argon2i` 和 `Argon2d` 的混合体，使用依赖于数据和与数据独立的存储器访问的组合。

password_hash()：

Argon2id现在是在 `paswword_ *` 函数中使用的推荐的 Argon2 变量。

具有自定义成员方法的名称的Argon2id与PASSWORD_ARGON2I的使用方法相同

```php
password_hash（'password'，PASSWORD_ARGON2ID，['memory_cost'=> 1 << 17，'time_cost'=> 4，'threads'=> 2]）;
```

`password_verify();`

除了 Argon2i 之外，`password_verify();` 函数也适用于Argon2id。

`password_needs_rehash();`

此函数也将接受Argon2id哈希值，如果任何变量成员发生变化，则返回 `true`。

```php
$hash = password_hash('password', PASSWORD_ARGON2ID);
password_needs_rehash($hash, PASSWORD_ARGON2ID); // 返回 false
password_needs_rehash($hash, PASSWORD_ARGON2ID, ['memory_cost' => 1<<17]); // 返回 true
```

## 废弃并移除 image2wbmp()

该函数能够将图像输出为 WBMP 格式。另一个名为 imagewbmp() 的函数也同样具备单色转换的作用。

因此，出于重复原因，image2wbmp() 现已被废弃，你可使用 imagewbmp() 代替它。此函数被弃用后，再次调用它将会触发已弃用警告。

待后续此函数被移除后，再次调用它将会触发致命错误。


## 废弃并移除大小写不敏感的常量

使用先前版本的 PHP，可以同时使用大小写敏感和大小写不敏感的常量。但大小写不敏感的常量会在使用中造成一点麻烦。

所以，为了解决这个问题，PHP 7.3 废弃了大小写不敏感的常量。

原先的情况是：

- 类常量始终为「大小写敏感」。
- 使用 `const` 关键字定义的全局常量始终为「大小写敏感」。注意此处仅仅是常量自身的名称，不包含命名空间名的部分，PHP 的命名空间始终为「大小写不敏感」。
- 使用 `define()` 函数定义的常量默认为「大小写敏感」。
- 使用 `define()` 函数并将第三个参数设为 `true` 定义的常量为「大小写不敏感」。

如今 PHP 7.3 提议废弃并移除以下用法：

- 在 PHP 7.3: 废弃使用 `true` 作为 `define()` 的第三个参数。
- 在 PHP 7.3: 废弃使用与定义时的大小写不一致的名称，访问大小写不敏感的常量。`true`、`false` 以及 `null` 除外。

## 同站点 Cookie

PHP 7.3 在建议在使用 cookies 时，增加同站点标志。这个 RFC 会影响4个系统函数。

- **setcookie**
- **setrawcookie**
- **session_set_cookie_params**
- **session_get_cookie_params**

这个影响会在两种情况下起作用。

其中一种方式会添加函数的新参数 ，另一种方式允许以数组形式的选项代替其他单独选项。

```php
bool setcookie(

   string $name

   [, string $value = ""

   [, int $expire = 0

   [, string $path = ""

   [, string $domain = ""

   [, bool $secure = false

   [, bool $httponly = false ]]]]]]

)

bool setcookie (

   string $name

   [, string $value = ""

   [, int $expire = 0

   [, array $options ]]]

)

// 两种方式均可.
```

## FPM 更新

FastCGI 进程管理器也进行了更新，现在提供了新的方式来记录 FPM 日志。

- **log_limit**: 设置允许的日志长度，可以超过 1024 字符。

- **log_buffering**: 允许不需要额外缓冲去操作日志。

- **decorate_workers_output**: 当启用了 **catch_workers_output** 时，系统会去禁用渲染输出。


## 改进 Windows 下的文件删除

如[官方文档](https://www.php.net/manual/zh/migration73.windows-support.php#migration73.windows-support.core.file-descriptors)所述：

默认情况下，文件描述符以共享读、写、删除的方式去操作。 

这很有效的去映射 POSIX 并允许去删除正在使用中的文件。但这并不是100%都是一样的，不同的平台可能仍存在一些差异。

删除操作之后，文件目录仍存在直到所有的文件操作被关闭。

## 更友好的错误信息

`TypeErrors` 用于整数和布尔值，用于打印其全名， 它已更改为 `int` 和 `bool`，以匹配代码中的类型提示。

```text
Argument 1 passed to foo() must be of the type int/bool
```

与PHP 7.2相比:

```text
Argument 1 passed to foo() must be of the type
integer/boolean
```

## Compact未定义变量

传递给 `compact` 函数的未定义变量将被通知，而在此版本之前会被忽略。

```php
$a = 'foo';
compact('a', 'b'); // Notice: compact(): Undefined variable: b
```

## 字符串搜索函数

不能再将非字符串针传递给字符串搜索函数。 这些是受影响的函数:

- `strpos()`
- `strrpos()`
- `stripos()`
- `strripos()`
- `strstr()`
- `strchr()`
- `strrchr()`
- `stristr()`
