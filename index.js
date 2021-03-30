const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

const app = express();
const port = process.env.PORT || 3001;

global.isProduction = process.env.NODE_ENV === 'production';

if (!isProduction) {
  // eslint-disable-next-line global-require, import/no-extraneous-dependencies
  require('dotenv').config();
}

const database = require('./server/database');
const Logger = require('./server/Helpers/logger');

app.use(cookieParser());
app.use(bodyParser.json());

const sessionSettings = {
  secret: process.env.SECRET || 'secret',
  resave: false,
  saveUninitialized: true,
  cookie: isProduction
    ? { secure: true }
    : {},
  store: new MySQLStore(database.config)
};

app.use(session(sessionSettings));

const router = require('./server/router.js');

app.use('/api', router);

const frontEndPath = path.resolve(__dirname, `./${isProduction ? 'build' : 'dev'}`);
app.use(express.static(frontEndPath));

app.listen(port, () => {
  Logger.log(`Currently listening on port ${port}...`);
});
