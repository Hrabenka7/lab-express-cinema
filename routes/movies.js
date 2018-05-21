'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Movie = require('../models/movie');

// ORDER MATTERS !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! //

/*  GET movies page */
router.get('/', (req, res, next) => { // NOT '/movies' !!!!
  Movie.find({})
    .then((result) => {
      const data = {
        movies: result
      };
      res.render('movies', data); // deliver this data to movies.hbs template
    });
});

/* GET create a movie page */
router.get('/create-movie', (req, res, next) => {
  res.render('create-movie');
});

/* CREATE movie in a database */
router.post('/', (req, res, next) => { /* pick data from create-movie */
  const movie = new Movie(req.body);
  movie.save()
    .then(() => {
      res.redirect('/movies/'); /* send user to the path you specify */
    })
    .catch(next);
});

/* GET movie details */
router.get('/:movieId', (req, res, next) => {
  // validate mongo ID and send 404 if invalid
  if (!mongoose.Types.ObjectId.isValid(req.params.movieId)) {
    res.status(404);
    res.render('not-found');
    return;
  }
  // else
  Movie.findOne({ _id: req.params.movieId })
    .then((result) => {
      const data = {
        movie: result
      };
      res.render('movie-detail', data);
    })
    .catch(next);
});

/* DELETE movie from database */
router.post('/:movieId/delete', (req, res, next) => {
  Movie.remove({ _id: req.params.movieId })
    .then((result) => {
      res.redirect('/movies');
    });
});

module.exports = router;
