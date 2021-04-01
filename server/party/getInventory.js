const db = require('../database');

const isInGame = require('../currentUserSession/isInGame');

const getInventory = async (session) => {
  const sql = 'SELECT * FROM vo_inventory WHERE game_code = :gameCode';
  const params = { gameCode: session.game.id };
  const { results } = await db.query(sql, params);

  return results.map(({ item, quantity }) => ({ item, quantity }));
};

module.exports = getInventory;
