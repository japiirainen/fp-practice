const arrOfRands = randCeil => len => Array.from({ length: len }, (v, i) => Math.floor(Math.random() * randCeil))

const timeIt = (label, fn) => {
  console.time(label)
  fn()
  console.timeEnd(label)
}

const arrOfThousand = arrOfRands(100)(1000)
const arrOfMillion = arrOfRands(100)(1e6)

const isEven = v => v % 2 === 0
const tripleIt = v => v * 3

timeIt('thousand - map', () => arrOfThousand.map(tripleIt))

timeIt('thousand - map & filter', () => arrOfThousand.map(tripleIt).filter(isEven))

timeIt('million - map', () => arrOfMillion.map(tripleIt))

timeIt('million - map & filter', () => arrOfMillion.map(tripleIt).filter(isEven))

timeIt('million - imperative', () => {
  const result = []
  arrOfMillion.forEach(v => {
    const tripled = tripleIt(v)
    if (isEven(tripled)) result.push(tripled)
  })
})
