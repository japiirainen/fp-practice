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
