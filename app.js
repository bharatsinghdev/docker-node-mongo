let express = require('express')
const redis = require('redis');
let app = express();

app.use(express.json())

app.get("/", (req, res) => {
  console.log("Listening Get")
  client.get('data', (err, data) => {
    if (err) throw err;

    if (data) {
      // If cached data exists, return it
      res.send(`Data from cache: ${data}`);
    } else {
      // If data is not in the cache, simulate fetching from a database
      const newData = 'This is the data from the database';

      // Set the data in the cache with an expiration time (e.g., 1 minute)
      client.setex('data', 60, newData);

      // Return the data
      res.send(`Fetched from the database: ${newData}`);
    }
  });
})
console.log("ye lookkk")
app.listen(5000, () => {
  console.log("Listening Port")
})







// var createError = require('http-errors');
// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

// var app = express();

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
// console.log("Hello")
// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'production' ? err : {};
//   // render the error page
//   console.log("Change")
//   res.status(err.status || 500);
//   res.render('error');
// });

// module.exports = app;
