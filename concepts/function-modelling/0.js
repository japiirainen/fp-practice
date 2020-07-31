const { Either } = require('../../lib/types')

const toUpper = (x) => x.toUpperCase()
const exClaim = (x) => x.concat('!')

const Fn = (run) => ({
    run,
    chain: (f) => Fn((x) => f(run(x)).run(x)),
    map: (f) => Fn((x) => f(Run(x))),
    concat: (other) => Fn((x) => run(x).concat(other.run(x))),
})

const res = Fn(toUpper)
    .chain((upper) => Fn((y) => exClaim(upper)))
    .run('fp sucks')

console.log(res)
