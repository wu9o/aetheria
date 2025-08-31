# 三数之和 (3Sum - LeetCode #15)

## 问题描述

给你一个包含 `n` 个整数的数组 `nums`，判断 `nums` 中是否存在三个元素 `a`，`b`，`c` ，使得 `a + b + c = 0` ？请你找出所有和为 `0` 且不重复的三元组。

**注意：** 答案中不可以包含重复的三元组。

**示例:**

- **输入:** `nums = [-1, 0, 1, 2, -1, -4]`
- **输出:** `[[-1, -1, 2], [-1, 0, 1]]`

## 要求

- 解决方案需要有效地处理重复问题。

## 解题代码 (JavaScript)

```javascript
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
function threeSum(nums) {
  const results = [];
  if (nums.length < 3) {
    return results;
  }

  // 1. 对数组进行排序
  nums.sort((a, b) => a - b);

  for (let i = 0; i < nums.length - 2; i++) {
    // 2. 如果当前数字大于0，则三数之和不可能等于0
    if (nums[i] > 0) {
      break;
    }
    // 3. 跳过重复的起始数字
    if (i > 0 && nums[i] === nums[i - 1]) {
      continue;
    }

    let left = i + 1;
    let right = nums.length - 1;

    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];

      if (sum === 0) {
        results.push([nums[i], nums[left], nums[right]]);
        // 4. 跳过重复的 left 和 right 指针所指的数字
        while (left < right && nums[left] === nums[left + 1]) {
          left++;
        }
        while (left < right && nums[right] === nums[right - 1]) {
          right--;
        }
        left++;
        right--;
      } else if (sum < 0) {
        left++;
      } else { // sum > 0
        right--;
      }
    }
  }

  return results;
}

// --- 示例 ---
// const nums = [-1, 0, 1, 2, -1, -4];
// console.log(threeSum(nums)); // [[-1, -1, 2], [-1, 0, 1]]
```
