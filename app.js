const express = require('express');

const helmet = require('helmet');

require('dotenv').config();

const { errors } = require('celebrate');

const app = express();
const mongoose = require('mongoose');

const cors = require('cors');

const { limiter } = require('./middlewares/rateLimiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 4000, MONGO_URL = 'mongodb://localhost:27017/newsdb' } = process.env;

const routes = require('./routes/index.js');

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(helmet.contentSecurityPolicy());

app.use(limiter);
app.use(cors());

app.use(requestLogger);

app.use(routes);

app.use(errors());

app.use(errorLogger);

app.use((err, req, res, next) => {
  console.log(err);
  if (err.name === 'CastError' || err.name === 'ValidationError') {
    res.status(400).send({ message: 'Некорректные данные' });
  } else if (err.statusCode) {
    res.status(err.statusCode).send({ message: err.message });
  } else {
    res.status(500).send({ message: 'Ошибка на сервере' });
  }
  next();
});

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
