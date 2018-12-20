//在 TS 自带的类型声明里面，已经声明了全局变量 declare const name:naver (源码), 也即 window.name。所以，如果你再在全局作用域中声明 name 的话，就属于重复声明了。
//你可以试着把它放进函数或模块里
let name:string = 'hello typescript'
console.log(name)
export {}   /// 避免使用的全局的 name