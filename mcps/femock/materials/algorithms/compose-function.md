# 实现函数组合 (Compose Function)

## 问题描述

请实现一个 `compose` 函数，它接收任意数量的函数作为参数，并返回一个新的函数。这个新函数在被调用时，会按照**从右到左**的顺序依次执行传入的函数，前一个函数的返回值是后一个函数的输入参数。

**示例:**

```javascript
const add = x => x + 1;
const multiply = x => x * 2;
const square = x => x * x;

const composedFunc = compose(square, multiply, add);
// composedFunc(2) 的执行顺序是:
// 1. add(2) => 3
// 2. multiply(3) => 6
// 3. square(6) => 36

composedFunc(2); // => 36
```

## 要求

- `compose` 函数应能处理任意数量的函数参数。
- 返回的新函数应能接收初始值。
- 如果没有传入任何函数，`compose` 应返回一个接收什么就返回什么的函数。

## 解题代码 (JavaScript) - 使用 `reduceRight`

```javascript
/**
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A new function obtained by composing the input functions
 * from right to left.
 */
function compose(...funcs) {
  if (funcs.length === 0) {
    // 如果没有函数，返回一个恒等函数
    return arg => arg;
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  // 使用 reduceRight 将函数串联起来
  // a 是累计值（上一个组合好的函数），b 是当前函数
  return funcs.reduce((a, b) => (...args) => a(b(...args)));
}
```

## 解题代码 (JavaScript) - 传统循环

```javascript
function composeLoop(...funcs) {
  return function(initialValue) {
    let result = initialValue;
    for (let i = funcs.length - 1; i >= 0; i--) {
      result = funcs[i](result);
    }
    return result;
  };
}
```
