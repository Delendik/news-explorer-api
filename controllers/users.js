require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/notFoundError');
const ConflictError = require('../errors/conflictError');
const InvalidData = require('../errors/invalidData');
const errors = require('../utils/const');

const readUser = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const user = await User.findById({ _id });
    if (!user) {
      throw new NotFoundError(errors.noUser);
    }
    res.status(200).send(user);
  } catch (err) {
    console.log('err = ', err.message);
    next(err);
  }
};

const createUser = async (req, res, next) => {
  try {
    const {
      name, email,
    } = req.body;
    const existUser = await User.findOne({ email });
    if (existUser) {
      throw new ConflictError(errors.noEmail);
    } else {
      const password = await bcrypt.hash(req.body.password, 10);
      const { _id } = await User.create({
        name, email, password,
      });
      res.send({
        name, email, _id,
      });
    }
  } catch (err) {
    console.log('err = ', err.message);
    next(err);
  }
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new InvalidData(errors.invalidLoginData);
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new InvalidData(errors.invalidLoginData);
          }

          return user;
        });
    })
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  readUser,
  createUser,
  login,
};
