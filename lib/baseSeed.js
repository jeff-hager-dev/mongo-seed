"use strict";

var async = require('async'),
  MongoClient = require("mongodb").MongoClient;

module.exports = function (host, port, db, content, callback) {
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
        connection.close(function (e) {
          done(err || e);
        });
      });
  }, callback);
};