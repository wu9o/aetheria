# H5 与 Native 交互深度解析

本文档详细记录了《WebView》一文中的核心知识点，聚焦于 JSBridge 的实现原理和离线包技术，为 AI 提供构建面试题的深度物料。

## 1. H5 与 App 的关系

- **容器**: App (Native) 是容器，H5 (Web) 是内容。
- **渲染**: H5 在 App 内置的 WebView 组件中渲染和运行。
- **界限**: 两者运行在不同的环境中，默认情况下是隔离的，无法直接通信。

## 2. JSBridge：打破通信壁垒

JSBridge 是一套实现 JS 与 Native 双向通信的机制。

### 2.1 JS 调用 Native (核心)

这是最主要和最复杂的通信方式，主要有两种实现方案。

#### 方案一：API 注入 (推荐)

- **原理**: Native 端向 WebView 的 `window` 对象上注入一个全局变量或方法。H5 端的 JavaScript 直接调用这个全局对象上的方法，从而触发对应的 Native 代码执行。
- **优点**:
    - **直观易用**: H5 开发者像调用普通 JS 函数一样调用，无需关心底层实现。
    - **解耦**: 将通信细节封装在注入的对象中。
- **实现**:
    - **Android**: 使用 `addJavascriptInterface` 方法。
    - **iOS**: 使用 `WKWebView` 的 `WKScriptMessageHandler` 协议。

#### 方案二：URL 拦截 (Scheme 拦截)

- **原理**: H5 端通过某种方式发起一个特殊的 URL 请求（例如，改变 `window.location.href` 或创建一个隐藏的 `iframe`），这个 URL 使用自定义的协议（Scheme），如 `myapp://showToast?text=hello`。Native 端会拦截 WebView 中所有 URL 的跳转请求，当监听到是这种自定义协议时，它不会真正跳转，而是解析这个 URL，获取协议名、方法名和参数，然后去执行对应的 Native 方法。
- **优点**:
    - **兼容性好**: 是一种比较通用的“黑科技”，在一些旧的 WebView 或特殊场景下也能工作。
- **缺点**:
    - **实现复杂**: 需要 H5 和 Native 共同约定一套 URL 解析规则。
    - **有长度限制**: URL 本身有长度限制，不适合传递大量数据。
    - **性能问题**: 创建 iframe 或改变 location 会有额外的性能开销。
- **拦截点**:
    - **Android**: `WebViewClient.shouldOverrideUrlLoading()`
    - **iOS**: `UIWebViewDelegate` 的 `webView:shouldStartLoadWithRequest:navigationType:`

### 2.2 Native 调用 JS

- **原理**: Native 端直接执行一段拼接好的 JavaScript 字符串代码。
- **实现**:
    - **Android**: `webView.loadUrl("javascript:yourJavaScriptFunction('param')")`
    - **iOS**: `webView.stringByEvaluatingJavaScriptFromString(...)`
- **特点**: 相对简单直接，通常用于从 Native 端向 H5 页面传递数据或触发事件。

## 3. 离线包：优化 H5 加载性能

离线包是解决 H5 页面加载慢、白屏时间长的关键性能优化手段。

- **背景**: H5 页面的资源（HTML, CSS, JS, 图片等）默认通过网络请求加载，受网络环境影响大。
- **核心思想**: **将资源请求从“网络”转移到“本地”**。

- **实现流程**:
    1.  **打包**: 将 H5 项目的所有静态资源打包成一个压缩文件（如 `.zip`）。
    2.  **下发**: App 通过某种机制（如启动时检查更新、后台静默下载）将最新的离线包下载到手机本地存储中。
    3.  **拦截**: Native 端拦截 WebView 发出的所有资源请求。
    4.  **匹配**: 检查请求的资源是否存在于本地的离线包中。
        - **命中**: 如果存在，则直接从本地文件系统中读取资源内容，并返回给 WebView，**绕过网络请求**。
        - **未命中**: 如果不存在（例如，一些动态数据接口），则放行该请求，让它继续走网络流程。

- **带来的好处**:
    - **极速加载**: 本地文件读取速度远快于网络请求，显著降低页面白屏时间。
    - **离线访问**: 在无网络或弱网环境下，H5 页面依然可以展示。
    - **节省流量**: 为用户节省数据流量。
