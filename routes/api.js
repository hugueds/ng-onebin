const router = require('express').Router();

router.get('/', (req, res, next) => res.send('Welcome to API Page').status(200));



module.exports = router;