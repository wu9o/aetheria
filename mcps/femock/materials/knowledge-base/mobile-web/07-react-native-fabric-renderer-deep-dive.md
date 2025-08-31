# React Native Fabric 渲染引擎深度解析

本文档详细记录了《RN Fabric 渲染系统》一文中的核心知识点，聚焦于 Fabric 的渲染流程、C++ Shadow Tree、以及它与旧架构的差异，为 AI 提供构建面试题的深度物料。

## 1. Fabric 的诞生背景

在 React Native 的旧架构中，UI 管理器（UIManager）存在性能瓶颈：
- **平台特定实现**: Android 和 iOS 各有一套用 Java 和 Objective-C 实现的 UIManager，难以维护和统一。
- **依赖 Bridge**: 所有 UI 操作都需通过异步的 Bridge 通信，效率低下。
- **JNI 开销 (Android)**: 在 Android 上，Java 与 C++ (Yoga 布局引擎) 之间的频繁通信（JNI 调用）开销巨大。

**Fabric** 的目标就是重写 UI 管理层，以解决这些问题。

## 2. Fabric 的核心：C++ 实现的跨平台 UI 层

Fabric 的最大变革在于将 UI 管理的核心逻辑（包括 Shadow Tree 和 View Flattening）下沉到了 **C++ 层**，实现了真正的跨平台共享。

- **优势**:
    - **性能提升**: C++ 层的内存占用更少，计算速度更快。
    - **平台一致性**: 保证了不同平台的渲染逻辑和表现一致。
    - **JNI 开销降低**: 在 Android 上，UI 管理和布局计算都在 C++ 层完成，避免了 Java 和 C++ 之间的低效通信。

## 3. Fabric 的渲染三阶段

Fabric 将 React 组件渲染到屏幕上的过程分为三个清晰的阶段：

### a. Render 阶段 (JS)

- **输入**: 用户交互或 `setState` 触发的 React 组件更新。
- **过程**: React 在 **JS 线程** 中执行其著名的“协调”算法（Reconciliation），生成一棵新的 **React Element Tree**。
- **输出**: 通过 JSI，这棵 React Element Tree 被同步地转换为一棵在 C++ 层的 **Shadow Tree**。

### b. Commit 阶段 (C++)

- **输入**: Render 阶段生成的 Shadow Tree。
- **过程**:
    1.  **布局计算**: 在 **后台线程** 中，Fabric 调用 **Yoga** 引擎，为 Shadow Tree 中的每个节点计算其在屏幕上的布局（位置和大小）。
    2.  **树的提升**: 完成布局计算后，这棵“完整”的 Shadow Tree 被提升为下一帧要渲染的“主树”。
    3.  **Diff/Flattening**: 在此阶段，Fabric 还会进行 **View Flattening**（视图扁平化）优化，将那些只用于布局而没有视觉效果的视图（如 `<View style={{padding: 10}}>`）从渲染树中移除，以减少原生视图的层级深度。

### c. Mount 阶段 (Native)

- **输入**: Commit 阶段完成布局计算的 Shadow Tree。
- **过程**: Fabric 根据 Shadow Tree 的信息，在 **原生主线程 (UI 线程)** 上，生成对应的原生视图（Host Views），如 `UIView` (iOS) 和 `android.view.View` (Android)。
- **输出**: 用户在屏幕上看到的最终 UI 界面。

## 4. Fabric 与旧架构的核心差异

| 对比项 | 旧架构 (UIManager) | 新架构 (Fabric) |
| :--- | :--- | :--- |
| **核心实现** | Java (Android) / Obj-C (iOS) | C++ (跨平台共享) |
| **通信方式** | 异步 Bridge | 同步 JSI |
| **线程模型** | JS -> Bridge -> Native | JS <-> JSI <-> C++ <-> Native |
| **UI 更新** | 异步消息驱动 | 同步调用，优先级更高 |
| **布局计算** | Java/Obj-C 调用 C++ Yoga | 完全在 C++ 层完成 |
| **并发能力** | 不支持 | 支持 React 并发渲染 |
| **优化** | 独立的视图扁平化 | Diff 过程中集成视图扁平化 |

## 5. 总结

Fabric 是 React Native 渲染系统的一次彻底革命。通过将核心逻辑下沉到 C++ 并利用 JSI 实现同步通信，它从根本上解决了旧架构的性能瓶 chiffres，使得 RN 应用的 UI 响应更迅速、动画更流畅，并为支持 React 的未来并发特性铺平了道路。
