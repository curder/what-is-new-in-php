---
sidebarDepth: 3
sidebar: auto
---

# PHP 7.2

## 新的对象类型

新的对象类型, object, 引进了可用于逆变（contravariant）参数输入和协变（covariant）返回任何对象类型。

```php
<?php

function test(object $obj) : object
{
    return new SplQueue();
}

test(new StdClass()); 

/**
SplQueue Object
(
    [flags:SplDoublyLinkedList:private] => 4
    [dllist:SplDoublyLinkedList:private] => Array
        (
        )

)
*/
```

## 通过名称加载扩展

扩展文件不再需要通过文件加载 (Unix 下以 `.so` 为文件扩展名，在 Windows 下以 `.dll` 为文件扩展名) 进行指定。

可以在 `php.ini` 配置文件进行启用, 也可以使用 [dl()](https://www.php.net/manual/zh/function.dl.php) 函数进行启用。

## 使用Argon2算法生成密码散列

Argon2 已经被加入到密码散列（password hashing） API (这些函数以 password_ 开头), 以下是暴露出来的常量:

- **PASSWORD_ARGON2I**
- **PASSWORD_ARGON2_DEFAULT_MEMORY_COST**
- **PASSWORD_ARGON2_DEFAULT_TIME_COST**
- **PASSWORD_ARGON2_DEFAULT_THREADS**


## 新增 ext/PDO（PDO扩展） 字符串扩展类型

PDO的字符串类型已经扩展支持国际化的字符集。以下是扩展的常量：

- **PDO::PARAM_STR_NATL**
- **PDO::PARAM_STR_CHAR**
- **PDO::ATTR_DEFAULT_STR_PARAM**

这些常量通过 **PDO::PARAM_STR** 利用位运算OR进行计算：

```php
<?php

$db->quote('über', PDO::PARAM_STR | PDO::PARAM_STR_NATL);
```

## ext/sockets（sockets扩展）添加了地址信息

sockets扩展现在具有查找地址信息的能力，且可以连接到这个地址，或者进行绑定和解析。为此添加了以下一些函数:

- **socket_addrinfo_lookup()**
- **socket_addrinfo_connect()**
- **socket_addrinfo_bind()**
- **socket_addrinfo_explain()**
                            
## 扩展了参数类型

重写方法和接口实现的参数类型现在可以省略。

```php
<?php

interface A
{
    public function Test(array $input);
}

class B implements A
{
    public function Test($input){} // $input 变量的类型忽略，允许传入任意类型
}
```

## 允许分组命名空间的尾部逗号

命名空间可以在PHP 7中使用尾随逗号进行分组引入。

```php
<?php

use Foo\Bar\{
    Foo,
    Bar,
    Baz,
};
```
