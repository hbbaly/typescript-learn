# typescript-learn


## typescript

### 安装 typrscript 

     npm i typescript -g 

### 格式化 tsconfig.json

    tsc --init

## demo1

   ```
    let name:string = 'hello typescript'
    console.log(name)
    export {}   /// 避免使用的全局的 name
   ```

在 TS 自带的类型声明里面，已经声明了全局变量 `declare const name:naver`, 也即 `window.name`。所以，如果你再在全局作用域中声明 `name` 的话，就属于重复声明了。

//你可以试着把它放进函数或模块里


## demo2

介绍了基础类型

- **布尔值**

   ```
   let bool:boolean = false
   ```

- **数字**

   ```
   let num:number = 6
   ```

- **字符串**

    ```
    let str = 'string'
    ```

- **数组**

    有两种方式可以定义数组

   ```
   let arr:number[] = [1,2,3]
   ```

   ```
   let array:Array<number> = [1,2,3]
   ```
- **元组 Tuple**

    元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同。

   ```
   let arr1:[Number,String] = [1,'hbb']
   ```
- **Any 任意类型**

  还不清楚类型的变量指定一个类型。 这些值可能来自于动态的内容，希望直接让它们通过编译阶段的检查。 那么我们可以使用 any类型来标记这些变量

  ```
  let age:any = 'hbb'
  let Age:any = true
  let age1:any = [1,2,3]
  ```


## demo3
      
- ### 函数定义方式 

    ```
    function add () {}
    const add = function () {}
    const add = () => {}
    ```
- ### 必选参数
 
   ```
    const add = function (num1:number,num2:number):number {
      return num1+num2
    }
   ```

- ### 可选参数

  可选参数必须跟在必选参数后面    没传参的时候，它的值就是undefined

   ```
    const Add = function (a:number,b?:number):number{
      if(b){
        return a+b
      }else{
        return a
      }
    }

    console.log(add1(1))   // 1
    console.log(add1(1,2))  // 3
   ```

- ### 默认参数

    可以为参数提供一个默认值当用户没有传递这个参数或传递的值是undefined时。 它们叫做有默认初始化值的参数。  

    ```
    const add1 = function (a:number,b:number = 6):number{
      if(b){
        return a+b
      }else{
        return a
      }
    }

    console.log(add1(1,2))  // 3
    console.log(add1(1))   // 7 
    ```
    带默认值的参数不需要放在必须参数的后面

- ### 剩余参数

  有时，你想同时操作多个参数，或者你并不知道会有多少参数传递进来。 在JavaScript里，你可以使用 arguments来访问所有传入的参数。

  剩余参数会被当做个数不限的可选参数。 可以一个都没有，同样也可以有任意个

    ```
    const add2 = function (a:number,b:number,...arg:number[]):number  {
      console.log(a,b,arg)
      if(arg.length){
        return a+b+arg[0]
      }else{
        return a+b
      }
    }

    console.log(add2(1,2,3,4,5,6,7))
    console.log(add2(1,2))

    // 1,2,[3,4,5,6,7]
    // 6
    // 1,2,[]
    // 3
    ```

