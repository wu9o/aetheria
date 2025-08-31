# 实现 get 函数 (Lodash.get)

## 问题描述

请实现一个 `get` 函数，该函数可以安全地访问嵌套对象的属性。如果路径中的任何一部分不存在，它应该返回 `undefined`（或一个指定的默认值），而不是抛出错误。

**示例:**

```javascript
const object = { 'a': [{ 'b': { 'c': 3 } }] };

// 访问存在的路径
get(object, 'a[0].b.c');
// => 3

// 访问不存在的路径
get(object, 'a[0].b.d');
// => undefined

// 访问不存在的路径并提供默认值
get(object, 'a[0].b.d', 'default');
// => 'default'
```

## 要求

- 能够处理由 `.` 和 `[]` 分隔的路径字符串。
- 能够处理数组索引和对象属性。
- 如果路径无效，应返回 `undefined` 或用户提供的默认值。

## 解题代码 (JavaScript)

```javascript
/**
 * @param {object} obj The object to query.
 * @param {string|string[]} path The path of the property to retrieve.
 * @param {any} [defaultValue] The value returned for unresolved paths.
 * @returns {any} Returns the resolved value, else `defaultValue`.
 */
function get(obj, path, defaultValue = undefined) {
  // 1. 将路径字符串转换为路径数组
  //    - 将 [0] 替换为 .0
  //    - 移除开头的 .
  //    - 按 . 分割
  const pathArray = Array.isArray(path) ? path : 
    path.replace(/\[(\d+)\]/g, '.$1').replace(/^\./, '').split('.');

  // 2. 逐层遍历路径
  let current = obj;
  for (const key of pathArray) {
    // 如果当前值是 null 或 undefined，则无法继续深入，返回默认值
    if (current === null || current === undefined) {
      return defaultValue;
    }
    // 访问下一层
    current = current[key];
  }

  // 3. 如果最终结果是 undefined，返回默认值，否则返回结果
  return current === undefined ? defaultValue : current;
}
```
