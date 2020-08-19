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

  remove(value) {
    let currNode = this.read
  }

  removeTail() {
    let currNode = this.head
    while (currNode.next !== this.tail) {
      currNode = currNode.next
    }
    currNode.next = null
    this.tail = currNode
  }

  contains(value) {
    let currNode = this.head
    while (currNode.value !== value) {
      currNode = currNode.next
    }
    return currNode.value === value
  }

  isTail(value) {
    return value === this.tail.value
  }

  isHead(value) {
    return value === this.head.value
  }
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
