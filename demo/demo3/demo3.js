// function knowledge 
// 函数定义方式   
// function add () {}
// const add = function () {}
// const add = () => {}
//  函数类型包含两部分：参数类型和返回值类型
//  const add = function (num1:number,num2:number):number {return num1+num2}
// function add (num1:number,num2:number):number{
//   return num1+num2
// }
var myAdd = function (x, y) { return x + y; };
// console.log(add(1,3))
console.log(myAdd(1, 3));
// 可选参数  ,可选参数必须跟在必选参数后面    没传参的时候，它的值就是undefined
var Add = function (a, b) {
    if (b) {
        return a + b;
    }
    else {
        return a;
    }
};
// wrong 
// const Add = function (b?:number,a:number):number{
//   if(b){
//     return a+b
//   }else{
//     return a
//   }
// }
console.log(Add(1, 5));
// 默认参数  也可以为参数提供一个默认值当用户没有传递这个参数或传递的值是undefined时。 它们叫做有默认初始化值的参数。  
//带默认值的参数不需要放在必须参数的后面
var add1 = function (a, b) {
    if (b === void 0) { b = 6; }
    if (b) {
        return a + b;
    }
    else {
        return a;
    }
};
console.log(add1(1, 2));
// 剩余参数  有时，你想同时操作多个参数，或者你并不知道会有多少参数传递进来。 在JavaScript里，你可以使用 arguments来访问所有传入的参数
// 剩余参数会被当做个数不限的可选参数。 可以一个都没有，同样也可以有任意个
var add2 = function (a, b) {
    var arg = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        arg[_i - 2] = arguments[_i];
    }
    console.log(a, b, arg);
    return a + b + arg[0];
};
console.log(add2(1, 2, 3, 4, 5, 6, 7));
console.log(add2(1, 2));
