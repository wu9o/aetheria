# 旋转图像 (Rotate Image - LeetCode #48)

## 问题描述

给定一个 `n × n` 的二维矩阵 `matrix` 表示一个图像。请你将图像顺时针旋转 90 度。

你必须在 **原地** 旋转图像，这意味着你需要直接修改输入的二维矩阵。**请不要** 使用另一个矩阵来旋转图像。

**示例:**

- **输入:** `matrix = [[1,2,3],[4,5,6],[7,8,9]]`
- **输出:** `[[7,4,1],[8,5,2],[9,6,3]]`

## 解题代码 (JavaScript) - 两次翻转

```javascript
/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
function rotate(matrix) {
  const n = matrix.length;

  // 1. 水平翻转 (上下翻转)
  for (let i = 0; i < Math.floor(n / 2); i++) {
    for (let j = 0; j < n; j++) {
      [matrix[i][j], matrix[n - 1 - i][j]] = [matrix[n - 1 - i][j], matrix[i][j]];
    }
  }

  // 2. 沿主对角线翻转
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
    }
  }
}

// --- 示例 ---
// const matrix = [[1,2,3],[4,5,6],[7,8,9]];
// rotate(matrix);
// console.log(matrix); // [[7,4,1],[8,5,2],[9,6,3]]
```
