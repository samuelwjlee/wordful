const express = require('express')
const path = require('path')

const bodyParser = require('body-parser')
const compression = require('compression')
const helmet = require('helmet')
const cors = require('cors')

const wordRouter = require('controllers/routes/word-route')
const userRouter = require('controllers/routes/user-route')

const app = express()

const isProduction = process.env.NODE_ENV === 'production'
const origin = {
  origin: isProduction ? 'https://wordful.herokuapp.com/' : '*'
}
app.use(cors(origin))
// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')))

app.use(helmet())
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/words', wordRouter)
app.use('/users', userRouter)

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'))
})

/**
 * TODO:
 * 1. split client and server code
 */
app.listen(process.env.EXPRESS_SERVER_PORT, () => {
  console.log(`Server listening on port: ${process.env.EXPRESS_SERVER_PORT}`)
})

//https://daveceddia.com/deploy-react-express-app-heroku/