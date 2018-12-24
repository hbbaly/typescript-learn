// 联合类型


// 表示取值可以为多种类型中的一种。

let params : number|string

params = 20

params = 'hbb'

params = false   // 不能将类型“false”分配给类型“string | number”


// 联合类型使用 | 分隔每个类型。



// 当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，我们只能访问此联合类型的所有类型里共有的属性或方法：


function mix (params:number|string){
  // return params.length   //当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，我们只能访问此联合类型的所有类型里共有的属性或方法：

  // return params.substr(0,1)   // 类型“string | number”上不存在属性“substr”。类型“number”上不存在属性“substr”。

  return params.toString()  
}


// 当联合类型已经被赋值，会根据类型推测，来判断。


let n :number|string

n = 10

n.toString()
n.length  //类型“number”上不存在属性“length”

n = 'hbb'   // n 为string，有length 属性
n.length

// params 制定了类型，只能使用共有的属性才不会报错。


// 类型别名  ：类型别名用来给一个类型起个新名字。  
// 使用 type 创建类型别名。
type Name = string
type NameResolver = () => string
type NameOrResolve = Name | NameResolver
function change (params:NameOrResolve):Name{
  if(type of params === 'string'){
    return params
  }else{
    return n()
  }
}


