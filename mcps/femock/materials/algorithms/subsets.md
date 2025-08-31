# 子集 (Subsets - LeetCode #78)

## 问题描述

给你一个整数数组 `nums` ，数组中的元素 **互不相同** 。返回该数组所有可能的子集（幂集）。

解集 **不能** 包含重复的子集。你可以按 **任意顺序** 返回解集。

**示例:**

- **输入:** `nums = [1,2,3]`
- **输出:** `[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]`

- **输入:** `nums = [0]`
- **输出:** `[[],[0]]`

## 解题代码 (JavaScript) - 回溯法

```javascript
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
function subsets(nums) {
  const result = [];
  
  function backtrack(start, path) {
    // 将当前路径加入结果集
    result.push([...path]);

    // 从 start 开始遍历，避免产生重复子集
    for (let i = start; i < nums.length; i++) {
      // 做出选择
      path.push(nums[i]);
      
      // 进入下一层决策
      backtrack(i + 1, path);
      
      // 撤销选择
      path.pop();
    }
  }

  backtrack(0, []);
  return result;
}

// --- 示例 ---
// const nums = [1,2,3];
// console.log(subsets(nums));
// [[],[1],[1,2],[1,2,3],[1,3],[2],[2,3],[3]] (顺序可能不同)
```
