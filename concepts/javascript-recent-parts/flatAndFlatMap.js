var nestedArr = [1, [2, 3], [[]], [4, [5]], 6]
console.log(nestedArr.flat(0))
console.log(nestedArr.flat(1))
console.log(nestedArr.flat(2))

const res = [1, 2, 3, 4, 5, 6].flatMap(function doubleEvens(val) {
  if (val % 2 === 0) {
    return [val, val * 2]
  } else {
    return []
  }
})

const res2 = [1, 2, 3, 4, 5, 6].flatMap(v => (v % 2 === 0 ? [v, v * 2] : []))

console.log(res)
console.log(res2)
