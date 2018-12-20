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

let greeter1 = new Greeter1('extends')

console.log(greeter1.greet())  //   hello extends
console.log(greeter1.greetExtends())   //  hello extends Greeter

