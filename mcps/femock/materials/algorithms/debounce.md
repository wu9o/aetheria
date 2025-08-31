# 函数防抖 (Debounce)

## 问题描述

请实现一个 `debounce` 函数，该函数接收一个函数 `fn` 和一个延迟时间 `delay` 作为参数。`debounce` 函数应返回一个新函数，这个新函数在被连续调用时，只有在最后一次调用结束 `delay` 毫秒后，`fn` 才会执行。

例如，如果用户在输入框中快速打字，我们不希望每次按键都触发搜索请求，而是希望在用户停止打字一段时间后再发送请求。

## 要求

- 如果在 `delay` 时间内再次调用了新函数，则之前的计时器应被清除，并重新开始计时。
- `debounce` 函数需要正确处理 `this` 指向和参数传递。

## 解题代码 (JavaScript)

```javascript
/**
 * @param {Function} fn The function to debounce.
 * @param {number} delay The delay in milliseconds.
 * @returns {Function} The debounced function.
 */
function debounce(fn, delay) {
  let timerId = null;

  return function(...args) {
    // 保存 `this` 上下文
    const context = this;

    // 如果计时器已存在，则清除它
    if (timerId) {
      clearTimeout(timerId);
    }

    // 设置新的计时器
    timerId = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  };
}

// --- 示例 ---
// const logger = (text) => console.log(text);
// const debouncedLogger = debounce(logger, 1000);
// debouncedLogger('A');
// debouncedLogger('B');
// setTimeout(() => debouncedLogger('C'), 500); // 1秒后只会打印 'C'
```
