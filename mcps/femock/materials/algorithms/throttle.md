# 函数节流 (Throttle)

## 问题描述

请实现一个 `throttle` 函数，该函数接收一个函数 `fn` 和一个延迟时间 `delay` 作为参数。`throttle` 函数应返回一个新函数，这个新函数在被连续调用时，在 `delay` 时间间隔内最多只执行一次 `fn`。

这在处理高频触发的事件（如 `scroll`, `resize`, `mousemove`）时非常有用，可以防止事件处理函数被过度调用。

## 要求

- 在第一次调用时应立即执行一次。
- 在节流时间段的末尾，应再执行一次，以确保响应最后一次触发的操作（可选，但更优）。
- `throttle` 函数需要正确处理 `this` 指向和参数传递。

## 解题代码 (JavaScript) - 定时器版

```javascript
/**
 * @param {Function} fn The function to throttle.
 * @param {number} delay The delay in milliseconds.
 * @returns {Function} The throttled function.
 */
function throttle(fn, delay) {
  let timer = null;
  let lastArgs = null;

  return function(...args) {
    lastArgs = args;
    const context = this;

    if (timer) {
      return; // 如果计时器正在运行，则忽略此次调用
    }

    // 立即执行第一次
    fn.apply(context, lastArgs);
    
    timer = setTimeout(() => {
      // delay 结束后，检查在此期间是否有新的调用
      // 如果有，则执行最后一次调用
      if (lastArgs) {
        fn.apply(context, lastArgs);
      }
      // 清除计时器
      timer = null;
      lastArgs = null;
    }, delay);
  };
}
```

## 解题代码 (JavaScript) - 时间戳版

```javascript
function throttleTimestamp(fn, delay) {
  let lastTime = 0;

  return function(...args) {
    const now = Date.now();
    const context = this;

    if (now - lastTime >= delay) {
      lastTime = now;
      fn.apply(context, args);
    }
  };
}
```
