const throttle = require('express-throttle');

const db = require('../database');
const Logger = require('../Helpers/logger');
const setCharActive = require('../characters/setCharActive');

const setUpEndpoints = (router) => {
  router.post(
    '/create',
    throttle({
      burst: 1000,
      period: '5min'
    }),
    async (req, res) => {
      const { name, codeword = null } = req.body;

      const sql = `SELECT create_game(
      :name,
      :codeword
    ) AS 'code'`;

      const params = {
        name,
        codeword
      };

      try {
        const { results } = await db.query(sql, params);
        const { code } = results[0];

        req.session.game = {
          id: parseInt(code, 10),
          name,
          isGm: true
        };

        res.status(201).json({ code });
      } catch (err) {
        Logger.error(err);
        res.status(500).json({
          message: 'Error!'
        });
      }
    }
  );

  router.post(
    '/join',
    throttle({
      burst: 3,
      period: '1min'
    }),
    async (req, res) => {
      const { code, codeword = null } = req.body;
      const sql =
        'SELECT game_code, game_name FROM tgame ' +
        'WHERE game_code = :code ' +
        'AND (codeword = :codeword OR codeword IS NULL)';

      const params = { code, codeword };

      try {
        const { results } = await db.query(sql, params);
        const gameCodeInt = parseInt(code, 10);

        if (results.length) {
          req.session.game = {
            id: gameCodeInt,
            name: results[0].game_name,
            isGm: false
          };

          res.status(200).json({
            code: gameCodeInt,
            message: `Joined game: ${code}`
          });
          return;
        }

        res.status(404).json({
          message: `Could not find game with code: ${code}`
        });
      } catch (err) {
        Logger.error(err);
        res.status(500).json({
          message: 'Error!'
        });
      }
    }
  );

  router.get('/current', (req, res) => {
    res.send({
      game: req.session.game || {},
      characters: req.session.characters || []
    });
  });

  router.post('/leave', async (req, res) => {
    try {
      const charIdsToDeactivate = req.session.characters.map(({ id }) => id);
      const { status } = await setCharActive(
        req.session.game.id,
        false,
        charIdsToDeactivate
      );

      req.session.game = {};
      req.session.characters = [];

      res.status(status).send({
        message: 'Successfully left game.'
      });
    } catch (err) {
      req.session.game = {};
      req.session.characters = [];
      res.status(500).send({
        message: 'Error occurred while trying to leave game!'
      });
    }
  });

  router.get('/becomeGm', (req, res) => {
    // testing only
    req.session.game.isGm = true;

    res.send({
      message: 'You are now the GM.'
    });
  });
};

module.exports = setUpEndpoints;
