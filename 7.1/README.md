## PHP7.1更新

### 数组解构

当我们需要解构数组的时候，通常会有如下操作：

```php
$person = ['curder', 29];
list($name, $age) = $person;
var_dump($name, $age); // string(6) "curder" int(29)
```

上面的例子可以写为：

```php
$person = ['curder', 29];
[$name, $age] = $person;
var_dump($name, $age); // string(6) "curder" int(29)
```



针对`key` => `value`键值队的解构如下：

```php
$person = ['name' => 'curder', 'age' => 29, 'hobby' => "study"];
['name' => $name, 'hobby' => $hobby, 'age' => $age] = $person;
var_dump($name, $age, $hobby); // string(6) "curder" int(29) string(5) "study"
```



多维数组的解构

```php
$persons = [
  ["name" => "curder", "age" => 29, "hobby" => "study"],
  ["name" => "lily", "age" => 25, "hobby" => "shopping"]
];
['name' => $name, 'hobby' => $hobby, 'age' => $age] = $persons[1];
var_dump($name, $age, $hobby); // string(4) "lily" int(25) string(8) "shopping"
```



在`foreach`循环中同时进行解构赋值

```php
$persons = [
  ["name" => "curder", "age" => 29, "hobby" => "study"],
  ["name" => "lily", "age" => 25, "hobby" => "shopping"]
];

foreach($persons as ['name' => $name, 'hobby' => $hobby, 'age' => $age]) {
  var_dump($name, $age, $hobby);
}
```

### nullable 和 忽略类型



定义方法返回的数据类型。当返回的不是制定类型时，则返回`null`

```php
<?php

class User
{
    protected $age;

    // public function __construct($age)
    // {
    //     $this->age = $age;
    // }

    // 定义方法返回的数据类型，当返回的不是制定类型时，则返回null
    public function age(): ?int
    {
        return $this->age;
    }
}

$age = (new User(29))->age();
var_dump($age); // NULL
```



定义方法参数类型和返回值为`void`

```php
<?php

class User
{
    public function subscribe(?callable $callback = null): void
    {
        var_dump("subscribing here");

        if ($callback) $callback();
    }
}

$age = (new User(29))->subscribe(); // string(16) "subscribing here"
```
