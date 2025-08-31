# 删除链表的倒数第 N 个结点 (Remove Nth Node From End of List - LeetCode #19)

## 问题描述

给你一个链表，删除链表的倒数第 `n` 个结点，并且返回链表的头结点。

**示例:**

- **输入:** `head = [1,2,3,4,5]`, `n = 2`
- **输出:** `[1,2,3,5]`

## 定义链表节点

```javascript
/**
 * Definition for singly-linked list.
 */
function ListNode(val, next) {
  this.val = (val===undefined ? 0 : val)
  this.next = (next===undefined ? null : next)
}
```

## 解题代码 (JavaScript) - 快慢指针法

```javascript
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
function removeNthFromEnd(head, n) {
  // 使用哑节点，以处理删除头节点的情况
  const dummyHead = new ListNode(0, head);
  let slow = dummyHead;
  let fast = head;

  // 1. 快指针先向前移动 n 步
  for (let i = 0; i < n; i++) {
    fast = fast.next;
  }

  // 2. 快慢指针同时移动，直到快指针到达链表末尾
  // 此时慢指针正好指向要删除节点的前一个节点
  while (fast !== null) {
    fast = fast.next;
    slow = slow.next;
  }

  // 3. 删除节点
  slow.next = slow.next.next;

  return dummyHead.next;
}
```
