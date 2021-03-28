const throttle = require('express-throttle');

const db = require('../database');

const setUpEndpoints = (router) => {
  router.post('/create', throttle({
    burst: 1,
    period: '5min'
  }), async (req, res) => {
    const sql = 'SELECT create_game() AS \'code\'';

    const { results } = await db.query(sql);
    const { code } = results[0];

    req.session.gameId = code;

    res.status(201).json({ code });
  });

  router.post('/join', throttle({
    burst: 3,
    period: '1min'
  }), async (req, res) => {
    const { code } = req.body;
    const sql = 'SELECT game_code FROM tgame WHERE game_code = :code';
    const params = { code };

    const { results } = await db.query(sql, params);

    if (results.length) {
      req.session.gameId = code;
      res.status(200).json({ message: `Joined game: ${code}` });
    } else {
      res.status(404)
        .json({
          message: `Could not find game with code: ${code}`
        });
    }
  });
};

module.exports = setUpEndpoints;
