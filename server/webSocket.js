const ws = require('ws');

class WebSocket {
  withServer(server) {
    this.server = server;
    return this;
  }

  withSessionParser(sessionParser) {
    this.sessionParser = sessionParser;
    return this;
  }

  sendMessageToGame(gameCode, payload) {
    this.socket.clients.forEach((client) => {
      if (client.readyState !== ws.OPEN) return;
      if (client.gameId !== gameCode) return;
      client.send(JSON.stringify(payload));
    });
  }

  initialize() {
    const socket = new ws.Server({
      verifyClient: (info, done) => {
        this.sessionParser(info.req, {}, () => {
          done(info.req.session);
        });
      },
      server: this.server,
      clientTracking: true
    });

    socket.on('connection', (wss, req) => {
      const { game } = req.session;
      wss.gameId = game.id; // eslint-disable-line no-param-reassign
    });

    this.socket = socket;
  }
}

module.exports = new WebSocket();
