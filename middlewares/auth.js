const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const InvalidData = require('../errors/invalidData');
const config = require('../utils/config');
const errors = require('../utils/const');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new InvalidData(errors.needAuth);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : config.devJwt);
  } catch (err) {
    throw new InvalidData(errors.needAuth);
  }

  req.user = payload;

  next();
};
