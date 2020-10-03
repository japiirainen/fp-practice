const { isPlainObject, entries } = require('lodash')
const { map } = require('ramda')
const { into } = require('./into-helper')

let transduce = (xf, reducer, seed, _collection) => {
  const transformedReducer = xf(reducer)
  let accumulation = seed
  const collection = isPlainObject(_collection) ? entries(_collection) : _collection

  for (let val of collection) {
    accumulation = transformedReducer(accumulation, val)
  }
}

const objectValues = obj => {
  return into(
    [],
    map(kv => kv[1]),
    obj
  )
}
console.log(objectValues({ some: 1, another: 2 }))
