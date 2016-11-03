"use strict";

var fs = require('fs'),
  mongodb = require("mongodb"),
  async = require('async'),
  MongoClient = mongodb.MongoClient,
  _ = require('underscore');

module.exports = function (host, port, db, seedLocation, callback) {
  var seedFunc = null;

  try {
    seedFunc = require(seedLocation);
  }
  catch (error) {
    return callback(error);
  }
  if (!seedFunc) return callback(new Error("No seed function found"));

  var content = seedFunc();
  async.each(Object.keys(content), function (collectionName, done) {
    var connection = null;
    async.waterfall([
        function(callback) {
          MongoClient.connect('mongodb://' + host + ':' + port + '/' + db, callback);
        },
        function(db, callback) {
          connection = db;
          db.collection(collectionName, callback);
        },
        function(collection, callback) {
          var data = content[collectionName];
          collection.insertMany(data, {w: 1}, callback);
        }
      ],
      function (err) {
        if (!connection) {
          return done(err);
        }
        connection.close(function(e) {
          done(err || e);
        });
      });
  }, callback);
};