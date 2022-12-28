import express from 'express'
import router from './router'
import morgan from 'morgan'
import cors from 'cors'
import { protect } from './module/auth'
import { createNewUser, signin } from './handlers/user'

const customMiddleWare = (message) => (req, res, next) => {
    console.log(`hello from ${message}`)
    next()
}

const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(async (req, _, next) => {
    console.log('checking for secret')
    req.secret = 'here is the secret'
    next()
})
app.use(customMiddleWare('our team'))


app.use('/api', protect, router)
app.use('/user', createNewUser)
app.use('/signin', signin)

export default app