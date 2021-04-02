const ws = require('../webSocket');

const Logger = require('../Helpers/logger');

const getParty = require('./getParty');
const getInventory = require('./getInventory');
const updateInventory = require('./updateInventory');

const isInGame = require('../currentUserSession/isInGame');
const isGm = require('../currentUserSession/isGm');

const setUpEndpoints = (router) => {
  const PATH_PARTY = 'party';
  const PATH_INVENTORY = 'inventory';

  router.get(`/${PATH_PARTY}`, isInGame, async (req, res) => {
    try {
      const party = await getParty(req.session);
      res.status(200).json({ party });
    } catch (err) {
      Logger.error(err);
      res.status(500).json({
        message: 'Error!'
      });
    }
  });

  router.get(`/${PATH_INVENTORY}`, isInGame, async (req, res) => {
    try {
      const inventory = await getInventory(req.session);
      res.status(200).json({ inventory });
    } catch (err) {
      Logger.error(err);
      res.status(500).json({
        message: 'Error!'
      });
    }
  });

  router.post(`/${PATH_INVENTORY}`, isInGame, isGm, async (req, res) => {
    try {
      const { item, quantity } = req.body;
      await updateInventory(req.session, req.body);

      res.status(200).json({
        message: 'Inventory updated.'
      });

      let instruction;
      let message;

      switch (item) {
        case 'CURRENCY':
          instruction = 'update gold';
          message = quantity;
          break;
        case 'TEMPORAL':
          instruction = 'update time';
          message = quantity;
          break;
        default:
          instruction = 'update inventory';
      }

      ws.sendMessageToGame(req.session.game.id, { instruction, message });
    } catch (err) {
      Logger.error(err);
      res.status(500).json({
        message: 'Error'
      });
    }
  });
};

module.exports = setUpEndpoints;
