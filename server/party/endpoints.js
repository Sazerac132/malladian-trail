const db = require('../database');

const isInGame = require('../currentUserSession/isInGame');

const setUpEndpoints = (router) => {
  const PATH = 'party';

  router.get(`/${PATH}`, isInGame, async (req, res) => {
    const sql = 'SELECT * FROM vo_party WHERE game_code = :gameCode';
    const params = {
      gameCode: req.session.game.id
    };

    try {
      const { results } = await db.query(sql, params);
      res.status(200).json({
        party: results.map(({
          char_id: id,
          char_name: name,
          char_desc: desc,
          pet,
          pet_name: petName
        }) => ({
          id, name, desc, pet, petName
        }))
      });
    } catch (err) {
      res.status(500).json({
        message: 'Error!'
      });
    }
  });
};

module.exports = setUpEndpoints;
