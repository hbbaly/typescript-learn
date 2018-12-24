// 类型断言

// 语法:

//  <类型> 值

// 值 as 类型


// demo6 中 讲过，当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，我们只能访问此联合类型的所有类型里共有的属性或方法：而有时候，我们确实需要在还不确定类型的时候就访问其中一个类型的属性或方法
function add(params:number|string){
  if(params.length){   // 类型“string | number”上不存在属性“length”。类型“number”上不存在属性“length”。
    return params.length
  }else{
    return params.toString().length
  }
}

// 可以使用断言将 params断言:string

function Add (params:string|number){
  if((<string> params).length){
    return (<string> params).length
  }else{
    return params.toString().length
  }
}
export {}


