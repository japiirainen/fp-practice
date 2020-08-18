class Queue {
  constructor() {
    this._storage = {}
    this._len = 0
    this._head = 0
  }

  enqueue(value) {
    this._storage[this._len + this._head] = value
    this._len++
  }
  dequeue() {
    if (this._len) {
      const first = this._storage[this._head]
      delete this._storage[this._head]
      this._head++
      this._len--
      return first
    } else {
      throw new Error('queue is empty')
    }
  }
  peek() {
    if (this._len === 0) {
      throw new Error('queue is empty')
    } else {
      return this._storage[this._head]
    }
  }
}

const myQueue = new Queue()

myQueue.enqueue('one')
myQueue.enqueue('two')
myQueue.enqueue('three')
myQueue.enqueue('four')
myQueue.dequeue()
myQueue.enqueue('five')
console.log(myQueue._storage)
console.log(myQueue._len)
console.log(myQueue.peek())
