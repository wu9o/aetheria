# 克隆图 (Clone Graph - LeetCode #133)

## 问题描述

给你无向 **连通** 图中一个节点的引用，请你返回该图的 **深拷贝**（克隆）。

图中的每个节点都包含它的值 `val`（`int`） 和其邻居的列表（`list[Node]`）。

**示例:**

- **输入:** `adjList = [[2,4],[1,3],[2,4],[1,3]]`
- **输出:** `[[2,4],[1,3],[2,4],[1,3]]`
- **解释:** 节点 1 的值是 1，它有两个邻居：节点 2 和 4 。节点 2 的值是 2，它有两个邻居：节点 1 和 3 。...

## 定义图节点

```javascript
/**
 * Definition for a Node.
 */
function Node(val, neighbors) {
   this.val = val === undefined ? 0 : val;
   this.neighbors = neighbors === undefined ? [] : neighbors;
};
```

## 解题代码 (JavaScript) - 深度优先搜索 (DFS)

```javascript
/**
 * @param {Node} node
 * @return {Node}
 */
function cloneGraph(node) {
    const visited = new Map();

    function dfs(originalNode) {
        if (!originalNode) {
            return null;
        }
        
        // 如果已经访问过（克隆过）该节点，直接返回克隆的节点
        if (visited.has(originalNode)) {
            return visited.get(originalNode);
        }

        // 创建新节点
        const clonedNode = new Node(originalNode.val);
        // 放入 visited 映射中
        visited.set(originalNode, clonedNode);

        // 递归地克隆所有邻居
        for (const neighbor of originalNode.neighbors) {
            clonedNode.neighbors.push(dfs(neighbor));
        }

        return clonedNode;
    }

    return dfs(node);
};
```
