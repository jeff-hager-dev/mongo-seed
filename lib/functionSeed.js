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
    MongoClient.connect('mongodb://' + host + ':' + port + '/' + db, function (err, db) {
      db.createCollection(collectionName, function (err, col) {
        db.collection(collectionName, function (err, collection) {

          var data = content[collectionName];

          collection.insertMany(data, {w: 1}, function (err) {
            done(err);
          });
        });
      });
    });
  }, callback);
};