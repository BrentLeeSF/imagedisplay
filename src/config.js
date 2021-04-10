'use strict';
const server = require('./app');
require('dotenv').config();

module.exports = {
  APIKEY: process.env.APIKEY
};