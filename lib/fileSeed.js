"use strict";

var fs = require('fs'),
  path = require('path'),
  json2Mongo = require('json2mongo'),
  baseSeed = require('./baseSeed');

module.exports = function (host, port, db, seedFile, callback) {

  if (path.extname(seedFile) != '.json') return callback(new Error("Invalid file type"));
  try {
    var content = fs.readFileSync(seedFile);
  }
  catch (err) {
    return callback(err);
  }
  if (!content) return callback();

  content = JSON.parse(content);
  var isExtended = content.dataFormat === "EXTENDED_JSON";
  delete content.dataFormat;

  Object.keys(content).forEach(function (key) {
    var value = content[key];
    content[key] = isExtended ? json2Mongo(value) : value;
  });
  baseSeed(host, port, db, content, callback);
};