const reducer = (acc, v) => {
  return acc + v
}

reducer(10, 5) // 15
reducer('hello', 'name') // hello name

const res = [1, 2, 3, 4, 5].reduce(reducer) // res == 15

const objReducer = (acc, obj) => ({
  ...acc,
  ...obj,
})

const user = {
  name: 'Joona',
  email: 'some@some.com',
}
console.log(objReducer(user, { nickName: 'Jontte' }))

const setReducer = (acc, v) => acc.add(v)

const mySet = new Set([1, 2, 3, 4])
console.log(setReducer(mySet, 10))
