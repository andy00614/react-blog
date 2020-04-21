% title: 对象、原型、原型链
% date: 2019-02-07

# 良好的面向对象系统设计是使应用健壮、可维护性的关键

# JS的面向对象

是基于原型的而不是基于类的，但是由于ESNEXT的进步，JS更加接近传统的面向对象语言

# 自检

- 实现new
- 如何实现集成 es5/es6 继承Date
- JQuery中的对象思想
- 类继承是什么、原型继承是什么，他们的区别
- 面向对象在实战中的场景

# new

## new做了什么

eg: const obj = new Foo()

1. 创建了一个对象 obj
2. 将obj.__proto__ 指向Foo.prototype
3. 将obj的this指向Foo内的this，并执行函数逻辑
4. 根据第3步的执行逻辑，返回obj或者你强行在构造函数中return了一个对象

# defineProperty

它描述了数据属性(一些权限和值)和访问器属性(getter/setter)

## 访问器属性

也就是getter,setter，它的作用是，设置一个值，那么其他的值将会改变

vue就是用的访问器属性，在setter的过程中会出发setter,然后再render

### 如果只写getter不写setter会默认为不可写哦

### 示例

    const book = {
        _year: 2004,
        edition: 1
      };
      Object.defineProperty(book, "year", {
        get() {
          return this._year;
        },
        set(newValue) {
          if (newValue > this._year) {
            this.edition = newValue - this._year;
            this._year = newValue;
          }
        }
      });
      book.year = 2008;
      // 浏览器中打开噢
      console.log(book);

### defineProperties

    let book = {};
      Object.defineProperties(book, {
        _year: {
          writable: true,
          value: 2004
        },
        edition: {
          writable: true,
          value: 1
        },
        year: {
          get:function() {
            return this._year;
          },
          set: function(newValue) {
            if (newValue > this._year) {
              this.edition = newValue - this._year;
              this._year = newValue;
            }
          }
        }
      });
      book.year = 2008
      console.log(book);

### 什么时候用?

# 创建对象的模式

## 工厂模式

其实就是通过函数传递几个属性，还可能有一些特定(固定)的属性方法(不通过函数方式传递)，然后生成公共的对象

    {
      const createPerson = (name, age, job) => {
        return {
          name,
          age,
          job,
          sayName() {
            console.log(this.name);
          }
        };
      };
      const person = createPerson("andy", 23, "engineer");
      console.log(person);
      console.log(person instanceof Object); 
      // console.log(person instanceof createPerson); // 会报错
    }

## 构造函数模式

### 和工厂模式相比

**优点**：

a.可以判断出类型

b.不必写return

    {
      function Person (name, age, job)  {
        this.name = name;
        this.age = age;
        this.job = job;
        this.sayName = () => {
          console.log(this.name);
        };
      };
      const person = new Person("andy", 23, "engineer")
      console.log(person)
      console.log(person instanceof Object)
      console.log(person instanceof Person)
    }

构造函数构造出的对象都有一个construcor的属性，来指向它的构造函数，用来表示，instanceof就是判断它的

**缺点**：

每个实例化的sayName方法实际上都不相等，接着上面的代码写:

    const person1 = new Person('andy',25,'a')
    const person2 = new Person('duruomeng',25,'b')
    console.log(person1.sayName === person2.sayName) // false

实际上没有必要，**那如何解决？**

在全局放一个sayName的方法

    function Person(name, age, job) {
      this.name = name;
      this.age = age;
      this.job = job;
      this.sayName = sayName;
    }
    
    function sayName() {
      alert(this.name);
    }
    
    var person1 = new Person("Nicholas", 29, "Software Engineer");
    var person2 = new Person("Greg", 27, "Doctor");

缺点：放在全局为这一个函数服务肯定不合适啊，**那如何解决？**

## 原型模式

如下，通过prototype共享了sayName

    {
      function PersonProto(name, age, job) {
        this.name = name;
        this.age = age;
        this.job = job;
      }
      PersonProto.prototype.sayName = function() {
        console.log(this.name)
      };
      const personProto = new PersonProto('andy',25,'eng')
      console.log('原型模式',personProto);
      personProto.sayName()
    }

# 理解原型和原型链

无论什么时候，只要创建了一个新函数，就会为函数创建一个prototype属性,这个属性指向函数的原型对象，这个对象是什么呢，默认会有一个constructor属性，指向这个函数(也是构造函数，**这也正是上面说的实例有一个constructor一样**)

## Object.getPrototypeOf

