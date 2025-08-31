# 实现记忆函数 (Memoize)

## 问题描述

请实现一个高阶函数 `memoize`，它接收一个函数 `fn` 作为参数，并返回该函数的一个“记忆化”版本。

**记忆化** 是一种优化技术，通过缓存函数调用的结果，当后续使用相同的参数再次调用该函数时，可以直接返回缓存的结果，而无需重新计算。

**示例:**

```javascript
const slowAdd = (a, b) => {
  // 模拟一个耗时计算
  for (let i = 0; i < 1e8; i++) {}
  return a + b;
};

const memoizedAdd = memoize(slowAdd);

console.time('first call');
memoizedAdd(1, 2); // 第一次调用，较慢
console.timeEnd('first call');

console.time('second call');
memoizedAdd(1, 2); // 第二次调用，非常快，直接从缓存返回
console.timeEnd('second call');
```

## 要求

- `memoize` 函数应返回一个新的函数。
- 新函数能够缓存基于其参数的计算结果。
- 缓存的 `key` 应该能唯一地标识一组参数。对于简单参数（如 `number`, `string`），可以直接拼接；对于复杂参数（如 `object`），需要考虑更稳妥的序列化方式。

## 解题代码 (JavaScript) - 基础版 (处理原始类型参数)

```javascript
/**
 * @param {Function} fn The function to memoize.
 * @returns {Function} The memoized function.
 */
function memoize(fn) {
  const cache = new Map();

  return function(...args) {
    // 使用简单的 join 作为 key，适用于原始类型参数
    const key = args.join(',');

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = fn.apply(this, args);
    cache.set(key, result);
    
    return result;
  };
}
```

## 解题代码 (JavaScript) - 进阶版 (处理对象参数)

```javascript
/**
 * @param {Function} fn The function to memoize.
 * @returns {Function} The memoized function.
 */
function memoizeAdvanced(fn) {
  const cache = new Map();

  return function(...args) {
    // 使用 JSON.stringify 作为 key，可以处理可序列化的对象
    // 注意：这对于包含函数、Symbol 或循环引用的对象无效
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = fn.apply(this, args);
    cache.set(key, result);
    
    return result;
  };
}
```
