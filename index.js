"use strict";

var fs = require('fs'),
  mongodb = require("mongodb"),
  Server = mongodb.Server,
  Db = mongodb.Db,
  dirSeed = require('./lib/directorySeed'),
  fileSeed = require('./lib/fileSeed');

var loadActions = {
  "dir": dirSeed,
  "file": fileSeed,
  "function": function () {
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
      db.dropDatabase(function (err) {
        callback(err);
      });
    });
  }
};