# 相同的树 (Same Tree - LeetCode #100)

## 问题描述

给你两棵二叉树的根节点 `p` 和 `q` ，编写一个函数来检验这两棵树是否相同。

如果两个树在结构上相同，并且节点具有相同的值，则认为它们是相同的。

**示例:**

- **输入:** `p = [1,2,3]`, `q = [1,2,3]`
- **输出:** `true`

- **输入:** `p = [1,2]`, `q = [1,null,2]`
- **输出:** `false`

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
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
function isSameTree(p, q) {
  // 1. 如果两个节点都为空，则它们相同
  if (p === null && q === null) {
    return true;
  }
  
  // 2. 如果只有一个节点为空，或者节点值不同，则它们不同
  if (p === null || q === null || p.val !== q.val) {
    return false;
  }
  
  // 3. 递归地比较左右子树
  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}
```
