<?php

require 'vendor/autoload.php';

# Before
// use App\Animal;
// use App\Person;

# After
use App\{
    Animal,
    Person
 };

$animal = new Animal;
$person = new Person;
var_dump($animal, $person);
