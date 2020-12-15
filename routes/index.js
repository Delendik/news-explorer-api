const router = require('express').Router();

const userRoutes = require('./users.js');
const articleRoute = require('./article.js');
const errorRoute = require('./error.js');

router.use('/', userRoutes);
router.use('/', articleRoute);
router.use('/', errorRoute);

module.exports = router;
