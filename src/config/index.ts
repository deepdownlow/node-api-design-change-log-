import merge from 'lodash.merge'
import * as dotenv from "dotenv";
import path from 'path'

process.env.NODE_ENV = process.env.NODE_ENV || 'development'
dotenv.config({ path: path.join(__dirname, `../../.env.${process.env.NODE_ENV}`)})


const stage = process.env.NODE_ENV
let envConfig

if (stage === 'development') {
    envConfig = require('./development').default
} else if (stage === 'production') {
    envConfig = require('./prod').default
} else {
    envConfig = require('./test').default
}

const genericConfig = {
    secret: process.env.JWT_SECRET
}

export default merge(genericConfig, envConfig)