const mongoose = require('mongoose')
const express = require('express')
const app = express()
const dotEnv = require('dotenv')

app.use(express.json())
dotEnv.config()

app.get('/', (req, res) => {
  res.send('Hello World')
})
const userRoutes = require('./routes/userRoutes')
const shopRoutes = require('./routes/shopRoutes')

app.use('/v1/users', userRoutes)
app.use('/v1/shop', shopRoutes)

const main = async () => {
  await mongoose.connect(process.env.URL_LOCAL)
}

main().then(console.log('DataBase Connected Successfully!')).catch(console.error)

app.listen(process.env.PORT, () => {
  console.log(`App is Listening in port ${process.env.PORT}`)
})
