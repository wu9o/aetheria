# 实现 Array.prototype.map

## 问题描述

请在 `Array.prototype` 上实现一个自定义的 `myMap` 方法，它的功能与原生的 `Array.prototype.map` 方法保持一致。

`map()` 方法创建一个新数组，这个新数组由原数组中的每个元素都调用一次提供的函数后的返回值组成。

## 要求

- `myMap` 方法应接收两个参数：一个回调函数 `callback` 和一个可选的 `thisArg`（用于指定 `callback` 执行时的 `this` 值）。
- `callback` 函数应接收三个参数：`currentValue`（当前元素）、`index`（当前索引）和 `array`（原始数组）。
- 不能使用原生的 `Array.prototype.map` 方法。
- 应正确处理稀疏数组（即跳过空位）。

## 解题代码 (JavaScript)

```javascript
/**
 * @callback mapCallback
 * @param {any} currentValue
 * @param {number} index
 * @param {Array} array
 */

/**
 * @param {mapCallback} callback
 * @param {any} [thisArg]
 * @returns {Array}
 */
Array.prototype.myMap = function(callback, thisArg) {
  // 1. 检查 this 是否为 null 或 undefined
  if (this == null) {
    throw new TypeError('this is null or not defined');
  }

  // 2. 检查 callback 是否为函数
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }

  // 3. 将 this 转换为对象，并获取其长度
  const obj = Object(this);
  const len = obj.length >>> 0; // 无符号右移，确保 len 是非负整数

  const newArray = new Array(len);
  let k = 0;

  while (k < len) {
    // 4. 检查索引 k 是否存在于 obj 中（处理稀疏数组）
    if (k in obj) {
      // 5. 调用回调函数，并将其返回值放入新数组
      newArray[k] = callback.call(thisArg, obj[k], k, obj);
    }
    k++;
  }

  return newArray;
};
```
