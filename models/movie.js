'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  director: String,
  stars: [String],
  image: {
    type: String,
    default: '../public/images/default-image.jpg'
  },
  description: String,
  showtimes: [String]
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
