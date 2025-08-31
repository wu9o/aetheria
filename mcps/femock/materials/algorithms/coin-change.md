# 零钱兑换 (Coin Change - LeetCode #322)

## 问题描述

给你一个整数数组 `coins` ，表示不同面额的硬币；以及一个整数 `amount` ，表示总金额。

计算并返回可以凑成总金额所需的 **最少的硬币个数** 。如果没有任何一种硬币组合能组成总金额，返回 `-1` 。

你可以认为每种硬币的数量是无限的。

**示例:**

- **输入:** `coins = [1, 2, 5]`, `amount = 11`
- **输出:** `3`
- **解释:** `11 = 5 + 5 + 1`

- **输入:** `coins = [2]`, `amount = 3`
- **输出:** `-1`

## 解题代码 (JavaScript) - 动态规划

```javascript
/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
function coinChange(coins, amount) {
  // dp[i] 表示凑成金额 i 所需的最少硬币数
  // 初始化一个长度为 amount + 1 的数组，并填充为一个特殊值（例如 Infinity）
  const dp = new Array(amount + 1).fill(Infinity);

  // 基础情况：凑成金额 0 需要 0 个硬币
  dp[0] = 0;

  // 遍历 1 到 amount 的所有金额
  for (let i = 1; i <= amount; i++) {
    // 遍历所有硬币面额
    for (const coin of coins) {
      // 如果当前金额 i 大于等于硬币面额
      if (i >= coin) {
        // 状态转移方程
        // dp[i] 的值等于：
        // 1. 不使用当前 coin 的情况下，凑成 i 的硬币数（即 dp[i] 的旧值）
        // 2. 使用当前 coin 的情况下，凑成 i 的硬币数（即 dp[i - coin] + 1）
        // 两者中的较小值
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }

  // 如果 dp[amount] 仍然是 Infinity，说明无法凑成该金额
  return dp[amount] === Infinity ? -1 : dp[amount];
}

// --- 示例 ---
// const coins = [1, 2, 5];
// const amount = 11;
// console.log(coinChange(coins, amount)); // 3
```
