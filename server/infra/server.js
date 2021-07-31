import express from 'express'

const app = express()
const PORT = process.env.PORT ?? 3000

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
  app.listen(PORT, () => {
    console.log(`listening to port *:${PORT}. press ctrl + c to cancel.`)
  })
}
