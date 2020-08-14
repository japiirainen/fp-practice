const { type } = require('ramda')

const firstName = 'Joona'
const lastName = 'Piirainen'
const title = 'someGuy'

const msg = `My name is ${firstName} ${lastName} and I am ${title}!`
console.log(msg)

function formatCurrency(strings, ...values) {
  let str = ''
  for (let i = 0; i < strings.length; i++) {
    if (i > 0) {
      if (typeof values[i - 1] == 'number') {
        str += `$${values[i - 1].toFixed(2)}`
      } else {
        str += values[i - 1]
      }
    }
    str += strings[i]
  }
  return str
}

const amount = 12.3
const msg2 = formatCurrency`The total amount is ${amount}`
console.log(msg2)

//you can split strings like this
const string = 'some great string'
console.log('cool split: ', string.split``)

var name = 'kyle',
  twitter = 'getify',
  topic = 'js recent parts'

function upper(strings, ...values) {
  let str = ''
  for (let i = 0; i < strings.length; i++) {
    if (i > 0) {
      str += String(values[i - 1]).toUpperCase()
    }
    str += strings[i]
  }
  return str
}

console.log(
  upper`Hello ${name} (@${twitter}), welcome to ${topic}!` === 'Hello KYLE (@GETIFY), welcome to JS RECENT PARTS!'
)

const str = 'Hello'
console.log(str.padStart(5))
console.log(str.padStart(8, '12345'))
console.log(str.padEnd(10, ` ${name}`))
const notTrimmed = '   very ugly string            '
console.log(notTrimmed.trim())
console.log(notTrimmed.trimStart())
console.log(notTrimmed.trimEnd())
