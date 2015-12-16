
var fs = require('fs'),
  path = require('path'),
  mongodb = require("mongodb"),
  Server = mongodb.Server,
  Db = mongodb.Db,
  json2Mongo = require('json2Mongo'),
  MongoClient = mongodb.MongoClient,
  async = require('async'),
  _ = require('underscore');

module.exports = function (host, port, db, seedLocation, callback) {
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
};