# 两数之和 (Two Sum - LeetCode #1)

## 问题描述

给定一个整数数组 `nums` 和一个整数目标值 `target`，请你在该数组中找出 **和为目标值 `target`** 的那 **两个** 整数，并返回它们的数组下标。

你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。

你可以按任意顺序返回答案。

**示例:**

- **输入:** `nums = [2, 7, 11, 15]`, `target = 9`
- **输出:** `[0, 1]`
- **解释:** 因为 `nums[0] + nums[1] == 9`，所以返回 `[0, 1]`。

## 要求

- 时间复杂度优于 O(n²)。

## 解题代码 (JavaScript)

```javascript
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
  // 创建一个 Map 用于存储数字及其索引
  const map = new Map();

  for (let i = 0; i < nums.length; i++) {
    const currentNum = nums[i];
    const complement = target - currentNum;

    // 检查 Map 中是否存在所需的补数
    if (map.has(complement)) {
      // 如果存在，则返回补数的索引和当前数字的索引
      return [map.get(complement), i];
    }

    // 如果不存在，则将当前数字及其索引存入 Map
    map.set(currentNum, i);
  }

  // 如果没有找到答案，可以返回一个空数组或抛出错误
  return [];
}

// --- 示例 ---
// const nums = [2, 7, 11, 15];
// const target = 9;
// console.log(twoSum(nums, target)); // [0, 1]
```
