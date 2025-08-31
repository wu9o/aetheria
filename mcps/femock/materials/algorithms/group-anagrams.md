# 字母异位词分组 (Group Anagrams - LeetCode #49)

## 问题描述

给你一个字符串数组 `strs` ，请你将 **字母异位词** 组合在一起。可以按任意顺序返回结果列表。

**字母异位词** 是由相同字母按不同顺序排列形成的单词。

**示例:**

- **输入:** `strs = ["eat","tea","tan","ate","nat","bat"]`
- **输出:** `[["bat"],["nat","tan"],["ate","eat","tea"]]`

- **输入:** `strs = [""]`
- **输出:** `[[""]]`

## 解题代码 (JavaScript) - 排序 + 哈希表

```javascript
/**
 * @param {string[]} strs
 * @return {string[][]}
 */
function groupAnagrams(strs) {
  const map = new Map();

  for (const str of strs) {
    // 1. 将字符串排序，作为唯一的 key
    const sortedStr = str.split('').sort().join('');

    // 2. 如果 map 中没有这个 key，则初始化一个空数组
    if (!map.has(sortedStr)) {
      map.set(sortedStr, []);
    }

    // 3. 将原始字符串推入对应的数组
    map.get(sortedStr).push(str);
  }

  // 4. 返回 map 中所有的值
  return Array.from(map.values());
}

// --- 示例 ---
// const strs = ["eat","tea","tan","ate","nat","bat"];
// console.log(groupAnagrams(strs)); // [["eat","tea","ate"],["tan","nat"],["bat"]] (顺序可能不同)
```
