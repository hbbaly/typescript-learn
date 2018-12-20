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
var greeter1 = new Greeter1('extends');
console.log(greeter1.greet());
console.log(greeter1.greetExtends());
