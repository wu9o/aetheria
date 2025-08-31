# 二叉树的层序遍历 (Binary Tree Level Order Traversal - LeetCode #102)

## 问题描述

给你二叉树的根节点 `root` ，返回其节点值的 **层序遍历** 。 （即逐层地，从左到右访问所有节点）。

**示例:**

- **输入:** `root = [3,9,20,null,null,15,7]`
- **输出:** `[[3],[9,20],[15,7]]`

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

## 解题代码 (JavaScript) - 迭代 (BFS)

```javascript
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
function levelOrder(root) {
  const result = [];
  if (root === null) {
    return result;
  }
  
  const queue = [root];
  
  while (queue.length > 0) {
    const levelSize = queue.length;
    const currentLevel = [];
    
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      currentLevel.push(node.val);
      
      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
    }
    result.push(currentLevel);
  }
  
  return result;
}
```
