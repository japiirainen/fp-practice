var msg = 'Hello World lol word {{ package }} words'
console.log(msg.match(/()/))
//look ahead
console.log(msg.match(/(l.)/g))
console.log(msg.match(/(l.)$/g))
console.log(msg.match(/(l.)(?=o)/g))
console.log(msg.match(/(l.)(?!o)/g))

//look behind
console.log(msg.match(/(?<=e)(l.)/g))
console.log(msg.match(/(?<!e)(l.)/g))

const req = /\{{\s*([a-z]+?)\s*\}}/g
const re = /\{{\s*([a-z]+?)\s*\}}/

const lause = '{{ package }} lol {{ pilalla }} <h1></h1> {{ kaikki }}'

console.log(lause.match(req))
const pakg = lause.match(req)[1]
const pilalla = lause.match(req)[2]
console.log(pakg.match(re)[1])
console.log(pakg)
console.log(pilalla)

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
