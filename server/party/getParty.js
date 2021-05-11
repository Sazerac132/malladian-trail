const db = require('../database');

const getParty = async (session) => {
  const sql = 'SELECT * FROM vo_party WHERE game_code = :gameCode';
  const params = { gameCode: session.game.id };
  const { results } = await db.query(sql, params);

  return results.map(
    ({
      char_id: id,
      icon,
      char_name: name,
      char_desc: desc,
      pet,
      pet_name: petName,
      active
    }) => ({
      id,
      icon,
      name,
      desc,
      pet,
      petName,
      retired: active === 0
    })
  );
};

module.exports = getParty;
