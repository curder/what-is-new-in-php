---
sidebarDepth: 3
sidebar: auto
---

# PHP 8.1

## [枚举](https://www.php.net/releases/8.1/zh.php#enumerations)

在 PHP 中， 枚举是一种特殊类型的对象。Enum 本身是一个类（Class）， 它的各种条目（case）是这个类的单例对象，意味着也是个有效对象 —— 包括类型的检测，能用对象的地方，也可以用它。

最常见的枚举例子是内置的 boolean 类型， 该枚举类型有两个有效值 true 和 false。 Enum 使开发者能够任意定义出用户自己的、足够健壮的枚举。

### 基本用法

```php
<?php
enum SortOrder
{
    case ASC;
    case DESC;
}

function query($fields, $filter, SortOrder $order = SortOrder::ASC) {
//
}
?>
```

> 由于确保 `$order` 不是 `SortOrder::ASC` 就是 `SortOrder::DESC`，所以 `query()` 函数能安全处理。 因为其他任意值都会导致 `TypeError`， 所以不需要额外的错误检查。
              
### 高级用法

```bash
<?php
enum UserStatus: string
{
    case Pending = 'P';
    case Active = 'A';
    case Suspended = 'S';
    case CanceledByUser = 'C';

    public function label(): string
    {
        return match($this) {
            self::Pending => 'Pending',
            self::Active => 'Active',
            self::Suspended => 'Suspended',
            self::CanceledByUser => 'Canceled by user',
        };
    }
}

UserStatus::Pending->name     // 获取枚举名
UserStatus::Pending->value    // 获取枚举值, 比如例子中的字符串
UserStatus::cases()           // 获取枚举列表
UserStatus::Pending->label()  // 调用枚举方法获取对应返回值

// 渲染下拉选项结构
foreach (UserStatus::cases() as $case) {
    printf('<option value="%s">%s</option>\n', $case->value, $case->label());
}

// UserStatus::Pending === 'P'; // 错误的写法,不应该用枚举值跟标量值进行比对
// UserStatus::Pending === UserStatus::from('P'); // 可以通过 from 静态方法获取枚举实例
// UserStatus::Pending === UserStatus::tryFrom('P'); // 或者通过 tryFrom 静态方法获取枚举实例，当值不存在时会返回NULL
```

> 用户的状态是 `UserStatus::Pending`、 `UserStatus::Active`、 `UserStatus::Suspended`、 `UserStatus::CanceledByUser` 中的一个，具有独占性。 函数可以根据 `UserStatus` 设置参数类型，仅支持这四种值。
> 
> 所有四个值都有一个 `label()` 方法，返回了人类可读的字符串。
> 
> 它独立于等同于标量的“机器名”。 机器名用于类似数据库字段或 `HTML` 选择框这样的地方。
