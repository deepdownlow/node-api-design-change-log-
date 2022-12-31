import app from './server'
import * as dotenv from "dotenv";
import config from './config';
import * as Express from 'express'

declare global {
    namespace Express {
      interface Request {
        user?: any
      }
    }
  }

dotenv.config()

app.listen(config.port, () => {
    console.log(`app is listening. app is listening on port ${config.port}`)
})