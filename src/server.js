const path = require('path')
const express = require('express')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const cookieEncrypter = require('cookie-encrypter')
const bodyParser = require('body-parser')
const apicache = require('apicache')
const favicon = require('serve-favicon')

const port = Number(process.env.PORT) || 3000
const app = express()
app.use(favicon(path.resolve(__dirname, './favicon.ico')))
const nodeEnv = process.env.NODE_ENV || 'development'

const cache = apicache.options({
  appendKey: req => req.signedCookies && req.signedCookies.token,
  defaultDuration: 1000,
  headerBlacklist: ['Authorization', 'authorization']
}).middleware

const serverPath = path.resolve(__dirname, '../build/render.server.js')
let render = require(serverPath).render
app.set('env', nodeEnv)
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.use(cookieParser('change secret value'))
app.use(cookieEncrypter('change secret value.............'))
app.use(bodyParser.json())

app.use('/token', (req, res) => {
  if (req.body.token) {
    res.cookie('token', req.body.token, { signed: true, httpOnly: false, maxAge: 999999999999 })
  } else {
    res.cookie('token', '', { signed: false })
  }
  res.send('')
})

app.use('/static', express.static('build'))

app.use('/', cache(1000), render)

app.listen(port, () => {
  console.log(`Listening at ${port}`)
})
