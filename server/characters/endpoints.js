const ws = require('../webSocket');

const Logger = require('../Helpers/logger');

const isInGame = require('../currentUserSession/isInGame');

const newCharacter = require('./newCharacter');
const updateCharacter = require('./updateCharacter');

const setUpEndpoints = (router) => {
  const PATH = 'characters';

  router.post(`/${PATH}`, isInGame, async (req, res) => {
    const gameCode = req.session.game.id;

    try {
      const {
        status,
        index,
        character,
        ...error
      } = await newCharacter(gameCode, req.body);

      if (status >= 400) {
        res.status(status)
          .json(error);
        return;
      }

      if (!Array.isArray(req.session.character)) {
        req.session.character = [];
      }

      req.session.character[index] = character;

      res.status(status)
        .json({
          message: 'Character created!',
          id: character.id
        });

      ws.sendMessageToGame(gameCode, {
        instruction: 'update party'
      });
    } catch (err) {
      Logger.error(err);
      res.status(500).json({
        message: 'Error!'
      });
    }
  });

  router.put(`/${PATH}/:id`, isInGame, async (req, res) => {
    const gameCode = req.session.game.id;
    const id = parseInt(req.params.id, 10);

    try {
      const {
        status,
        index,
        character,
        ...error
      } = await updateCharacter(gameCode, req.body, id);

      if (status >= 400) {
        res.status(status)
          .json(error);
      }

      if (!Array.isArray(req.session.character)) {
        req.session.character = [];
      }

      req.session.character[index] = character;

      res.status(status)
        .json({
          message: 'Character updated!',
          id: character.id
        });

      ws.sendMessageToGame(gameCode, {
        instruction: 'update party'
      });
    } catch (err) {
      Logger.error(err);
      res.status(500).json({
        message: 'Error!'
      });
    }
  });
};

module.exports = setUpEndpoints;
