const db = require('../database');

const setCharActive = async (gameCode, active, ids) => {
  const idsArray = Array.isArray(ids) ? ids : [ids];
  const charIds = `(${idsArray.join(', ')})`;
  const subQuery = '(SELECT id FROM tgame WHERE game_code = :gameCode)';
  const sql =
    'UPDATE tcharacter SET ' +
    'active = :active ' +
    `WHERE id in ${charIds} ` +
    `AND game_id = (${subQuery})`;

  const params = { gameCode, active };

  console.log(sql, params);

  await db.query(sql, params);

  return {
    status: 200
  };
};

module.exports = setCharActive;
