# JSBridge 设计与实现深度解析

本文档详细记录了《JSBridge》一文中的核心知识点，聚焦于 JSBridge 的设计原则、通信协议和具体实现细节，为 AI 提供构建面试题的深度物料。

## 1. JSBridge 的角色

JSBridge 是 H5 与 Native 之间的“桥梁”，其核心职责是提供一套统一的通信机制，让双方能够相互调用。

- **H5 (WebView)**: 作为 **“调用方”**，请求 Native 的能力。
- **Native (容器)**: 作为 **“能力提供方”**，负责实现具体功能并响应 H5 的请求。

## 2. 核心设计原则

一个健壮的 JSBridge 设计应包含以下要素：

### 2.1 统一协议 (Uniform Protocol)

为了让 H5 和 Native 能够“听懂”对方的指令，需要定义一套统一的通信协议。URL Scheme 是最常见的实现方式。

- **协议格式**: `scheme://module/action?param1=value1&param2=value2`
    - `scheme`: 自定义的协议名，用于区分普通 URL 和 JSBridge 调用（如 `jsbridge://`）。
    - `module`: 模块名，用于对功能进行分组（如 `ui`, `user`）。
    - `action`: 具体操作名（如 `showToast`, `getUserInfo`）。
    - `params`: URL 查询参数，用于传递数据。

### 2.2 请求分发 (Request Dispatching)

当 Native 拦截到协议请求后，需要一个分发中心来解析 URL 并调用相应的 Native 模块和方法。

- **流程**:
    1.  Native 拦截到 `jsbridge://` 协议的 URL。
    2.  解析出 `module` 和 `action`。
    3.  根据 `module` 找到对应的 Native 功能模块。
    4.  调用该模块的 `action` 方法，并将解析出的 `params` 传递过去。

### 2.3 回调处理 (Callback Management)

Native 的很多操作是异步的（如网络请求、文件读写）。JSBridge 必须能够处理异步结果的回调。

- **原理**:
    1.  **生成唯一 Callback ID**: H5 在每次调用 JSBridge 时，会生成一个全局唯一的 ID（如 `callback_12345`），并将一个回调函数存入 `window` 对象上，`key` 就是这个 ID。
    2.  **传递 Callback ID**: H5 将这个 ID 作为参数传递给 Native。
    3.  **Native 返回结果**: Native 完成异步操作后，会调用一个固定的 JS 方法（如 `JSBridge.callback`），并将 Callback ID 和执行结果作为参数传回。
    4.  **H5 执行回调**: `JSBridge.callback` 方法根据传入的 ID，从 `window` 对象中找到对应的回调函数，并用返回的结果来执行它，执行后销毁该回调。

## 3. H5 端的实现细节

### 触发请求

- **方式**: 通过创建一个隐藏的 `iframe` 并设置其 `src` 为协议 URL。
- **原因**:
    - 不会引起页面刷新或跳转。
    - 可以有效地连续触发请求。
    - 相比 `window.location.href` 的方式更安全、无副作用。

### 示例代码 (H5 端)

```javascript
const JSBridge = {
  callbacks: {},
  
  invoke: function(module, action, params, callback) {
    const callbackId = 'callback_' + Date.now() + Math.random();
    this.callbacks[callbackId] = callback;

    const url = `jsbridge://${module}/${action}?callbackId=${callbackId}&` + encodeURIComponent(JSON.stringify(params));

    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = url;
    document.body.appendChild(iframe);

    setTimeout(() => {
      document.body.removeChild(iframe);
    }, 300);
  },

  // 由 Native 调用的回调函数
  callback: function(callbackId, result) {
    if (this.callbacks[callbackId]) {
      this.callbacks[callbackId](result);
      delete this.callbacks[callbackId];
    }
  }
};

// 使用
JSBridge.invoke('ui', 'showToast', { text: 'Hello' }, (res) => {
  console.log('Toast showed:', res);
});
```

## 4. Native 端的实现细节

### 拦截请求

- **Android**: 在 `WebViewClient` 的 `shouldOverrideUrlLoading` 方法中，判断 URL 的 scheme 是否为约定的 `jsbridge://`。如果是，则拦截请求，不进行页面跳转，并进入分发逻辑。
- **iOS**: 在 `UIWebViewDelegate` 的 `webView:shouldStartLoadWithRequest:navigationType:` 方法中进行类似的拦截和处理。

### 执行与回调

- Native 端解析 URL，执行相应功能。
- 功能执行完毕后，调用 WebView 提供的 API 来执行 JavaScript，将结果和 Callback ID 回传给 H5。
  - 例如: `webView.loadUrl("javascript:JSBridge.callback('callback_12345', { status: 'ok' })")`
