# 实现 Promise.all

## 问题描述

请实现一个名为 `myPromiseAll` 的函数，它的功能与 `Promise.all` 基本一致。

`Promise.all` 方法接收一个 `Promise` 的可迭代对象（比如数组），并返回一个新的 `Promise` 对象。这个新的 `Promise` 对象在可迭代对象中所有的 `Promise` 都成功解析后才会解析，并将所有 `Promise` 的解析结果按原始顺序汇总成一个数组。如果可迭代对象中的任何一个 `Promise` 被拒绝（rejected），则返回的 `Promise` 会立即被拒绝，并带有第一个被拒绝的 `Promise` 的原因。

## 要求

- 函数接收一个 `Promise` 数组 `promises`。
- 返回一个新的 `Promise`。
- 正确处理空数组的边界情况（应立即解析为空数组）。
- 保证返回结果的顺序与输入 `promises` 数组的顺序一致。
- 如果有任何一个 `Promise` 失败，应立即 `reject`。

## 解题代码 (JavaScript)

```javascript
/**
 * @param {Array<Promise>} promises
 * @return {Promise}
 */
function myPromiseAll(promises) {
  return new Promise((resolve, reject) => {
    // 处理空数组的边界情况
    if (!promises || promises.length === 0) {
      resolve([]);
      return;
    }

    const results = [];
    let completedCount = 0;
    const totalPromises = promises.length;

    promises.forEach((promise, index) => {
      // 确保每个元素都是 Promise
      Promise.resolve(promise)
        .then(value => {
          // 将结果按顺序存放在 results 数组的对应位置
          results[index] = value;
          completedCount++;

          // 当所有 Promise 都成功时，resolve 整个 Promise
          if (completedCount === totalPromises) {
            resolve(results);
          }
        })
        .catch(error => {
          // 如果有任何一个 Promise 失败，立即 reject
          reject(error);
        });
    });
  });
}

// --- 示例 ---
// const p1 = Promise.resolve(1);
// const p2 = new Promise(resolve => setTimeout(() => resolve(2), 1000));
// const p3 = 3;
// const p4 = Promise.reject('error');

// myPromiseAll([p1, p2, p3]).then(console.log).catch(console.error); // [1, 2, 3]
// myPromiseAll([p1, p2, p4]).then(console.log).catch(console.error); // 'error'
```
