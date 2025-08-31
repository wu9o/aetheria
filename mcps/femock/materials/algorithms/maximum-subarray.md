# 最大子数组和 (Maximum Subarray - LeetCode #53)

## 问题描述

给你一个整数数组 `nums` ，请你找出一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。

**子数组** 是数组中的一个连续部分。

**示例:**

- **输入:** `nums = [-2,1,-3,4,-1,2,1,-5,4]`
- **输出:** `6`
- **解释:** 连续子数组 `[4,-1,2,1]` 的和最大，为 `6` 。

- **输入:** `nums = [5,4,-1,7,8]`
- **输出:** `23`

## 解题代码 (JavaScript) - 动态规划 (Kadane's Algorithm)

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
function maxSubArray(nums) {
  if (nums.length === 0) {
    return 0;
  }

  let maxSoFar = nums[0]; // 全局最大和
  let maxEndingHere = nums[0]; // 以当前元素结尾的最大和

  for (let i = 1; i < nums.length; i++) {
    // 对于当前元素，我们有两个选择：
    // 1. 将它自己作为新的子数组的开始
    // 2. 将它加入到之前的子数组中
    // 我们选择能使 `maxEndingHere` 更大的那个
    maxEndingHere = Math.max(nums[i], maxEndingHere + nums[i]);

    // 更新全局最大和
    maxSoFar = Math.max(maxSoFar, maxEndingHere);
  }

  return maxSoFar;
}

// --- 示例 ---
// const nums = [-2,1,-3,4,-1,2,1,-5,4];
// console.log(maxSubArray(nums)); // 6
```
