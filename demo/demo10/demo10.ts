// enum 补充

// 枚举（Enum）类型用于取值被限定在一定范围内的场景  

enum arr {'a','b','c','d'}

console.log(arr[0])  // a
console.log(arr[1])  // b
console.log(arr[3])  // d

console.log(arr['a'])  // 0
console.log(arr['b'])  // 1
console.log(arr['d'])  // 3



// 手动复制

enum arr1 {'a' = 5,'b','c','d'}


console.log(arr1['a'])  // 5
console.log(arr1['b'])  // 6
console.log(arr1['d'])  // 8


// 手动赋值后面的会根据  最后一个手动赋值 +1

enum arr2 {'a' = 5,'b'=1,'c','d'}


console.log(arr2['a'])  // 5
console.log(arr2['b'])  // 1
console.log(arr2['c'])  // 2


enum arr3 {'a' = 2,'b'=1,'c','d'}   //typescript 不会发现这种情况，最好不要出现这种覆盖的情况。


console.log(arr3['a'])  // 2
console.log(arr3['b'])  // 1
console.log(arr3['c'])  // 2
console.log(arr3['d'])  // 3


// 常数项和计算所得项
// 枚举项有两种类型：常数项（constant member）和计算所得项（computed member）。

let A = 500
enum arr4 {'a' = 2,'b'=1,'c','d'= A/5}  

console.log(arr4['a'])  // 2
console.log(arr4['b'])  // 1
console.log(arr4['c'])  // 2
console.log(arr4['d'],A)  // 100


enum arr5 {'a' = 2,'b'=1,'c'= A/5,'d'}    //Enum member must have initializer.


console.log(arr5['a'])  // 2
console.log(arr5['b'])  // 1
console.log(arr5['c'],A)  // 2
console.log(arr5['d'])  // undefined


// 可以得出  如果紧接在计算所得项后面的是未手动赋值的项，那么它就会因为无法获得初始值而报错




//  常数枚举

// 常数枚举是使用 const enum 定义的枚举类型：

// 常数枚举与普通枚举的区别是，它会在编译阶段被删除，并且不能包含计算成员。

const enum arr6 {'a','b','c','d'}

let arr7 = [arr6.a, arr6.b, arr6.c, arr6.d];

// 上面代码只会编译为：var arr7 = [0 /* a */, 1 /* b */, 2 /* c */, 3 /* d */];、


// 外部枚举

// 是使用 declare enum 定义的枚举类型：

// declare 定义的类型只会用于编译时的检查，编译结果中会被删除。 

declare enum arr8 {'a','b','c','d'}

let arr9 = [arr8.a, arr8.b, arr8.c, arr8.d];

//上面代码只会编译为： var arr9 = [0 /* a */, 1 /* b */, 2 /* c */, 3 /* d */];