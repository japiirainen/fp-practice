const { Task, Either } = require('../../lib/types')

const Compose = (f, g) => {
    const M = (fg) => ({
        extract: () => fg,
        map: (f) => M(fg.map((g) => g.map(f))),
    })
    M.of = (x) => M(f.of(g.of(x)))
    return M
}

const TaskEither = Compose(Task, Either)

TaskEither.of(2)
    .map((two) => two * 10)
    .map((twenty) => twenty + 1)
    .extract()
    .fork(console.error, (either) => either.fold(console.log, console.error))
