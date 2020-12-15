const router = require('express').Router();
const NotFoundError = require('../errors/notFoundError');
const errors = require('../utils/const');

router.all('*', () => {
  throw new NotFoundError(errors.noResource);
});

module.exports = router;
