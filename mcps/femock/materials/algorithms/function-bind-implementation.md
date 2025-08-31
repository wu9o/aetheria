# 实现 Function.prototype.bind

## 问题描述

请在 `Function.prototype` 上实现一个自定义的 `myBind` 方法，它的功能与原生的 `Function.prototype.bind` 方法保持一致。

`bind()` 方法创建一个新的函数，在 `bind()` 被调用时，这个新函数的 `this` 被指定为 `bind()` 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。

## 要求

- `myBind` 返回一个新函数。
- 新函数被调用时，其 `this` 指向 `myBind` 的第一个参数 `thisArg`。
- `myBind` 可以预先绑定部分参数（偏函数应用）。
- （进阶）当 `bind` 返回的函数作为构造函数使用时，`bind` 的 `thisArg` 参数将失效，`this` 指向新创建的实例。

## 解题代码 (JavaScript) - 基础版

```javascript
/**
 * @param {any} thisArg
 * @param {...any} argArray
 * @returns {Function}
 */
Function.prototype.myBind = function(thisArg, ...argArray) {
  const originalFunc = this;

  return function(...nextArgs) {
    // 合并预设参数和调用时传入的参数
    const finalArgs = argArray.concat(nextArgs);
    // 使用 apply 将 this 指向 thisArg 并执行
    return originalFunc.apply(thisArg, finalArgs);
  };
};
```

## 解题代码 (JavaScript) - 进阶版 (处理构造函数调用)

```javascript
Function.prototype.myBindAdvanced = function(thisArg, ...argArray) {
  const originalFunc = this;

  const boundFunc = function(...nextArgs) {
    const finalArgs = argArray.concat(nextArgs);
    
    // 检查是否是通过 new 调用的
    // 如果是，this 应该是 boundFunc 的一个实例
    const isNew = this instanceof boundFunc;
    
    // 如果是 new 调用，this 指向新实例；否则，指向绑定的 thisArg
    const context = isNew ? this : thisArg;
    
    return originalFunc.apply(context, finalArgs);
  };

  // 维护原型链：使 boundFunc 的实例能够继承 originalFunc 的原型
  if (originalFunc.prototype) {
    boundFunc.prototype = Object.create(originalFunc.prototype);
  }

  return boundFunc;
};
```
