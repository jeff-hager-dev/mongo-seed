var ObjectID = require('mongodb').ObjectID;
module.exports = function () {
  var blueTurkeyID  = new ObjectID("567183f4164db6c2c01aa04f");
  var freshKittyID = new ObjectID("56718406164db6c2c01aa050");
  var spotID = new ObjectID("56718385164db6c2c01aa04e");
  var ruffusID = new ObjectID("56718437164db6c2c01aa051");
  var fluffyID = new ObjectID("56718441164db6c2c01aa052");
  var whiskerID = new ObjectID("56718451164db6c2c01aa053");

  return {
    "Food": [
      {
        "_id": blueTurkeyID,
        "Name": "Blue Turkey"
      },
      {
        "_id": freshKittyID,
        "Name": "Fresh Kitty"
      }
    ],
    "Pets": [
      {
        "_id": spotID,
        "Name": "Spot",
        "Type": "Dog",
        "Food": blueTurkeyID
      },
      {
        "_id": ruffusID,
        "Name": "Ruffus",
        "Type": "Dog",
        "Food": blueTurkeyID
      },
      {
        "_id": fluffyID,
        "Name": "Fluffy",
        "Type": "Cat",
        "Food": freshKittyID
      },
      {
        "_id": whiskerID,
        "Name": "Whiskers",
        "Type": "Cat",
        "Food": freshKittyID
      }
    ]
  }
};