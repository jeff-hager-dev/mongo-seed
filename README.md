# mongo-seed
A little node module that will allow a user to clear a mongo database and then populate it from a given json file.

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

COMING SOON


### Mong Dump file

COMING SOON


### Examples

COMING SOON