使用 Object.getPrototypeOf() 可以方便地取得一个对象的原型，而这在利用原型实现继承（本章稍后会讨论）的情况下是非常重要的

    {
      function Person(name, age) {
        this.name = name;
        this.age = age;
      }
      Person.prototype.sayName = function() {
        console.log(this.name);
      };
      const person = new Person("andy", 27);
      // console.log(person.sayName())
      // 这样使用
      console.log(Person.prototype.isPrototypeOf(person));
      // es5还增加了一个方法，直接获取实例的隐式原型
      console.log(Object.getPrototypeOf(person))
    }

## 实例中原型(__**proto**__)的属性不可覆盖

    {
      function Person() {}
    
      Person.prototype.name = "andy";
      Person.prototype.age = 25;
      Person.prototype.job = "Software Engineer";
      Person.prototype.sayName = function() {
        console.log(this.name);
      };
      
      const person1 = new Person()
      const person2 = new Person()
    
      person1.age = 30
    
      console.log(person1.age); // 30
      console.log(person2.age); // 25
    
    }

## 判断存在是否存在实例对象中还是存在原型中

`Object.hasOwnProperty('name')`

**记住，这是存在于定向的方法，那肯定就是检测对象中是否存在，而不是原型中**

## 实例和原型连接是松散的(通过指针连接)

一个表现特点就是，即使先实例化了一个对象，后再原型中添加方法。我仍然可以通过实例访问到原型的方法，原因是因为

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b657e20a-b198-45ab-ac11-875c8390e40a/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b657e20a-b198-45ab-ac11-875c8390e40a/Untitled.png)

**总结：**对象和原型的关系就是对象通过Prototype指针连接原型

如果**重写**了Person的原型就不行了

    function Person(){ }
    
    var friend = new Person();
    
    Person.prototype = {
    
    constructor: Person, name : "Nicholas", age : 29, job : "Software Engineer", sayName : function () { alert(this.name); }
    
    };
    
    friend.sayName();
    
    //error

用图解释上面的现象如下：

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/68dc4db9-c968-4f46-8f66-ed05588f7302/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/68dc4db9-c968-4f46-8f66-ed05588f7302/Untitled.png)

## 原生对象的原型：

原生的数据结构，比如[],{},'abc'...都是通过Array,Object,String实例化出来的，所以他们享有这些构造函数的原型方法

## 原型模式的缺点：

引用类型的功能耦合性

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/4a3f2744-a8e0-41c4-b57b-d81ec4682933/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/4a3f2744-a8e0-41c4-b57b-d81ec4682933/Untitled.png)

**解决上面的问题，就可以用构造函数模式加原型模式**

属性都用构造函数模式，方法都用原型模式

    function Person(name, age, job){ this.name = name; this.age = age; this.job = job; this.friends = ["Shelby", "Court"]; }
    
    Person.prototype = { constructor : Person, sayName : function(){ alert(this.name); } }
    
    var person1 = new Person("Nicholas", 29, "Software Engineer"); var person2 = new Person("Greg", 27, "Doctor");
    
    person1.friends.push("Van"); alert(person1.friends); //"Shelby,Count,Van" alert(person2.friends); //"Shelby,Count" alert(person1.friends === person2.friends); alert(person1.sayName === person2.sayName);
    
    //false //true

# 继承

oo语言专属

## 接口继承和实现继承

## 如何实现原型继承

常规方法：

    function SuperType() {
      this.colors = ['red','blue','green']
    }
    function SubType() {}
    
    SubType.prototype = new SuperType()
    
    const instance1 = new SubType()
    
    instance1.colors.push('black')
    
    console.log(instance1.colors);
    
    const instance2 = new SubType()
     
    console.log(instance2.colors);

### 有什么问题

1. 如果继承的父类有实例属性且是引用类型，则子类新生成的实例下，该属性不独立
2. 在创建子类型的实例时，不能向超类型的构造函数中传递参数 暂时每太看懂

    上面这个问题其实就是如下实现，也是class中super的概念

        function SuperType(name){ this.name = name; }
        
        function SubType(){
        
        //继承了 SuperType，同时还传递了参数 SuperType.call(this, "Nicholas");
        
        //实例属性 this.age = 29;
        
        }
        
        var instance = new SubType(); alert(instance.name); //"Nicholas"; alert(instance.age); //29

## 如何实现继承(解决上面问题)

## 1.借用构造函数方式

    {
      function SuperType() {
        this.colors = ["red", "blue", "green"];
      }
      function SubType() {
        SuperType.call(this)
      }
      const instance1 = new SubType()
      instance1.colors.push('black');
      console.log(instance1.colors);
      const instance2 = new SubType()
      console.log(instance2.colors)
    }