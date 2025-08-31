# 翻转二叉树 (Invert Binary Tree - LeetCode #226)

## 问题描述

给你一棵二叉树的根节点 `root` ，翻转这棵二叉树，并返回其根节点。

**示例:**

- **输入:** `root = [4,2,7,1,3,6,9]`
- **输出:** `[4,7,2,9,6,3,1]`

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
 * @return {TreeNode}
 */
function invertTree(root) {
  if (root === null) {
    return null;
  }
  
  // 交换左右子节点
  const temp = root.left;
  root.left = root.right;
  root.right = temp;
  
  // 递归地翻转左右子树
  invertTree(root.left);
  invertTree(root.right);
  
  return root;
}
```

## 解题代码 (JavaScript) - 迭代 (BFS)

```javascript
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
function invertTreeBFS(root) {
  if (root === null) {
    return null;
  }
  
  const queue = [root];
  
  while (queue.length > 0) {
    const node = queue.shift();
    
    // 交换左右子节点
    const temp = node.left;
    node.left = node.right;
    node.right = temp;
    
    // 将子节点加入队列
    if (node.left) {
      queue.push(node.left);
    }
    if (node.right) {
      queue.push(node.right);
    }
  }
  
  return root;
}
```
