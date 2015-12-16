# mongo-seed
A little node module that will allow a user to clear a mongo database and then populate it from a given json file.



# Types of Seeds

## Directory Seed

This is where you have a directory filled with JSON files that were created from a ```mongoexport```.

_NOTE_: make sure to use --jsonArray when exporting data from tables. Similar ```mongoexport --db PetShop --collection Food --out Food.json --jsonArray```