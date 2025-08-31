# 实现并发任务调度器 (Scheduler)

## 问题描述

实现一个 `Scheduler` 类，它允许添加异步任务，并能限制同时运行的任务数量。

**示例:**

```javascript
const timeout = (time) => new Promise(resolve => {
  setTimeout(resolve, time);
});

const scheduler = new Scheduler(2); // 并发限制为 2

const addTask = (time, order) => {
  scheduler.add(() => timeout(time)).then(() => console.log(order));
};

addTask(1000, '1');
addTask(500, '2');
addTask(300, '3');
addTask(400, '4');

// 期望输出: 2, 3, 1, 4
// 解释:
// 1. scheduler 初始化，并发限制为 2。
// 2. '1' (1000ms) 和 '2' (500ms) 立即开始。
// 3. 500ms 后，'2' 完成，输出 '2'。队列中 '3' (300ms) 开始执行。
// 4. 300ms 后 (总时间 800ms)，'3' 完成，输出 '3'。队列中 '4' (400ms) 开始执行。
// 5. 200ms 后 (总时间 1000ms)，'1' 完成，输出 '1'。
// 6. 200ms 后 (总时间 1200ms)，'4' 完成，输出 '4'。
```

## 解题代码 (JavaScript)

```javascript
class Scheduler {
  /**
   * @param {number} limit The concurrency limit.
   */
  constructor(limit) {
    this.limit = limit;
    this.runningCount = 0; // 当前正在运行的任务数
    this.taskQueue = [];   // 等待执行的任务队列
  }

  /**
   * @param {Function} promiseCreator A function that returns a promise.
   * @returns {Promise} A promise that resolves with the result of the input promise.
   */
  add(promiseCreator) {
    return new Promise((resolve, reject) => {
      const task = () => {
        promiseCreator()
          .then(resolve)
          .catch(reject)
          .finally(() => {
            this.runningCount--;
            this._runNext();
          });
      };
      this.taskQueue.push(task);
      this._runNext();
    });
  }

  _runNext() {
    // 如果有等待的任务并且有空闲的并发位
    while (this.taskQueue.length > 0 && this.runningCount < this.limit) {
      const task = this.taskQueue.shift();
      this.runningCount++;
      task();
    }
  }
}
```
