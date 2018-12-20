// 基础变量


// Boolean

let bool:boolean = false
// wrong
// let bool:string = false


// Number

let num:number = 6


// string

let str = 'string'

// 字符串模板

let str1:string = `this is ${str}`
console.log(str1)

// Array

// one method

let arr:number[] = [1,2,3]  

// wrong 
// let wrongArr:number[] = [1,'hbb',3]

// two 
let array:Array<number> = [1,2,3]


// Tuple 元祖

// 元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同。
// example

let arr1:[Number,String] = [1,'hbb']

// wrong 
// let wrongArr1:[number,string] = ['hbb',1]

// 枚举 enum

// 默认情况下，从0开始为元素编号。 你也可以手动的指定成员的数值。 例如，我们将上面的例子改成从 1开始编号：
enum Color {Red, Green, Blue}
let c: Color = Color.Green;
console.log(c)   // 1

enum color {Red = 3,Green = 6,Blue=9}
let b:color = color.Red
let colorName = color[9]
console.log(b,colorName)


// Any 任意类型
// 还不清楚类型的变量指定一个类型。 这些值可能来自于动态的内容，希望直接让它们通过编译阶段的检查。 那么我们可以使用 any类型来标记这些变量

let age:any = 'hbb'
let Age:any = true
let age1:any = [1,2,3]
console.log(age.toString())
console.log(age1.splice(1,1))


// Void 没有任何类型  

// 声明一个void类型的变量没有什么大用，因为你只能为它赋予undefined

// 
let v:void = undefined

//wrong
// let year:void = false



// Object

//object表示非原始类型，也就是除number，string，boolean，symbol，null或undefined之外的类型