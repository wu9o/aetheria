# 反转链表 (Reverse Linked List - LeetCode #206)

## 问题描述

给你单链表的头节点 `head` ，请你反转链表，并返回反转后的链表。

**示例:**

- **输入:** `head = [1,2,4,5]`
- **输出:** `[5,4,2,1]`

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

## 解题代码 (JavaScript) - 迭代法

```javascript
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
function reverseList(head) {
  let prev = null;
  let curr = head;

  while (curr !== null) {
    const nextTemp = curr.next; // 临时保存下一个节点
    curr.next = prev;          // 当前节点指向前一个节点
    prev = curr;               // 前一个节点变为当前节点
    curr = nextTemp;           // 当前节点变为原来的下一个节点
  }

  return prev; // 返回新的头节点
}
```

## 解题代码 (JavaScript) - 递归法

```javascript
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
function reverseListRecursive(head) {
  if (head === null || head.next === null) {
    return head;
  }
  
  const newHead = reverseListRecursive(head.next);
  
  head.next.next = head;
  head.next = null;
  
  return newHead;
}
```
