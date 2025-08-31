# 课程表 (Course Schedule - LeetCode #207)

## 问题描述

你这个学期必须选修 `numCourses` 门课程，记为 `0` 到 `numCourses - 1` 。

在选修某些课程之前需要一些先修课程。 先修课程按数组 `prerequisites` 给出，其中 `prerequisites[i] = [a_i, b_i]` ，表示如果要学习课程 `a_i` 则 **必须** 先学习课程 `b_i` 。

例如，`[0, 1]` 表示：想要学习课程 `0` ，你需要先完成课程 `1` 。
请你判断是否可能完成所有课程的学习？如果可以，返回 `true` ；否则，返回 `false` 。

**示例:**

- **输入:** `numCourses = 2`, `prerequisites = [[1,0]]`
- **输出:** `true`
- **解释:** 总共有 2 门课程。学习课程 1 之前，你需要完成课程 0 。这是可能的。

- **输入:** `numCourses = 2`, `prerequisites = [[1,0],[0,1]]`
- **输出:** `false`
- **解释:** 总共有 2 门课程。学习课程 1 之前，你需要先完成​课程 0 ；并且学习课程 0 之前，你还应先完成课程 1 。这是不可能的。

## 解题代码 (JavaScript) - 拓扑排序 (Kahn's Algorithm - BFS)

```javascript
/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
function canFinish(numCourses, prerequisites) {
  const inDegree = new Array(numCourses).fill(0); // 记录每个节点的入度
  const adjList = new Map(); // 邻接表

  // 1. 构建邻接表和入度数组
  for (const [course, prereq] of prerequisites) {
    inDegree[course]++;
    if (!adjList.has(prereq)) {
      adjList.set(prereq, []);
    }
    adjList.get(prereq).push(course);
  }

  // 2. 将所有入度为 0 的节点加入队列
  const queue = [];
  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) {
      queue.push(i);
    }
  }

  let count = 0; // 记录已完成的课程数

  // 3. BFS
  while (queue.length > 0) {
    const prereq = queue.shift();
    count++;

    const courses = adjList.get(prereq);
    if (courses) {
      for (const course of courses) {
        inDegree[course]--;
        if (inDegree[course] === 0) {
          queue.push(course);
        }
      }
    }
  }

  // 4. 如果完成的课程数等于总课程数，则说明没有环
  return count === numCourses;
}
```
