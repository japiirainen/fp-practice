function data() {
  return [1, 2, 3, 4, 5]
}
let temp = data()

var [first, second, third, ...rest] = temp
console.log(first, second)
console.log(temp)

function data2([first = 10, second = 20, third = 30] = []) {}

function data3() {
  return [1, [2, 3], 4]
}

var [first, [second, third] = [], fourth] = data3()

const array = [
  {
    id: 1,
    name: 'joona',
    desc: 'some text',
    deps: [],
  },
  {
    id: 2,
    name: 'joona',
    desc: 'some text',
    deps: [],
  },
  {
    id: 3,
    name: 'joona',
    desc: 'some text',
    deps: [],
  },
]

const findPackage = (arr, id) => arr.find(x => x.id === id)

console.log(findPackage(array, 1))

const arr = [1, 2, 3, 4, 5, 6]
