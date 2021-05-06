const db = require('../database');

const removeLogItem = async (gameCode, id) => {
  const subQuery = '(SELECT ga.id FROM tgame ga WHERE game_code = :gameCode)';
  const sql = `DELETE FROM tlog lo WHERE lo.id = :id AND lo.game_id = ${subQuery}`;

  const params = { gameCode, id };

  return db.query(sql, params);
};

module.exports = removeLogItem;
