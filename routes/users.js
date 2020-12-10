const router = require('express').Router();
const auth = require('../middlewares/auth');
const { validateSignin, validateSignup } = require('../middlewares/validation');
const checkPassword = require('../middlewares/checkPassword');

const {
  readUser, login, createUser,
} = require('../controllers/users');

router.get('/users/me', auth, readUser);

router.post('/signin', validateSignin, login);

router.post('/signup', validateSignup, checkPassword, createUser);

module.exports = router;
