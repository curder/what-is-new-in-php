---
sidebarDepth: 3
sidebar: auto
---

# PHP 8.0

## [Nullsafe 运算符](https://www.php.net/releases/8.0/zh.php#nullsafe-operator)

现在可以用新的 nullsafe 运算符链式调用，而不需要条件检查 null。 如果链条中的一个元素失败了，整个链条会中止并认定为 Null。

```php
<?php
class User
{
    public function profile()
    {
        return null; // return new Profile;
    }
}
class Profile
{
    public function employment()
    {
        return 'web development';
    }
}


$user = new User;

// 之前的写法，先判断是否存在，再进行调用
if ($profile = $user->profile()) {
    var_dump($profile->employment());
}

// 8.0 允许通过 nullsafe 进行链式调用
var_dump($user->profile()?->employment() ?? 'Not Provider');
```

## [Match 表达式](https://www.php.net/releases/8.0/zh.php#match-expression)

新的 `match` 类似于 `switch`，并具有以下功能：

- Match 是一个表达式，它可以储存到变量中亦可以直接返回。
- Match 分支仅支持单行，它不需要一个 `break;` 语句。
- Match 使用严格比较。

```php
<?php
class Conversation
{
    //
}

$object = new Conversation;

//switch (get_class($object)) {
//    case 'Conversation':
//        $type = 'started_conversation';
//        break;
//
//    case 'Reply':
//        $type = 'replied_to_conversation';
//        break;
//
//    case 'Comment':
//        $type = 'commented_to_conversation';
//        break;
//}

// 使用match表达式简化写法
$type = match (get_class($object)) {
    'Conversation' => 'stated_conversation',
    'Reply' => 'replied_to_conversation',
    'Comment' => 'commented_to_conversation',
};

echo $type;
```
