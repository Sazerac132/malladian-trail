const throttle = require('express-throttle');

const db = require('../database');
const Logger = require('../Helpers/logger');

const setUpEndpoints = (router) => {
  router.post('/create', throttle({
    burst: 1000,
    period: '5min'
  }), async (req, res) => {
    const {
      name,
      passCode = null
    } = req.body;

    const sql = `SELECT create_game(
      :name,
      :passCode
    ) AS 'code'`;

    const params = {
      name,
      passCode
    };

    const { results } = await db.query(sql, params);
    const { code } = results[0];

    req.session.game = {
      gameId: parseInt(code, 10),
      isGm: true
    };

    res.status(201).json({ code });
  });

  router.post('/join', throttle({
    burst: 3,
    period: '1min'
  }), async (req, res) => {
    const { code, codeword = null } = req.body;
    const sql = 'SELECT game_code, game_name FROM tgame '
      + 'WHERE game_code = :code '
      + 'AND (codeword = :codeword OR codeword IS NULL)';

    const params = { code, codeword };

    try {
      const { results } = await db.query(sql, params);

      if (results.length) {
        req.session.game = {
          id: parseInt(code, 10),
          name: results[0].game_name,
          isGm: false
        };

        res.status(200)
          .json({
            code,
            message: `Joined game: ${code}`
          });
        return;
      }

      res.status(404)
        .json({
          message: `Could not find game with code: ${code}`
        });
    } catch (err) {
      Logger.error(err);
      res.status(400).json({
        message: 'Error!'
      });
    }
  });

  router.get('/current', (req, res) => {
    res.send({
      ...(req.session.game || {})
    });
  });
};

module.exports = setUpEndpoints;
