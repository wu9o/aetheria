# 深拷贝 (Deep Clone)

## 问题描述

请实现一个 `deepClone` 函数，该函数接收一个对象作为参数，并返回一个该对象的深拷贝副本。

**深拷贝** 意味着拷贝一个对象时，不仅拷贝对象本身，还递归地拷贝其所有属性的值。如果属性值是对象或数组，也需要创建新的对象或数组。

## 要求

- 能够正确处理基本数据类型、对象和数组的嵌套。
- （进阶）能够处理循环引用，避免无限递归导致的栈溢出。
- （进阶）能够处理其他数据类型，如 `Date`, `RegExp` 等。

## 解题代码 (JavaScript) - 基础版 (处理对象和数组)

```javascript
/**
 * @param {any} obj The object to deep clone.
 * @returns {any} The cloned object.
 */
function deepClone(obj) {
  // 基本数据类型或 null 直接返回
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  // 根据 obj 的类型（数组或对象）创建新的容器
  const newObj = Array.isArray(obj) ? [] : {};

  // 遍历 obj 的所有属性
  for (const key in obj) {
    // 只拷贝对象自身的属性，忽略原型链上的属性
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      // 递归地拷贝属性值
      newObj[key] = deepClone(obj[key]);
    }
  }

  return newObj;
}
```

## 解题代码 (JavaScript) - 进阶版 (处理循环引用)

```javascript
/**
 * @param {any} obj The object to deep clone.
 * @param {WeakMap} hash The map to store cloned objects to handle circular references.
 * @returns {any} The cloned object.
 */
function deepCloneAdvanced(obj, hash = new WeakMap()) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  // 检查是否已经拷贝过该对象，防止循环引用
  if (hash.has(obj)) {
    return hash.get(obj);
  }

  const newObj = Array.isArray(obj) ? [] : {};
  
  // 将新创建的对象存入 hash 表
  hash.set(obj, newObj);

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      newObj[key] = deepCloneAdvanced(obj[key], hash);
    }
  }

  return newObj;
}
```
