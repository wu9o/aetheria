# LRU 缓存 (LRU Cache - LeetCode #146)

## 问题描述

请你设计并实现一个满足 [LRU (最近最少使用) 缓存](https://en.wikipedia.org/wiki/Cache_replacement_policies#Least_recently_used_(LRU)) 约束的数据结构。

实现 `LRUCache` 类：
- `LRUCache(int capacity)` 以 **正整数** 作为容量 `capacity` 初始化 LRU 缓存。
- `int get(int key)` 如果关键字 `key` 存在于缓存中，则返回关键字的值，否则返回 `-1` 。
- `void put(int key, int value)` 如果关键字 `key` 已经存在，则变更其数据值 `value` ；如果不存在，则向缓存中插入该组 `key-value` 。如果插入操作导致关键字数量超过 `capacity` ，则应该 **逐出** 最近最少使用的关键字。

函数 `get` 和 `put` 必须以 `O(1)` 的平均时间复杂度运行。

## 解题代码 (JavaScript) - 哈希表 + 双向链表

```javascript
// 定义双向链表节点
class DLinkedNode {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

class LRUCache {
  /**
   * @param {number} capacity
   */
  constructor(capacity) {
    this.capacity = capacity;
    this.size = 0;
    this.cache = new Map(); // Map<key, DLinkedNode>
    
    // 使用哑节点简化边界处理
    this.head = new DLinkedNode();
    this.tail = new DLinkedNode();
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  _moveToHead(node) {
    this._removeNode(node);
    this._addToHead(node);
  }

  _removeNode(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
  }

  _addToHead(node) {
    node.prev = this.head;
    node.next = this.head.next;
    this.head.next.prev = node;
    this.head.next = node;
  }

  _removeTail() {
    const tailNode = this.tail.prev;
    this._removeNode(tailNode);
    return tailNode;
  }

  /** 
   * @param {number} key
   * @return {number}
   */
  get(key) {
    const node = this.cache.get(key);
    if (!node) {
      return -1;
    }
    // 访问过，移动到头部
    this._moveToHead(node);
    return node.value;
  }

  /** 
   * @param {number} key 
   * @param {number} value
   * @return {void}
   */
  put(key, value) {
    const node = this.cache.get(key);

    if (!node) {
      // 新节点
      const newNode = new DLinkedNode(key, value);
      this.cache.set(key, newNode);
      this._addToHead(newNode);
      this.size++;

      if (this.size > this.capacity) {
        // 移除尾部节点
        const tailNode = this._removeTail();
        this.cache.delete(tailNode.key);
        this.size--;
      }
    } else {
      // 已有节点，更新值并移动到头部
      node.value = value;
      this._moveToHead(node);
    }
  }
}
```
