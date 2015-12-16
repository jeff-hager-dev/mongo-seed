"use strict";

var fs = require("fs"),
  mongodb = require("mongodb"),
  _ = require("underscore");

var loadActions = {
  "dir": function(host, db, seedLocation, callback){
    fs.readdir(seedLocation, function(err, files){
      if(err){
        return callback(err);
      }



    });
  },
  "jsonFile": function(){
    throw new Error("Not Implemented");
  },
  "mongoDump": function(){
    throw new Error("Not Implemented");
  }
};

module.exports = {
  "load": function(host, db, seedLocation, loadType, callback){
    var action = loadActions[loadType];
    if(!action){
      return callback(new Error("Invalid load type"));
    }

    action(host, db, seedLocation, callback);

  },
  "clear": function(host, db, callback){}
};