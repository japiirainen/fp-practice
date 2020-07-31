const { toUpper, view, over, lensProp, compose } = require('ramda')

const L = {
    name: lensProp('name'),
    street: lensProp('street'),
    address: lensProp('address'),
}

const user = { address: { street: { name: 'Maple' } } }

const x = compose(L.address, L.street, L.name)

const res = view(x, user)
console.log(res)

const res2 = over(x, toUpper, user)
console.log(res2)
