## PHP7.0更新

### 类型的声明

可以使用字符串(string), 整数 (int), 浮点数 (float), 以及布尔值 (bool)，来声明函数的参数类型与函数返回值。

#### [参数类型声明](/docs/7.0/scalar_typehints.php)
```php
<?php
declare(strict_types = 1);

function setAge(int $age)
{
    var_dump($age);
}

function setIsValid(bool $valid)
{
    var_dump($valid);
}

// 默认会进行自动类型转换
setAge(29); // int(29)
// setAge('29'); // 默认不定义`strict_types =1 ` 会返回 int(29) ；如果定义则会抛出错误

// 如果不能进行类型转换则会抛出错误
// setAge('abs'); // 抛出错误
// setIsValid('abs'); // 默认不定义`strict_types =1 ` 会返回 bool(true) ；如果定义则会抛出错误
// setIsValid([]); // 抛出错误
```
> 标量类型声明 有两种模式: 强制 (默认) 和 严格模式。
declare(strict_types=1),必须放在文件的第一行执行代码，当前文件有效！


#### [返回值类型声明](/docs/7.0/return_type_declarations.php)

```php
<?php

class User {}

function getUser(): User
{
    // return []; // 如果定义了返回值类型，则不允许返回其他数据类型
    return new User;
}

var_dump(getUser());
```

### [新增操作符`<==>`](/docs/7.0/spaceships.php)



语法：**$c = $a <=> $b**

如果$a > $b, $c 的值为1

如果$a == $b, $c 的值为0

如果$a < $b, $c 的值为-1



```php
<?php

$games = ['Mass Effact', 'Super Maro Bros', 'Zelda', 'Fallout', 'Metal Gear'];

// 语法：$c = $a <=> $b；
// 当$a > $b, $c的值为1
// 当$a == $b, $c的值为0
// 当$a < $b, $c 的值为-1
usort($games, function($a, $b) {
    return $b <=> $a;
});

var_dump($games); // array(5) {[0]=>string(5) "Zelda" [1]=>string(15) "Super Maro Bros" [2]=>string(10) "Metal Gear" [3]=>string(11) "Mass Effact" [4]=>string(7) "Fallout"}
```

### [新增操作符`??`](/docs/7.0/null_coalesce_operator.php)

如果变量存在值且不为null，则返回自身的值，否则返回它的第二个操作数。

```php
<?php

// Before
$name = isset($_GET['name']) ? $_GET['name'] : 'guest';

// After
$name = $_GET['name'] ?? 'guest';

var_dump($name); // string(5) "guest"
```

### [命名空间引用优化](/docs/7.0/grouped_imports/index.php)

在之前的php版本语法的写法是：
```php
use App\Animal;
use App\Person;
```

php7新语法写法是：
```php
use App\{Animal, Person};
# 或者将类换行
use App\{
    Animal,
    Person
};

# 如果命名空间下还有其他后缀的命名空间
use App\{
    Animal,
    Person,
    Models\User
}
```
