# 最小覆盖子串 (Minimum Window Substring - LeetCode #76)

## 问题描述

给你一个字符串 `s` 、一个字符串 `t` 。返回 `s` 中涵盖 `t` 所有字符的最小子串。如果 `s` 中不存在涵盖 `t` 所有字符的子串，则返回空字符串 `""` 。

**注意：**
- 对于 `t` 中重复字符，我们寻找的子串中该字符数量必须不少于 `t` 中该字符数量。
- 如果 `s` 中存在这样的子串，我们保证它是唯一的。

**示例:**

- **输入:** `s = "ADOBECODEBANC"`, `t = "ABC"`
- **输出:** `"BANC"`
- **解释:** `s` 中的最小覆盖子串 `"BANC"` 包含 `t` 中的 `'A'`、`'B'` 和 `'C'`。

- **输入:** `s = "a"`, `t = "aa"`
- **输出:** `""`
- **解释:** `t` 中有两个 `'a'`，但 `s` 中只有一个 `'a'`。因此，不存在合适的子串。

## 解题代码 (JavaScript) - 滑动窗口

```javascript
/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
function minWindow(s, t) {
  if (t.length > s.length) {
    return "";
  }

  const need = new Map(); // 存储 t 中字符的需求量
  for (const char of t) {
    need.set(char, (need.get(char) || 0) + 1);
  }

  let window = new Map(); // 存储窗口中字符的数量
  let left = 0;
  let right = 0;
  let valid = 0; // 窗口中满足 need 条件的字符个数
  let start = 0; // 最小子串的起始索引
  let len = Infinity; // 最小子串的长度

  while (right < s.length) {
    const char = s[right];
    right++;

    // 更新窗口内数据
    if (need.has(char)) {
      window.set(char, (window.get(char) || 0) + 1);
      if (window.get(char) === need.get(char)) {
        valid++;
      }
    }

    // 判断左侧窗口是否要收缩
    while (valid === need.size) {
      // 更新最小子串
      if (right - left < len) {
        start = left;
        len = right - left;
      }

      const d = s[left];
      left++;

      // 更新窗口内数据
      if (need.has(d)) {
        if (window.get(d) === need.get(d)) {
          valid--;
        }
        window.set(d, window.get(d) - 1);
      }
    }
  }

  return len === Infinity ? "" : s.substring(start, start + len);
}
```
