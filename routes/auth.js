'use strict';

const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const bcryptSalt = 10;

/* GET signup page */
router.get('/signup', (req, res, next) => {
  res.render('signup');
});

/* Save USER to db */
router.post('/signup', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const salt = bcrypt.genSaltSync(bcryptSalt);
  const hashPass = bcrypt.hashSync(password, salt);

  if (username === '' || password === '') {
    res.render('signup', {
      errorMessage: 'Password and username are required!'
    });
    return;
  }

  User.findOne({username: username})
    .then(result => {
      if (result) {
        res.render('signup', {
          errorMessage: 'Sorry, the username is already taken.'
        });
        return;
      }

      const user = new User({
        username,
        password: hashPass
      });

      user.save()
        .then(() => {
          // req.session.user = user
          res.redirect('signup');
        })
        .catch(next);
    });
});

module.exports = router;
