const isInGame = (req, res, next) => {
  if (!(req.session
    && req.session.game
    && req.session.game.id)) {
    res.status(401).json({
      message: 'You must join a game.'
    });
    return;
  }

  next();
};

module.exports = isInGame;
