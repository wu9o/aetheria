# 二叉搜索树的最近公共祖先 (Lowest Common Ancestor of a BST - LeetCode #235)

## 问题描述

给定一个二叉搜索树（BST），找到该树中两个指定节点的最近公共祖先（LCA）。

最近公共祖先的定义为：“对于有根树 T 的两个结点 p、q，最近公共祖先表示为一个结点 x，满足 x 是 p、q 的祖先且 x 的深度尽可能大（一个节点也可以是它自己的祖先）。”

**示例:**

- **输入:** `root = [6,2,8,0,4,7,9,null,null,3,5]`, `p = 2`, `q = 8`
- **输出:** `6`
- **解释:** 节点 `2` 和 `8` 的最近公共祖先是 `6`。

## 定义二叉树节点

```javascript
/**
 * Definition for a binary tree node.
 */
function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}
```

## 解题代码 (JavaScript) - 迭代法

```javascript
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
function lowestCommonAncestor(root, p, q) {
  let current = root;
  
  while (current !== null) {
    // 如果 p 和 q 都在当前节点的右子树
    if (p.val > current.val && q.val > current.val) {
      current = current.right;
    } 
    // 如果 p 和 q 都在当前节点的左子树
    else if (p.val < current.val && q.val < current.val) {
      current = current.left;
    } 
    // 如果 p 和 q 分别在当前节点的左右两侧，或者其中一个是当前节点
    // 那么当前节点就是最近公共祖先
    else {
      return current;
    }
  }
  
  return null;
}
```

## 解题代码 (JavaScript) - 递归法

```javascript
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
function lowestCommonAncestorRecursive(root, p, q) {
  if (root === null) {
    return null;
  }

  if (p.val > root.val && q.val > root.val) {
    return lowestCommonAncestorRecursive(root.right, p, q);
  } 
  else if (p.val < root.val && q.val < root.val) {
    return lowestCommonAncestorRecursive(root.left, p, q);
  } 
  else {
    return root;
  }
}
```
