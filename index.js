const path = require('path');

const express = require('express');
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

const database = require('./server/boilerplate/database');
const Logger = require('./server/boilerplate/logger');

app.use(cookieParser());

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

app.use(router);

const frontEndPath = path.resolve(__dirname, `./${isProduction ? 'build' : 'dev'}`);
app.use(express.static(frontEndPath));

app.listen(port, () => {
  Logger.log(`Currently listening on port ${port}...`);
});
