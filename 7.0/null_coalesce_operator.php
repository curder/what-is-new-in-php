<?php

// Before
$name = isset($_GET['name']) ? $_GET['name'] : 'guest';

// After
$name = $_GET['name'] ?? 'guest'; // 如果变量存在值且不为null，则返回自身的值，否则返回它的第二个操作数

var_dump($name);
