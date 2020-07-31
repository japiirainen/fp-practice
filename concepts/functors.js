const Box = (x) => ({
    map: (f) => Box(f(x)),
    chain: (f) => f(x),
    fold: (f) => f(x),
    toString: `Box(${x})`,
})

//dot chain this
const nextCharForNumberString = (str) => {
    const trimmed = str.trim()
    const number = parseInt(trimmed)
    const nextNumber = new Number(number + 1)
    return String.fromCharCode(nextNumber)
}

const dotChained = (str) =>
    Box(str)
        .map((x) => x.trim())
        .map((x) => parseInt(x))
        .map((x) => new Number(x + 1))
        .fold(String.fromCharCode)

const result = nextCharForNumberString(' 64   ')
console.log(result)

const result2 = dotChained('  64 ')
console.log(result2)

//====================================================================>>>>>>>>>>>>>>

//dot chain this

const first = (xs) => xs[0]

const halfTheFirstLargeNumber = (xs) => {
    const found = xs.filter((x) => x >= 20)
    const answer = first(found) / 2
    return `The answer is ${answer}`
}

const refactored = (xs) =>
    Box(xs)
        .map((x) => x.filter((x) => x >= 20))
        .map((x) => first(x) / 2)
        .fold((x) => `The answer is ${x}`)

const res = halfTheFirstLargeNumber([1, 4, 50])
console.log(res)

const res2 = refactored([1, 4, 50])
console.log(res2)

//====================================================================>>>>>>>>>>>>>>

const moneyToFloat = (str) =>
    Box(str)
        .map((x) => x.replace(/\$/, ''))
        .fold((x) => parseInt(x))

const number = moneyToFloat('8.00$')
console.log(number)

//====================================================================>>>>>>>>>>>>>>

const percentToFloat = (str) =>
    Box(str)
        .map((x) => x.replace(/\%/, ''))
        .map((x) => parseFloat(x))
        .fold((x) => x * 0.01)

const notPercent = percentToFloat('20%')
console.log(notPercent)

//====================================================================>>>>>>>>>>>>>>

const applyDiscount = (price, discount) =>
    Box(moneyToFloat(price))
        .chain((cents) =>
            Box(percentToFloat(discount)).map(
                (savings) => cents - cents * savings
            )
        )
        .fold((x) => x)

const discounted = applyDiscount('$100', '20%')

console.log(discounted)
