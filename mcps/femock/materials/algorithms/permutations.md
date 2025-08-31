# 全排列 (Permutations - LeetCode #46)

## 问题描述

给定一个不含重复数字的数组 `nums` ，返回其 **所有可能的全排列** 。你可以 **按任意顺序** 返回答案。

**示例:**

- **输入:** `nums = [1,2,3]`
- **输出:** `[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]`

- **输入:** `nums = [0,1]`
- **输出:** `[[0,1],[1,0]]`

## 解题代码 (JavaScript) - 回溯法

```javascript
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
function permute(nums) {
  const result = [];
  
  function backtrack(path, used) {
    // 如果路径长度等于 nums 长度，说明找到一个完整的排列
    if (path.length === nums.length) {
      result.push([...path]); // 注意要拷贝一份 path
      return;
    }

    for (let i = 0; i < nums.length; i++) {
      // 如果当前数字已经被使用过，则跳过
      if (used[i]) {
        continue;
      }

      // 做出选择
      path.push(nums[i]);
      used[i] = true;

      // 进入下一层决策
      backtrack(path, used);

      // 撤销选择
      path.pop();
      used[i] = false;
    }
  }

  backtrack([], new Array(nums.length).fill(false));
  return result;
}

// --- 示例 ---
// const nums = [1,2,3];
// console.log(permute(nums));
// [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
```
