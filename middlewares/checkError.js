const errors = require('../utils/const');

const checkError = (err, req, res, next) => {
  if (err.name === 'CastError' || err.name === 'ValidationError') {
    res.status(400).send({ message: errors.invalidData });
  } else if (err.statusCode) {
    res.status(err.statusCode).send({ message: err.message });
  } else {
    res.status(500).send({ message: errors.serverError });
  }
  next();
};

module.exports = checkError;
