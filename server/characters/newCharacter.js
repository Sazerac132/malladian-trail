const db = require('../database');
const Validate = require('../Helpers/validator');

const newCharacter = async (gameCode, payload) => {
  const {
    name = '',
    desc = '',
    pet = -1,
    petName = '',
    traits = '',
    other = '',
    index = 0,
    icon = null
  } = payload;

  const invalid = Validate.Character(payload);

  if (invalid.length) {
    return {
      status: 400,
      message: 'Some of the provided fields were invalid.',
      invalid
    };
  }

  const subQuery = '(SELECT id FROM tgame WHERE game_code = :gameCode)';
  const sql =
    'INSERT INTO tcharacter ' +
    '(game_id, icon, char_name, char_desc, pet, pet_name, traits, other, active)' +
    `VALUES (${subQuery}, :icon, :name, :desc, :pet, :petName, :traits, :other, TRUE)`;
  const params = { gameCode, icon, name, desc, pet, petName, traits, other };

  const { results } = await db.query(sql, params);

  return {
    status: 200,
    index,
    character: {
      ...params,
      id: results.insertId
    }
  };
};

module.exports = newCharacter;
