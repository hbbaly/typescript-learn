"use strict";
//  声明合并
exports.__esModule = true;
// 相当于
// interface Person {
//   name:string
//   age:number
// }
var person = {
    name: 'hbb',
    age: 20
};
// 可以看到接口Person 里面有两个属性，name和age， 所以在person中可以访问到
console.log(person.name, person.age);
