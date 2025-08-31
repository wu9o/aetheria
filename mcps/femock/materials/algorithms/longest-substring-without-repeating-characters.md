# 无重复字符的最长子串 (LeetCode #3)

## 问题描述

给定一个字符串 `s` ，请你找出其中不含有重复字符的 **最长子串** 的长度。

**示例:**

- **输入:** `s = "abcabcbb"`
- **输出:** `3`
- **解释:** 因为无重复字符的最长子串是 `"abc"`，所以其长度为 3。

- **输入:** `s = "bbbbb"`
- **输出:** `1`
- **解释:** 因为无重复字符的最长子串是 `"b"`，所以其长度为 1。

- **输入:** `s = "pwwkew"`
- **输出:** `3`
- **解释:** 因为无重复字符的最长子串是 `"wke"`，所以其长度为 3。
  请注意，你的答案必须是 **子串** 的长度，`"pwke"` 是一个子序列，不是子串。

## 要求

- 解决方案应该是高效的，理想的时间复杂度为 O(n)。

## 解题代码 (JavaScript)

```javascript
/**
 * @param {string} s
 * @return {number}
 */
function lengthOfLongestSubstring(s) {
  let maxLength = 0;
  let start = 0;
  // 使用 Map 存储字符及其最新出现的索引
  const charMap = new Map();

  for (let end = 0; end < s.length; end++) {
    const currentChar = s[end];

    // 如果字符已存在，并且其索引在当前窗口内
    if (charMap.has(currentChar) && charMap.get(currentChar) >= start) {
      // 将窗口的起始位置移动到重复字符上一次出现位置的后一位
      start = charMap.get(currentChar) + 1;
    }

    // 更新当前字符的最新索引
    charMap.set(currentChar, end);

    // 计算当前窗口的长度，并更新最大长度
    const currentLength = end - start + 1;
    maxLength = Math.max(maxLength, currentLength);
  }

  return maxLength;
}

// --- 示例 ---
// const s = "abcabcbb";
// console.log(lengthOfLongestSubstring(s)); // 3
```