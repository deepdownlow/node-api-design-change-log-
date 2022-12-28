import { Request, Response, Next } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const NOT_AUTHORIZED = 'Not authorized'

export const createToken = ({ id, username }: { id: string, username: string }) => {
    const token = jwt.sign(
        { id, username},
        process.env.JWT_SECRET
    )
    return token
}

export const protect = (req: Request, res: Response, next: Next) => {
    const {
        headers: {
            authorization: brearer
        }
    } = req

    if(!brearer) {
        res.status(401).send(NOT_AUTHORIZED)
        return 
    }

    const [, token] = brearer.split(" ")
    if (!token) {
        res.status(401).send(NOT_AUTHORIZED)
        return 
    }

    try {
        const payload = jwt.verify(token)
        req.user = payload
        next()
    } catch(err) {
        console.error(err)
        res.status(401).send(NOT_AUTHORIZED)
        return
    }

}

export const comparePassword = (pass: string, hash: string) => bcrypt.compare(pass, hash)

export const hashPassword = (pass: string) => bcrypt.hash(pass, 10)