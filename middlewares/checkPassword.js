const BadRequest = require('../errors/badRequest');
const errors = require('../utils/const');

const checkPassword = (req, res, next) => {
  const { password } = req.body;
  if (!password || !password.trim() || password.trim().length < 8) {
    throw new BadRequest(errors.inputPassword);
  } else {
    next();
  }
};

module.exports = checkPassword;
