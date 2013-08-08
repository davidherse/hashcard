/*
 HashCard v0.1
https://github.com/davidherse/hashcard

(The MIT License)

Copyright (c) 2013 David Herse
All rights reserved.

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
IN THE SOFTWARE.
*/


(function($, window) {
   window.hashcard = window.hashcard || function() {
    var callbacks = {},
        expressions = {},

    trigger = function(pattern, data, e) {        
      if (callbacks[pattern]) {
        var numberParams = pattern.split(':').length-1;
            numberParams = numberParams || pattern.split('*').length-1
            params = numberParams ? data.splice(numberParams, data.length) : data;
        for (var i = callbacks[pattern].length - 1; i >= 0; i--) {            
          callbacks[pattern][i].apply(this, data);
        }
      }
    },
    createExpression = function(pattern) {
      return new RegExp('^'+pattern
            .replace(/\*/g, '+')
            .replace(/:[A-Za-z0-9 _.-]+(?=\/)/g, '[A-Za-z0-9 _.-]+')
            .replace(/:[A-Za-z0-9 _.-]+$/g, '[A-Za-z0-9 _.-]+$'));
    },
    hashChange = function(e) {
      var hash = (location.href.split("#")[1] || ""),
          hashArray = hash.split('/'),
          wildcardPath = '';
          hashArray.shift();
          
      for(var pattern in expressions) {
        if (~hash.search(expressions[pattern])) {            
          trigger(pattern, hash.split('/'));
        }
      }
    };

    $(window).on('hashchange', function(e) {
      hashChange(e);
    });

    $(document).on('ready', function() {
      $(window).trigger('hashchange');
    });

    return {
      push: function (hash) {
        window.location.hash = hash;
      },
      on: function (pattern, callback) {
        if (typeof callback === 'function') {
          var hash = (location.href.split("#")[1] || "");
          callbacks[pattern] = callbacks[pattern] || [];
          callbacks[pattern].push(callback);
          expressions[pattern] = createExpression(pattern);
        }
      },
      off: function (pattern, callback) {
        if (callbacks[pattern]){
          for (var i = callbacks[pattern].length - 1; i >= 0; i--) {
            if(callbacks[pattern][i] === callback) {
              callbacks[pattern].splice(i, 1);
              expressions[pattern].splice(i, 1);
            }
          }
        }
      }
    };
  }();
})(jQuery, window);
