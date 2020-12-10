const { identity } = require('lodash')
const { map, filter, reduce, compose, tap, transduce, append, concat, into, range, sum } = require('ramda')

// withoud transducers

//Array from 1 to 100
const demoArray = range(1, 100)

//Basic mapping functions
const add1 = v => v + 1
const double = v => v * 2
const triple = v => v * 3

const basicOne = compose(map(add1), map(double), map(triple))
const resOneBasic = basicOne(demoArray)

//With transduce

const pushReducer = (acc, x) => {
  acc.push(x)
  return acc
}

const transducer = compose(map(double), map(triple), map(add1))
const res = transduce(transducer, pushReducer, [], demoArray)

//remove pushReducer by using into
const intoExample = into([], transducer, demoArray)

// But is this the same???
const maybeSame = map(compose(add1, double, triple))
const res2 = maybeSame(demoArray)

//with transducers your filters and maps are also reducers

const isEven = v => v % 2 === 0

//const intoExampleTwo = into([], compose(sum, filter(isEven)), demoArray)

const test = compose(sum, filter(isEven))
console.log(test(demoArray))
