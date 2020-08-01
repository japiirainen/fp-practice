const { Task } = require('../../lib/types')
const { save, all } = require('../../lib/db')

const AuthorTable = 'Authors'
const Author = (name) => ({ name })

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
})

const getInput = (q) =>
    Task((rej, res) => readline.question((q, i) => res(i.trim())))

const menu = () =>
    getInput('Where do you want to go? (createAuthor, write, latest, all)').map(
        (route) => router[route]
    )

const createAuthor = () =>
    getInput('Name? ')
        .map((name) => Author(name))
        .chain((author) => save(AuthorTable, author))
        .map(() => menu)

const start = () =>
    all(AuthorTable).map((authors) => (authors.length ? menu : createAuthor))

const router = { menu, createAuthor }

const runApp = (f) => f().fork(console.error, runApp)

runApp(start)
