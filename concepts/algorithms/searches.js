//linear search

function linearSearch(list, x) {
    let index = -1
    list.forEach((n, i) => {
        if (n === x) {
            index = i
        }
    })
    return index
}

console.log('linear search: ', linearSearch([2, 6, 7, 90, 103], 90))

//binary search

function binarySearch(list, item) {
    let min = 0
    let max = list.length - 1
    let guess
    while (min <= max) {
        guess = Math.floor((min + max) / 2)

        if (list[guess] === item) {
            return guess
        } else {
            if (item > guess) {
                min = guess + 1
            } else {
                max = guess - 1
            }
        }
    }
    return -1
}

console.log('binary search: ', binarySearch([2, 6, 7, 90, 103], 90))
