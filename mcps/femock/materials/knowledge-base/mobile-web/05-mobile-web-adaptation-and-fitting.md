# H5 移动端适配方案深度解析

本文档详细记录了《H5 移动端适配》一文中的核心知识点，聚焦于 Viewport、像素概念以及 `rem`, `vw/vh` 等主流适配方案，为 AI 提供构建面试题的深度物料。

## 1. 基础概念

### 1.1 像素 (Pixel)

在移动端开发中，需要区分三种像素概念：

- **设备像素 (Device Pixels / 物理像素)**:
    - 定义：屏幕上物理存在的最小发光单元。
    - 示例：iPhone 6 的屏幕分辨率为 750x1334px，指的就是设备像素。

- **CSS 像素 (CSS Pixels)**:
    - 定义：在 CSS 代码中使用的逻辑像素单位（如 `width: 100px`）。
    - 特点：它是一个抽象单位，与设备像素没有固定的比例关系。

- **设备像素比 (Device Pixel Ratio - DPR)**:
    - 定义：设备像素与 CSS 像素之间的换算关系。
    - 计算公式：`DPR = 设备像素 / CSS 像素` (在某一方向上)。
    - JavaScript 获取：`window.devicePixelRatio`。
    - 示例：在 DPR 为 2 的屏幕上，1 个 CSS 像素在渲染时会占据 2x2 = 4 个设备像素，这使得图像和文字看起来更清晰（Retina 屏）。

### 1.2 视口 (Viewport)

- **定义**: 浏览器中用于显示网页内容的区域。
- **移动端问题**: 移动设备屏幕远小于 PC，但早期的移动端浏览器为了兼容 PC 网站，默认视口宽度很大（如 980px），导致 PC 网站在手机上显示时字体极小，需要用户手动缩放。
- **解决方案：`<meta name="viewport">` 标签**
    - **作用**: 允许开发者控制视口的宽度和缩放比例。
    - **标准配置**:
      ```html
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
      ```
      - `width=device-width`: 将视口宽度设置为设备的屏幕宽度。
      - `initial-scale=1.0`: 设置初始缩放比例为 1.0。
      - `maximum-scale=1.0`: 设置最大缩放比例。
      - `user-scalable=no`: 禁止用户手动缩放。

## 2. 主流适配方案

### 方案一：`rem` 响应式布局

- **核心单位 `rem`**:
    - 定义：一个相对单位，`1rem` 等于根元素 `<html>` 的 `font-size` 大小。
- **核心原理**:
    1.  获取当前设备的视口宽度。
    2.  根据视口宽度，通过 JavaScript 动态计算并设置 `<html>` 元素的 `font-size`。
    3.  页面上所有需要适配的元素的尺寸（如 `width`, `height`, `margin`, `padding`）都使用 `rem` 作为单位。
    4.  当视口宽度变化时，`<html>` 的 `font-size` 随之变化，所有使用 `rem` 的元素也会等比例缩放，从而实现整体布局的适配。
- **示例代码 (设置根 `font-size`)**:
  ```javascript
  function setRemUnit() {
    const docEl = document.documentElement;
    const clientWidth = docEl.clientWidth;
    // 假设设计稿宽度为 750px，并希望 1rem = 100px
    const rem = 100 * (clientWidth / 750);
    docEl.style.fontSize = rem + 'px';
  }
  setRemUnit();
  window.addEventListener('resize', setRemUnit);
  ```
- **优点**: 兼容性好，能实现整体页面的等比例缩放。
- **缺点**: 需要引入额外的 JavaScript 代码。

### 方案二：`vw/vh` 视口单位布局

- **核心单位 `vw/vh`**:
    - `vw` (Viewport Width): `1vw` 等于视口宽度的 1%。
    - `vh` (Viewport Height): `1vh` 等于视口高度的 1%。
- **核心原理**:
    - 直接使用 `vw` 作为尺寸单位，将设计稿中的像素尺寸按比例转换为 `vw` 值。
    - 浏览器会根据视口宽度自动计算元素的实际大小，无需 JavaScript 干预。
- **转换公式**: `(元素像素值 / 设计稿宽度) * 100 vw`
    - 示例：在 750px 宽的设计稿上，一个 150px 宽的元素，其宽度应设为 `(150 / 750) * 100 = 20vw`。
- **优点**:
    - 纯 CSS 方案，无需 JS。
    - 语义化清晰，直接与视口挂钩。
- **缺点**:
    - 在极宽或极窄的屏幕上可能导致元素过大或过小。
    - 存在一些兼容性问题和像素计算的微小偏差。

### 方案三：`flexible.js` (淘宝方案)

- **背景**: 早期解决移动端适配，特别是高清屏“1px 边框”问题的经典方案。
- **核心原理 (结合 `rem` 和 `viewport` 缩放)**:
    1.  **动态修改 `<meta>` 标签**: 根据设备的 DPR，通过 JS 动态地设置 `viewport` 的 `initial-scale` 值，使得 `1个CSS像素` 严格等于 `1个物理像素`。
    2.  **动态设置 `rem`**: 同时，它也会根据屏幕宽度动态设置根元素的 `font-size`，开发者使用 `rem` 进行布局。
- **优点**:
    - 精确地解决了高清屏下 1px 边框变粗的问题。
    - 提供了一套成熟的适配体系。
- **缺点**:
    - **已废弃**: 官方已不推荐使用，认为 `vw/vh` 是更未来的方案。
    - 对 `viewport` 的侵入性较强，可能与其他库或响应式设计思路冲突。
