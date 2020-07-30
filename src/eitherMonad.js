import fs from 'fs'

const Right = x => 
({
    chain: f => f(x),
    map: f => Right(f(x)),
    fold: (f, g) => g(x),
    inspect: `Right(${x})`,
})

const Left = x => 
({
    chain: f => Left(x),
    map: f => Left(x),
    fold: (f, g) => f(x),
    inspect: `Left(${x})`,
})

const fromNullable = x => 
    x != null ? Right(x) : Left()


const tryCatch = f => {
    try {
        return Right(f())
    } catch (e) {
        return Left(e)
    }
}
const logIt = x => {
    console.log(x)
    return x
   }
   
const DB_REGEX = /postgres:\/\/([^:]+):([^@]+)@.*?\/(.+)$/i
//====================================================================>>>>>>>>>>>>>>

const findColor = name => 
    fromNullable({red: '#ff4444', blue: '#3b5998', yellow: '#fff68f'}[name])

const res = findColor('red')
    .map(x => x.toUpperCase())
    .fold(
        () => 'no color!',
        color => color
    )

console.log(res)


//====================================================================>>>>>>>>>>>>>>
//refactor
const getPort = () => {
    try {
        const str = fs.readFileSync('config.json')
        const config = JSON.parse(str)
        return config.port
    } catch (e) {
        return 3000
    }
}
const result = getPort()
console.log(result)

//to this
const readFile = path => tryCatch(() => fs.readFileSync(path))
const parseJSON = contents => tryCatch(() => JSON.parse(contents))

const refactored = () => 
    readFile('config.json')
    .chain(x => parseJSON(x))
    .map(x => x.port)
    .fold(() => 8080, x => x)


const result2 = refactored()
console.log(result2)

//====================================================================>>>>>>>>>>>>>>
//refactor streetName to use Either instead of id´s
const joona = {
    address: {
        street: 'loremStreet1337'
    }
}

const streetName = user => {
    const address = user.address

    if (address) {
        return address.street
    } else {
        return 'no street'
    }
}
const street = streetName(joona)
console.log(street)


const better = user => 
    fromNullable(user.address)
    .map(x => x.street)
    .fold(() => 'no street', x => x)

const street2 = better(joona)
console.log(street2) 

//====================================================================>>>>>>>>>>>>>>
//refactor parseDbUrl to return an either instead of try/catch
const config = '{"url": "postgres://sally:muppets@localhost:5432/mydb"}'


const parseDbUrl = cfg => {
    try {
        const c = JSON.parse(cfg)
        return c.url.match(DB_REGEX)
    } catch (e) {
        return null
    }
}
//refactor
const parseDbUrl_ = cfg => 
    tryCatch(() => JSON.parse(cfg))
    .map(x => c.url.match(DB_REGEX))
    .fold(x => null, x => x)


console.log(parseDbUrl(config))


//====================================================================>>>>>>>>>>>>>>
//refactor startApp

const startApp_ = cfg => {
    const parsed = parseDbUrl(cfg)

    if (parsed) {
        const [_, user, password, db] = parsed
        return `starting ${db}, ${user}, ${password}`
    } else {
        return 'cant get config'
    }
}

//refactor
const startApp = cfg => 
    fromNullable(parseDbUrl(cfg))
    .map(([_, user, password, db]) => `starting ${db}, ${user}, ${password}`)
    .fold(() => 'cant get config', x => x)

console.log(startApp(config))