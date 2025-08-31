# 单词拆分 (Word Break - LeetCode #139)

## 问题描述

给你一个字符串 `s` 和一个字符串列表 `wordDict` 作为字典。请你判断是否可以利用字典中出现的单词拼接出 `s` 。

**注意：** 不要求字典中出现的单词全部都使用，并且字典中的单词可以重复使用。

**示例:**

- **输入:** `s = "leetcode"`, `wordDict = ["leet", "code"]`
- **输出:** `true`
- **解释:** 返回 `true` 因为 `"leetcode"` 可以由 `"leet"` 和 `"code"` 拼接成。

- **输入:** `s = "applepenapple"`, `wordDict = ["apple", "pen"]`
- **输出:** `true`
- **解释:** 返回 `true` 因为 `"applepenapple"` 可以由 `"apple" "pen" "apple"` 拼接成。

## 解题代码 (JavaScript) - 动态规划

```javascript
/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
function wordBreak(s, wordDict) {
  const wordSet = new Set(wordDict);
  const n = s.length;

  // dp[i] 表示字符串 s 的前 i 个字符 (s[0...i-1]) 是否可以被拆分
  const dp = new Array(n + 1).fill(false);
  
  // 基础情况：空字符串总是可以被拆分
  dp[0] = true;

  // 遍历字符串的所有可能长度
  for (let i = 1; i <= n; i++) {
    // 遍历所有可能的分割点 j
    for (let j = 0; j < i; j++) {
      // 如果 s[0...j-1] 可以被拆分 (dp[j] === true)
      // 并且 s[j...i-1] 这个子串在字典中
      // 那么 s[0...i-1] 就可以被拆分
      if (dp[j] && wordSet.has(s.substring(j, i))) {
        dp[i] = true;
        break; // 找到一种拆分方式即可
      }
    }
  }

  return dp[n];
}

// --- 示例 ---
// const s = "leetcode";
// const wordDict = ["leet", "code"];
// console.log(wordBreak(s, wordDict)); // true
```
