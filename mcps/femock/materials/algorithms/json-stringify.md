# 实现 JSON.stringify

## 问题描述

请实现一个 `myJsonStringify` 函数，它的功能与 `JSON.stringify` 基本一致。

`JSON.stringify()` 方法将一个 JavaScript 对象或值转换为 JSON 字符串。

## 要求

- 能够正确处理 `string`, `number`, `boolean`, `null`。
- 能够正确处理 `object` 和 `array` 的嵌套。
- 忽略 `undefined`, `function`, 和 `symbol` 类型的值（在对象中时忽略该键值对，在数组中时变为 `null`）。
- （进阶）能够检测并处理循环引用，抛出错误。

## 解题代码 (JavaScript)

```javascript
/**
 * @param {any} data The data to stringify.
 * @return {string} The JSON string.
 */
function myJsonStringify(data) {
  // 用于检测循环引用的辅助函数
  const visited = new Set();

  function stringify(obj) {
    const type = typeof obj;

    if (obj === null) return 'null';
    if (type === 'string') return `"${obj}"`;
    if (type === 'number' || type === 'boolean') return String(obj);
    if (type === 'undefined' || type === 'function' || type === 'symbol') return undefined;

    if (type === 'object') {
      // 检测循环引用
      if (visited.has(obj)) {
        throw new TypeError('Converting circular structure to JSON');
      }
      visited.add(obj);

      if (Array.isArray(obj)) {
        const arrayResult = obj.map(item => {
          const strItem = stringify(item);
          // 数组中的 undefined, function, symbol 变为 null
          return strItem === undefined ? 'null' : strItem;
        });
        visited.delete(obj); // 回溯
        return `[${arrayResult.join(',')}]`;
      } else {
        const objectResult = Object.keys(obj).reduce((acc, key) => {
          const value = obj[key];
          const strValue = stringify(value);
          // 忽略值为 undefined, function, symbol 的键值对
          if (strValue !== undefined) {
            acc.push(`"${key}":${strValue}`);
          }
          return acc;
        }, []);
        visited.delete(obj); // 回溯
        return `{${objectResult.join(',')}}`;
      }
    }
  }

  return stringify(data);
}
```
