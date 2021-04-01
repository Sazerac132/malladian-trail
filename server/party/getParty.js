const db = require('../database');

const isInGame = require('../currentUserSession/isInGame');

const getParty = async (session) => {
  const sql = 'SELECT * FROM vo_party WHERE game_code = :gameCode';
  const params = { gameCode: session.game.id };
  const { results } = await db.query(sql, params);

  return results.map(({
    char_id: id,
    char_name: name,
    char_desc: desc,
    pet,
    pet_name: petName
  }) => ({
    id, name, desc, pet, petName
  }));
};

module.exports = getParty;
