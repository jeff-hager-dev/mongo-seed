"use strict";

var fs = require("fs");

var LoadTypes = {
  directory: function(host, db, seedLocation, callback){}
};

var loadTypes = ["directory"];
module.exports = {
  "load": function(host, db, seedLocation, loadType, callback){
    var action = loadType[loadType];
    if(!action){
      return callback(new Error("Invalid load type"), null);
    }

    action(host, db, seedLocation, callback);

  },
  "clear": function(host, db, callback){}
};