---
title: C++设计模式笔记——原型模式
lang: zh-CN
date: 2024-07-03
tags:
  - 学习
  - 笔记
summary: 原型模式
---

<h1>C++设计模式笔记——原型模式 </h1>


> 《西游记》里孙悟空拔毛变出小猴子的故事几乎人人皆知。孙悟空可以用猴毛根据自己的形象，复制（又称克隆）出很多跟自己长得一模一样的分身来，在设计模式中也存在一个类似的模式，可以通过一个原型对象克隆出多个一模一样的对象，该模式称之为原型模式。
>
> ​																			---《设计模式的艺术：软件开发人员内功修炼之道》



## 引言

在软件设计中，原型设计模式（Prototype Pattern）是一种创建型设计模式，它允许你通过复制现有对象来创建新对象，而无需使代码依赖它们的具体类。这种模式特别适用于当你需要创建大量相似的对象时。本文将通过一个具体的游戏示例来详细介绍原型设计模式的工作原理和实现方法。

## 克隆的基本概念

### 什么是克隆？

克隆是指创建一个对象的过程，该过程不需要调用构造函数，而是通过复制现有的对象来生成新的对象。这种方式可以显著提高性能，特别是在对象创建成本较高的情况下。

### 克隆体的独立性

克隆出来的对象与原对象是完全独立的。修改克隆对象的状态不会影响原对象的状态。这使得克隆非常适合用于创建具有相同属性但不同状态的对象。

#### 示例：简单的克隆实现

假设我们有一个 `Monster` 类，表示游戏中的怪物。我们将演示如何通过拷贝构造函数来实现克隆功能。

```cpp
#include <iostream>
#include <string>

// 单个怪物类
class Monster {
private:
    std::string name;
    int health;

public:
    Monster(const std::string& n, int h) : name(n), health(h) {}

    // 拷贝构造函数
    Monster(const Monster& other) : name(other.name), health(other.health) {}

    void display() const {
        std::cout << "Monster: " << name << ", Health: " << health << std::endl;
    }

    void setHealth(int h) {
        health = h;
    }

    int getHealth() const {
        return health;
    }
};

int main() {
    // 创建原始怪物对象
    Monster original("Fire Dragon", 100);
    original.display();

    // 通过拷贝构造函数克隆怪物对象
    Monster clone(original);
    clone.display();

    // 修改克隆对象的状态
    clone.setHealth(90);
    clone.display();

    // 显示原始对象的状态以验证独立性
    original.display();

    return 0;
}
```

### 运行结果

运行上述代码，输出如下：

```
Monster: Fire Dragon, Health: 100
Monster: Fire Dragon, Health: 100
Monster: Fire Dragon, Health: 90
Monster: Fire Dragon, Health: 100
```

从输出结果可以看出，克隆出来的怪物对象 `clone` 是独立于原始对象 `original` 的。修改克隆对象的状态不会影响原始对象的状态。

## 引入原型接口类

虽然使用拷贝构造函数可以实现克隆功能，但在实际应用中，特别是当有多种类型的对象需要克隆时，这种方法可能会变得不够灵活和可扩展。因此，我们需要引入原型接口类来统一管理克隆操作。

### 为什么需要原型接口类？

- **统一接口**：通过定义一个统一的克隆接口，可以使所有需要克隆的对象遵循相同的协议。
- **灵活性**：可以轻松添加新的对象类型，而不需要修改客户端代码。
- **简化管理**：集中管理所有的原型对象，便于维护和扩展。

### 定义原型接口

首先，我们定义一个抽象基类 `Monster`，其中包含纯虚函数 `clone`、`display`、`setHealth` 和 `getHealth`。

```cpp
#include <iostream>
#include <string>
#include <unordered_map>
#include <memory>

// 原型接口
class Monster {
public:
    virtual ~Monster() {}
    virtual std::shared_ptr<Monster> clone() const = 0;
    virtual void display() const = 0;
    virtual void setHealth(int health) = 0;
    virtual int getHealth() const = 0;
};
```

### 实现具体原型类

接下来，我们为每种怪物创建具体的原型类，并实现 `clone` 方法。这里我们使用 `std::make_shared` 来创建新的对象，并返回 `std::shared_ptr`。

