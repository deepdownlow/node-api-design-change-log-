import app from './server'
import config from './config';

declare global {
  namespace Express {
    interface Request {
      user?: any
    }
  }
}

app.listen(config.port, () => {
    console.log(`app is listening. app is listening on port ${config.port}`)
})