class Stack {
  constructor() {
    this._storage = {}
    this._length = 0
  }

  push(value) {
    this._storage[this._length] = value
    this._length++
  }

  pop() {
    if (this._length) {
      const last = this._storage[this._length - 1]
      delete this._storage[this._length - 1]
      this._length--
      return last
    } else {
      throw new Error('stack is empty')
    }
  }

  peek() {
    if (this._length === 0) return 'stack is empty'
    return this._storage[this._length - 1]
  }
}

const myStack = new Stack()
myStack.push('lol')
myStack.push('lmao')
myStack.push('heh')
console.log(myStack._storage)
myStack.pop()
myStack.pop()
myStack.pop()
console.log(myStack._length)
console.log(myStack._storage)
console.log(myStack.peek())
