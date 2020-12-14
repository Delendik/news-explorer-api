const Article = require('../models/article');

const NotFoundError = require('../errors/notFoundError');
const Forbidden = require('../errors/forbidden');
const errors = require('../utils/const');

module.exports.readArticles = async (req, res, next) => {
  try {
    const owner = req.user._id;
    const article = await Article.find({ owner });
    res.send(article);
  } catch (err) {
    console.log('err = ', err.message);
    next(err);
  }
};

module.exports.createArticle = async (req, res, next) => {
  try {
    const {
      keyword, title, text, date, source, link, image,
    } = req.body;
    const { _id } = await Article.create({
      keyword, title, text, date, source, link, image, owner: req.user._id,
    });
    res.send({
      keyword, title, text, date, source, link, image, _id,
    });
  } catch (err) {
    console.log('err = ', err.message);
    next(err);
  }
};

module.exports.deleteArticle = async (req, res, next) => {
  try {
    const { _id } = req.params;
    const articleForDelete = await Article.findById({ _id }).select('+owner');
    if (articleForDelete === null) {
      throw new NotFoundError(errors.noCard);
    } else if (req.user._id !== articleForDelete.owner.toString()) {
      throw new Forbidden(errors.otherUser);
    }
    const article = await Article.findOneAndRemove({ _id });
    res.status(200).send(article);
  } catch (err) {
    console.log('err = ', err.message);
    next(err);
  }
};
