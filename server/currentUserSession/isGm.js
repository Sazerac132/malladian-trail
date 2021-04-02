const isGm = (req, res, next) => {
  if (!(req.session
    && req.session.game
    && req.session.game.isGm)) {
    res.status(401).json({
      message: 'You are not the GM.'
    });
    return;
  }

  next();
};

module.exports = isGm;
