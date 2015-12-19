# mongo-seed (BETA)
Built with testing MEAN applications in mind. Gives a developer a way to populate mongo database from different data sources; functions, files, directories of JSON files. Also allows the developer to clean up the databases after the test.

Also open to anyone who wants to build this out with more cool things.

## Types of Seeds

### Directory Seed

This is where you have a directory filled with JSON files that were created from a ```mongoexport```.

__NOTE:__ make sure to use --jsonArray when exporting data from tables. Similar ```mongoexport --db PetShop --collection Food --out Food.json --jsonArray```

```javascript
mongoSeed.load("localhost",27017, "<name_of_database>", "<seed_directory>", "dir", function (err) {
  //..do what ever you need
});
```

### File

AThis is similar to the directory seed. You have a file with an object in it where each property is a collection name and the value is an array of documents for that collection.
This also supports two different data formats. The MongoDB Extended JSON(EXTENDED) or the JSON recognized by the node mongodb driver(DRIVER). 

```text
{
    "dataFormat": "<Type-of-json>",// supported types EXTENDED or DRIVER
    "table_Name": [/*Each document as an individual object in the array*/]
    /*...*/
    "table_Name_n": [/*Each document as an individual object in the array*/]
}
```

```javascript
mongoSeed.load("localhost",27017, "<name_of_database>", "<path_to_file>", "file", function (err) {
  //..do what ever you need
});
```

### Load from Function

So loading from a function means you have a node module somewhere that returns JSON in the same format the node mongodb driver 
accepts. This came about because I wanted to use some of the mongoDB client helpers to set up data sets.

```javascript
module.exports = function(){
    return {
       "table_Name": [/*Each document as an individual object in the array*/]
       /*...*/
       "table_Name_n": [/*Each document as an individual object in the array*/]
    };
};
```

```javascript
mongoSeed.load("localhost",27017, "<name_of_database>", "<path_function_def>", "function", function (err) {
  //..do what ever you need
});
```


### Mong Dump file

COMING SOON

Self-explanatory. Back up a database that causes certain test cases load it in the test enviroment then tear it down. Well when this is added....


### REST ENDPOINT

COMING SOON

Ability to load JSON from a REST endpoint or maybe a JSON file stored on an S3 Bucket.


## Examples

### Single Database

Lets say you have the following directory structure:

```text
├── seeds
│   └── functionSeed.js
└── test
    └── generica.test.js
```

The file functionSeed.js might look like this:

```javascript
module.exports = function(){
    return {
       "table_Name": [
         {
           "_id": new ObjectId("asome side here"), "Name": "Person"
         }
       ]
    };
};
```

The in the test file, lets say you are using mocha for testing:


```javascript
var async = require('async'),
  mongoSeed = require('mongo-seed');

describe("testing some functionality", function(){

  var mongo = {
    "host": "",
    "port": "",
    "db": ""
  };

  before(function (done) {
    async.waterfall([
        function (callback) {
          mongoSeed.clear(mongo.host, mongo.port, cmongo.db, function (err) {
            callback(err);
          });
        },
        function (callback) {
          var seedPath = path.resolve(__dirname + "/../seeds/functionSeed.js");
          mongoSeed.load(mongo.host, mongo.port, mongo.db, seedPath, "function", function (err) {
            callback(err);
          });
        }
      ],
      function (err, results) {
        if(err) throw err;
        done();
      });
  });

  it("Do some testing here", function(done){
    // test here
    done();
  });

});
```


### Multiple databases

Lets say you need to seed multiple databases for testing here is a quick example of how you might do that.

```javascript

var async = require('async'),
  mongoSeed = require('mongo-seed');

describe("testing some functionality", function(){

  var mongo = {
    "host": "",
    "port": "",
    "db": ""
  };

  var mongo2 = {
    "host": "",
    "port": "",
    "db": ""
  };

  before(function (done) {
    async.waterfall([
        function (callback) {
          mongoSeed.clear(mongo.host, mongo.port, mongo.db, function (err) {
            callback(err);
          });
        },
        function (callback) {
          mongoSeed.clear(mongo2.host, mongo2.port, mongo2.db, function (err) {
            callback(err);
          });
        },
        
        function (callback) {
          var seedPath = path.resolve(__dirname + "/../seeds/functionSeed.js");
          mongoSeed.load(mongo.host, mongo.port, mongo.db, seedPath, "function", function (err) {
            callback(err);
          });
        },
        function (callback) {
          var seedPath = path.resolve(__dirname + "/../seeds/functionSeed2.js");
          mongoSeed.load(mongo2.host, mongo2.port, mongo2.db, seedPath, "function", function (err) {
            callback(err);
          });
        }
      ],
      function (err, results) {
        if(err) throw err;
        done();
      });
  });

  it("Do some testing here", function(done){
    // test here
    done();
  });

});

```