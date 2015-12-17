"use strict";

var mongoSeed = require('../index.js'),
  Db = require('mongodb').Db,
  Server = require('mongodb').Server,
  expect = require('chai').expect;

describe("Seed a Mongo Database based off a function", function () {
  var host = "localhost";
  var port = 27017;
  var dbName = "PetStore";

  before(function (done) {
    var db = new Db(dbName, new Server(host, port));
    db.open(function (err, db) {
      db.dropDatabase(function () {
        done();
      });
    });
  });

  it("Should return an error if the file with the function doesn't exist", function (done) {
    mongoSeed.load(host, port, dbName, __dirname + "/seeds/functionSeed_foo.json", "function", function (err) {
      expect(err).not.to.equal(null);
      done();
    });
  });

  it("Should populate a database given a directory full of JSON exports of collections", function (done) {
    mongoSeed.load(host, port, dbName, __dirname + "/seeds/functionSeed.js", "function", function (err) {
      expect(err).to.equal(null);
      done();
    });
  });

});