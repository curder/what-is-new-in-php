<?php

function dump(iterable $items)
{
    foreach($items as $item) {
        var_dump($item);
    }
}

class Collection implements IteratorAggregate
{
    protected $items;
    public function __construct($items)
    {
        $this->items = $items;
    }

    public function getIterator()
    {
        return new ArrayIterator($this->items);
    }
}

dump(["one", 'two', 'three']);
dump(new Collection([1, 2, 3]));
