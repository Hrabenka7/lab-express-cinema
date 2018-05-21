/* define constants */;
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

/* define routes */
const indexRouter = require('./routes/index'); // saves module.exports = router HERE
const moviesRouter = require('./routes/movies');
const authRouter = require('./routes/auth');

/* connect to db */
mongoose.connect('mongodb://localhost/ironhack-cinema');

/* run the app */
const app = express();

/* view engine setup */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

/* midlewares */
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // equivalent of bodyParser
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter); // the app.use function call on route '/' attaches the indexRouter with this route.
app.use('/movies', moviesRouter);
app.use('/auth', authRouter);

// -- 404 and error handler
// NOTE: requires a views/not-found.ejs template

app.use((req, res, next) => {
  res.status(404);
  res.render('not-found');
});

// NOTE: requires a views/error.ejs template
app.use((err, req, res, next) => {
  // always log the error
  console.error('ERROR', req.method, req.path, err);

  // only render if the error ocurred before sending the response
  if (!res.headersSent) {
    res.status(500);
    res.render('error');
  }
});

/* // catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
}); */

module.exports = app;
