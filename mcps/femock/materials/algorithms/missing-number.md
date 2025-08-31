# 丢失的数字 (Missing Number - LeetCode #268)

## 问题描述

给定一个包含 `[0, n]` 中 `n` 个数的数组 `nums` ，找出 `[0, n]` 这个范围内没有出现在数组中的那个数。

**示例:**

- **输入:** `nums = [3,0,1]`
- **输出:** `2`
- **解释:** `n = 3`，因为有 3 个数字，所以范围是 `[0, 3]`。`2` 是丢失的数字，因为它没有出现在 `nums` 中。

- **输入:** `nums = [0,1]`
- **输出:** `2`
- **解释:** `n = 2`，因为有 2 个数字，所以范围是 `[0, 2]`。`2` 是丢失的数字。

## 要求

- 你的算法应具有线性时间复杂度。你能否仅使用常数额外空间复杂度来实现？

## 解题代码 (JavaScript) - 高斯求和法

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
function missingNumber(nums) {
  const n = nums.length;
  
  // 计算 [0, n] 范围内的所有数字的总和
  const expectedSum = n * (n + 1) / 2;
  
  // 计算数组 nums 中所有数字的总和
  const actualSum = nums.reduce((sum, num) => sum + num, 0);
  
  // 两者之差即为丢失的数字
  return expectedSum - actualSum;
}
```

## 解题代码 (JavaScript) - 位运算法 (XOR)

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
function missingNumberXOR(nums) {
  let missing = nums.length; // 初始化为 n
  
  for (let i = 0; i < nums.length; i++) {
    // 使用异或运算
    // a ^ b ^ b = a
    // 我们将 [0, n] 的所有数字和 nums 的所有数字一起异或
    // 成对出现的数字会相互抵消，最后剩下的就是丢失的数字
    missing ^= i ^ nums[i];
  }
  
  return missing;
}
```
