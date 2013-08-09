hashcard 0.1.2
========

A lightweight hashtag history tracker with wildcard capabilities.

[Demo](http://davidherse.github.io/hashcard/)

##Usage

    hashcard.on('/path/to/foo', function() {
      //..
    });

###Wildcards

#### Parameters
    hashcard.on('/path/:foo/:bar', function(foo, bar) {
      //..
    });

#### All
    hashcard.on('/path/*', function(param1, param2, ect..) {
      //..
    });

#### Push hash state and trigger event
    hashcard.push('/path/foo/bar');

#### Remove event (Must be declared with a defined function for this to work)

    hashcard.on('/path/foo', myFunction);

    hashcard.off('/path/foo', myFunction);

### Requirements
* JQuery 1.10.2+

### Browser Support
* Chrome
* Safari
* Firefox
* ie8+
