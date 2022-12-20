
import express from 'express'
import { ProductRouter, CartRouter, AuthRouter,RandomomsRouter } from './routes/index.js'
import cors from 'cors'

import { PassportAuth } from './middlewares/index.js'
import session from 'express-session'

import { config } from './config/index.js'
import passport from 'passport'

const app = express()

PassportAuth.init()

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(cors({ origin: 'http://localhost:3000' }))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('./public'))


app.use('/api/auth', AuthRouter)
app.use('/api/products', ProductRouter)
app.use('/api/cart', CartRouter)
//app.use('/api/randoms', RandomomsRouter)

const server = app.listen(config.SERVER.PORT, () => console.log(`Server inicializado en el puerto ${config.SERVER.PORT}`))
server.on('error', error => console.log(`Error del servidor: ${error}`))
