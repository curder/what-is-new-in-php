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
