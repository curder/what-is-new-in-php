# 8.5 {#php-8-5}

PHP 8.5 将于 2025 年 11 月发布，并带来一些有用的新功能和改进。

此版本侧重于开发人员体验增强、新的实用程序函数和更好的调试功能。

主要包含如下新功能：

- 数组函数：`array_first()` 和 `array_last()`
- 管道操作 `|>`
- 错误和异常处理程序 `getter`
- cURL 函数：`curl_multi_get_handles()`
- Locale 函数：`locale_is_right_to_left()`
- 常量：`PHP_BUILD_DATE`
- CLI 功能增强，`php --ini=diff` 

## 数组函数 `array_first()` 和 `array_last()` {#array_first-array_last-functions}

PHP 7.3 引入了 `array_key_first()` 和 `array_key_last()` 函数，用于获取数组中的第一个和最后一个键。

在 PHP 8.5 中，引入了两个函数 `array_first` 和 `array_last()` 用于获取数组中的第一个和最后一个值。

```php
$users = ['Alice', 'Bob', 'Charlie'];

$firstUser = array_first($users);
$lastUser = array_last($users);
var_dump($firstUser); // Alice
var_dump($lastUser); // Charlie

// 也适用于关联数组
$data = ['name' => 'John', 'age' => 30, 'city' => 'Berlin'];
var_dump(array_first($data)); // 'John'
var_dump(array_last($data));  // 'Berlin'

// 对于空数组返回null
$empty = [];
var_dump(array_first($empty)); // null
var_dump(array_last($empty));  // null
```

`array_first()` 和 `array_last()` 函数等同于：


- `array_first($array)` → `$array[array_key_first($array)]`

- `array_last($array)` → `$array[array_key_last($array)]`

## 管道操作 `|>` {#pipe-operator}

PHP 8.5 引入了一个新的管道运算符 （`|>`），它允许从左到右链接多个可调用对象，将左侧可调用对象的返回值传递给右侧可调用对象：

```php
$result = 'Hello World'
    |> strtoupper(...) // 转换成大写字符
|> str_shuffle(...) // 打乱字符顺序
|> trim(...); // 去除首尾空格

var_dump($result); // 'E ROLDHOLWL' (或者类似的随机结果)

// 上面的管道操作相当于嵌套调用：
$result = trim(str_shuffle(strtoupper('Hello World')));

// 或者使用变量：
$result = 'Hello World';
$result = strtoupper($result);
$result = str_shuffle($result);
$result = trim($result);
```

管道运算符适用于任何可调用对象，包括函数、方法、闭包和第一类可调用对象。

但是，它有一些限制：

- 所有可调用对象必须只接受一个必需的参数

- 不能使用具有按引用参数的函数（少数例外）

- 返回值始终作为第一个参数传递

## 错误和异常处理程序 `getter` {#getter}

PHP 8.5 引入了两个新函数，用于检索当前活动的错误和异常处理程序：`get_error_handler()` 和 `get_exception_handler()`。

适用场景：

- 框架开发和处理程序链接

- 调试错误处理配置

- 临时覆盖处理程序，同时保留原始

这两个函数都返回当前可调用的处理程序，如果未设置自定义处理程序，则返回 `null`。


## cURL 函数 `curl_multi_get_handles()` {#curl_multi_get_handles}

PHP 8.5 引入了一个新的函数 `curl_multi_get_handles()`，用于从多句柄中检索所有句柄。

```php
$multiHandle = curl_multi_init();

$ch1 = curl_init('https://api.example.com/users');
$ch2 = curl_init('https://api.example.com/posts');

curl_multi_add_handle($multiHandle, $ch1);
curl_multi_add_handle($multiHandle, $ch2);

// New in PHP 8.5: Get all handles
$handles = curl_multi_get_handles($multiHandle);
// Returns: [$ch1, $ch2]

// Execute and process results
$running = null;
do {
    curl_multi_exec($multiHandle, $running);
} while ($running > 0);

foreach ($handles as $handle) {
    $response = curl_multi_getcontent($handle);
    curl_multi_remove_handle($multiHandle, $handle);
}
```

## Locale 函数 `locale_is_right_to_left()` {#locale_is_right_to_left}

PHP 8.5 添加了对检测从右到左 （RTL） 语言环境的支持，从而提高了国际化功能：

```php
// Check if locale uses RTL writing
$isRTL = locale_is_right_to_left('ar_SA'); // true (Arabic)
$isLTR = locale_is_right_to_left('en_US'); // false (English)
$isFarsi = locale_is_right_to_left('fa_IR'); // true (Persian/Farsi)

// Object-oriented approach
$isRTL = Locale::isRightToLeft('he_IL'); // true (Hebrew)
```

适用场景：

- 构建多语言 Web 应用程序
- 用户界面中的正确文本对齐
- 基于区域设置的动态 CSS 类分配

## 常量 `PHP_BUILD_DATE` {#php_build_date}

PHP 8.5 添加了一个新的常量 `PHP_BUILD_DATE`，用于获取 PHP 的编译日期。

```php
var_dump(PHP_BUILD_DATE); // 'Jul  8 2025 04:16:13'

// 用于在生产环境中调试
var_dump(PHP_VERSION); // 8.5.0alpha1
var_dump(PHP_BUILD_DATE); // Jul  8 2025 04:16:13
```

## CLI 功能增强 {#cli-enhancements}

一个新的 CLI 选项，用于仅输出非默认 ini 指令：

```shell
# Show only modified settings
php --ini=diff

# Example output:
# memory_limit = 256M (default: 128M)
# max_execution_time = 60 (default: 30)
```

