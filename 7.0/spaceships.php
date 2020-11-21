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
