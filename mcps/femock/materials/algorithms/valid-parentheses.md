# 有效的括号 (Valid Parentheses - LeetCode #20)

## 问题描述

给定一个只包括 `'('`，`')'`，`'{'`，`'}'`，`'['`，`']'` 的字符串 `s` ，判断字符串是否有效。

有效字符串需满足：
1.  左括号必须用相同类型的右括号闭合。
2.  左括号必须以正确的顺序闭合。
3.  每个右括号都有一个对应的相同类型的左括号。

**示例:**

- **输入:** `s = "()"`
- **输出:** `true`

- **输入:** `s = "()[]{}"`
- **输出:** `true`

- **输入:** `s = "(]"`
- **输出:** `false`

## 要求

- 解决方案应能正确处理所有括号类型和嵌套情况。

## 解题代码 (JavaScript)

```javascript
/**
 * @param {string} s
 * @return {boolean}
 */
function isValid(s) {
  const stack = [];
  const map = {
    '(': ')',
    '[': ']',
    '{': '}',
  };

  for (let i = 0; i < s.length; i++) {
    const char = s[i];

    // 如果是左括号，则入栈
    if (map[char]) {
      stack.push(char);
    } 
    // 如果是右括号
    else {
      // 如果栈为空，或者栈顶的左括号与当前右括号不匹配
      if (stack.length === 0 || map[stack.pop()] !== char) {
        return false;
      }
    }
  }

  // 如果遍历结束后栈为空，则说明所有括号都已正确匹配
  return stack.length === 0;
}

// --- 示例 ---
// const s1 = "()[]{}";
// console.log(isValid(s1)); // true

// const s2 = "(]";
// console.log(isValid(s2)); // false
```
