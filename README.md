hashcard
========

A lightweight hashtag history tracker with wildcard capabilities.

##Usage

    hashcard.on('/path/to/foo', function() {
      //..
    });

##Wildcards

### Parameters
    hashcard.on('/path/:ifoo/:bar', function(foo, bar) {
      //..
    });

### All
    hashcard.on('/path/*', function(param1, param2, ect..) {
      //..
    });
