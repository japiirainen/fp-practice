const { compose, seq, into, map, filter, evenOnly } = require('../utils')
const { fromJS, List } = require('immutable')
const { isPlainObject } = require('lodash')

const doubleAndFilterEvens = compose(
  filter(x => x % 2 === 0),
  map(x => x * 2)
)

const res = fromJS(into([], doubleAndFilterEvens, List([1, 2, 3, 4]))).toString()
//console.log(res)

const res2 = into(List(), doubleAndFilterEvens, [1, 2, 3, 4]).toString()
console.log(res2)
