# 盛最多水的容器 (Container With Most Water - LeetCode #11)

## 问题描述

给定一个长度为 `n` 的整数数组 `height` 。有 `n` 条垂线，第 `i` 条线的两个端点是 `(i, 0)` 和 `(i, height[i])` 。

找出其中的两条线，使得它们与 `x` 轴共同构成的容器可以容纳最多的水。

返回容器可以储存的最大水量。

**说明：** 你不能倾斜容器。

**示例:**

- **输入:** `[1,8,6,2,5,4,8,3,7]`
- **输出:** `49`
- **解释:** 图中垂直线代表输入数组 `[1,8,6,2,5,4,8,3,7]`。在此情况下，容器能够容纳水（表示为蓝色部分）的最大值为 49。

## 要求

- 解决方案应该是高效的，理想的时间复杂度为 O(n)。

## 解题代码 (JavaScript)

```javascript
/**
 * @param {number[]} height
 * @return {number}
 */
function maxArea(height) {
  let maxWater = 0;
  let left = 0;
  let right = height.length - 1;

  while (left < right) {
    // 容器的宽度
    const width = right - left;
    // 容器的高度由较短的板决定
    const h = Math.min(height[left], height[right]);
    // 计算当前水量
    const currentWater = width * h;
    // 更新最大水量
    maxWater = Math.max(maxWater, currentWater);

    // 移动指向较短板的指针，因为移动较高的板不可能获得更大的面积
    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }

  return maxWater;
}

// --- 示例 ---
// const height = [1,8,6,2,5,4,8,3,7];
// console.log(maxArea(height)); // 49
```
