const mongoose = require('mongoose');
const validator = require('validator');

const articleSchema = new mongoose.Schema(
  {
    keyword: {
      type: String,
      required: [true, 'The "name" field must be filled in'],
    },
    title: {
      type: String,
      required: [true, 'The "name" field must be filled in'],
    },
    text: {
      type: String,
      required: [true, 'The "name" field must be filled in'],
    },
    date: {
      type: String,
      required: [true, 'The "name" field must be filled in'],
    },
    source: {
      type: String,
      required: [true, 'The "name" field must be filled in'],
    },
    link: {
      type: String,
      required: [true, 'The "link" field must be filled in'],
      validate: {
        validator: (value) => validator.isURL(value),
        message: 'The "Link" field must be a valid URL',
      },
    },
    image: {
      type: String,
      required: [true, 'The "image" field must be filled in'],
      validate: {
        validator: (value) => validator.isURL(value),
        message: 'The "Image" field must be a valid URL',
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: [true, 'The "Owner" field must be filled in.'],
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('article', articleSchema);
