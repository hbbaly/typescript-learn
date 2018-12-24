"use strict";
exports.__esModule = true;
// 引用 jquery
var $ = require("jquery");
// let arr:string[] = ['a','b','c','d','e','f']
console.log($());
$.each(['a', 'b', 'c'], function (item) {
    console.log(item);
});
