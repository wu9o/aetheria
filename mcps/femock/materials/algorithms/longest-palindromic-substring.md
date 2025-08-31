# 最长回文子串 (Longest Palindromic Substring - LeetCode #5)

## 问题描述

给你一个字符串 `s`，找到 `s` 中最长的回文子串。

**示例:**

- **输入:** `s = "babad"`
- **输出:** `"bab"`
- **解释:** `"aba"` 同样是符合题意的答案。

- **输入:** `s = "cbbd"`
- **输出:** `"bb"`

## 解题代码 (JavaScript) - 中心扩展法

```javascript
/**
 * @param {string} s
 * @return {string}
 */
function longestPalindrome(s) {
  if (s.length < 1) {
    return "";
  }
  
  let start = 0;
  let end = 0;

  function expandAroundCenter(left, right) {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      left--;
      right++;
    }
    // 返回回文串的长度
    return right - left - 1;
  }

  for (let i = 0; i < s.length; i++) {
    // 奇数长度的回文串 (以 i 为中心)
    const len1 = expandAroundCenter(i, i);
    // 偶数长度的回文串 (以 i 和 i+1 为中心)
    const len2 = expandAroundCenter(i, i + 1);
    
    const len = Math.max(len1, len2);
    
    if (len > end - start) {
      // 更新最长回文子串的起始和结束位置
      start = i - Math.floor((len - 1) / 2);
      end = i + Math.floor(len / 2);
    }
  }
  
  return s.substring(start, end + 1);
}

// --- 示例 ---
// const s = "babad";
// console.log(longestPalindrome(s)); // "bab" or "aba"
```
