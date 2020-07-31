const { TaskT, Task, Either } = require('../../lib/types')
const { Left, Right } = Either
const _ = require('lodash')

const TaskEither = TaskT(Either)

const users = [
    { id: 1, name: 'brian' },
    { id: 2, name: 'joona' },
    { id: 3, name: 'jere' },
]
const following = [
    { user_id: 1, follow_id: 3 },
    { user_id: 2, follow_id: 2 },
    { user_id: 3, follow_id: 1 },
]

const find = (table, query) =>
    TaskEither.lift(Either.fromNullable(_.find(table, query))) // Task(Either(x))

const app = () =>
    find(users, { id: 3 }) // Task(Either(x))
        .chain((u) => find(following, { follow_id: u.id })) // Task(Either(x))
        .chain((fo) => find(users, { id: fo.user_id })) // Task(Either(x))
        .fork(console.error, (eu) => eu.fold(console.error, console.log))

app()
