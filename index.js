const next = require('next')
const express = require('express')
const app = express()
const { ApolloServer } = require('apollo-server-express')
const session = require('express-session')
const typeDefs = require('./gql/schema');
const resolvers = require('./gql/resolvers')
const applyLoaders = require('./gql/batch')
const { resetDB, resetTables } = require('./tests/seed')


const dev = process.env.NODE_ENV !== 'production'
let port = process.env.PORT || 3000


const nextApp = next({ dev, dir: __dirname })



const apollo = new ApolloServer({ typeDefs, resolvers, context: ctx => applyLoaders(ctx), uploads: process.env.NODE_ENV !== 'test' })



if (process.env.NODE_ENV === 'test') {
    port++
} else {
    resetDB(
        () => resetTables(
            initializeServer(app, !dev, process.env.NODE_ENV !== 'test')
        )
    )

}
const initializeServer = (app, productionEnv = false, nextAutoRouting = true) => {
    return (done = null) => {
        nextApp.prepare()
            .then(() => {
                app.use(session({
                    name: 'glob-session',
                    secret: process.env.SESSION_SECRET,
                    resave: false,
                    saveUninitialized: true,
                    cookie: {
                        secure: productionEnv,
                        maxAge: productionEnv ? 1000 * 60 * 60 * 24 * 30 : 60000
                    }
                }))
                if (productionEnv) { app.set('trust proxy', 1) }
                apollo.applyMiddleware({ app })
                app.get('/', (req, res) => {
                    res.send('OK')
                })
                if (nextAutoRouting) {
                    app.get('*', (req, res) => nextApp.getRequestHandler()(req, res))
                }

                app.listen(port, () => {
                    console.log(`Listening on port ${port}`, apollo.graphqlPath)
                    if (done) {
                        done()
                    }
                })

            })
            .catch(console.error)
    }

}

module.exports = { nextApp, port, initializeServer, app }

