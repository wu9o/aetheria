# 搜索旋转排序数组 (Search in Rotated Sorted Array - LeetCode #33)

## 问题描述

整数数组 `nums` 原本按升序排列，但其在预先未知的某个下标 `k`（`0 <= k < nums.length`）上进行了 **旋转**。旋转后的数组变为 `[nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]`。

例如， `[0,1,2,4,5,6,7]` 在下标 `3` 处经旋转后可能变为 `[4,5,6,7,0,1,2]` 。

给你 **旋转后** 的数组 `nums` 和一个整数 `target` ，如果 `nums` 中存在这个目标值 `target` ，则返回它的下标，否则返回 `-1` 。

**要求：** 你必须设计一个时间复杂度为 `O(log n)` 的算法解决此问题。

**示例:**

- **输入:** `nums = [4,5,6,7,0,1,2]`, `target = 0`
- **输出:** `4`

- **输入:** `nums = [4,5,6,7,0,1,2]`, `target = 3`
- **输出:** `-1`

## 解题代码 (JavaScript) - 二分查找

```javascript
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
function search(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] === target) {
      return mid;
    }

    // 判断哪一部分是有序的
    // Case 1: 左半部分 [left...mid] 是有序的
    if (nums[left] <= nums[mid]) {
      // 判断 target 是否在有序的左半部分
      if (target >= nums[left] && target < nums[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    } 
    // Case 2: 右半部分 [mid...right] 是有序的
    else {
      // 判断 target 是否在有序的右半部分
      if (target > nums[mid] && target <= nums[right]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }

  return -1;
}

// --- 示例 ---
// const nums = [4,5,6,7,0,1,2];
// const target = 0;
// console.log(search(nums, target)); // 4
```
