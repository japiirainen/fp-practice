const doubleAndEven = number => dubNumber(evenOnly(number))
const toUpper = str => str.toUpperCase()

const shout = str => `${str}!!`
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
const pushReducer = (acc, v) => {
  acc.push(v)
  return acc
}

const compose = (...fns) => fns.reduce((acc, fn) => (...args) => acc(fn(...args), x => x))

module.exports = {
  toUpper,
  doubleAndEven,
  pushReducer,
  map,
  shout,
  compose,
  filter,
}
