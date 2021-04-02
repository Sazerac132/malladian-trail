const db = require('../database');

const getInventory = async (session) => {
  const sql = 'SELECT * FROM vo_inventory WHERE game_code = :gameCode';
  const params = { gameCode: session.game.id };
  const { results } = await db.query(sql, params);
  const resultsSanitised = results
    .map(({ item, quantity }) => ({ item, quantity }));

  const currency = resultsSanitised.find(({ item }) => item === 'CURRENCY');
  const currencyAmt = (currency) ? currency.quantity : 0;

  const time = resultsSanitised.find(({ item }) => item === 'TEMPORAL');
  const timeAmt = (time) ? time.quantity : 0;

  return {
    currency: currencyAmt,
    time: timeAmt,
    items: resultsSanitised
      .filter(({ item }) => !['CURRENCY', 'TEMPORAL'].includes(item))
  };
};

module.exports = getInventory;
