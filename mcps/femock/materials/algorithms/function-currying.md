# 函数柯里化 (Function Currying)

## 问题描述

请实现一个 `curry` 函数，它接收一个多参数的函数 `fn`，并返回一个新的函数。这个新函数可以被部分应用（partially applied），即一次接收一个或多个参数，直到接收到所有 `fn` 所需的参数后，才会执行原始函数 `fn`。

**示例:**

```javascript
function add(a, b, c) {
  return a + b + c;
}

const curriedAdd = curry(add);

curriedAdd(1)(2)(3); // => 6
curriedAdd(1, 2)(3); // => 6
curriedAdd(1)(2, 3); // => 6
curriedAdd(1, 2, 3); // => 6
```

## 要求

- `curry` 函数应返回一个新函数。
- 新函数可以接收任意数量的参数，并返回另一个函数，直到所有参数都已提供。
- 当所有参数都提供后，应调用原始函数并返回其结果。

## 解题代码 (JavaScript)

```javascript
/**
 * @param {Function} fn The function to curry.
 * @returns {Function} The curried function.
 */
function curry(fn) {
  // 返回一个新的函数 `curried`，它将收集参数
  return function curried(...args) {
    // fn.length 获取函数 fn 定义时的参数个数
    // 如果传入的参数个数已经足够
    if (args.length >= fn.length) {
      // 则直接执行 fn
      return fn.apply(this, args);
    } else {
      // 否则，返回一个新的函数，等待接收剩余的参数
      return function(...nextArgs) {
        // 将之前收集的参数和新的参数合并，再次调用 curried
        return curried.apply(this, args.concat(nextArgs));
      };
    }
  };
}
```
