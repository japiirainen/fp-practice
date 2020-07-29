const { curry } = require('ramda')

const add = (x, y) => x + y

const multiply = (x, y) => x * y

const toPair = f => 
    ([x, y]) => f(x, y)


const result = toPair(add)([2, 5])

const multiplied = toPair(multiply)([5, 10])

console.log(multiplied)
console.log(result)
 


const simpleCurry = f =>
    x => y => f(x, y)


const curriedAdd = simpleCurry(add)

const increment = curriedAdd(1)

console.log(increment(8))

const modulo = simpleCurry((x, y) => y % x)

const isOdd = modulo(2)

console.log(isOdd(12))

const filter = simpleCurry((f, xs) => xs.filter(f))

const getOdds = filter(isOdd)

console.log(getOdds([1, 2, 3, 4, 5, 6, 7]))

const replace = curry((regex, replacement, str) => 
    str.replace(regex, replacement)
)

const replaceVowels = replace(/[AEIOU]/ig, '!')

console.log(replaceVowels('Hello World'))

