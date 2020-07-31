const { List } = require('immutable-ext')

const toUpper = (x) => x.toUpperCase()
const exClaim = (x) => x.concat('!')

const Endo = (run) => ({
    run,
    concat: (other) => Endo((x) => run(other.run(x))),
})
Endo.empty = () => Endo((x) => x)

const res = List([toUpper, exClaim]).foldMap(Endo, Endo.empty()).run('hello')

console.log(res) //HELLO!

//====================================================================>>>>>>>>>>>>>>
//reducer stuff

const Reducer = (run) => ({
    run,
    contramap: (f) => Reducer((acc, x) => run(acc, f(x))),
    concat: (other) => Reducer((acc, x) => other.run(run(acc, x), x)),
})

const checkCreds = (email, password) => email === 'admin' && password === 123

const login = (state, payload) =>
    payload.email
        ? Object.assign({}, state, {
              loggedIn: checkCreds(payload.email, payload.password),
          })
        : state

const setPrefs = (state, payload) =>
    payload.prefs ? Object.assign({}, state, { prefs: payload.prefs }) : state

const reducer = Reducer(login).concat(Reducer(setPrefs))

const state = { loggedIn: false, prefs: {} }
const payload = { email: 'admin', password: 123, prefs: { bgColor: '#000' } }
console.log(reducer.run(state, payload))
