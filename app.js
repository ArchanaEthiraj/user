const mongoose = require('mongoose')
const express = require('express')
const app = express()
const dotEnv = require('dotenv')

app.use(express.json())
dotEnv.config()

app.get('/', (req, res) => {
  res.send('Hello World')
})
const routes = require('./routes/routes')

app.use('/v1', routes)

const main = async () => {
  await mongoose.connect(process.env.URL_LOCAL)
}

main().then(console.log('DataBase Connected Successfully!')).catch(console.error)

app.listen(process.env.PORT, () => {
  console.log(`App is Listening in port ${process.env.PORT}`)
})
