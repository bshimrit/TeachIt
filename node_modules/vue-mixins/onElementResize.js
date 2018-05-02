(function() {
  var called, disposes, fn;

  called = [];

  disposes = [];

  fn = function() {
    var args;
    args = arguments;
    called.push(args);
    return function() {
      var i;
      i = called.indexOf(args);
      if (i > -1) {
        called.splice(i, 1);
      }
      if (disposes[i] != null) {
        disposes[i]();
        return disposes.splice(i, 1);
      }
    };
  };

  if ((typeof document !== "undefined" && document !== null) && (typeof window !== "undefined" && window !== null)) {
    document.addEventListener("DOMContentLoaded", function() {
      var allResizeCbs, args, callResizeCbs, i, j, len, observer, results, throttle;
      if (window.MutationObserver != null) {
        allResizeCbs = [];
        fn = function(el, cb) {
          var cbwrapper, elheight, elwidth;
          elheight = el.offsetHeight;
          elwidth = el.offsetWidth;
          cbwrapper = function() {
            if (elheight !== el.offsetHeight || elwidth !== el.offsetWidth) {
              elheight = el.offsetHeight;
              elwidth = el.offsetWidth;
              return cb.apply(null, arguments);
            }
          };
          allResizeCbs.push(cbwrapper);
          return function() {
            var index;
            index = allResizeCbs.indexOf(cbwrapper);
            if (index > -1) {
              return allResizeCbs.splice(index, 1);
            }
          };
        };
        callResizeCbs = function() {
          var cb, j, len, results;
          results = [];
          for (j = 0, len = allResizeCbs.length; j < len; j++) {
            cb = allResizeCbs[j];
            results.push(cb.apply(null, arguments));
          }
          return results;
        };
        require("./_throttledListener")("resize", callResizeCbs);
        throttle = require("lodash/throttle");
        observer = new MutationObserver(throttle(callResizeCbs, 66));
        observer.observe(document.body, {
          attributes: true,
          childList: true,
          characterData: true,
          subtree: true
        });
      } else {
        require("javascript-detect-element-resize");
        fn = function(el, cb) {
          window.addResizeListener(el, cb);
          return function() {
            return window.removeResizeListener(el, cb);
          };
        };
      }
      results = [];
      for (i = j = 0, len = called.length; j < len; i = ++j) {
        args = called[i];
        results.push(disposes[i] = fn.apply(null, args));
      }
      return results;
    });
  }

  module.exports = {
    data: function() {
      return {
        resizeCbDisposables: []
      };
    },
    methods: {
      onElementResize: function(el, cb) {
        var dispose;
        if (cb == null) {
          return;
        }
        dispose = fn(el, cb);
        this.resizeCbDisposables.push(dispose);
        return (function(_this) {
          return function() {
            var index;
            index = _this.resizeCbDisposables.indexOf(dispose);
            if (index > -1) {
              _this.resizeCbDisposables.splice(index, 1);
              return dispose();
            }
          };
        })(this);
      }
    },
    beforeDestroy: function() {
      var j, len, ref, resizeCbDisposable, results;
      ref = this.resizeCbDisposables;
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        resizeCbDisposable = ref[j];
        results.push(resizeCbDisposable());
      }
      return results;
    }
  };

}).call(this);
