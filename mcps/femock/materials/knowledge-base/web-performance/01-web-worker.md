# Web Worker 深度解析

本文档详细记录了《Web Worker》一文中的核心知识点，聚焦于其原理、使用场景、通信机制和限制，为 AI 提供构建面试题的深度物料。

## 1. 背景：JavaScript 的单线程限制

- **核心问题**: JavaScript 语言本身是 **单线程** 的。这意味着在浏览器的一个 Tab 页中，所有 JavaScript 代码（UI 渲染、用户交互、脚本执行）都在同一个主线程上运行。
- **带来的痛点**: 如果一段 JS 代码执行时间过长（例如，进行大规模的科学计算、图像处理、数据解密等），主线程就会被 **阻塞**。
- **用户体验**: 主线程阻塞会导致页面无法响应任何用户操作（点击、滚动等），甚至出现动画卡顿或页面假死的情况，严重影响用户体验。

## 2. Web Worker：为 JS 开启多线程

- **定义**: Web Worker 是 W3C 标准提供的一套 API，它允许我们在主线程之外，创建一个或多个 **后台线程 (Worker 线程)** 来执行 JavaScript 脚本。
- **核心价值**: 将耗时的计算任务从主线程剥离，转移到 Worker 线程中去处理，从而 **解放主线程**，使其能保持对用户操作的流畅响应。

## 3. Web Worker 的工作原理

- **线程独立**:
    - 每个 Worker 线程都拥有自己独立的 **全局上下文、事件循环、消息队列和调用栈**。
    - 主线程与 Worker 线程的内存空间是 **不共享** 的。它们之间通过一个“管道”进行通信。

- **创建 Worker**:
  ```javascript
  // main.js (主线程)
  const myWorker = new Worker('worker.js'); // 传入脚本文件的 URL
  ```

- **通信机制**:
    - **核心 API**: `postMessage()` 用于发送消息，`onmessage` 事件监听器用于接收消息。通信是 **双向** 的。
    - **数据传递**: 通过 `postMessage` 发送的数据是 **拷贝** 关系，而不是共享引用。这意味着在一个线程中修改数据，不会影响到另一个线程。底层使用的是“结构化克隆算法”。
    - **示例**:
      ```javascript
      // main.js (主线程)
      myWorker.postMessage({ command: 'start', data: [1, 2, 3] });

      myWorker.onmessage = function(event) {
        console.log('Received from worker:', event.data); // { status: 'done', result: 6 }
      };

      // worker.js (Worker 线程)
      self.onmessage = function(event) {
        console.log('Received from main:', event.data); // { command: 'start', data: [1, 2, 3] }
        const sum = event.data.data.reduce((a, b) => a + b, 0);
        self.postMessage({ status: 'done', result: sum });
      };
      ```

- **销毁 Worker**:
    - **主线程销毁**: `myWorker.terminate();`
    - **Worker 自我销毁**: `self.close();`

## 4. Web Worker 的限制

由于线程隔离的设计，Worker 线程的能力受到严格限制，以确保线程安全：

- **无法访问 DOM**: Worker 线程中没有 `window` 和 `document` 对象，不能进行任何 DOM 操作（创建、修改、删除元素）。
- **全局对象**: Worker 内部的全局对象是 `self`。
- **API 限制**:
    - 可以使用 `setTimeout`, `setInterval`, `XMLHttpRequest`, `fetch` 等。
    - 不能使用 `alert`, `confirm` 等 UI 相关 API。
- **同源策略**: Worker 脚本文件必须与主页面遵循同源策略。
- **文件协议**: 不能直接从本地 `file://` 协议加载 Worker 脚本。

## 5. 总结

Web Worker 是解决前端复杂计算和性能问题的利器。它通过将耗时任务放入后台线程，避免了主线程的阻塞，是提升 Web 应用响应能力和用户体验的重要技术手段。
