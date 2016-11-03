"use strict";

var fs = require('fs'),
  path = require('path'),
  json2Mongo = require('json2mongo'),
  async = require('async'),
  baseSeed = require('./baseSeed');

module.exports = function (host, port, db, seedLocation, callback) {
  fs.readdir(seedLocation, function (err, files) {
    if (err) {
      return callback(err);
    }

    var combinedContent = {}
    async.each(files, function (file, done) {
      if (path.extname(file) != '.json') done(new Error("Invla"));

      var collectionName = path.basename(file, '.json');
      var content = fs.readFileSync(seedLocation + '/' + file);
      if (!content) return done();

      combinedContent[collectionName] = json2Mongo(JSON.parse(content));
      done();
    }, function(err) {
      if (err) {
        return callback(err);
      }
      baseSeed(host, port, db, combinedContent, callback);
    });
  });
};