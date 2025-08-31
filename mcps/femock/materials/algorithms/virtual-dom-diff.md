# 简易虚拟DOM Diff (Simple Virtual DOM Diff)

## 问题描述

请实现一个 `diff` 函数，用于比较两棵虚拟 DOM (VNode) 树的差异，并返回一个描述这些差异的“补丁” (patches) 列表。

这是一个简化的虚拟 DOM diff 算法，旨在考察树的递归遍历和差异比较。

**VNode 结构定义:**
```javascript
{
  tag: 'div', // 标签名
  props: { id: 'container' }, // 属性
  children: [ // 子节点
    { tag: 'p', props: {}, children: ['Hello'] },
    'World' // 文本节点
  ]
}
```

## 要求

`diff(oldVNode, newVNode)` 函数需要能够识别以下几种差异类型：
- `CREATE`: 新增节点。
- `REMOVE`: 删除节点。
- `REPLACE`: 替换节点（例如，标签名不同或节点类型不同）。
- `UPDATE`: 更新节点属性 (`props`)。
- `TEXT`: 更新文本节点内容。

返回的 `patches` 应该是一个对象，以节点在树中的层序遍历索引为 `key`，差异描述数组为 `value`。

## 解题代码 (JavaScript)

```javascript
const VDOM_PATCH_TYPES = {
  CREATE: 'CREATE',
  REMOVE: 'REMOVE',
  REPLACE: 'REPLACE',
  UPDATE: 'UPDATE',
  TEXT: 'TEXT',
};

let globalIndex = 0;

function diff(oldVNode, newVNode) {
  const patches = {};
  globalIndex = 0;
  dfsWalk(oldVNode, newVNode, globalIndex, patches);
  return patches;
}

function dfsWalk(oldNode, newNode, index, patches) {
  const currentPatches = [];

  // Case 1: 新节点不存在，删除旧节点
  if (newNode === null || newNode === undefined) {
    currentPatches.push({ type: VDOM_PATCH_TYPES.REMOVE });
  } 
  // Case 2: 都是文本节点
  else if (typeof oldNode === 'string' && typeof newNode === 'string') {
    if (oldNode !== newNode) {
      currentPatches.push({ type: VDOM_PATCH_TYPES.TEXT, content: newNode });
    }
  } 
  // Case 3: 都是元素节点
  else if (oldNode.tag === newNode.tag) {
    // 比较 props
    const propsPatches = diffProps(oldNode.props, newNode.props);
    if (Object.keys(propsPatches).length > 0) {
      currentPatches.push({ type: VDOM_PATCH_TYPES.UPDATE, props: propsPatches });
    }
    // 比较 children
    diffChildren(oldNode.children, newNode.children, index, patches);
  } 
  // Case 4: 节点类型不同或标签名不同，替换
  else {
    currentPatches.push({ type: VDOM_PATCH_TYPES.REPLACE, newNode });
  }

  if (currentPatches.length > 0) {
    patches[index] = currentPatches;
  }
}

function diffProps(oldProps, newProps) {
  const propsPatches = {};
  // 检查更新和新增
  for (const key in newProps) {
    if (oldProps[key] !== newProps[key]) {
      propsPatches[key] = newProps[key];
    }
  }
  // 检查删除
  for (const key in oldProps) {
    if (!newProps.hasOwnProperty(key)) {
      propsPatches[key] = undefined; // 标记为删除
    }
  }
  return propsPatches;
}

function diffChildren(oldChildren, newChildren, parentIndex, patches) {
  oldChildren.forEach((child, i) => {
    // 索引需要基于父节点的层序索引
    // 简单起见，这里用 globalIndex 模拟
    globalIndex++;
    dfsWalk(child, newChildren[i], globalIndex, patches);
  });
}
```
