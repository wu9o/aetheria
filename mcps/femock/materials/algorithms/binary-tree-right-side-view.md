# 二叉树的右视图 (Binary Tree Right Side View - LeetCode #199)

## 问题描述

给定一个二叉树的 **根节点** `root`，想象自己站在它的右侧，按照从顶部到底部的顺序，返回从右侧所能看到的节点值。

**示例:**

- **输入:** `[1,2,3,null,5,null,4]`
- **输出:** `[1,3,4]`

- **输入:** `[1,null,3]`
- **输出:** `[1,3]`

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

## 解题代码 (JavaScript) - 广度优先搜索 (BFS)

```javascript
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
function rightSideView(root) {
  const result = [];
  if (root === null) {
    return result;
  }

  const queue = [root];

  while (queue.length > 0) {
    const levelSize = queue.length;

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();

      // 如果是当前层的最后一个节点，则加入结果集
      if (i === levelSize - 1) {
        result.push(node.val);
      }

      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
    }
  }

  return result;
}
```
