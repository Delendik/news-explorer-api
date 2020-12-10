const checkPassword = (req, res, next) => {
  const { password } = req.body;

  if (!password || !password.trim() || password.trim().length < 8) {
    res.status(400)
      .send({ message: 'заполните поле password' });
  } else {
    next();
  }
};

module.exports = checkPassword;
