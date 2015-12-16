
var fs = require('fs'),
  path = require('path'),
  mongodb = require("mongodb"),
  json2Mongo = require('json2Mongo'),
  MongoClient = mongodb.MongoClient,
  _ = require('underscore');

module.exports = function (host, port, db, seedFile, callback) {
  if (path.extname(file) != '.json') done(new Error("Invalid file type"));
  var content = fs.readFileSync(seedFile + '/' + file);
  if (!content) return done();

  content = JSON.parse(content);

  MongoClient.connect('mongodb://' + host + ':' + port + '/' + db, function (err, db) {
    db.createCollection(collectionName, function (err, col) {
      db.collection(collectionName, function (err, collection) {

        content = json2Mongo(content);

        collection.insertMany(content, {w: 1}, function (err) {
          callback(err);
        });
      });

    });

  });
};