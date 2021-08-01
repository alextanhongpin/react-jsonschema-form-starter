import express from 'express'
import cors from 'cors'

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

export function decorate (fn) {
  fn(app)
}

export function start () {
  app.use(clientErrorHandler)
  app.listen(PORT, () => {
    console.log(`listening to port *:${PORT}. press ctrl + c to cancel.`)
  })
}

function clientErrorHandler (err, req, res, next) {
  if (req.xhr) {
    res.status(400).json({ error: err.message })
  } else {
    next(err)
  }
}
