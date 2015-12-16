var mongoSeed = require('../index.js'),
  expect = require('chai').expect;

describe("Should Seed a mongo Database based off a directory of JSON Files", function(){

  it("Should return an error for invalid load types", function(done){
    mongoSeed.load("localhost", "PetStore", "turtles", "power", function(err, results){
      expect(err).not.to.equal(null);
      expect(results).to.equal(null);
      done();
    });
  });

  it("Should return an error if the directory doesn't exist", function(done){
    mongoSeed.load("localhost", "PetStore", "turtles", "power", function(err, results){
      expect(err).not.to.equal(null);
      expect(results).to.equal(null);
      done();
    });
  });

});