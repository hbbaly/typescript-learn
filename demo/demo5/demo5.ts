
// 类型推测
let age = 20

age = 'hbb'   /// 不能将类型“"hbb"”分配给类型“number”

// 等同于:
// let age:number = 20

// age = 'hbb'

// TypeScript 会在没有明确的指定类型的时候推测出一个类型，这就是类型推论。

// 如果定义的时候没有赋值，不管之后有没有赋值，都会被推断成 any 类型而完全不被类型检查：

let cut    // 推断为any类型，所以下面不报错
cut = 'afv'
cut = 20
cut = false

function add(params:number) {
  return 'hbb'
}
add(5)

// 可以得出我们传入一个数字，没有制定函数返回的类型，但是typescript根据返回的值自动推测出返回的类型



export {} 