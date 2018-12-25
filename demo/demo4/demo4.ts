// class 
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


 // 继承
//  使用继承来扩展现有的类。

class Greeter1 extends Greeter{
  greetExtends():string{
    return `hello ${this.greeting} Greeter`
  }
}
/// Greeter1 从 Greeter中继承了属性及方法  

// 这里， Greeter1 派生类，它派生自 Greeter 基类，通过 extends关键字。 派生类通常被称作 子类，基类通常被称作 超类。
let greeter1 = new Greeter1('extends')

console.log(greeter1.greet())  //   hello extends
console.log(greeter1.greetExtends())   //  hello extends Greeter


// constructor方法是类的默认方法，通过new命令生成对象实例时，
// 自动调用该方法。一个类必须有constructor方法，如果没有显式定义，一个空的constructor方法会被默认添加。



/// 取值函数（getter）和存值函数（setter）

// 在“类”的内部可以使用get和set关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为。
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
// console.log(inst.prop)
inst.prop='hbb'


// 类相当于实例的原型，所有在类中定义的方法，都会被实例继承。如果在一个方法前，加上static关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”。

// static
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

console.log(Method.classMethod()) // 'hello'

var foo = new Method();
// foo.classMethod()     // foo 的属性上不存在classMethod方法
/// Method类的classMethod方法前有static关键字，表明该方法是一个静态方法，可以直接在Foo类上调用,不能在Method调用  GetMethod,SetMethod 方法
// 
// Method.GetMethod()   //属性“GetMethod”在类型“typeof Method”上不存在。你是否指的是“getMethod”


//  getMethod里使用了this、 指向Method，调用 classMethod方法

console.log(Method.getMethod())  //hello


//父类的静态方法，可以被子类继承。

class MethodSon extends Method{
  // static classMethod() {
  //   return super.classMethod() + ', too';
  // }
}

console.log(MethodSon.getMethod())  //hello


// 静态方法也是可以从super对象上调用的。

class MethodSec extends Method{
  static classMethod() {
    return super.classMethod() + ', MethodSec';
  }
}

console.log(MethodSec.getMethod())  // hello, MethodSec

// public,private, protected

class Age {
  private name:string = 'hbb'
  age:number;
  readonly sex:string = 'man'
  protected ageN:number = 20;
  public constructor(theAge:number){
    this.age = theAge
  }
}

let Nage = new Age(20)


// public 可以自由的访问

//   private时，它就不能在声明它的类的外部访问

// protected protected成员在派生类中仍然可以访问
console.log(Nage.age,Nage.name,Nage.ageN,'private')  // 20 '属性“name”为私有属性，只能在类“Age”中访问','属性“ageN”受保护，只能在类“Age”及其子类中访问', 'private'


class Father {
  name:string
  constructor(name:string){
    this.name = name
  }
  toString(){
    return this.name
  }
}
 //  子类必须在constructor方法中调用super方法，否则新建实例时会报错  

 //ES6 要求，子类的构造函数必须执行一次super函数。
class Son extends Father {
  name:string
  constructor(name:string){   
    // super(name)   //代表父类的构造函数  没有的话会报  派生类的构造函数必须包含 "super" 调用
    this.name = name
  }
  toString(){
    return `${this.name} ${super.toString()}`
  }
}
export {}
