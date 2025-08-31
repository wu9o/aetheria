# 实现发布-订阅模式 (Event Emitter)

## 问题描述

请实现一个 `EventEmitter` 类，它允许对象之间进行事件的发布（emit）和订阅（subscribe/on）。这是一个常见的设计模式，用于解耦代码。

## 要求

`EventEmitter` 类应包含以下方法：
- `on(eventName, callback)`: 订阅一个事件。当该事件被触发时，执行回调函数。
- `off(eventName, callback)`: 取消订阅一个事件。
- `emit(eventName, ...args)`: 发布（触发）一个事件，所有订阅该事件的回调函数都应被调用，并传入 `...args` 参数。
- `once(eventName, callback)`: 订阅一个只执行一次的事件。回调函数在第一次被触发后，应自动取消订阅。

## 解题代码 (JavaScript)

```javascript
class EventEmitter {
  constructor() {
    this.events = new Map(); // Map<eventName, Array<Function>>
  }

  /**
   * 订阅事件
   * @param {string} eventName
   * @param {Function} callback
   */
  on(eventName, callback) {
    if (!this.events.has(eventName)) {
      this.events.set(eventName, []);
    }
    this.events.get(eventName).push(callback);
  }

  /**
   * 取消订阅事件
   * @param {string} eventName
   * @param {Function} callback
   */
  off(eventName, callback) {
    if (!this.events.has(eventName)) {
      return;
    }
    const listeners = this.events.get(eventName);
    const index = listeners.indexOf(callback);
    if (index > -1) {
      listeners.splice(index, 1);
    }
  }

  /**
   * 发布事件
   * @param {string} eventName
   * @param  {...any} args
   */
  emit(eventName, ...args) {
    if (!this.events.has(eventName)) {
      return;
    }
    // 创建一个监听器数组的副本，以防止在回调中修改原始数组导致的问题
    const listeners = [...this.events.get(eventName)];
    for (const listener of listeners) {
      listener.apply(this, args);
    }
  }

  /**
   * 订阅一次性事件
   * @param {string} eventName
   * @param {Function} callback
   */
  once(eventName, callback) {
    const onceWrapper = (...args) => {
      // 执行原始回调
      callback.apply(this, args);
      // 立即取消订阅
      this.off(eventName, onceWrapper);
    };
    this.on(eventName, onceWrapper);
  }
}
```
