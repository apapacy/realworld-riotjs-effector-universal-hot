const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cookieEncrypter = require('cookie-encrypter');
const bodyParser = require('body-parser');
const webpack = require('webpack');
const webpackClientDevMiddleware = require('webpack-dev-middleware');
const webpackClientHotMiddleware = require('webpack-hot-middleware');
const webpackClientConfig = require('./config.client');
const serverConfig = require('./config.server');

const serverCompiler = webpack(serverConfig);
const clientCompiler = webpack(webpackClientConfig);
const port = Number(process.env.PORT) || 3000;
const app = express();
const nodeEnv = process.env.NODE_ENV || 'development';

const serverPath = path.resolve(__dirname, '../build/render.server.js');
let render = require(serverPath).render; // eslint-disable-line import/no-dynamic-require
app.set('env', nodeEnv);
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.use(cookieParser('change secret value'));
app.use(cookieEncrypter('change secret value.............'));
app.use(bodyParser.json());

app.use('/token', (req, res) => {
  if (req.body.token) {
    res.cookie('token', req.body.token, { signed: true, httpOnly: false, maxAge: 999999999999 });
  } else {
    res.cookie('token', '', { signed: false });
  }
  res.send('');
});

app.use('/static', express.static('build'));

app.use('/', (req, res, next) => render(req, res, next));

app.listen(port, () => {
  console.log(`Listening at ${port}`);
});
