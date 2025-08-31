# 解析 URL 参数为对象 (Parse URL Params)

## 问题描述

给定一个 URL 字符串，请实现一个函数 `parseUrlParams`，将 URL 中的查询参数（Query String）解析成一个对象。

**示例:**

- **输入:** `'http://www.example.com?a=1&b=2&c=3'`
- **输出:** `{ a: '1', b: '2', c: '3' }`

- **输入:** `'https://test.com/path?name=gemini&version=1.0&mode'`
- **输出:** `{ name: 'gemini', version: '1.0', mode: true }`

## 要求

- 需要处理 `decodeURIComponent` 来解析编码后的字符。
- 如果一个参数只有 `key` 没有 `value`（如 `...&mode`），其值应被解析为 `true`。
- 如果同一个 `key` 出现多次，其值应被解析为一个数组。
  - **示例输入:** `'a=1&a=2&b=3'`
  - **示例输出:** `{ a: ['1', '2'], b: '3' }`

## 解题代码 (JavaScript)

```javascript
/**
 * @param {string} url The URL string to parse.
 * @return {object} The parsed query parameters.
 */
function parseUrlParams(url) {
  const params = {};
  // 1. 找到 '?' 的位置，截取查询字符串
  const queryStringIndex = url.indexOf('?');
  if (queryStringIndex === -1) {
    return params;
  }
  const queryString = url.substring(queryStringIndex + 1);

  // 2. 如果没有查询字符串，返回空对象
  if (!queryString) {
    return params;
  }

  // 3. 按 '&' 分割参数对
  const pairs = queryString.split('&');

  for (const pair of pairs) {
    // 4. 按 '=' 分割键和值
    const eqIndex = pair.indexOf('=');
    let key, value;

    if (eqIndex === -1) {
      // 只有 key，没有 value
      key = decodeURIComponent(pair);
      value = true;
    } else {
      key = decodeURIComponent(pair.substring(0, eqIndex));
      value = decodeURIComponent(pair.substring(eqIndex + 1));
    }

    // 5. 处理重复的 key
    if (params.hasOwnProperty(key)) {
      // 如果 key 已存在，将其值转换为数组
      if (!Array.isArray(params[key])) {
        params[key] = [params[key]];
      }
      params[key].push(value);
    } else {
      params[key] = value;
    }
  }

  return params;
}
```
