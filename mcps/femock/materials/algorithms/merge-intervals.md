# 合并区间 (Merge Intervals - LeetCode #56)

## 问题描述

以数组 `intervals` 表示若干个区间的集合，其中 `intervals[i] = [start_i, end_i]` 。请你合并所有重叠的区间，并返回一个不重叠的区间数组，该数组需恰好覆盖输入中的所有区间。

**示例:**

- **输入:** `intervals = [[1,3],[2,6],[8,10],[15,18]]`
- **输出:** `[[1,6],[8,10],[15,18]]`
- **解释:** 区间 `[1,3]` 和 `[2,6]` 重叠, 将它们合并为 `[1,6]`.

- **输入:** `intervals = [[1,4],[4,5]]`
- **输出:** `[[1,5]]`
- **解释:** 区间 `[1,4]` 和 `[4,5]` 可被视为重叠区间。

## 解题代码 (JavaScript) - 排序

```javascript
/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
function merge(intervals) {
  if (intervals.length === 0) {
    return [];
  }

  // 1. 按照区间的起始位置进行排序
  intervals.sort((a, b) => a[0] - b[0]);

  const merged = [intervals[0]];

  for (let i = 1; i < intervals.length; i++) {
    const lastMerged = merged[merged.length - 1];
    const current = intervals[i];

    // 2. 检查当前区间是否与上一个合并后的区间重叠
    // 如果当前区间的起始点 <= 上一个合并区间的结束点
    if (current[0] <= lastMerged[1]) {
      // 合并区间，更新上一个合并区间的结束点
      lastMerged[1] = Math.max(lastMerged[1], current[1]);
    } else {
      // 如果不重叠，则将当前区间直接加入结果数组
      merged.push(current);
    }
  }

  return merged;
}

// --- 示例 ---
// const intervals = [[1,3],[2,6],[8,10],[15,18]];
// console.log(merge(intervals)); // [[1,6],[8,10],[15,18]]
```
