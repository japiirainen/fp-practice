var msg = 'Hello World'
//look ahead
console.log(msg.match(/(l.)/g))
console.log(msg.match(/(l.)$/g))
console.log(msg.match(/(l.)(?=o)/g))
console.log(msg.match(/(l.)(?!o)/g))

//look behind
console.log(msg.match(/(?<=e)(l.)/g))
console.log(msg.match(/(?<!e)(l.)/g))

//exercise

var poem = `
The power of a gun can kill and the power of fire can burn the power of wind can chill and the power of a mind can learn the power of anger can rage inside until it tears u apart but the power of a smile especially yours can heal a frozen heart
`

function* powers(poem) {
  var re = /(?<=power of)(?<thing>(?:a)?\w+).*?(?<=can )(?<verb>\w+)/gs
  var match
  while ((match = re.exec(poem))) {
    let {
      groups: { thing, verb },
    } = match
    yield `${thing}: ${verb}`
  }
}

for (let power of powers(poem)) {
  console.log(power)
}
// a gun: kill
// fire: burn
// wind: chill
// a mind: learn
// anger: rage
// smile: heal
