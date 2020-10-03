const dubNumber = number => number * 2

const res = [1, 2, 3, 4].map(dubNumber)

const dubTwice = number => dubNumber(dubNumber(number))

const res2 = [1, 2, 3, 4].map(dubTwice)

const evenOnly = number => number % 2 === 0

const doubleAndEven = number => dubNumber(evenOnly(number))

//doesnt work
const res3 = [1, 2, 3, 4].filter(doubleAndEven)

const map = (xf, array) => {
  return array.reduce((acc, v) => {
    acc.push(xf(v))
    return acc
  }, [])
}

console.log(map(dubNumber, [1, 2, 3, 4]))

const filter = (predicate, array) => {
  return array.reduce((acc, v) => {
    if (predicate(v)) acc.push(v)
    return acc
  }, [])
}

console.log(filter(evenOnly, [1, 2, 3, 4]))

module.exports = {
  dubNumber,
  evenOnly,
}
