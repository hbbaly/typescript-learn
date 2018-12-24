//  接口

// 在 TypeScript 中，我们使用接口（Interfaces）来定义对象的类型。

interface Person {
  name:string
  age:number
  sex:number
}
let tom:Person = {
  name:'tom',
  age:20,
  sex:1,
  skill:['html']  // 不能将类型“{ name: string; age: number; sex: number; skill: string[]; }”分配给类型“person”。对象文字可以只指定已知属性，并且“skill”不在类型“person”中
}

// tom 中不能 缺少属性name，age，sex，也不能新增属性，必须和接口定义一样

// 有可选属性

interface Mik{
  name:string
  age?:number
}

let mik:Mik = {
  name:'mik',
  age:20
}


// 上个mik对象中 ，age可有可无，都不会报错。

// 任意属性

interface Lan{
  name:string
  [propName:string]:any
}

let lan:Lan = {
  name:'lan',
  sex:0,
  age:20
}


// [propName:string]:any  定义了属性string类型，值是任意类型
// 上面可以得出，多加了sex，age也没有 报错。

// 只读属性


interface Anmi{
  name:string
  age:number
  readonly sex:number
}

let anmi:Anmi = {
  name:'anmi',
  age:18,
  sex:0
}

anmi.age = 20

anmi.sex = 1  // 无法分配到“sex”，因为它是常数或只读属性



// 接口继承


// 接口也可以像class一样继承

interface War{
  color:string
}

interface Sw extends War {
  count:number
}

let sw = <Sw>{}

sw.color = '#f60'

sw.count = 20


//  可以继承多个

interface SS extends War,Mik {
  count:number
}
let ss = <SS>{}
ss.name = 'ss'
ss.color= 'red'


