const { dubNumber, evenOnly } = require('./mapFilterWithReduce')

// const map = xf => (acc, v) => {
//   acc.push(xf(v))
//   return acc
// }

// const filter = pred => (acc, v) => {
//   if (pred(v)) acc.push(v)
//   return acc
// }

// const res = [1, 2, 3, 4].reduce(filter(evenOnly), []).reduce(map(dubNumber), [])

const map = xf => reducer => {
  return (acc, v) => {
    reducer(acc, xf(v))
    return acc
  }
}

const filter = pred => reducer => (acc, v) => {
  if (pred(v)) return reducer(acc, v)
  return acc
}

const isEvenFilter = filter(evenOnly)
const isNot2Filter = filter(v => v !== 2)
const doubleMap = map(dubNumber)

const pushReducer = (acc, v) => {
  acc.push(v)
  return acc
}

const compose = (...fns) => fns.reduce((acc, fn) => (...args) => acc(fn(...args), x => x))

const cleanNumbersXf = compose(isNot2Filter, isEvenFilter, doubleMap)
const res2 = [1, 2, 3, 4].reduce(cleanNumbersXf(pushReducer), [])
console.log(res2)
