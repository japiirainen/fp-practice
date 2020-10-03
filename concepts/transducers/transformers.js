const myString = 'hello'

const toUpper = str => str.toUpperCase()

const shout = str => `${str}!!`

const scream = str => toUpper(shout(str))

console.log(scream(myString))
