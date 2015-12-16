var mongoSeed = require('../index.js'),
  MongoClient = require('mongodb').MongoClient,
  Db = require('mongodb').Db,
  Server = require('mongodb').Server,
  expect = require('chai').expect;

describe("Clear an existing database by dropping it", function () {
  var host = "localhost";
  var port = 27017;
  var dbName = "PetStore";
  var collectionName = "foo";

  before(function (done) {
    var db = new Db(dbName, new Server(host, port));
    db.open(function (err, db) {
      db.dropDatabase(function (err, result) {
        MongoClient.connect('mongodb://' + host + ':' + port + '/' + dbName, function (err, db) {
          db.createCollection(collectionName, function (err, col) {
            db.collection(collectionName, function (err, collection) {
              collection.insertMany({"test": "test"}, {w: 1}, function (err) {
                done();
              });
            });
          });
        });
      });
    });
  });

  it("Should remove an existing database", function (done) {
    mongoSeed.clear(host, port, dbName, function (err) {
      expect(err).to.equal(null);
      done();
    });
  });

});