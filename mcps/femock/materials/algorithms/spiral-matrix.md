# 螺旋矩阵 (Spiral Matrix - LeetCode #54)

## 问题描述

给你一个 `m` 行 `n` 列的矩阵 `matrix` ，请按照 **顺时针螺旋顺序** ，返回矩阵中的所有元素。

**示例:**

- **输入:** `matrix = [[1,2,3],[4,5,6],[7,8,9]]`
- **输出:** `[1,2,3,6,9,8,7,4,5]`

- **输入:** `matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]`
- **输出:** `[1,2,3,4,8,12,11,10,9,5,6,7]`

## 解题代码 (JavaScript) - 模拟

```javascript
/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
function spiralOrder(matrix) {
  if (!matrix || matrix.length === 0) {
    return [];
  }

  const result = [];
  const rows = matrix.length;
  const cols = matrix[0].length;
  
  let top = 0;
  let bottom = rows - 1;
  let left = 0;
  let right = cols - 1;

  while (top <= bottom && left <= right) {
    // 1. 从左到右
    for (let i = left; i <= right; i++) {
      result.push(matrix[top][i]);
    }
    top++;

    // 2. 从上到下
    for (let i = top; i <= bottom; i++) {
      result.push(matrix[i][right]);
    }
    right--;

    // 3. 从右到左 (需要检查 top <= bottom)
    if (top <= bottom) {
      for (let i = right; i >= left; i--) {
        result.push(matrix[bottom][i]);
      }
      bottom--;
    }

    // 4. 从下到上 (需要检查 left <= right)
    if (left <= right) {
      for (let i = bottom; i >= top; i--) {
        result.push(matrix[i][left]);
      }
      left++;
    }
  }

  return result;
}

// --- 示例 ---
// const matrix = [[1,2,3],[4,5,6],[7,8,9]];
// console.log(spiralOrder(matrix)); // [1,2,3,6,9,8,7,4,5]
```
