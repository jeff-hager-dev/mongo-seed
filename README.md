# mongo-seed (BETA)
Built with testing MEAN applications in mind. Gives a developer a way to populate mongo database from different data sources; functions, files, directories of JSON files.

Also open to anyone who wants to build this out with more cool things.

## Reason for Existence

So, you may be asking "Why did you do this?" or "Why not use RAKE?" 
or "Why not use another packages that does something similar?". My answer is part "I couldn't find exactly what I wanted" and 
part "It sounded fun to write and I some free time". 

To explain the first part more I will break it down in to my use cases. 

1. Specific Test Data
   - Different types of data sources of versioned data for specific tests. See seed types of what I had in mind.
2. Precise control on data for specific states
   - See point 1 then add the ability to write functions to set up data or mix match sources.
3. Ability to import just collections from mongodb export functionality 
    - I liked using mongoexport to get certain collections of data that I know capture the scenarios I am trying to test.
4. Load multiple Databases
    - This is the one that really wanted. Ability to stand up two isolated databases with specific data sets and change one or both.
5. Readable seeds
    - Since the seeds can be super lean and in readable JSON it should be easy to manipulate them to fit test cases.
6. I like even number lists or lists that end at 3.
    - Don't Judge me

To explain the second part more...it sounded fun as I mentioned before and it was.

ALSO Note that the first two versions(0.3.0 & 0.4.0) were written really fast in half a day.

TL;DR: I wanted it my way and I wanted to do it. I wonder if these are supposed to go at the top...

## Types of Seeds

### Directory Seed

This is where you have a directory filled with JSON files that were created from a ```mongoexport```.

_NOTE_: make sure to use --jsonArray when exporting data from tables. Similar ```mongoexport --db PetShop --collection Food --out Food.json --jsonArray```

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


### Examples

COMING SOON
