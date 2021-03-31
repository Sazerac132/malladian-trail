const path = require('path');
const http = require('http');

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

const WebSocket = require('ws');

const app = express();
const port = process.env.PORT || 3001;

const server = http.createServer(app);

global.isProduction = process.env.NODE_ENV === 'production';

if (!isProduction) {
  // eslint-disable-next-line global-require, import/no-extraneous-dependencies
  require('dotenv').config();
}

const database = require('./server/database');
const Logger = require('./server/Helpers/logger');

app.use(cookieParser());
app.use(bodyParser.json());

const sessionParser = session({
  secret: process.env.SECRET || 'secret',
  resave: false,
  saveUninitialized: true,
  cookie: isProduction
    ? { secure: true }
    : {},
  store: new MySQLStore(database.config)
});

app.use(sessionParser);

const socket = new WebSocket.Server({
  verifyClient: (info, done) => {
    sessionParser(info.req, {}, () => {
      done(info.req.session);
    });
  },
  server,
  clientTracking: true
});

socket.on('connection', (ws, req) => {
  const { game } = req.session;
  ws.gameId = game.id; // eslint-disable-line no-param-reassign
  ws.on('message', (sentMessage) => {
    socket.clients
      .forEach((client) => {
        if (client.readyState !== WebSocket.OPEN) return;
        if (client.gameId !== game.id) return;

        const { message } = JSON.parse(sentMessage);
        let response;
        switch (message) {
          case 'CHARACTER_CREATED':
            response = { instruction: 'update party' };
            break;
          default: break;
        }

        client.send(JSON.stringify(response));
      });
  });
});

const router = require('./server/router.js');

app.use('/api', router);

const frontEndPath = path.resolve(__dirname, `./${isProduction ? 'build' : 'dev'}`);
app.use(express.static(frontEndPath));

server.listen(port, () => {
  Logger.log(`Currently listening on port ${port}...`);
});
