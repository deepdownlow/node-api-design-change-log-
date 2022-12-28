import app from './server'
import * as dotenv from "dotenv";

dotenv.config()

app.listen(3000, () => {
    console.log('app is listening')
})