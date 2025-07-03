---
title: C++设计模式笔记——策略模式
lang: zh-CN
date: 2024-07-03
tags:
  - 学习
  - 笔记
summary: 策略模式
---
<h2>c++设计模板笔记---策略模式</h2>

> **策略模式**是一种行为设计模式， 它能让你定义一系列算法， 并将每种算法分别放入独立的类中， 以使算法的对象能够相互替换。			
>
> ​																								——[策略设计模式 (refactoringguru.cn)](https://refactoringguru.cn/design-patterns/strategy)

假设你在开发一个税率计算工具，可以计算中国和美国的税率：

```cpp
//--------taxCalStrategy.h----
#ifndef _TAX_CAL_STRATEGY_
#define _TAX_CAL_STRATEGY_

enum class TaxCountry
{
    CN = 0, //中国
    US		//美国
};

class TaxCalStrategy
{
public:
    TaxCalStrategy(TaxCountry taxCountry):taxBase(taxCountry){};
    ~TaxCalStrategy() = default;
    void calTax(/*一些参数*/);
private:
    TaxCountry taxBase;
};

#endif

//-----taxCalStrategy.cpp-----
#include <iostream>
#include "taxCalStrategy.h"


void TaxCalStrategy::calTax(/*一些参数*/)
{
    if (TaxCountry::CN == taxBase)
    {
        std::cout<<"计算中国税率"<<std::endl;
        //省略具体计算逻辑
    }
    else if(TaxCountry::US == taxBase)
    {
        std::cout<<"计算美国税率"<<std::endl;
        //省略具体计算逻辑
    }

}
```

 我们可以这么使用：

```cpp
//-----main.cpp-----

#include "taxCalStrategy.h"
int main()
{
    TaxCalStrategy cnTaxCalculator(TaxCountry::CN);
    cnTaxCalculator.calTax();
    TaxCalStrategy euTaxCalculator(TaxCountry::US);
    euTaxCalculator.calTax();
}
```

输出结果：

```cpp
计算中国税率
计算美国税率
```

现在，甲方希望这个工具也能计算法国、德国的税率，需要对程序就行扩展：

```cpp
//--------taxCalStrategy.h----
#ifndef _TAX_CAL_STRATEGY_
#define _TAX_CAL_STRATEGY_

enum class TaxCountry
{
    CN = 0, //中国
    US,		//美国
    FR,		//法国
    DE		//德国
};

class TaxCalStrategy
{
public:
    TaxCalStrategy(TaxCountry taxCountry):taxBase(taxCountry){};
    ~TaxCalStrategy() = default;
    void calTax(/*一些参数*/);
private:
    TaxCountry taxBase;
};

#endif

//-----taxCalStrategy.cpp-----
#include <iostream>
#include "taxCalStrategy.h"


void TaxCalStrategy::calTax(/*一些参数*/)
{
    if (TaxCountry::CN == taxBase)
    {
        std::cout<<"计算中国税率"<<std::endl;
        //省略具体计算逻辑
    }
    else if(TaxCountry::US == taxBase)
    {
        std::cout<<"计算美国税率"<<std::endl;
        //省略具体计算逻辑
    }
    else if(TaxCountry::FR == taxBase)
    {
        std::cout<<"计算法国税率"<<std::endl;
        //省略具体计算逻辑
    }
    else if(TaxCountry::DE == taxBase)
    {
        std::cout<<"计算德国税率"<<std::endl;
        //省略具体计算逻辑
    }
}
```

<h2>问题分析</h2>

我们很容易发现问题，每扩展一次其他国家的税率计算策略，都需要对`taxCal.cpp`和`taxCal.h`进行修改，违反了开闭原则（对扩展开放，对修改关闭）。随着扩展支持越来越多国家的税率计算，代码会非常冗长，并且每次修改，所以包含`taxCal.h`的源文件都需要重新编译。



<h2>策略模式</h2>

我们可以引入策略模式，将税率计算策略抽象出来:

```cpp
//-----taxCalStrategy.h-----

#ifndef _TAX_CAL_STRATEGY_H_
#define _TAX_CAL_STRATEGY_H_

class TaxCalStrategy
{
public:
    ~TaxCalStrategy() = default;
    virtual void calTax() = 0;

};
#endif
```

具体的计算策略继承自`TaxCalStrategy`:

```cpp
//-----cnTaxCalStrategy.h-----
#include <iostream>
#include "taxCalStrategy.h"

class CNTaxStrategy:public TaxCalStrategy
{
public:
    ~CNTaxStrategy() = default;
    void calTax();
};

//-----cnTaxCalStrategy.cpp-----
#include <iostream>
#include "cnTaxStrategy.h"

void  CNTaxStrategy::calTax()
{
    std::cout<<"计算中国税率"<<std::endl;
}
```

接着用`Context`类来维护指向具体策略的引用：

```cpp
#ifndef _CONTEXT_
#define _CONTEXT_

#include<memory>
#include "taxCalStrategy.h"

class Context
{
public:
    Context(std::unique_ptr<TaxCalStrategy> taxStratety):mTaxStrategy(std::move(taxStratety)){};
    ~Context() = default;

    void impl()
    {
        mTaxStrategy->calTax();
    }
private:
    std::unique_ptr<TaxCalStrategy> mTaxStrategy;
};

#endif
```

我们可以这么使用：

 ```cpp
 #include <memory>
 #include "cnTaxStrategy.h"
 #include "Context.h"
 
 
 int main()
 {
     std::unique_ptr<TaxCalStrategy> cnTax = std::make_unique<CNTaxStrategy>();
     std::unique_ptr<Context>  context = std::make_unique<Context>(std::move(cnTax));
     context->impl();
 }
 ```

现在如果我们扩展计算税率的策略，只需要新增这个策略的头文件和源文件，并将新的头文件和源文件加到编译路径中即可，不需要修改原有代码：

```cpp
//-----usTaxCalStrategy.h-----
#include <iostream>
#include "taxCalStrategy.h"

class USTaxStrategy:public TaxCalStrategy
{
public:
    ~CNTaxStrategy() = default;
    void calTax();
};

//-----usTaxCalStrategy.cpp-----
#include <iostream>
#include "usTaxStrategy.h"

void  USTaxStrategy::calTax()
{
    std::cout<<"计算美国税率"<<std::endl;
}
```

<h2>小结</h2>

引入策略模式前，每次新增国家的税率计算，都需要修改核心的头文件和源文件，导致代码的可维护性和扩展性较差。引入策略模式后，将税率计算策略抽象出来，使得新增国家的税率计算只需新增相应策略的头文件和源文件，无需修改原有核心代码，提高了代码的可维护性、扩展性和灵活性。

<h2>使用std::function消除继承和虚函数</h2>

在传统的实现方法中，具体策略继承自抽象策略，并基于虚函数实现多态。但虚函数会造成部分性能问题：

- 虚函数增加了运行时开销，并减少了编译器进行优化的机会。
- 大量的小型多态对象的分配会增加额外的运行时间，导致内存碎片化，并造成缓存使用效率低下。
- 数据的布局方式往往与数据访问模式相悖，不利于高效的数据访问。

我们可以引入std::function来消除策略模式中的继承和虚函数。首先，我们看具体策略类`CNTaxStrategy`不再继承自抽象策略类`TaxCalStrategy`：

```cpp
//-----cnTaxStrategy.h-----

#include <iostream>

class CNTaxStrategy
{
public:
    ~CNTaxStrategy() = default;
    void operator()();
};

//-----cnTaxStrategy.cpp-----
#include <iostream>
#include "cnTaxStrategy.h"

void  CNTaxStrategy::operator()()
{
    std::cout<<"计算中国税率"<<std::endl;
}
```

由于具体策略类不再继承自抽象类，所有也不再需要抽象类。接着是上下文`Context`类：

```cpp
//-----Context.h-----

#ifndef _CONTEXT_
#define _CONTEXT_

#include<memory>
#include <functional>

class Context
{
public:
    using TaxCalStrategy = std::function<void(void)>;
    Context(TaxCalStrategy taxStratety):mTaxStrategy(std::move(taxStratety)){};
    ~Context() = default;

    void impl()
    {
        mTaxStrategy();
    }
private:
    TaxCalStrategy mTaxStrategy;
};

#endif
```

我们可以这么使用：

```cpp
#include <memory>
#include "cnTaxStrategy.h"
#include "Context.h"


int main()
{
    std::unique_ptr<Context>  context = std::make_unique<Context>(CNTaxStrategy() );
    context->impl();
}
```

