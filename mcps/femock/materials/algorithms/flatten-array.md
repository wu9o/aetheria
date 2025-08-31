# 数组扁平化 (Flatten Array)

## 问题描述

请实现一个 `flatten` 函数，将一个嵌套的多维数组（任意深度）变为一个一维数组。

**示例:**

- **输入:** `[1, [2, [3, 4], 5], 6]`
- **输出:** `[1, 2, 3, 4, 5, 6]`

- **输入:** `[1, 2, 3]`
- **输出:** `[1, 2, 3]`

## 解题代码 (JavaScript) - 递归

```javascript
/**
 * @param {any[]} arr The array to flatten.
 * @return {any[]} The flattened array.
 */
function flattenRecursive(arr) {
  const result = [];

  for (const item of arr) {
    if (Array.isArray(item)) {
      // 如果是数组，则递归地将其扁平化，并合并结果
      result.push(...flattenRecursive(item));
    } else {
      result.push(item);
    }
  }

  return result;
}
```

## 解题代码 (JavaScript) - 迭代 (使用栈)

```javascript
/**
 * @param {any[]} arr The array to flatten.
 * @return {any[]} The flattened array.
 */
function flattenIterative(arr) {
  const result = [];
  const stack = [...arr]; // 将数组元素逆序入栈也可以，这里正序处理

  // 从后往前处理栈
  while (stack.length > 0) {
    const last = stack.pop();
    if (Array.isArray(last)) {
      // 如果是数组，则将其元素（展开）重新入栈
      stack.push(...last);
    } else {
      // 如果不是数组，则加入结果集
      // 因为是从后往前 pop，所以需要 unshift 到结果数组的前面
      result.unshift(last);
    }
  }

  return result;
}
```

## 解题代码 (JavaScript) - ES6 `flat()`

```javascript
/**
 * @param {any[]} arr The array to flatten.
 * @return {any[]} The flattened array.
 */
function flattenWithFlat(arr) {
  // Infinity 表示展开任意深度的嵌套数组
  return arr.flat(Infinity);
}
```
