const ws = require('../webSocket');

const Logger = require('../Helpers/logger');

const isInGame = require('../currentUserSession/isInGame');
const isGm = require('../currentUserSession/isGm');

const getLog = require('./getLog');
const addLogItem = require('./addLogItem');
const removeLogItem = require('./removeLogItem');

const setUpEndpoints = (router) => {
  const PATH = 'log';

  router.get(`/${PATH}`, isInGame, async (req, res) => {
    try {
      const gameId = req.session.game.id;
      const { log } = await getLog(gameId);

      res.status(200).json({ log });
    } catch (err) {
      Logger.error(err);
      res.status(500).json({
        message: 'Error!'
      });
    }
  });

  router.post(`/${PATH}`, isInGame, async (req, res) => {
    try {
      const { charId, action } = req.body;

      const gameCode = req.session.game.id;
      const source = req.session.game.isGm ? null : charId;

      const newEventId = await addLogItem(gameCode, { action, source });

      res.status(201).json({
        id: newEventId,
        message: 'Action saved.'
      });

      ws.sendMessageToGame(gameCode, {
        instruction: 'add event',
        message: {
          id: newEventId,
          charId: source,
          action
        }
      });
    } catch (err) {
      Logger.error(err);
      res.status(500).json({
        message: 'Error!'
      });
    }
  });

  router.delete(`/${PATH}/:id`, isInGame, isGm, async (req, res) => {
    try {
      const { id } = req.params;
      const gameCode = req.session.game.id;

      await removeLogItem(gameCode, id);

      res.status(200).json({
        message: 'Item deleted.'
      });

      ws.sendMessageToGame(gameCode, {
        instruction: 'delete event',
        message: id
      });
    } catch (err) {
      Logger.error(err);
      res.status(500).json({
        message: 'Error!'
      });
    }
  });
};

module.exports = setUpEndpoints;
