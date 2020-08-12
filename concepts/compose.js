const R = require('ramda')
const _ = R

const toUpper = (str) => str.toUpperCase()
const concat = _.curry((y, x) => x + y)
const exclaim = (str) => str + '!'
const log = _.curry((tag, x) => (console.log(tag, x), x))

const customCompose = (f, g) => (x) => f(g(x))

const shout = customCompose(exclaim, toUpper)

console.log(shout('Hello World'))

const lorem = _.compose(concat(' LOL'), toUpper, exclaim)

console.log(lorem('Lorem Ipsum'))

//exercises

const CARS = [
    {
        name: 'Ferrari FF',
        horsepower: 660,
        dollar_value: 700000,
        in_stock: true,
    },
    {
        name: 'Spyker C12 Zagato',
        horsepower: 650,
        dollar_value: 648000,
        in_stock: false,
    },
    {
        name: 'Jaguar XKR-S',
        horsepower: 550,
        dollar_value: 132000,
        in_stock: false,
    },
    { name: 'Audi R8', horsepower: 525, dollar_value: 114200, in_stock: false },
    {
        name: 'Aston Martin One-77',
        horsepower: 750,
        dollar_value: 1850000,
        in_stock: true,
    },
    {
        name: 'Pagani Huayra',
        horsepower: 700,
        dollar_value: 1300000,
        in_stock: false,
    },
]

// get name of first car
const nameOfFirstCar = _.compose(_.prop('name'), _.head)

console.log(nameOfFirstCar(CARS))
console.log(_.prop('name', CARS[0]))
//get average price
const getAverage = (xs) => _.reduce(_.add, 0, xs) / xs.length

const averageDollarValue = _.compose(getAverage, _.map(_.prop('dollar_value')))

console.log(averageDollarValue(CARS))

//make car names lowercase and replace spaces with underscores
const _underscore = _.replace(/\W+/g, '_')

//const sanitizeNames = _.compose(_.map(_.toLower), _.map(_underscore), _.map(_.prop('name')))
//get rid of nested maps
const sanitizeNames = _.map(_.compose(_.toLower, _underscore, _.prop('name')))

console.log(sanitizeNames(CARS))

//get fastest car
const prettyPrint = (x) => `${x.name} is the fastest 🏎!`

const fastestCar = _.compose(
    prettyPrint,
    _.last,
    _.sortBy(_.prop('horsepower'))
)

console.log(fastestCar(CARS))

const translateItem = (x) => x + 'lol'
const getLabel = (x) => _.prop('horsepower', x)

const pretyPrint = (x) => ({
    name: x.name,
    horsepower: x.horsepower,
    color: x.color,
})
const translate = _.map(_.compose(translateItem, getLabel), CARS)

//_.map(_.compose(translateItem, getLabel))

console.log(translate)
