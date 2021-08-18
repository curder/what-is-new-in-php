<?php

// 解构数组的旧方式
$person = ['curder', 29];
list($name, $age) = $person;
var_dump($name, $age); // string(6) "curder" int(29)

// php7.1中支持下面的方式更清晰的解构数组
$person = ['curder', 29];
[$name, $age] = $person;
var_dump($name, $age); // string(6) "curder" int(29)

// 针对 key => value
$person = ['name' => 'curder', 'age' => 29, 'hobby' => "study"];
['name' => $name, 'hobby' => $hobby, 'age' => $age] = $person;
var_dump($name, $age, $hobby); // string(6) "curder" int(29) string(5) "study"

// 多维数组的解构
$persons = [
  ["name" => "curder", "age" => 29, "hobby" => "study"],
  ["name" => "lily", "age" => 25, "hobby" => "shopping"]
];
['name' => $name, 'hobby' => $hobby, 'age' => $age] = $persons[1];
var_dump($name, $age, $hobby); // string(4) "lily" int(25) string(8) "shopping"

// 在 foreach 循环中解构

$persons = [
  ["name" => "curder", "age" => 29, "hobby" => "study"],
  ["name" => "lily", "age" => 25, "hobby" => "shopping"]
];

foreach($persons as ['name' => $name, 'hobby' => $hobby, 'age' => $age]) {
  var_dump($name, $age, $hobby);
}
