const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3001;

const isProduction = process.env.NODE_ENV === 'production';

const Logger = require('./server/boilerplate/logger');

const router = require('./server/router.js');

app.use(router);

const frontEndPath = path.resolve(__dirname, `./${isProduction ? 'build' : 'dev'}`);
app.use(express.static(frontEndPath));

app.listen(port, () => {
  Logger.log(`Currently listening on port ${port}...`);
});
