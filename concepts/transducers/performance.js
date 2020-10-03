const { compose, seq, into, map, filter, timeIt, arrayofRandoms } = require('../utils')
const t = require('transducers.js')

const isEven = v => v % 2 === 0
const tripleIt = v => v * 3
const arrOfMillion = arrayofRandoms(100)(1e6)

timeIt('million - chained', () => {
  const result = arrOfMillion.map(tripleIt).filter(isEven)
})
timeIt('million - chained x2', () => {
  const result = arrOfMillion.map(tripleIt).map(tripleIt).filter(isEven)
})
timeIt('million - chained x4', () => {
  const result = arrOfMillion.map(tripleIt).map(tripleIt).map(tripleIt).map(tripleIt).filter(isEven)
})

timeIt('million - imperative', () => {
  const result = []
  arrOfMillion.forEach(v => {
    const tripled = tripleIt(v)
    isEven(tripled) && result.push(tripled)
  })
})

timeIt('million - transduce', () => {
  seq(compose(filter(isEven), map(tripleIt)), arrOfMillion)
})

timeIt('million - transduce x2', () => {
  seq(compose(filter(isEven), map(tripleIt), map(tripleIt)), arrOfMillion)
})

timeIt('million - transduce x4', () => {
  seq(compose(filter(isEven), map(tripleIt), map(tripleIt), map(tripleIt), map(tripleIt)), arrOfMillion)
})

timeIt('million - transduce transduce lib', () => {
  t.seq(arrOfMillion, t.compose(t.filter(isEven), t.map(tripleIt), t.map(tripleIt), t.map(tripleIt), t.map(tripleIt)))
})
