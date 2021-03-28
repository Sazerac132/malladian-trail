const express = require('express');

const router = express.Router();

require('./games/endpoints')(router);

module.exports = router;
