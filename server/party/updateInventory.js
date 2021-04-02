const db = require('../database');

const getInventory = async (session, payload) => {
  const gameCode = session.game.id;
  const { item, quantity } = payload;

  const subQuery = '(SELECT id FROM tgame WHERE game_code = :gameCode)';

  const sql = 'INSERT INTO tinventory (game_id, item, quantity) VALUES'
    + `(${subQuery}, :item, :quantity) `
    + 'ON DUPLICATE KEY UPDATE quantity = VALUES(quantity)';

  const params = {
    gameCode,
    item,
    quantity
  };

  return db.query(sql, params);
};

module.exports = getInventory;
