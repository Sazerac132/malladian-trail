const db = require('../database');

const getLog = async (gameCode) => {
  const sql = 'SELECT * FROM vo_log WHERE game_code = :gameCode';
  const params = { gameCode };

  const { results } = await db.query(sql, params);
  const resultsSanitised = results
    .map((r) => {
      const {
        id,
        char_name: char,
        char_id: charId,
        char_action: action
      } = r;

      return { id, char, charId, action };
    });

  return {
    log: resultsSanitised
  };
};

module.exports = getLog;
