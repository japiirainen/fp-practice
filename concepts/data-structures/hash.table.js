class HashTable {
  constructor(val) {
    this._storage = []
    this._tableSize = val
  }

  insert(key, value) {
    const index = this._hash(key, this._tableSize)

    if (!this._storage[index]) this._storage[index] = []
    this._storage[index].push([key, value])
  }

  retrieve(key) {
    const index = this._hash(key, this._tableSize)
    const arrIndex = this._storage[index]
    if (arrIndex) {
      for (let i = 0; i < arrIndex.length; i++) {
        const arr = arrIndex[i]
        if (arr[0] === key) {
          return arr[1]
        }
      }
    }
  }

  remove() {}

  _hash(str, n) {
    let sum = 0
    for (let i = 0; i < str.length; i++) {
      sum += str.charCodeAt(i) * 3
    }
    return sum % n
  }
}

const table = new HashTable(25)

table.insert('a', 1)
table.insert('b', 2)

console.log(table._storage)
console.log(table.retrieve('a'))

// _storage: [ 0, 0, 0, [['a', 1], ['b', 2]], 0, 0, 0 ]

const str = 'dpkg  | install-info'

console.log(str.split(' | '))
