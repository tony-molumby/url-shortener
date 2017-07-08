'use strict';
var express = require('express');
var app = express();
const mongoose = require('mongoose');

var dburl = 'mongodb://infiniteset:db123@ds151242.mlab.com:51242/fcc';

//connect to mongodb
mongoose.connect(dburl);
mongoose.Promise = require('bluebird');

app.use(require('./routes'));

app.listen(process.env.PORT, function () {
  console.log('Node.js listening ...');
});