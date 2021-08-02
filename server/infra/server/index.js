import express from 'express'
import cors from 'cors'
import { errorMiddleware } from './error.js'

const app = express()
const PORT = process.env.PORT ?? 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.status(200).json({
    msg: 'hello'
  })
})

export default app

export function start (app) {
  // Register error middleware last.
  app.use(errorMiddleware)
  app.listen(PORT, () => {
    console.log(`listening to port *:${PORT}. press ctrl + c to cancel.`)
  })
}
