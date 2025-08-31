# 无界 (Wujie) 微前端框架深度解析

本文档详细记录了《iframe 微前端方案》一文中的核心知识点，聚焦于“无界”框架如何创新性地使用 iframe 作为沙箱，并结合 Web Component 解决传统 iframe 方案的痛点，为 AI 提供构建面试题的深度物料。

## 1. 核心思想：`iframe` 作为完美的 JS 沙箱

传统微前端方案致力于在同一个 `window` 环境下模拟出沙箱，实现过程复杂且有诸多边界情况。无界反其道而行之，认为 `iframe` 本身就是浏览器原生提供的、最完美的沙箱。

- **JS 隔离**: 每个微应用都运行在一个独立的 `iframe` 中，拥有自己独立的 `window`, `document`, `location`, `history` 对象，实现了完美的 JavaScript 隔离。
- **CSS 隔离**: 微应用的样式表只在 `iframe` 内部生效，不会污染主应用。

## 2. 创新架构：`Web Component` + `iframe`

无界的核心创新在于，它只把 `iframe` 当作 **纯粹的 JS 运行环境 (沙箱)**，而将微应用的 **UI 渲染** 放在了主应用文档流中的 **Web Component** 之内。

- **`Web Component` 作为 UI 容器**:
    - 每个微应用在主应用中都对应一个自定义的 Web Component 标签（如 `<wujie-app>`)。
    - 这个 Web Component 内部使用 **Shadow DOM** 来承载微应用的真实 DOM 结构。
    - **优势**:
        - **样式隔离**: Shadow DOM 提供了原生的 CSS 隔离能力。
        - **DOM 结构清晰**: 微应用的 DOM 结构在主应用的文档流中，解决了 `iframe` 布局和弹窗的难题。

- **`iframe` 作为 JS 沙箱**:
    - 为每个微应用创建一个不可见的 `iframe`。
    - 微应用的所有 JS 代码都在这个 `iframe` 中执行。

- **连接 UI 与 JS**:
    - 无界通过 `Proxy` 劫持了 `iframe` 内部的 `document` 对象。
    - 当微应用的 JS 代码试图操作 DOM 时（如 `document.body.appendChild(div)`），`Proxy` 会拦截这个操作，并将其 **重定向** 到外部 Web Component 的 Shadow DOM 上。
    - **效果**: 对于微应用来说，它感觉自己是在一个正常的 `iframe` 环境中操作 DOM，但实际上它的所有 UI 都被渲染到了主应用的页面上。

## 3. 解决传统 iframe 方案的痛点

### a. 路由状态丢失问题

- **问题**: `iframe` 有自己的 `history` 栈，与主应用不共享。刷新页面时，`iframe` 内部的路由状态会丢失。
- **无界方案**:
    1.  **路由同步**: 劫持 `iframe` 内部的 `history.pushState/replaceState`。
    2.  当 `iframe` 内部路由变化时，无界会将子应用的路径同步到主应用 URL 的一个查询参数上（如 `?wujie-app-url=/path`）。
    3.  **利用浏览器原生能力**: 刷新时，主应用加载后，无界会从 URL 中读取子应用的路径，并恢复 `iframe` 的路由状态。这巧妙地利用了浏览器的“同源 `iframe` 共享会话历史”的特性，使得浏览器的前进、后退按钮能正常工作。

### b. 弹窗无法覆盖全局的问题

- **问题**: `iframe` 内部的 `position: fixed` 弹窗只能相对于 `iframe` 自身进行定位，无法覆盖整个主应用视口。
- **无界方案**: 由于微应用的 DOM 结构本身就在主应用的 Web Component 中，所以弹窗是相对于主应用的 `viewport` 定位的，自然可以覆盖全局。

### c. 通信复杂问题

- **问题**: 传统 `iframe` 通信依赖繁琐的 `postMessage`。
- **无界方案**:
    - **同源**: 主应用和 `iframe` 沙箱是同源的。
    - **`window.parent`**: 微应用可以直接通过 `window.parent` 访问主应用的 `window` 对象。
    - **Props**: 主应用可以通过 props 向微应用传递数据。
    - **EventBus**: 框架内置了去中心化的事件总线。

## 4. 性能与体验优化

- **应用保活 (Keep-Alive)**:
    - 当微应用被切换到后台时，其 Web Component 容器和 `iframe` 沙箱并不会被销毁，只是从 DOM 中移除。
    - 当再次切回时，容器和沙箱被重新挂载，微应用可以从离开时的状态继续运行，无需重新加载。
- **预加载 (Preload)**:
    - 可以在浏览器空闲时（`requestIdleCallback`）提前加载下一个可能访问的微应用的静态资源（JS, CSS）。
- **预执行 (Pre-execute)**:
    - 更进一步，可以在后台提前执行微应用的 JS，使其完成渲染。当用户真正导航过去时，可以实现“秒开”。
    - 为了防止预执行阻塞主线程，无界采用了类似 Fiber 的时间分片机制。

## 5. 总结

无界框架通过 **“将 `iframe` 的 JS 隔离能力和 `Web Component` 的 UI 承载能力相结合”** 的创新思路，巧妙地解决了传统微前端方案中的诸多痛点，提供了一个隔离性强、性能优秀、体验流畅且接入成本低的微前端解决方案。
