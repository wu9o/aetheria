# 合并两个有序链表 (Merge Two Sorted Lists - LeetCode #21)

## 问题描述

将两个升序链表合并为一个新的 **升序** 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。

**示例:**

- **输入:** `l1 = [1,2,4]`, `l2 = [1,3,4]`
- **输出:** `[1,1,2,3,4,4]`

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
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
function mergeTwoLists(l1, l2) {
  // 创建一个哑节点作为新链表的头节点的前一个节点
  const dummyHead = new ListNode(-1);
  let current = dummyHead;

  while (l1 !== null && l2 !== null) {
    if (l1.val <= l2.val) {
      current.next = l1;
      l1 = l1.next;
    } else {
      current.next = l2;
      l2 = l2.next;
    }
    current = current.next;
  }

  // 如果其中一个链表还有剩余，直接拼接到新链表的末尾
  current.next = l1 === null ? l2 : l1;

  return dummyHead.next;
}
```

## 解题代码 (JavaScript) - 递归法

```javascript
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
function mergeTwoListsRecursive(l1, l2) {
  if (l1 === null) {
    return l2;
  }
  if (l2 === null) {
    return l1;
  }

  if (l1.val <= l2.val) {
    l1.next = mergeTwoListsRecursive(l1.next, l2);
    return l1;
  } else {
    l2.next = mergeTwoListsRecursive(l1, l2.next);
    return l2;
  }
}
```
