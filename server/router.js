const express = require('express');

const router = express.Router();

require('./games/endpoints')(router);
require('./characters/endpoints')(router);
require('./party/endpoints')(router);
require('./log/endpoints')(router);

module.exports = router;
