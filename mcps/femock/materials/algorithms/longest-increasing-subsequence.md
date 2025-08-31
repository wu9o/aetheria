# 最长递增子序列 (Longest Increasing Subsequence - LeetCode #300)

## 问题描述

给你一个整数数组 `nums` ，找到其中最长严格递增子序列的长度。

**子序列** 是由数组派生而来的序列，删除（或不删除）数组中的元素而不改变其余元素的顺序。例如，`[3,6,2,7]` 是数组 `[0,3,1,6,2,2,7]` 的子序列。

**示例:**

- **输入:** `nums = [10,9,2,5,3,7,101,18]`
- **输出:** `4`
- **解释:** 最长递增子序列是 `[2,3,7,101]`，因此长度为 4 。

## 解题代码 (JavaScript) - 动态规划

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
function lengthOfLIS(nums) {
  if (nums.length === 0) {
    return 0;
  }

  // dp[i] 表示以 nums[i] 结尾的最长递增子序列的长度
  const dp = new Array(nums.length).fill(1);
  let maxLength = 1;

  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      // 如果 nums[i] > nums[j]，说明 nums[i] 可以接在 nums[j] 后面
      // 形成一个更长的递增子序列
      if (nums[i] > nums[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
    // 更新全局最大长度
    maxLength = Math.max(maxLength, dp[i]);
  }

  return maxLength;
}
```

## 解题代码 (JavaScript) - 贪心 + 二分查找 (优化)

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
function lengthOfLIS_Optimized(nums) {
  if (nums.length === 0) {
    return 0;
  }

  // tails[i] 存储长度为 i+1 的所有递增子序列中，末尾元素的最小值
  const tails = [];

  for (const num of nums) {
    // 如果 num 比 tails 中所有元素都大，则可以构成更长的子序列
    if (tails.length === 0 || num > tails[tails.length - 1]) {
      tails.push(num);
    } 
    // 否则，在 tails 中找到第一个大于等于 num 的元素，并用 num 替换它
    // 这有助于未来构成长度更长且增长更慢的子序列
    else {
      let left = 0, right = tails.length - 1;
      while (left < right) {
        const mid = Math.floor((left + right) / 2);
        if (tails[mid] < num) {
          left = mid + 1;
        } else {
          right = mid;
        }
      }
      tails[left] = num;
    }
  }

  return tails.length;
}
```
