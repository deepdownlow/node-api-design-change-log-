import merge from 'lodash.merge'

process.env.NODE_ENV = process.env.NODE_ENV || 'development'
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