//recursive factorial

const factorial = n => (n == 0 ? 1 : n * factorial(n - 1))

console.log(factorial(5))
//factorial iterative

function fact(num) {
    var res = 1
    for (var i = num; i > 0; i--) {
        res *= i
    }
    return res
}

console.log(fact(5))
