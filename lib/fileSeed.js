"use strict";

var fs = require('fs'),
  path = require('path'),
  mongodb = require("mongodb"),
  async = require('async'),
  json2Mongo = require('json2mongo'),
  MongoClient = mongodb.MongoClient,
  _ = require('underscore');

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
  async.each(Object.keys(content), function (collectionName, done) {
    MongoClient.connect('mongodb://' + host + ':' + port + '/' + db, function (err, db) {
      db.createCollection(collectionName, function (err, col) {
        db.collection(collectionName, function (err, collection) {

          var data = isExtended ? json2Mongo(content[collectionName]) : content[collectionName];

          collection.insertMany(data, {w: 1}, function (err) {
            done(err);
          });
        });
      });
    });
  }, callback);
};