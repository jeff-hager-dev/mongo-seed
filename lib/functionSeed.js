"use strict";

var fs = require('fs'),
  baseSeed = require('./baseSeed');

module.exports = function (host, port, db, seedLocation, callback) {
  var seedFunc = null;

  try {
    seedFunc = require(seedLocation);
  }
  catch (error) {
    return callback(error);
  }
  if (!seedFunc) return callback(new Error("No seed function found"));

  baseSeed(host, port, db, seedFunc(), callback);
};