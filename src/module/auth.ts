import { Request, Response, Next } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import config from '../config'

const NOT_AUTHORIZED = 'Not authorized'

export const createToken = ({ id, username }: { id: string, username: string }) => {
    const token = jwt.sign(
        { id, username},
        config.secret
    )
    return token
}

export const protect = (req: Request, res: Response, next: Next) => {
    const {
        headers: {
            authorization: token
        }
    } = req

    if(!token) {
        res.status(401).send(NOT_AUTHORIZED)
        return 
    }

    // const [, token] = brearer.split("")
    // console.log('brearer', {token, brearer})
    // if (!token) {
    //     res.status(401).send(NOT_AUTHORIZED)
    //     return 
    // }

    try {
        console.log('i am here', config.secret)
        const payload = jwt.verify(token, config.secret)
        req.user = payload
        next()
    } catch(err) {
        console.error(err)
        res.status(401).send(NOT_AUTHORIZED)
        return
    }

}

export const comparePassword = (pass: string, hash: string) => bcrypt.compare(pass, hash)

export const hashPassword = (pass: string) => bcrypt.hash(pass, 5)