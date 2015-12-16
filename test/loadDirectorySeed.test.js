var mongoSeed = require('../index.js'),
  expect = require('chai').expect;

describe("Should Seed a mongo Database based off a directory of JSON Files", function () {
  it("Should return an error for invalid load types", function (done) {
    mongoSeed.load("localhost",27017, "PetStore", "turtles", "power", function (err) {
      expect(err).not.to.equal(null);
      expect(err.message).to.equal("Invalid load type");
      done();
    });
  });

  it("Should return an error if the directory doesn't exist", function (done) {
    mongoSeed.load("localhost",27017, "PetStore", "turtles", "dir", function (err) {
      expect(err).not.to.equal(null);
      expect(err.code).to.equal("ENOENT");
      done();
    });
  });

  it("Should populate a database given a directory full of JSON exports of collections", function (done) {
    mongoSeed.load("localhost",27017, "PetStore", __dirname+"/seeds/dirSeed", "dir", function (err) {
      expect(err).to.equal(null);
      done();
    });
  });
});