```cpp
// 具体原型类：龙
class Dragon : public Monster {
private:
    std::string name;
    int health;

public:
    Dragon(const std::string& n, int h) : name(n), health(h) {}

    // 实现克隆方法
    std::shared_ptr<Monster> clone() const override {
        return std::make_shared<Dragon>(*this);
    }

    void display() const override {
        std::cout << "Dragon: " << name << ", Health: " << health << std::endl;
    }

    void setHealth(int h) override {
        health = h;
    }

    int getHealth() const override {
        return health;
    }
};

// 具体原型类：巨人
class Giant : public Monster {
private:
    std::string name;
    int health;

public:
    Giant(const std::string& n, int h) : name(n), health(h) {}

    // 实现克隆方法
    std::shared_ptr<Monster> clone() const override {
        return std::make_shared<Giant>(*this);
    }

    void display() const override {
        std::cout << "Giant: " << name << ", Health: " << health << std::endl;
    }

    void setHealth(int h) override {
        health = h;
    }

    int getHealth() const override {
        return health;
    }
};

// 具体原型类：幽灵
class Ghost : public Monster {
private:
    std::string name;
    int health;

public:
    Ghost(const std::string& n, int h) : name(n), health(h) {}

    // 实现克隆方法
    std::shared_ptr<Monster> clone() const override {
        return std::make_shared<Ghost>(*this);
    }

    void display() const override {
        std::cout << "Ghost: " << name << ", Health: " << health << std::endl;
    }

    void setHealth(int h) override {
        health = h;
    }

    int getHealth() const override {
        return health;
    }
};
```

### 创建原型管理器

为了方便管理不同的原型对象，我们创建一个 `MonsterFactory` 类。在这个类中，我们使用 `std::shared_ptr` 来存储和管理原型对象。

```cpp
// 原型管理器
class MonsterFactory {
private:
    std::unordered_map<std::string, std::shared_ptr<Monster>> prototypes;

public:
    void registerPrototype(const std::string& key, std::shared_ptr<Monster> prototype) {
        prototypes[key] = prototype;
    }

    std::shared_ptr<Monster> createMonster(const std::string& key) const {
        if (prototypes.find(key) != prototypes.end()) {
            return prototypes.at(key)->clone();
        }
        return nullptr;
    }
};
```

### 使用原型模式

最后，在 `main` 函数中，我们使用 `MonsterFactory` 来创建和管理怪物对象。

```cpp
int main() {
    // 创建原型管理器并注册原型对象
    MonsterFactory factory;
    factory.registerPrototype("Dragon", std::make_shared<Dragon>("Fire Dragon", 100));
    factory.registerPrototype("Giant", std::make_shared<Giant>("Stone Giant", 80));
    factory.registerPrototype("Ghost", std::make_shared<Ghost>("Shadow Ghost", 50));

    // 使用原型管理器创建新的怪物
    std::shared_ptr<Monster> dragon1 = factory.createMonster("Dragon");
    std::shared_ptr<Monster> giant1 = factory.createMonster("Giant");
    std::shared_ptr<Monster> ghost1 = factory.createMonster("Ghost");

    // 显示初始状态
    std::cout << "Initial States:" << std::endl;
    dragon1->display();
    giant1->display();
    ghost1->display();

    // 修改克隆对象的状态
    dragon1->setHealth(90);
    giant1->setHealth(70);
    ghost1->setHealth(40);

    // 再次显示状态以验证独立性
    std::cout << "\nAfter Modifications:" << std::endl;
    dragon1->display();
    giant1->display();
    ghost1->display();

    // 创建更多怪物并验证独立性
    std::shared_ptr<Monster> dragon2 = factory.createMonster("Dragon");
    std::shared_ptr<Monster> giant2 = factory.createMonster("Giant");
    std::shared_ptr<Monster> ghost2 = factory.createMonster("Ghost");

    // 显示新创建的怪物状态
    std::cout << "\nNew Monsters Created:" << std::endl;
    dragon2->display();
    giant2->display();
    ghost2->display();

    return 0;
}
```

### 运行结果

运行上述代码，输出如下：

```
Initial States:
Dragon: Fire Dragon, Health: 100
Giant: Stone Giant, Health: 80
Ghost: Shadow Ghost, Health: 50

After Modifications:
Dragon: Fire Dragon, Health: 90
Giant: Stone Giant, Health: 70
Ghost: Shadow Ghost, Health: 40

New Monsters Created:
Dragon: Fire Dragon, Health: 100
Giant: Stone Giant, Health: 80
Ghost: Shadow Ghost, Health: 50
```

从输出结果可以看出，克隆出来的怪物对象是互相独立的。修改其中一个怪物对象的状态不会影响其他怪物对象的状态。



## 总结

通过使用原型设计模式，我们可以高效地创建大量相似的对象，并且通过使用智能指针（如 `std::shared_ptr`），我们可以更安全地管理动态内存，避免手动管理内存带来的潜在问题。在实际项目中，推荐结合这两种技术来提高代码的健壮性和可维护性。



