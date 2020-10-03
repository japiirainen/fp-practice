const { pushReducer } = require('../utils')
const { isPlainObject, isNumber } = require('lodash')
const { transduce, map, filter, compose, into } = require('ramda')

const objectReducer = (obj, value) => Object.assign(obj, value)

// const into = (to, xf, collection) => {
//   if (Array.isArray(to)) return transduce(xf, pushReducer, to, collection)
//   else if (isPlainObject(to)) return transduce(xf, objectReducer, to, collection)
//   throw new Error('error')
// }

const res = into(
  [],
  compose(
    map(x => x / 2),
    map(x => x * 10)
  ),
  [1, 2, 3, 4, 5]
)
console.log(res)

const res2 = into(
  {},
  compose(
    filter(isNumber),
    map(x => ({ [x]: x }))
  ),
  [1, 2, 3, 4, 5, 'hello', () => 'world']
)
console.log(res2)

module.exports = {
  into,
  objectReducer,
}
