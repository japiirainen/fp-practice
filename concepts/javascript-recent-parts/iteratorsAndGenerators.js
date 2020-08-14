var str = 'Hello'
var world = ['w', 'o', 'r', 'l', 'd']

var it1 = str[Symbol.iterator]()
var it2 = world[Symbol.iterator]()

for (let v of it1) {
  console.log(v)
}
for (let v of it2) {
  console.log(v)
}
var letters = [...str]
console.log('letters: ', letters)

//generators

function* main() {
  yield 1
  yield 2
  yield 3
  yield 4
}

var it = main()

for (v of it) {
  console.log(v)
}
console.log([...main()])

var obj = {
  a: 1,
  b: 2,
  c: 3,
  *[Symbol.iterator]() {
    for (let key of Object.keys(this)) {
      yield this[key]
    }
  },
}
console.log([...obj])

//exercises
var numbers = {
  *[Symbol.iterator]({ start = 0, end = 100, step = 1 } = {}) {
    for (let i = start; i <= end; i += step) {
      yield i
    }
  },
}

for (let num of numbers) {
  console.log(num)
}

console.log(`My lucky numbers are: 
    ${[...numbers[Symbol.iterator]({ start: 6, end: 30, step: 4 })]}
`)
