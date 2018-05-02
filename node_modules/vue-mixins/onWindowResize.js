(function() {
  var allResizeCbs, callResizeCbs;

  allResizeCbs = [];

  callResizeCbs = function() {
    var cb, i, len, resizeRunning;
    for (i = 0, len = allResizeCbs.length; i < len; i++) {
      cb = allResizeCbs[i];
      cb.apply(null, arguments);
    }
    return resizeRunning = false;
  };

  require("./_throttledListener")("resize", callResizeCbs);

  module.exports = {
    data: function() {
      return {
        resizeCbDisposables: []
      };
    },
    methods: {
      onWindowResize: function(cb) {
        var dispose;
        allResizeCbs.push(cb);
        dispose = function() {
          var index;
          index = allResizeCbs.indexOf(cb);
          if (index > -1) {
            return allResizeCbs.splice(index, 1);
          }
        };
        this.resizeCbDisposables.push(dispose);
        return (function(_this) {
          return function() {
            var index;
            dispose();
            index = _this.resizeCbDisposables.indexOf(dispose);
            if (index > -1) {
              return _this.resizeCbDisposables.splice(index, 1);
            }
          };
        })(this);
      }
    },
    beforeDestroy: function() {
      var i, len, ref, resizeCbDisposable, results;
      ref = this.resizeCbDisposables;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        resizeCbDisposable = ref[i];
        results.push(resizeCbDisposable());
      }
      return results;
    }
  };

}).call(this);
