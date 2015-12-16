"use strict";

var mongoSeed = require('../index.js'),
  Db = require('mongodb').Db,
  Server = require('mongodb').Server,
  expect = require('chai').expect;

describe("Seed a Mongo Database based off a a single JSON Files", function () {
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

  it("Should return an error for invalid load types", function (done) {
    mongoSeed.load(host, port, dbName, "turtles", "rangers", function (err) {
      expect(err).not.to.equal(null);
      expect(err.message).to.equal("Invalid load type");
      done();
    });
  });

  it("Should return an error if the file doesn't exist", function (done) {
    mongoSeed.load(host, port, dbName, __dirname + "/seeds/fileSeed_foo.json", "file", function (err) {
      expect(err).not.to.equal(null);
      expect(err.code).to.equal("ENOENT");
      done();
    });
  });

  it("Should return an error if the file is invalid type", function (done) {
    mongoSeed.load(host, port, dbName, __dirname + "/seeds/fileSeed.jys", "file", function (err) {
      expect(err).not.to.equal(null);
      done();
    });
  });

  it("Should populate a database given a directory full of JSON exports of collections", function (done) {
    mongoSeed.load(host, port, dbName, __dirname + "/seeds/fileSeed.json", "file", function (err) {
      expect(err).to.equal(null);
      done();
    });
  });

});