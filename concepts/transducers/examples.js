const { compose } = require('ramda')
const t = require('transducers.js')

const doubleTheNumber = v => v * 2
const evenOnly = v => v % 2 === 0

const doubleAndEven = t.compose(t.filter(evenOnly), t.map(doubleTheNumber))

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const res = t.seq(arr, t.compose(doubleAndEven, t.take(2)))
//console.log(res)

const lazyRes = t.seq(t.iterator(arr), t.compose(doubleAndEven, t.take(2)))
//console.log(lazyRes.next(), lazyRes.next())

function* makeNumbers() {
  let num = 1
  while (true) yield num++
}

const lazyNums = t.seq(makeNumbers(), doubleAndEven)
console.log(lazyNums.next(), lazyNums.next(), lazyNums.next(), lazyNums.next())
