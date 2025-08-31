# 实现 Promise.race

## 问题描述

请实现一个 `myPromiseRace` 函数，它的功能与 `Promise.race` 方法保持一致。

`Promise.race(iterable)` 方法返回一个 `promise`，一旦迭代器中的某个 `promise` **解决（fulfilled）** 或 **拒绝（rejected）**，返回的 `promise` 就会解决或拒绝。

## 要求

- 函数接收一个 `Promise` 的可迭代对象 `promises`。
- 返回一个新的 `Promise`。
- 只要 `promises` 中的任何一个 `Promise` 状态改变（无论是 `resolve` 还是 `reject`），新的 `Promise` 就应立即以相同的状态和值改变。
- 对于非 `Promise` 值的输入，应将其视为已解决的 `Promise`。

## 解题代码 (JavaScript)

```javascript
/**
 * @param {Array<Promise>} promises
 * @return {Promise}
 */
function myPromiseRace(promises) {
  return new Promise((resolve, reject) => {
    // 检查输入是否为可迭代对象
    if (!promises || typeof promises[Symbol.iterator] !== 'function') {
      return reject(new TypeError('Argument is not iterable'));
    }

    // 处理空的可迭代对象，返回的 promise 将永远 pending
    if (promises.length === 0) {
      return;
    }

    for (const p of promises) {
      // 使用 Promise.resolve() 来处理非 Promise 值
      Promise.resolve(p)
        .then(value => {
          // 第一个 resolve 的 promise 会让整个 race promise resolve
          resolve(value);
        })
        .catch(error => {
          // 第一个 reject 的 promise 会让整个 race promise reject
          reject(error);
        });
    }
  });
}

// --- 示例 ---
// const p1 = new Promise(r => setTimeout(() => r('one'), 500));
// const p2 = new Promise(r => setTimeout(() => r('two'), 100));
// const p3 = new Promise((_, r) => setTimeout(() => r('three'), 300));

// myPromiseRace([p1, p2, p3]).then(console.log).catch(console.error); // 'two'
// myPromiseRace([p1, p3]).then(console.log).catch(console.error);    // 'three'
```
