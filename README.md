# mongo-seed
A little node module that will allow a user to clear a mongo database and then populate it from a given json file.

## Purpose

I built this to help with testing MEAN stack applications. So, you may be asking "Why did you do this?" or "Why not use RAKE?" 
or "Why not use another packages that do something similar?". My answer is part "I couldn't find exactly what I needed" and 
part "It sounded fun to write my own package to do this". 

To explain the first part more I will break down in to my use cases. 

1. Version Data
   - I want to different types of data source to version data. See seed types of what I wanted.
2. Precise control on data for specific states
   - See point 1 then add the ability to write functions to set up data.
3. Able to export just collections from mongodb 
    - I liked using mongoexport to get certain collections of data of only want I need.
4. Load multiple Databases
    - This is the one that really sold me. I wanted to be able to stand up two isolated databases with specific data sets
5. Readable seeds
    - Since the seeds can be super lean and in readable JSON it should be easy to manipulate them to fit test cases.
6. I like even number lists or lists that end at 3.
    - Don't Judge me

To explain the second part more...it sounded fun and it was.


TL;DR: I wanted it my way and I wanted to do it.

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

A file is similar to the directory seed. You have a file with an object in it where each property is a collection name and the value is an array of documents for that collection.
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

So loading from a function means you have a node module somewhere that returns JSON in the same format the mongodb node drive uses. I wanted to use some of the mongoDB client helpers to set up data sets.

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

Self-explanatory. Back up a database that causes certain test cases load it in the test enviroment then tear it down.


### REST ENDPOINT

COMING SOON2


### Examples

COMING SOON
