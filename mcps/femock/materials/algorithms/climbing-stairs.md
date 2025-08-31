# 爬楼梯 (Climbing Stairs - LeetCode #70)

## 问题描述

假设你正在爬楼梯。需要 `n` 阶你才能到达楼顶。

每次你可以爬 `1` 或 `2` 个台阶。你有多少种不同的方法可以爬到楼顶呢？

**示例:**

- **输入:** `n = 2`
- **输出:** `2`
- **解释:** 有两种方法可以爬到楼顶。
  1. 1 阶 + 1 阶
  2. 2 阶

- **输入:** `n = 3`
- **输出:** `3`
- **解释:** 有三种方法可以爬到楼顶。
  1. 1 阶 + 1 阶 + 1 阶
  2. 1 阶 + 2 阶
  3. 2 阶 + 1 阶

## 解题代码 (JavaScript) - 动态规划

```javascript
/**
 * @param {number} n
 * @return {number}
 */
function climbStairs(n) {
  if (n <= 2) {
    return n;
  }

  // dp[i] 表示爬到第 i 阶的方法数
  const dp = new Array(n + 1);
  
  // 初始状态
  dp[1] = 1;
  dp[2] = 2;

  // 状态转移方程：dp[i] = dp[i-1] + dp[i-2]
  for (let i = 3; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }

  return dp[n];
}
```

## 解题代码 (JavaScript) - 动态规划 (优化空间)

```javascript
/**
 * @param {number} n
 * @return {number}
 */
function climbStairsOptimized(n) {
  if (n <= 2) {
    return n;
  }

  let prev1 = 1; // 相当于 dp[i-2]
  let prev2 = 2; // 相当于 dp[i-1]
  let current;

  for (let i = 3; i <= n; i++) {
    current = prev1 + prev2;
    prev1 = prev2;
    prev2 = current;
  }

  return current;
}
```
