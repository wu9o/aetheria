# 跳跃游戏 (Jump Game - LeetCode #55)

## 问题描述

给定一个非负整数数组 `nums` ，你最初位于数组的 **第一个下标** 。

数组中的每个元素代表你在该位置可以跳跃的最大长度。

判断你是否能够到达最后一个下标。

**示例:**

- **输入:** `nums = [2,3,1,1,4]`
- **输出:** `true`
- **解释:** 我们可以从下标 0 跳到下标 1（跳 1 步），然后再从下标 1 跳到最后一个下标（跳 3 步）。

- **输入:** `nums = [3,2,1,0,4]`
- **输出:** `false`
- **解释:** 无论怎样，总会到达下标为 3 的位置。但该下标的最大跳跃长度是 0 ， 所以永远不可能到达最后一个下标。

## 解题代码 (JavaScript) - 贪心算法

```javascript
/**
 * @param {number[]} nums
 * @return {boolean}
 */
function canJump(nums) {
  let maxReach = 0; // 能够到达的最远位置

  for (let i = 0; i < nums.length; i++) {
    // 如果当前位置 i 已经超过了我们能到达的最远位置，
    // 那么我们永远无法到达当前位置，也无法到达终点。
    if (i > maxReach) {
      return false;
    }

    // 更新能够到达的最远位置
    // maxReach = max(当前能到达的最远位置, 从当前位置 i 出发能到达的最远位置)
    maxReach = Math.max(maxReach, i + nums[i]);

    // 如果最远位置已经可以覆盖或超过数组的最后一个下标，
    // 那么我们就可以成功到达，提前返回 true。
    if (maxReach >= nums.length - 1) {
      return true;
    }
  }

  return false; // 循环结束仍未返回 true，则说明无法到达
}

// --- 示例 ---
// const nums1 = [2,3,1,1,4];
// console.log(canJump(nums1)); // true

// const nums2 = [3,2,1,0,4];
// console.log(canJump(nums2)); // false
```
