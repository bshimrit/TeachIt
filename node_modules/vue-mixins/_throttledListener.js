(function() {
  var called, fn;

  called = [];

  fn = function() {
    return called.push(arguments);
  };

  if ((typeof document !== "undefined" && document !== null) && (typeof window !== "undefined" && window !== null)) {
    document.addEventListener("DOMContentLoaded", function() {
      var args, cAF, i, len, rAF, results, throttle;
      rAF = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
      cAF = window.cancelAnimationFrame || window.mozCancelAnimationFrame;
      if (rAF) {
        fn = function(event, cb) {
          var lastRequest;
          lastRequest = null;
          return window.addEventListener(event, function() {
            var args;
            args = arguments;
            cAF(lastRequest);
            return lastRequest = rAF(function() {
              return cb.apply(null, args);
            });
          });
        };
      } else {
        throttle = require("lodash/throttle");
        fn = function(event, cb) {
          return window.addEventListener(event, throttle(cb, 66));
        };
      }
      results = [];
      for (i = 0, len = called.length; i < len; i++) {
        args = called[i];
        results.push(fn.apply(null, args));
      }
      return results;
    });
  }

  module.exports = fn;

}).call(this);
