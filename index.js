"use strict";

var fs = require('fs'),
  path = require('path'),
  mongodb = require("mongodb"),
  Db = require('mongodb').Db,
  json2Mongo = require('json2Mongo'),
  MongoClient = mongodb.MongoClient,
  async = require('async'),
  _ = require('underscore');

var loadActions = {
  "dir": function (host, port, db, seedLocation, callback) {
    fs.readdir(seedLocation, function (err, files) {
      if (err) {
        return callback(err);
      }


      async.each(files, function (file, done) {
        if (path.extname(file) != '.json') done(new Error("Invla"));

        var collectionName = path.basename(file, '.json');
        var content = fs.readFileSync(seedLocation + '/' + file);
        if (!content) return done();

        content = JSON.parse(content);

        MongoClient.connect('mongodb://' + host + ':' + port + '/' + db, function (err, db) {
          db.createCollection(collectionName, function (err, col) {
            db.collection(collectionName, function (err, collection) {

              content = json2Mongo(content);

              collection.insertMany(content, {w: 1}, function (err) {
                done(err);
              });
            });

          });

        });
      }, callback);
    });
  },
  "jsonFile": function () {
    throw new Error("Not Implemented");
  },
  "mongoDump": function () {
    throw new Error("Not Implemented");
  }
};

module.exports = {
  "load": function (host, port, db, seedLocation, loadType, callback) {
    var action = loadActions[loadType];
    if (!action) {
      return callback(new Error("Invalid load type"));
    }
    action(host, port, db, seedLocation, callback);
  },
  "clear": function (host, port, db, callback) {
    var db = new Db(db, new Server(host, port));
    db.open(function (err, db) {
      db.dropDatabase(function (err, result) {
        callback(err, results);
      });
    });
  }
};