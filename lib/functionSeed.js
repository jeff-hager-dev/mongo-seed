"use strict";

var fs = require('fs'),
  baseSeed = require('./baseSeed');

module.exports = function (host, port, db, seedLocation, callback) {
  try {
    var seedFunc = require(seedLocation);
    return baseSeed(host, port, db, seedFunc(), callback);
  } catch (error) {
    return callback(error);
  }
  callback(new Error("No seed function found"));
};