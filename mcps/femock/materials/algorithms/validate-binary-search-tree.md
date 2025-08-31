# 验证二叉搜索树 (Validate Binary Search Tree - LeetCode #98)

## 问题描述

给你一个二叉树的根节点 `root` ，判断其是否是一个有效的二叉搜索树。

**有效** 二叉搜索树定义如下：
- 节点的左子树只包含 **小于** 当前节点的数。
- 节点的右子树只包含 **大于** 当前节点的数。
- 所有左子树和右子树自身必须也是二叉搜索树。

**示例:**

- **输入:** `root = [2,1,3]`
- **输出:** `true`

- **输入:** `root = [5,1,4,null,null,3,6]`
- **输出:** `false`
- **解释:** 根节点的值是 5 ，但是右子节点的值是 4 。

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
 * @return {boolean}
 */
function isValidBST(root) {
  
  function validate(node, lower, upper) {
    if (node === null) {
      return true; // 空树是有效的 BST
    }

    // 节点值必须在 (lower, upper) 的范围内
    if ((lower !== null && node.val <= lower) || (upper !== null && node.val >= upper)) {
      return false;
    }

    // 递归检查左右子树
    // 左子树的所有节点值必须小于当前节点值 (新的上界)
    // 右子树的所有节点值必须大于当前节点值 (新的下界)
    return validate(node.left, lower, node.val) && validate(node.right, node.val, upper);
  }

  return validate(root, null, null);
}
```

## 解题代码 (JavaScript) - 中序遍历

```javascript
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
function isValidBSTInorder(root) {
    let prev = -Infinity;
    
    function inorder(node) {
        if (node === null) {
            return true;
        }
        
        // 检查左子树
        if (!inorder(node.left)) {
            return false;
        }
        
        // 检查当前节点
        // 在中序遍历中，当前节点的值必须大于前一个节点的值
        if (node.val <= prev) {
            return false;
        }
        prev = node.val;
        
        // 检查右子树
        return inorder(node.right);
    }
    
    return inorder(root);
}
```
