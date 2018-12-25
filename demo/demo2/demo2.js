// 基础变量
// Boolean
var bool = false;
// wrong
// let bool:string = false
// Number
var num = 6;
// string
var str = 'string';
// 字符串模板
var str1 = "this is " + str;
console.log(str1);

// Array
// one method
var arr = [1, 2, 3];
// wrong 
// let wrongArr:number[] = [1,'hbb',3]
// two 
var array = [1, 2, 3];
// Tuple 元祖
// 元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同。
// example
var arr1 = [1, 'hbb'];
// wrong 
// let wrongArr1:[number,string] = ['hbb',1]


// 枚举 enum
// 默认情况下，从0开始为元素编号。 你也可以手动的指定成员的数值。 例如，我们将上面的例子改成从 1开始编号：
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
var c = Color.Green;
console.log(c); // 1
var color;
(function (color) {
    color[color["Red"] = 3] = "Red";
    color[color["Green"] = 6] = "Green";
    color[color["Blue"] = 9] = "Blue";
})(color || (color = {}));
var b = color.Red;
var colorName = color[9];
console.log(b, colorName);
// Any 任意类型
// 还不清楚类型的变量指定一个类型。 这些值可能来自于动态的内容，希望直接让它们通过编译阶段的检查。 那么我们可以使用 any类型来标记这些变量
var age = 'hbb';
var Age = true;
var age1 = [1, 2, 3];
console.log(age.toString());
console.log(age1.splice(1, 1));
