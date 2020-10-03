const { doubleAndEven, pushReducer, shout } = require('../utils')
const { evenOnly, dubNumber } = require('./mapFilterWithReduce')
const { map, filter, transduce, compose } = require('ramda')

const isEvenFilter = filter(evenOnly)
const isNot2Filter = filter(v => v !== 2)
const doubleMap = map(dubNumber)

// const transduce = (xf, reducer, seed, collection) => {
//   //   collection.reduce(xf(reducer), seed)
//   const transformedReducer = xf(reducer)
//   let acc = seed
//   for (const value of collection) {
//     acc = transformedReducer(acc, value)
//   }
//   return acc
// }

const toUpper = str => str.toUpperCase()
const isVowel = char => ['a', 'e', 'i', 'o', 'u', 'y'].includes(char.toLowerCase())

const uppercased = transduce(compose(map(toUpper), filter(isVowel)), (str, char) => str + char, '', 'loloool')
console.log(uppercased)

const numMap = new Map()
numMap.set('a', 1)
numMap.set('b', 2)
numMap.set('c', 3)
numMap.set('d', 4)

const res = transduce(compose(isEvenFilter, isNot2Filter, doubleMap), pushReducer, [], numMap.values())
console.log(res)
