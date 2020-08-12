//recursive
const joinElements_ = (arr, joinString) => {
    const recurse = (index, resultSoFar) => {
        resultSoFar += arr[index]

        if (index === arr.length - 1) {
            return resultSoFar
        } else {
            return recurse(index + 1, resultSoFar + joinString)
        }
    }
    return recurse(0, '')
}

//iterative
const joinElements = (arr, joinString) => {
    let resultSofar = ''

    for (let i = 0; i < arr.length; i++) {
        resultSofar += arr[i] + joinString
    }
    return resultSofar.slice(0, -1)
}

console.log(joinElements(['s', 'cr', 't cod', ' :) :)'], 'e'))
