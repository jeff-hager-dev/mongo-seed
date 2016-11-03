"use strict";

var fs = require('fs'),
  path = require('path'),
  json2mongo = require('json2mongo'),
  async = require('async'),
  baseSeed = require('./baseSeed');

module.exports = function (host, port, db, seedLocation, callback) {
  fs.readdir(seedLocation, function (err, files) {
    if (err) {
      return callback(err);
    }

    async.map(files, function (file, done) {
      if (path.extname(file) != '.json') {
        return done(new Error("Invalid file type"));
      }

      var collectionName = path.basename(file, '.json');
      fs.readFile(path.join(seedLocation, file), function (err, content) {
        if (err || !content) {
          return done(err || new Error("File is empty"));
        }
        content = json2mongo(JSON.parse(content));
        done(null, [collectionName, content]);
      });
    },
    function(err, results) {
      if (err) {
        return callback(err);
      }
      var content = {};
      results.forEach(function(mapped) {
        content[mapped[0]] = mapped[1];
      });
      baseSeed(host, port, db, content, callback);
    });
  });
};