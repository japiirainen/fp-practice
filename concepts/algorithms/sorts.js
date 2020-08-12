//bubble sort

function swap(array, i, j) {
    let temp = array[i]
    array[i] = array[j]
    array[j] = temp
}
//naive implementation
function bubbleSortBasic(array) {
    for (let i = 0; i < array.length; i++) {
        for (let j = 1; j < array.length; j++) {
            if (array[j - 1] > array[j]) {
                swap(array, j - 1, j)
            }
        }
    }
    return array
}

//console.log(bubbleSortBasic([4, 3, 1, 6, 8, 12, 2]))
//optimized bubble sort
function bubbleSort(array) {
    let swapped
    do {
        swapped = false

        for (let i = 0; i < array.length; i++) {
            if (array[i] && array[i + 1] && array[i] > array[i + 1]) {
                swap(array, i, i + 1)
                swapped = true
            }
        }
    } while (swapped)
    return array
}
console.log('bubble sort: ', bubbleSort([4, 3, 1, 6, 8, 12, 2]))

//merge sort
// first divide until only arrays of one
//then:
//merge(L, R)
/*
[3, 27], [9, 10]
initialize empty array
    [ ]
compare the first index of the left array to the first index of the right array.
push the lower value to empty array and shift arry with lower value.
3 > 9 so new situation is:
[27], [9, 10]
    [3]
repeat until both arrays are empty and return new list.
*/

function mergeSort(arr) {
    if (arr.length === 1) return arr
    const middle = Math.floor(arr.length / 2)
    const left = arr.slice(0, middle)
    const right = arr.slice(middle)
    return merge(mergeSort(left), mergeSort(right))
}

function merge(left, right) {
    let result = []
    let indexLeft = 0
    let indexRight = 0
    while (indexLeft < left.length && indexRight < right.length) {
        if (left[indexLeft] < right[indexRight]) {
            result.push(left[indexLeft])
            indexLeft++
        } else {
            result.push(right[indexRight])
            indexRight++
        }
    }
    return result.concat(left.slice(indexLeft)).concat(right.slice(indexRight))
}

console.log('merge sort: ', mergeSort([4, 3, 1, 6, 8, 12, 2]))
