import R from 'ramda'
const _ = R

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

const customFilter = simpleCurry((f, xs) => xs.filter(f))

const getOdds = customFilter(isOdd)

console.log(getOdds([1, 2, 3, 4, 5, 6, 7]))

const replace = _.curry((regex, replacement, str) => 
    str.replace(regex, replacement)
)

const replaceVowels = replace(/[AEIOU]/ig, '!')

console.log(replaceVowels('Hello World'))

//ex1

const split = _.curry((str) => str.split(' '))

console.log(split('hello world'))

const listOfSentences = ['hello world', 'lorem ipsum']
const splitMany = _.map(split)

console.log(splitMany(listOfSentences))

const filterQs = _.filter(_.test(/q/ig))

console.log(filterQs(['quarry', 'lol', 'quake', 'lol', 'quick']))

