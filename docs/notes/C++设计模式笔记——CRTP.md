<h1>CRTP note

> CRTP(curiously recurring template pattern, 奇异递归模式)，这个名字奇怪的模式，是一种将继承和静态多态结合的技术。
>
> 多态是一种用单个统一的符号将多种特定行为关联起来的能力，是面向对象编的基石，在 C++中它主要由继承和虚函数实现。由于这一机制主要（至少是一部分）在运行期间起作用，因此我们称之为动态多态（dynamic polymorphism）。它也是我们通常在讨论 C++中的简单多态时所指的多态。但是，模板也允许我们用单个统一符号将不同的特定行为 关联起来，不过该关联主要发生在编译期间，我们称之为静态多态（static polymorphism）。【template】 






<h2>使用CRTP的动机

性能在C++中极为重要，而使用虚函数存在性能开销。因此，在对性能敏感的环境中，例如计算机游戏或高频交易的某些部分，不会使用虚函数。在高性能计算（HPC）中也是如此。在HPC中，任何类型的条件判断或间接寻址，包括虚函数，都被禁止在性能最关键的部分使用【设计模式】。

接下来将举一个例子，并分别用动态多态、静态多态和CRTP实现。
<h2>动态多态

假设有一个基类`Base`,其中有一个纯虚函数`impl()`

```cpp
class Base
{
public:
    virtual void impl()=0;
    
};
```

接着由两个`Base`的派生类:`D1`,` D2`,各自实现了`impl()`函数:

```cpp
class D1:public Base
{
public:
    virtual void impl() override
    {
        std::cout<<"D1:impl()"<<std::endl;
    }
};

class D2:public Base
{
public:
    virtual void impl() override
    {
        std::cout<<"D2:impl()"<<std::endl;
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

<h2>静态多态

同样可以用静态多态来实现上面的功能，静态多态通过模板来实现，首先同样是定义类`D1`和`D2`,不同的是这回它们不再是派生类：

```cpp
class D1
{
public:
    void impl() 
    {
        std::cout<<"D1:impl()"<<std::endl;
    }
};

class D2
{
public:
    void impl() 
    {
        std::cout<<"D2:impl()"<<std::endl;
    }
};
```

接着实现一个模板函数:

```cpp
template <typename T>
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

静态多态在编译器就确认了exec中具体调用哪个函数，比动态多态在运行期根据虚函数表去查找有性能的提升。但是静态多态有个问题，没有继承即没有代码复用。意味着就算`D1`类和`D2`类中其他函数都相同，只有`impl`函数的实现不同，`D1`和`D2`类还是要重复那些实现相同的函数。

<h2>CRTP
</h2>

```cpp
template <typename T>
class Base
{
    void impl()
    {
        static_cast<T *>(this)->impl();
    }
    void exec()
    {
        std::cout<<"Base::exec()"<<std::endl;
    }
}


```

```cpp
class D1:Base<D1>
{
public:
    void impl() 
    {
        std::cout<<"D1:impl()"<<std::endl;
    }
};

class D2:Base<D2>
{
public:
    void impl() 
    {
        std::cout<<"D2:impl()"<<std::endl;
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

this is an [example][1].



CRTP结合了继承和静态多态。

