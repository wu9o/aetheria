# 验证回文串 (Valid Palindrome - LeetCode #125)

## 问题描述

给定一个字符串，验证它是否是回文串，只考虑字母和数字字符，可以忽略字母的大小写。

**说明:** 本题中，我们将空字符串定义为有效的回文串。

**示例:**

- **输入:** `"A man, a plan, a canal: Panama"`
- **输出:** `true`
- **解释：** `"amanaplanacanalpanama"` 是回文串。

- **输入:** `"race a car"`
- **输出:** `false`
- **解释：** `"raceacar"` 不是回文串。

## 解题代码 (JavaScript) - 双指针

```javascript
/**
 * @param {string} s
 * @return {boolean}
 */
function isPalindrome(s) {
  // 1. 预处理字符串：转换为小写，并移除所有非字母数字字符
  const cleaned = s.toLowerCase().replace(/[^a-z0-9]/g, '');

  let left = 0;
  let right = cleaned.length - 1;

  // 2. 使用双指针从两端向中间比较
  while (left < right) {
    if (cleaned[left] !== cleaned[right]) {
      return false;
    }
    left++;
    right--;
  }

  return true;
}

// --- 示例 ---
// const s = "A man, a plan, a canal: Panama";
// console.log(isPalindrome(s)); // true
```
