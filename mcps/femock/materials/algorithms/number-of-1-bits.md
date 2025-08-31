# 位1的个数 (Number of 1 Bits - LeetCode #191)

## 问题描述

编写一个函数，输入是一个无符号整数（以二进制串的形式），返回其二进制表达式中数字位数为 '1' 的个数（也被称为汉明重量）。

**示例:**

- **输入:** `n = 00000000000000000000000000001011`
- **输出:** `3`
- **解释:** 输入的二进制串 `00000000000000000000000000001011` 中，共有三位为 '1'。

## 解题代码 (JavaScript) - 循环与位移动

```javascript
/**
 * @param {number} n - a positive integer
 * @return {number}
 */
function hammingWeight(n) {
  let count = 0;
  let mask = 1;
  
  for (let i = 0; i < 32; i++) {
    if ((n & mask) !== 0) {
      count++;
    }
    mask <<= 1;
  }
  
  return count;
}
```

## 解题代码 (JavaScript) - Brian Kernighan 算法

```javascript
/**
 * @param {number} n - a positive integer
 * @return {number}
 */
function hammingWeight_Optimized(n) {
  let count = 0;
  
  while (n !== 0) {
    // 这个操作可以消除 n 的二进制表示中最右边的 '1'
    n = n & (n - 1);
    count++;
  }
  
  return count;
}
```
