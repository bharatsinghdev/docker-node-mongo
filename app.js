import express from 'express';
import { createClient } from 'redis';

const app = express()

const client = createClient({
  // username: 'default', // use your Redis user. More info https://redis.io/docs/management/security/acl/
  // password: 'secret', // use your password here
  socket: {
    host: 'redis',
    port: 6379,
    // tls: true,
    // key: readFileSync('./redis_user_private.key'),
    // cert: readFileSync('./redis_user.crt'),
    // ca: [readFileSync('./redis_ca.pem')]
  }
});

client.on('error', err => console.log('Redis Client Error', err));

await client.connect();

await client.set('num', 0);

app.use(express.json())

app.get("/", async (req, res) => {
  try {
    client.incr("num")
    const value = await client.get('num');
    console.log(value)
    res.status(200).send(value);
  } catch (err) {
    console.log(err)
    res.status(500).send("Error: " + err.message)
  }
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
