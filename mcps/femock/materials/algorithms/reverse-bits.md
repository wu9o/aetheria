# 颠倒二进制位 (Reverse Bits - LeetCode #190)

## 问题描述

颠倒给定的 32 位无符号整数的二进制位。

**示例:**

- **输入:** `n = 00000010100101000001111010011100`
- **输出:** `964176192` (`00111001011110000010100101000000`)

## 解题代码 (JavaScript) - 位操作

```javascript
/**
 * @param {number} n - a positive integer
 * @return {number} - a positive integer
 */
function reverseBits(n) {
  let result = 0;
  
  for (let i = 0; i < 32; i++) {
    // 1. 左移 result，为下一位留出空间
    result <<= 1;
    
    // 2. 获取 n 的最低位 (n & 1)
    // 3. 将 n 的最低位加到 result 的最低位
    result |= (n & 1);
    
    // 4. 右移 n，处理下一位
    n >>= 1;
  }
  
  // JavaScript 的位运算会处理有符号整数，
  // 使用 >>> 0 可以确保结果是无符号的
  return result >>> 0;
}

// --- 示例 ---
// const n = 43261596; // 00000010100101000001111010011100
// console.log(reverseBits(n)); // 964176192
```
