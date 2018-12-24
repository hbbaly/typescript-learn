var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// class 
var Greeter = /** @class */ (function () {
    function Greeter(msg) {
        this.greeting = msg;
    }
    Greeter.prototype.greet = function () {
        return "hello " + this.greeting;
    };
    return Greeter;
}());
var greeter = new Greeter('world');
console.log(greeter.greet()); // hello world
// 继承
//  使用继承来扩展现有的类。
var Greeter1 = /** @class */ (function (_super) {
    __extends(Greeter1, _super);
    function Greeter1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Greeter1.prototype.greetExtends = function () {
        return "hello " + this.greeting + " Greeter";
    };
    return Greeter1;
}(Greeter));
/// Greeter1 从 Greeter中继承了属性及方法  
// 这里， Greeter1 派生类，它派生自 Greeter 基类，通过 extends关键字。 派生类通常被称作 子类，基类通常被称作 超类。
var greeter1 = new Greeter1('extends');
console.log(greeter1.greet()); //   hello extends
console.log(greeter1.greetExtends()); //  hello extends Greeter
// constructor方法是类的默认方法，通过new命令生成对象实例时，
// 自动调用该方法。一个类必须有constructor方法，如果没有显式定义，一个空的constructor方法会被默认添加。
/// 取值函数（getter）和存值函数（setter）
// 在“类”的内部可以使用get和set关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为。
var Myclass = /** @class */ (function () {
    function Myclass() {
    }
    Object.defineProperty(Myclass.prototype, "prop", {
        get: function () {
            return 'get';
        },
        set: function (val) {
            console.log("set    " + val);
        },
        enumerable: true,
        configurable: true
    });
    return Myclass;
}());
var inst = new Myclass();
// 存取器要求你将编译器设置为输出ECMAScript 5或更高
console.log(inst.prop);
inst.prop = 'hbb';
// 类相当于实例的原型，所有在类中定义的方法，都会被实例继承。如果在一个方法前，加上static关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”。
// static
var Method = /** @class */ (function () {
    function Method() {
    }
    Method.prototype.GetMethod = function () {
        return 'getMethod';
    };
    Method.prototype.SetMethod = function () {
        return 'setMethod';
    };
    Method.classMethod = function () {
        return 'hello';
    };
    Method.getMethod = function () {
        return this.classMethod();
    };
    return Method;
}());
console.log(Method.classMethod()); // 'hello'
var foo = new Method();
// foo.classMethod()     // foo 的属性上不存在classMethod方法
/// Method类的classMethod方法前有static关键字，表明该方法是一个静态方法，可以直接在Foo类上调用,不能在Method调用  GetMethod,SetMethod 方法
// 
// Method.GetMethod()   //属性“GetMethod”在类型“typeof Method”上不存在。你是否指的是“getMethod”
//  getMethod里使用了this、 指向Method，调用 classMethod方法
console.log(Method.getMethod()); //hello
//父类的静态方法，可以被子类继承。
var MethodSon = /** @class */ (function (_super) {
    __extends(MethodSon, _super);
    function MethodSon() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MethodSon;
}(Method));
console.log(MethodSon.getMethod()); //hello
// 静态方法也是可以从super对象上调用的。
var MethodSec = /** @class */ (function (_super) {
    __extends(MethodSec, _super);
    function MethodSec() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MethodSec.classMethod = function () {
        return _super.classMethod.call(this) + ', MethodSec';
    };
    return MethodSec;
}(Method));
console.log(MethodSec.getMethod());
// public,private, protected
var Age = /** @class */ (function () {
    function Age(theAge) {
        this.age = theAge;
    }
    Age.prototype.getAge = function () {
        this.ageN = 30;
        console.log(this.ageN, 'protected');
        return this.age;
    };
    Age.prototype.setAge = function (val) {
        this.age = val;
        return val;
    };
    Age.prototype.delAge = function () {
        this.ageN = null;
        return 'delete';
    };
    return Age;
}());
var Nage = new Age(20);
// public 可以自由的访问
//   private时，它就不能在声明它的类的外部访问
console.log(Nage.age, Nage.name, 'private'); // 20
console.log(Nage.getAge()); // 20
console.log(Nage.setAge(25)); // 25
console.log(Nage.delAge()); // Property 'delAge' is protected and only accessible within class 'Age' and its subclasses.
console.log(Age.age, 'hbb');
console.log(Age.getAge());
console.log(Age.setAge(25), console.log(Age.delAge()));
