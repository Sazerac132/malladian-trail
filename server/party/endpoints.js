const db = require('../database');
const Logger = require('../Helpers/logger');

const getParty = require('./getParty');
const getInventory = require('./getInventory');

const isInGame = require('../currentUserSession/isInGame');
const isGm = require('../currentUserSession/isGm');

const setUpEndpoints = (router) => {
  const PATH = 'party';

  router.get(`/${PATH}`, isInGame, async (req, res) => {
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

  router.get(`/${PATH}`, isInGame, async (req, res) => {
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
};

module.exports = setUpEndpoints;
