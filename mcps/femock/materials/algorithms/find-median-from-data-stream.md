# 数据流的中位数 (Find Median from Data Stream - LeetCode #295)

## 问题描述

**中位数** 是有序整数列表中的中间值。如果列表的大小是偶数，则没有中间值，中位数是两个中间值的平均值。

例如，
- `[2,3,4]` 的中位数是 `3`
- `[2,3]` 的中位数是 `(2 + 3) / 2 = 2.5`

设计一个支持以下两种操作的数据结构：
- `void addNum(int num)` - 从数据流中添加一个整数到数据结构中。
- `double findMedian()` - 返回目前所有元素的中位数。

**示例:**
`addNum(1)`
`addNum(2)`
`findMedian() -> 1.5`
`addNum(3)`
`findMedian() -> 2.0`

## 解题代码 (JavaScript) - 双堆 (最大堆 + 最小堆)

*注意：JavaScript 没有内置的堆/优先队列结构，以下代码使用一个简单的数组模拟并手动维护堆的性质，但在实际工程中，通常会使用库或自己实现一个更高效的堆结构。*

```javascript
// 简易的堆实现 (仅为示例，非最优)
class Heap {
    constructor(comparator) {
        this.data = [];
        this.comparator = comparator || ((a, b) => a - b);
    }
    add(val) {
        this.data.push(val);
        this.data.sort(this.comparator);
    }
    peek() {
        return this.data[0];
    }
    poll() {
        return this.data.shift();
    }
    size() {
        return this.data.length;
    }
}

class MedianFinder {
    constructor() {
        // 最大堆，存储较小的一半数字
        this.maxHeap = new Heap((a, b) => b - a);
        // 最小堆，存储较大的一半数字
        this.minHeap = new Heap((a, b) => a - b);
    }

    /** 
     * @param {number} num
     * @return {void}
     */
    addNum(num) {
        // 默认先加入最大堆
        this.maxHeap.add(num);
        
        // 将最大堆的堆顶元素（最大值）移动到最小堆
        this.minHeap.add(this.maxHeap.poll());
        
        // 维护两个堆的大小平衡
        // 确保 maxHeap 的大小 >= minHeap 的大小
        if (this.maxHeap.size() < this.minHeap.size()) {
            this.maxHeap.add(this.minHeap.poll());
        }
    }

    /**
     * @return {number}
     */
    findMedian() {
        if (this.maxHeap.size() > this.minHeap.size()) {
            return this.maxHeap.peek();
        } else {
            return (this.maxHeap.peek() + this.minHeap.peek()) / 2;
        }
    }
}
```
