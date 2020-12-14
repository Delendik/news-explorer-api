const express = require('express');

const helmet = require('helmet');

require('dotenv').config();

const { errors } = require('celebrate');

const app = express();
const mongoose = require('mongoose');

const cors = require('cors');

const { limiter } = require('./middlewares/rateLimiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const config = require('./utils/config');

const checkError = require('./middlewares/checkError');

const { PORT = 3000, MONGO_URL = config.devUrl } = process.env;

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
  checkError(err, req, res, next);
});

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
