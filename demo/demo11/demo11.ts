//  声明合并


/// 接口的合并


interface Person {
  name:string
}

interface Person {
  age:number
}
// 相当于

// interface Person {
//   name:string
//   age:number
// }
let person:Person = {
  name:'hbb',
  age:20
}

// 可以看到接口Person 里面有两个属性，name和age， 所以在person中可以访问到
console.log(person.name,person.age)
// 属性合并   合并的属性的类型必须是唯一的：

interface Name {
  name:string
  age:number
}
// interface Name {
//   age:string   // 后续属性声明必须属于同一类型。属性“age”的类型必须为“number”，但此处却为类型“string”。
// }

//接口的非函数的成员应该是唯一的。如果它们不是唯一的，那么它们必须是相同的类型。如果两个接口中同时声明了同名的非函数成员且它们的类型不同，则编译器会报错。


// 接口中方法的合并

interface Methods{
  func(val:string):string
}
interface Methods{
  func(val:number):number
}

interface methods{
  func(val:string):string
  func(val:number):number
}

export {

}