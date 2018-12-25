# typescript-learn


## typescript

### 安装 typrscript 

     npm i typescript -g 

### 格式化 tsconfig.json

    tsc --init

## demo1

   ```
    let name:string = 'hello typescript'
    console.log(name)
    export {}   /// 避免使用的全局的 name
   ```

在 TS 自带的类型声明里面，已经声明了全局变量 `declare const name:naver`, 也即 `window.name`。所以，如果你再在全局作用域中声明 `name` 的话，就属于重复声明了。

//你可以试着把它放进函数或模块里


## demo2

介绍了基础类型

- **布尔值**

   ```
   let bool:boolean = false
   ```

- **数字**

   ```
   let num:number = 6
   ```

- **字符串**

    ```
    let str = 'string'
    ```

- **数组**

    有两种方式可以定义数组

   ```
   let arr:number[] = [1,2,3]
   ```

   ```
   let array:Array<number> = [1,2,3]
   ```
- **元组 Tuple**

    元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同。

   ```
   let arr1:[Number,String] = [1,'hbb']
   ```
- **Any 任意类型**

  还不清楚类型的变量指定一个类型。 这些值可能来自于动态的内容，希望直接让它们通过编译阶段的检查。 那么我们可以使用 any类型来标记这些变量

  ```
  let age:any = 'hbb'
  let Age:any = true
  let age1:any = [1,2,3]
  ```


## demo3
      
- ### 函数定义方式 

    ```
    function add () {}
    const add = function () {}
    const add = () => {}
    ```
- ### 必选参数
 
   ```
    const add = function (num1:number,num2:number):number {
      return num1+num2
    }
   ```

- ### 可选参数

  可选参数必须跟在必选参数后面    没传参的时候，它的值就是undefined

   ```
    const Add = function (a:number,b?:number):number{
      if(b){
        return a+b
      }else{
        return a
      }
    }

    console.log(add1(1))   // 1
    console.log(add1(1,2))  // 3
   ```

- ### 默认参数

    可以为参数提供一个默认值当用户没有传递这个参数或传递的值是undefined时。 它们叫做有默认初始化值的参数。  

    ```
    const add1 = function (a:number,b:number = 6):number{
      if(b){
        return a+b
      }else{
        return a
      }
    }

    console.log(add1(1,2))  // 3
    console.log(add1(1))   // 7 
    ```
    带默认值的参数不需要放在必须参数的后面

- ### 剩余参数

  有时，你想同时操作多个参数，或者你并不知道会有多少参数传递进来。 在JavaScript里，你可以使用 arguments来访问所有传入的参数。

  剩余参数会被当做个数不限的可选参数。 可以一个都没有，同样也可以有任意个

    ```
    const add2 = function (a:number,b:number,...arg:number[]):number  {
      console.log(a,b,arg)
      if(arg.length){
        return a+b+arg[0]
      }else{
        return a+b
      }
    }

    console.log(add2(1,2,3,4,5,6,7))
    console.log(add2(1,2))

    // 1,2,[3,4,5,6,7]
    // 6
    // 1,2,[]
    // 3
    ```
## demo4 


  `class` 类

  定义了一件事物的抽象特点，包含它的属性和方法。

  ```
  class Greeter {
    greeting:string;
    constructor(msg:string){
      this.greeting = msg
    }
    greet():string{
      return `hello ${this.greeting}`
    }
  }

  let greeter = new Greeter('world')
  console.log(greeter.greet())   // hello world
  ```
  - ###  继承
    使用继承来扩展现有的类。

    ```
    class Greeter1 extends Greeter{
      greetExtends():string{
        return `hello ${this.greeting} Greeter`
      }
    }
    ```
    Greeter1 从 Greeter中继承了属性及方法  

    这里， Greeter1 派生类，它派生自 Greeter 基类，通过 extends关键字。 派生类通常被称作 子类，基类通常被称作 超类。
    ```
    let greeter1 = new Greeter1('extends')

    console.log(greeter1.greet())  //   hello extends
    console.log(greeter1.greetExtends())   //  hello extends Greeter
    ```

    constructor方法是类的默认方法，通过new命令生成对象实例时，自动调用该方法。一个类必须有constructor方法，如果没有显式定义，一个空的constructor方法会被默认添加。

  - ###  取值函数（getter）和存值函数（setter）

    在“类”的内部可以使用get和set关键字，对某个属性设置存值函数和取值函数

    ```
    class Myclass {
      constructor(){
      }
      get prop ():string{
        return 'get'
      }
      set prop (val:string) {
        console.log(`set    ${val}`) 
      }
    }

    let inst = new Myclass()
    // 存取器要求你将编译器设置为输出ECMAScript 5或更高

    console.log(inst.prop)    // get   //取值
    inst.prop='hbb'   // set hbb   // 赋值
    ```
  - ### 静态方法

     类相当于实例的原型，所有在类中定义的方法，都会被实例继承。如果在一个方法前，加上static关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”。

     ```
    class Method {
      GetMethod():string{
        return 'getMethod'
      }

      SetMethod():string{
        return 'setMethod'
      }

      static classMethod():string {
        return 'hello';
      }

      static getMethod():string{
        return this.classMethod()
      }
    }
     ```

        console.log(Method.classMethod())   // 'hello'
    在类的本身我们可以调用自身的静态方法：classMethod

    创建一个实例 foo

        var foo = new Method();
        foo.classMethod()     // foo 的属性上不存在classMethod方法。

    Method类的classMethod方法前有static关键字，表明该方法是一个静态方法，可以直接在Foo类上调用,不能在Method调用  getMethod,classMethod 方法

    **getMethod里使用了this、 指向Method，调用 classMethod方法**

        console.log(Method.getMethod())  //hello

    - ### 父类的静态方法，可以被子类继承。

      ```
      class MethodSon extends Method{
        
      }

      console.log(MethodSon.getMethod())  //hello
      ```


    - ### 静态方法也是可以从super对象上调用的。

      ```
      class MethodSec extends Method{
        static classMethod() {
          return super.classMethod() + ', MethodSec';
        }
      }

      console.log(MethodSec.getMethod())  // hello,MethodSec
      ```

  - ###  `public, private, protected`

    ```
    class Age {

      private name:string = 'hbb'
      age:number;
      readonly sex:string = 'man'
      protected ageN:number = 20;
    }
    ```

    public: 可以自由的访问

    private:  它就不能在声明它的类的外部访问

    protected: protected成员在派生类中仍然可以访问

    ```
    let Nage = new Age(20)

    console.log(Nage.age,Nage.name,Nage.ageN,'private')  // 20 '属性“name”为私有属性，只能在类“Age”中访问','属性“ageN”受保护，只能在类“Age”及其子类中访问', 'private'
    ```
    子类必须在`constructor`方法中调用`super`方法，否则新建实例时会报错  。

    ES6 要求，子类的构造函数必须执行一次super函数。

    ```

    定义了Father类。

    class Father {
      name:string

      constructor(name:string){
        this.name = name
      }

      toString(){
        return this.name
      }

    }
    ```
      Son从Father类中继承

    ```
    class Son extends Father {
      name:string

      constructor(name:string){   
        // super(name)   //代表父类的构造函数  没有的话会报  派生类的构造函数必须包含 "super" 调用
        this.name = name
      }
    }
    ```