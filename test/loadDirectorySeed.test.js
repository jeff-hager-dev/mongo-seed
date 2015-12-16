var mongoSeed = require('../index.js'),
  Db = require('mongodb').Db,
  Server = require('mongodb').Server,
  expect = require('chai').expect;

describe("Should Seed a mongo Database based off a directory of JSON Files", function () {
  var host = "localhost";
  var port = 27017;
  var dbName = "PetStore";

  before(function (done) {
    var db = new Db(dbName, new Server(host, port));
    db.open(function (err, db) {
      db.dropDatabase(function (err, result) {
        done();
      });
    });
  });

  it("Should return an error for invalid load types", function (done) {
    mongoSeed.load(host, port, dbName, "turtles", "power", function (err) {
      expect(err).not.to.equal(null);
      expect(err.message).to.equal("Invalid load type");
      done();
    });
  });

  it("Should return an error if the directory doesn't exist", function (done) {
    mongoSeed.load(host, port, dbName, "turtles", "dir", function (err) {
      expect(err).not.to.equal(null);
      expect(err.code).to.equal("ENOENT");
      done();
    });
  });

  it("Should populate a database given a directory full of JSON exports of collections", function (done) {
    mongoSeed.load(host, port, dbName, __dirname + "/seeds/dirSeed", "dir", function (err) {
      expect(err).to.equal(null);
      done();
    });
  });

});