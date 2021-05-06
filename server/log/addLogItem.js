const db = require('../database');

const addLogItem = async (gameCode, payload) => {
  const { source, action } = payload;

  const subQuery = '(SELECT id FROM tgame WHERE game_code = :gameCode)';
  const sql = 'INSERT INTO tlog (game_id, char_id, char_action) '
    + `VALUES (${subQuery}, :source, :action)`;

  const params = { gameCode, source, action };

  const { results } = await db.query(sql, params);

  return results.insertId;
};

module.exports = addLogItem;
