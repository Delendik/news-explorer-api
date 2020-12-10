const router = require('express').Router();
const auth = require('../middlewares/auth');
const {
  readArticles, createArticle, deleteArticle,
} = require('../controllers/article');
const { validateArticle, validateAtricleId } = require('../middlewares/validation');

router.get('/articles', auth, readArticles);

router.post('/articles', validateArticle, auth, createArticle);

router.delete('/articles/:_id', validateAtricleId, auth, deleteArticle);

module.exports = router;
