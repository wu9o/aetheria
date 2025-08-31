# 岛屿数量 (Number of Islands - LeetCode #200)

## 问题描述

给你一个由 `'1'`（陆地）和 `'0'`（水）组成的二维网格 `grid`，请你计算网格中岛屿的数量。

岛屿总是被水包围，并且每座岛屿只能由水平方向和/或竖直方向上相邻的陆地连接形成。

此外，你可以假设该网格的四条边均被水包围。

**示例:**

- **输入:** 
  `grid = [`
    `["1","1","1","1","0"],`
    `["1","1","0","1","0"],`
    `["1","1","0","0","0"],`
    `["0","0","0","0","0"]`
  `]`
- **输出:** `1`

- **输入:** 
  `grid = [`
    `["1","1","0","0","0"],`
    `["1","1","0","0","0"],`
    `["0","0","1","0","0"],`
    `["0","0","0","1","1"]`
  `]`
- **输出:** `3`

## 解题代码 (JavaScript) - 深度优先搜索 (DFS)

```javascript
/**
 * @param {character[][]} grid
 * @return {number}
 */
function numIslands(grid) {
  if (!grid || grid.length === 0) {
    return 0;
  }

  const rows = grid.length;
  const cols = grid[0].length;
  let islandCount = 0;

  function dfs(r, c) {
    // 边界条件检查
    if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] === '0') {
      return;
    }

    // 将当前陆地标记为已访问（变为水）
    grid[r][c] = '0';

    // 递归地访问相邻的陆地
    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === '1') {
        islandCount++;
        dfs(r, c);
      }
    }
  }

  return islandCount;
}
```
