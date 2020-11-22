## 命名空间引用优化

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
