# 环形链表 (Linked List Cycle - LeetCode #141)

## 问题描述

给你一个链表的头节点 `head` ，判断链表中是否有环。

如果链表中有某个节点，可以通过连续跟踪 `next` 指针再次到达，则链表中存在环。 为了表示给定链表中的环，评测系统内部使用整数 `pos` 来表示链表尾连接到链表中的位置（索引从 0 开始）。**`pos` 不作为参数进行传递**。仅仅是为了标识链表的实际情况。

如果链表中存在环，则返回 `true` 。否则，返回 `false` 。

**示例:**

- **输入:** `head = [3,2,0,-4]`, `pos = 1`
- **输出:** `true`
- **解释:** 链表中有一个环，其尾部连接到第二个节点。

## 定义链表节点

```javascript
/**
 * Definition for singly-linked list.
 */
function ListNode(val) {
  this.val = val;
  this.next = null;
}
```

## 解题代码 (JavaScript) - 快慢指针法

```javascript
/**
 * @param {ListNode} head
 * @return {boolean}
 */
function hasCycle(head) {
  if (head === null || head.next === null) {
    return false;
  }

  let slow = head;
  let fast = head.next;

  while (slow !== fast) {
    // 如果快指针到达链表末尾，说明没有环
    if (fast === null || fast.next === null) {
      return false;
    }
    slow = slow.next;
    fast = fast.next.next;
  }

  // 如果快慢指针相遇，说明有环
  return true;
}
```

## 解题代码 (JavaScript) - 哈希表法

```javascript
/**
 * @param {ListNode} head
 * @return {boolean}
 */
function hasCycleWithSet(head) {
  const visited = new Set();
  let current = head;

  while (current !== null) {
    if (visited.has(current)) {
      return true;
    }
    visited.add(current);
    current = current.next;
  }

  return false;
}
```
