# 实现 Array.prototype.reduce

## 问题描述

请在 `Array.prototype` 上实现一个自定义的 `myReduce` 方法，它的功能与原生的 `Array.prototype.reduce` 方法保持一致。

`reduce()` 方法对数组中的每个元素按序执行一个提供的 “reducer” 函数，每一次运行 “reducer” 会将先前元素的计算结果作为参数传入，最后将其结果汇总为单个返回值。

## 要求

- `myReduce` 方法应接收两个参数：一个回调函数 `callback` 和一个可选的 `initialValue`（初始值）。
- `callback` 函数应接收四个参数：`accumulator`（累计器）、`currentValue`（当前元素）、`currentIndex`（当前索引）和 `array`（原始数组）。
- 如果没有提供 `initialValue`，`accumulator` 应使用数组的第一个元素，并从第二个元素开始遍历。
- 如果在没有 `initialValue` 的情况下对空数组调用 `myReduce`，应抛出 `TypeError`。
- 不能使用原生的 `Array.prototype.reduce` 方法。

## 解题代码 (JavaScript)

```javascript
/**
 * @callback reduceCallback
 * @param {any} accumulator
 * @param {any} currentValue
 * @param {number} currentIndex
 * @param {Array} array
 */

/**
 * @param {reduceCallback} callback
 * @param {any} [initialValue]
 * @returns {any}
 */
Array.prototype.myReduce = function(callback, initialValue) {
  if (this == null) {
    throw new TypeError('this is null or not defined');
  }
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }

  const obj = Object(this);
  const len = obj.length >>> 0;
  let k = 0;
  let accumulator;

  // 1. 处理 initialValue
  if (arguments.length >= 2) {
    accumulator = initialValue;
  } else {
    // 2. 如果没有 initialValue，找到数组的第一个有效元素作为初始值
    while (k < len && !(k in obj)) {
      k++;
    }
    // 如果数组为空且没有初始值，抛出错误
    if (k >= len) {
      throw new TypeError('Reduce of empty array with no initial value');
    }
    accumulator = obj[k];
    k++;
  }

  // 3. 遍历数组
  while (k < len) {
    if (k in obj) {
      accumulator = callback(accumulator, obj[k], k, obj);
    }
    k++;
  }

  return accumulator;
};
```
