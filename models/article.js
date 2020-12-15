const isURL = require('validator/lib/isURL');

const { Schema, model } = require('mongoose');

const articleSchema = new Schema({
  keyword: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: isURL,
  },
  image: {
    type: String,
    required: true,
    validate: isURL,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    select: false,
  },
});

module.exports = model('article', articleSchema);
