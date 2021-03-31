const db = require('../database');

const Logger = require('../Helpers/logger');
const Validate = require('../Helpers/validator');

const isInGame = require('../currentUserSession/isInGame');

const setUpEndpoints = (router) => {
  const PATH = 'characters';

  router.post(`/${PATH}/create`, isInGame, async (req, res) => {
    const gameCode = req.session.game.id;

    const {
      name = '',
      desc = '',
      pet = -1,
      petName = ''
    } = req.body;

    const invalid = [];

    if (!Validate.name(name)) invalid.push('name');
    if (!Validate.pet(pet)) invalid.push('pet');
    if (!Validate.name(petName)) invalid.push('petName');

    if (invalid.length) {
      res.status(400).json({
        message: 'Some of the provided fields were invalid.',
        invalid
      });
      return;
    }

    const subQuery = '(SELECT id FROM tgame WHERE game_code = :gameCode)';
    const sql = 'INSERT INTO tcharacter (game_id, char_name, char_desc, pet, pet_name)'
      + `VALUES (${subQuery}, :name, :desc, :pet, :petName)`;

    const params = {
      gameCode,
      name: name.slice(0, 20),
      desc: desc.slice(0, 1000),
      pet,
      petName: petName.slice(0, 20)
    };

    try {
      const { results } = await db.query(sql, params);

      req.session.character = {
        id: results.insertId,
        ...params
      };

      res.status(200)
        .json({
          message: 'Character created!'
        });
    } catch (err) {
      Logger.error(err);
      res.status(400).json({
        message: 'Error!'
      });
    }
  });
};

module.exports = setUpEndpoints;
