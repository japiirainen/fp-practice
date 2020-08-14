var msg = 'Hello World'
//look ahead
console.log(msg.match(/(l.)/g))
console.log(msg.match(/(l.)$/g))
console.log(msg.match(/(l.)(?=o)/g))
console.log(msg.match(/(l.)(?!o)/g))
