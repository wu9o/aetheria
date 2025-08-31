# 二叉树的最大深度 (Maximum Depth of Binary Tree - LeetCode #104)

## 问题描述

给定一个二叉树，找出其最大深度。

二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。

**说明:** 叶子节点是指没有子节点的节点。

**示例:**

- **输入:** `root = [3,9,20,null,null,15,7]`
- **输出:** `3`

## 定义二叉树节点

```javascript
/**
 * Definition for a binary tree node.
 */
function TreeNode(val, left, right) {
  this.val = (val===undefined ? 0 : val)
  this.left = (left===undefined ? null : left)
  this.right = (right===undefined ? null : right)
}
```

## 解题代码 (JavaScript) - 递归 (DFS)

```javascript
/**
 * @param {TreeNode} root
 * @return {number}
 */
function maxDepth(root) {
  if (root === null) {
    return 0;
  }
  
  const leftDepth = maxDepth(root.left);
  const rightDepth = maxDepth(root.right);
  
  return Math.max(leftDepth, rightDepth) + 1;
}
```

## 解题代码 (JavaScript) - 迭代 (BFS)

```javascript
/**
 * @param {TreeNode} root
 * @return {number}
 */
function maxDepthBFS(root) {
  if (root === null) {
    return 0;
  }
  
  const queue = [root];
  let depth = 0;
  
  while (queue.length > 0) {
    depth++;
    const levelSize = queue.length;
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
    }
  }
  
  return depth;
}
```
