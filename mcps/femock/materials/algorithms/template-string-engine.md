# 渲染模板字符串 (Template String Engine)

## 问题描述

请实现一个 `render` 函数，它可以将一个带有变量的模板字符串和一个数据对象结合起来，生成最终的渲染字符串。

模板字符串中的变量使用 `${...}` 的形式表示，`...` 部分是数据对象中的一个路径。

**示例:**

```javascript
const template = '你好, ${user.name}！欢迎来到 ${location.city}。';
const data = {
  user: { name: 'Gemini' },
  location: { city: '北京' }
};

render(template, data);
// => '你好, Gemini！欢迎来到 北京。'
```

## 要求

- 能够正确替换模板中的变量。
- 能够处理嵌套的对象路径（如 `user.name`）。
- 如果数据对象中路径不存在，可以将变量替换为空字符串 `''`。

## 解题代码 (JavaScript) - 正则表达式

```javascript
/**
 * @param {string} template The template string.
 * @param {object} data The data object.
 * @returns {string} The rendered string.
 */
function render(template, data) {
  // 正则表达式匹配 ${...} 形式的变量
  const regex = /\${(.*?)}/g;

  return template.replace(regex, (match, path) => {
    // path 是括号内捕获的分组，即 'user.name'
    const keys = path.trim().split('.');
    let value = data;

    // 逐层访问数据对象
    for (const key of keys) {
      if (value === null || value === undefined) {
        return ''; // 如果中间路径不存在，返回空字符串
      }
      value = value[key];
    }

    // 如果最终值不存在，也返回空字符串
    return value === null || value === undefined ? '' : value;
  });
}
```

## 解题代码 (JavaScript) - `new Function` (不推荐，但可作为思路)

*注意：使用 `new Function` 可能存在安全风险（XSS），并且性能较差，通常不推荐在生产环境中使用。*

```javascript
function renderWithFunction(template, data) {
    const keys = Object.keys(data);
    const values = Object.values(data);
    
    // 将模板字符串转换为函数体
    const templateFnBody = 'return `' + template + '`;';
    
    // 创建一个新函数，其参数为数据对象的键
    const templateFn = new Function(...keys, templateFnBody);
    
    // 调用函数并传入数据对象的值
    return templateFn(...values);
}
```
