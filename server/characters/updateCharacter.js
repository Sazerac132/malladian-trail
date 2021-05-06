const db = require('../database');
const Validate = require('../Helpers/validator');

const updateCharacter = async (gameCode, payload, id) => {
  const {
    name = '',
    desc = '',
    pet = -1,
    petName = '',
    traits = '',
    other = '',
    index = 0
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
  const sql = 'UPDATE tcharacter SET '
    + 'char_name = :name, '
    + 'char_desc = :desc, '
    + 'pet = :pet, '
    + 'pet_name = :petName, '
    + 'traits = :traits, '
    + 'other = :other, '
    + 'active = TRUE '
    + 'WHERE id = :id '
    + `AND game_id = (${subQuery})`;

  const params = { gameCode, id, name, desc, pet, petName, traits, other };

  await db.query(sql, params);

  return {
    status: 200,
    index,
    character: {
      ...params,
      id
    }
  };
};

module.exports = updateCharacter;
