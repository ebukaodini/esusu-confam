const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const { serverError, badRequest } = require('./utils/reponse-helpers');
require('dotenv').config();

const app = express()

// connect to database
const url = process.env.NODE_ENV === 'test'
  ? process.env.MONGODB_CONNECTION_URL_TEST
  : process.env.MONGODB_CONNECTION_URL

mongoose.connect(url)
  .then(() => {
    console.log(`Connected to MongoDB : ${mongoose.connection.name}`)
  })
  .catch(err => {
    console.log(err.message)
    process.exit()
  });

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/', require('./routes/index'))
app.use('/api/v1/auth', require('./routes/auth'))
app.use('/api/v1/groups', require('./routes/groups'))
app.use('/api/v1/contributions', require('./routes/contributions'))

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  return badRequest(res, 'Not Found', undefined, 404)
});

// error handler
app.use(function (err, req, res, next) {
  console.log(err)
  return serverError(res, err.message ?? 'Server Error', undefined, err.status || 500)
});

module.exports = app;
