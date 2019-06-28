const router = require('express').Router();
const mixApi = require('../api/mixApi');
const parametersApi = require('../api/parametersApi');
const Message = require('../models/MessageSchema');

router.get('/', (req, res, next) => res.sendFile('index.html'));

module.exports = router;