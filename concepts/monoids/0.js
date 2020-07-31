const { List } = require('immutable-ext')
// Monoid = Semigroup + Identity

const Sum = (x) => ({
    x,
    concat: (other) => Sum(x + other.x),
})
Sum.empty = () => Sum(0)

const Product = (x) => ({
    x,
    concat: (other) => Product(x * other.x),
})
Product.empty = () => Product(1)

const Any = (x) => ({
    x,
    concat: (other) => Any(x || other.x),
})
Any.empty = () => Any(false)

const All = (x) => ({
    x,
    concat: (other) => All(x && other.x),
})
All.empty = () => All(true)

const res = List([true, false, true, true]).foldMap(All, All.empty())
console.log(res)
