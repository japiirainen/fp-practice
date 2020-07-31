const toUpper = (x) => x.toUpperCase()
const exClaim = (x) => x.concat('!')

const Fn = (run) => ({
    run,
    chain: (f) => Fn((x) => f(run(x)).run(x)),
    map: (f) => Fn((x) => f(run(x))),
    concat: (other) => Fn((x) => run(x).concat(other.run(x))),
})
Fn.ask = Fn((x) => x)
Fn.of = (x) => Fn(() => x)

const res = Fn.of('hello')
    .map(toUpper)
    .map(exClaim)
    .chain((upper) => Fn.ask.map((cfg) => [upper, cfg]))

console.log(res.run({ port: 3000 }))
