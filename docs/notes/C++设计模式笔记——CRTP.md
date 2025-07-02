---
title: C++设计模式笔记——CRTP
lang: zh-CN
date: 2024-07-03
tags:
  - 学习
  - 笔记
summary: CRTP
---
# C++设计模式笔记——CRTP

CRTP(curiously recurring template pattern, 奇异递归模式)，这个名字奇怪的模式，是一种将继承和静态多态结合的技术。

> 多态是一种用单个统一的符号将多种特定行为关联起来的能力，是面向对象编的基石，在 C++中它主要由继承和虚函数实现。由于这一机制主要（至少是一部分）在运行期间起作用，因此我们称之为动态多态（dynamic polymorphism）。它也是我们通常在讨论 C++中的简单多态时所指的多态。但是，模板也允许我们用单个统一符号将不同的特定行为 关联起来，不过该关联主要发生在编译期间，我们称之为静态多态（static polymorphism）。                                                                                     

## **使用CRTP的动机**

> 性能在C++中极为重要，而使用虚函数存在性能开销。因此，在对性能敏感的环境中，例如计算机游戏或高频交易的某些部分，不会使用虚函数。在高性能计算（HPC）中也是如此。在HPC中，任何类型的条件判断或间接寻址，包括虚函数，都被禁止在性能最关键的部分使用。                             

接下来将举一个例子，分别用动态多态、静态多态和CRTP实现，例子原型来自：

Curiously Recurring Template Patternen.cppreference.com/w/cpp/language/crtp

## 动态多态实现

假设有一个基类Base,其中有一个纯虚函数impl()

```cpp
class Base
{
public:
    virtual void impl()=0;
};
```

接着有两个Base的派生类:D1,D2,各自实现了impl()函数:

```cpp
class D1:public Base
{
public:
    virtual void impl() override
    {
        std::cout&lt;&lt;"D1:impl()"&lt;&lt;std::endl;
    }
};

class D2:public Base
{
public:
    virtual void impl() override
    {
        std::cout&lt;&lt;"D2:impl()"&lt;&lt;std::endl;
    }
};
```

我们可以在函数中调用：

```cpp
void exec(Base &obj)
{
    obj.impl();
}

int main()
{
    D1 d1;
    D2 d2;
    exec(d1);
    exec(d2);
    return 0;
}
```

结果就会打印输出：

```cpp
D1::impl()
D2::impl()
```

## **静态多态实现**

同样可以用静态多态来实现上面的功能，静态多态通过模板来实现，首先同样是定义类D1和D2,不同的是这回它们不再是派生类：

```cpp
class D1
{
public:
    void impl() 
    {
        std::cout&lt;&lt;"D1:impl()"&lt;&lt;std::endl;
    }
};

class D2
{
public:
    void impl() 
    {
        std::cout&lt;&lt;"D2:impl()"&lt;&lt;std::endl;
    }
};
```

接着实现一个模板函数:

```cpp
template &lt;typename T&gt;
void exec(T obj)
{
    obj.impl();
}
```

我们就可以调用这个函数达到多态的目的：

```cpp
int main()
{
    D1 d1;
    D2 d2;
    exec(d1);
    exec(d2);
    return 0; 
}
```

结果同样会打印输出：

```cpp
D1::impl()
D2::impl()
```

静态多态在编译器就确认了exec中具体调用哪个函数，比动态多态在运行期根据虚函数表去查找有性能的提升。但是从静态多态的例子中我们可以发现，D1和D2不是继承某个基类，意味着没有代码复用。就算D1类和D2类中其他函数都相同，只有impl函数的实现不同，D1和D2类还是要重复那些实现相同的函数。

## **CRTP 模式实现**

CRTP模式将继承和静态多态结合，既能通过静态多态提升性能，也能通过继承进行代码复用。CRTP实际实现是将派生类作为模板参数传递给其某个基类。

首先定义一个模板基类Base:

```cpp
template &lt;typename T&gt;
class Base
{
    void impl()
    {
        static_cast&lt;T *&gt;(this)-&gt;impl();
    }
    void exec()
    {
        std::cout&lt;&lt;"Base::exec()"&lt;&lt;std::endl;
    }
};
```

接着D1和D2分别将自己作为模板参数传递给Base：

```cpp
class D1:Base&lt;D1&gt;
{
public:
    void impl() 
    {
        std::cout&lt;&lt;"D1:impl()"&lt;&lt;std::endl;
    }
};

class D2:Base&lt;D2&gt;
{
public:
    void impl() 
    {
        std::cout&lt;&lt;"D2:impl()"&lt;&lt;std::endl;
    }
};
```

我们就可以使用：

```cpp
int main()
{
    D1 d1;
    D2 d2;
    d1.impl();
    d2.impl();
    d1.exec();
    d2.exec();
    return 0;
}
```

输出结果是：

```cpp
D1::impl()
D2::impl()
Base::exec()
Base::exec()
```

**CRTP的缺点**

CRTP的例子中我们可以发现，D1和D2缺少共同的基类，没错，D1和D2继承的不是同一个基类。 D1的基类是Base&lt;D1&gt;,D2的基类是Base&lt;D2&gt;。

> 因此，每当需要一个共同的基类时，例如，为了在一个集合中存储不同类型而需要的共同抽象，CRTP设计模式就不是正确的选择。                                                                                

