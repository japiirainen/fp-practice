class LinkedList {
  constructor() {
    this.head = null
    this.tail = null
  }

  insert(value) {
    if (this.head === null) {
      this.head = { value, next: null }
      this.tail = this.head
    } else {
      const node = { value, next: null }
      this.tail.next = node
      this.tail = node
    }
  }

  remove(value) {}

  removeTail() {
    let currNode = this.head
    while (currNode.next !== this.tail) {
      currNode = currNode.next
    }
    this.tail = currNode
    this.tail.next = null
  }

  contains() {}

  isTail() {}
}

const list = new LinkedList()

list.insert(1)
list.insert(2)
list.insert(3)
list.insert(4)
list.insert(5)
list.removeTail()
list.remove(2)
console.log(list.head)

console.log(list.tail)
