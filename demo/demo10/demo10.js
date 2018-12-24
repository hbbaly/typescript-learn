// enum 补充
// 枚举（Enum）类型用于取值被限定在一定范围内的场景  
var arr;
(function (arr) {
    arr[arr["a"] = 0] = "a";
    arr[arr["b"] = 1] = "b";
    arr[arr["c"] = 2] = "c";
    arr[arr["d"] = 3] = "d";
})(arr || (arr = {}));
console.log(arr[0]); // a
console.log(arr[1]); // b
console.log(arr[3]); // d
console.log(arr['a']); // 0
console.log(arr['b']); // 1
console.log(arr['d']); // 3
// 手动复制
var arr1;
(function (arr1) {
    arr1[arr1["a"] = 5] = "a";
    arr1[arr1["b"] = 6] = "b";
    arr1[arr1["c"] = 7] = "c";
    arr1[arr1["d"] = 8] = "d";
})(arr1 || (arr1 = {}));
console.log(arr1['a']); // 5
console.log(arr1['b']); // 6
console.log(arr1['d']); // 8
// 手动赋值后面的会根据  最后一个手动赋值 +1
var arr2;
(function (arr2) {
    arr2[arr2["a"] = 5] = "a";
    arr2[arr2["b"] = 1] = "b";
    arr2[arr2["c"] = 2] = "c";
    arr2[arr2["d"] = 3] = "d";
})(arr2 || (arr2 = {}));
console.log(arr2['a']); // 5
console.log(arr2['b']); // 1
console.log(arr2['c']); // 2
var arr3;
(function (arr3) {
    arr3[arr3["a"] = 2] = "a";
    arr3[arr3["b"] = 1] = "b";
    arr3[arr3["c"] = 2] = "c";
    arr3[arr3["d"] = 3] = "d";
})(arr3 || (arr3 = {})); //typescript 不会发现这种情况，最好不要出现这种覆盖的情况。
console.log(arr3['a']); // 2
console.log(arr3['b']); // 1
console.log(arr3['c']); // 2
console.log(arr3['d']); // 3
// 常数项和计算所得项
// 枚举项有两种类型：常数项（constant member）和计算所得项（computed member）。
var A = 500;
var arr4;
(function (arr4) {
    arr4[arr4["a"] = 2] = "a";
    arr4[arr4["b"] = 1] = "b";
    arr4[arr4["c"] = 2] = "c";
    arr4[arr4["d"] = A / 5] = "d";
})(arr4 || (arr4 = {}));
console.log(arr4['a']); // 2
console.log(arr4['b']); // 1
console.log(arr4['c']); // 2
console.log(arr4['d'], A); // 100
var arr5;
(function (arr5) {
    arr5[arr5["a"] = 2] = "a";
    arr5[arr5["b"] = 1] = "b";
    arr5[arr5["c"] = A / 5] = "c";
    arr5[arr5["d"] = void 0] = "d";
})(arr5 || (arr5 = {})); //Enum member must have initializer.
console.log(arr5['a']); // 2
console.log(arr5['b']); // 1
console.log(arr5['c'], A); // 2
console.log(arr5['d']); // undefined
var arr7 = [0 /* a */, 1 /* b */, 2 /* c */, 3 /* d */];
var arr9 = [0 /* a */, 1 /* b */, 2 /* c */, 3 /* d */];
