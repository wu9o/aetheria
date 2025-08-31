# 实现 instanceof

## 问题描述

请实现一个 `myInstanceof` 函数，它的功能与 `instanceof` 运算符保持一致。

`instanceof` 运算符用于检测构造函数的 `prototype` 属性是否出现在某个实例对象的原型链上。

**语法:** `object instanceof constructor`

## 要求

- 函数接收两个参数：`obj` (实例对象) 和 `constructor` (构造函数)。
- 如果 `constructor.prototype` 在 `obj` 的原型链上，则返回 `true`。
- 否则，返回 `false`。
- 需要处理 `obj` 为 `null` 或非对象的情况。

## 解题代码 (JavaScript)

```javascript
/**
 * @param {any} obj The object to check.
 * @param {Function} constructor The constructor function.
 * @return {boolean}
 */
function myInstanceof(obj, constructor) {
  // 1. 参数校验
  // constructor 必须是函数
  if (typeof constructor !== 'function') {
    throw new TypeError('Right-hand side in "instanceof" is not a function');
  }
  // obj 必须是对象（null 除外）
  if (obj === null || (typeof obj !== 'object' && typeof obj !== 'function')) {
    return false;
  }

  // 2. 获取 obj 的原型
  let proto = Object.getPrototypeOf(obj);
  // 获取 constructor 的 prototype 属性
  const targetPrototype = constructor.prototype;

  // 3. 遍历原型链
  while (proto !== null) {
    // 如果找到了目标原型，则返回 true
    if (proto === targetPrototype) {
      return true;
    }
    // 继续向上查找
    proto = Object.getPrototypeOf(proto);
  }

  // 4. 如果遍历到原型链末端（null）仍未找到，则返回 false
  return false;
}

// --- 示例 ---
// function Car() {}
// const myCar = new Car();
// console.log(myInstanceof(myCar, Car));      // true
// console.log(myInstanceof(myCar, Object));   // true
// console.log(myInstanceof([], Array));      // true
// console.log(myInstanceof({}, Array));      // false
```
