"use strict";

var fs = require('fs'),
  path = require('path'),
  json2mongo = require('json2mongo'),
  baseSeed = require('./baseSeed');

module.exports = function (host, port, db, seedFile, callback) {

  if (path.extname(seedFile) != '.json') return callback(new Error("Invalid file type"));
  fs.readFile(seedFile, function (err, content) {
    if (err || !content) {
      return callback(err || new Error("File is empty"));
    }

    content = JSON.parse(content);
    var isExtended = content.dataFormat === "EXTENDED_JSON";
    delete content.dataFormat;

    Object.keys(content).forEach(function (key) {
      var value = content[key];
      content[key] = isExtended ? json2mongo(value) : value;
    });
    baseSeed(host, port, db, content, callback);
  });
};