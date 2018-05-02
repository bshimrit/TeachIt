(function() {
  var allMouseMoveCbs, callMouseMoveCbs;

  allMouseMoveCbs = [];

  callMouseMoveCbs = function() {
    var cb, i, len, results;
    results = [];
    for (i = 0, len = allMouseMoveCbs.length; i < len; i++) {
      cb = allMouseMoveCbs[i];
      results.push(cb.apply(null, arguments));
    }
    return results;
  };

  require("./_throttledListener")("mousemove", callMouseMoveCbs);

  module.exports = {
    data: function() {
      return {
        mouseMoveCbDisposables: []
      };
    },
    methods: {
      onMouseMove: function(cb) {
        var dispose;
        allMouseMoveCbs.push(cb);
        dispose = function() {
          var index;
          index = allMouseMoveCbs.indexOf(cb);
          if (index > -1) {
            return allMouseMoveCbs.splice(index, 1);
          }
        };
        this.mouseMoveCbDisposables.push(dispose);
        return (function(_this) {
          return function() {
            var index;
            dispose();
            index = _this.mouseMoveCbDisposables.indexOf(dispose);
            if (index > -1) {
              return _this.mouseMoveCbDisposables.splice(index, 1);
            }
          };
        })(this);
      }
    },
    beforeDestroy: function() {
      var i, len, mouseMoveCbDisposable, ref, results;
      ref = this.mouseMoveCbDisposables;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        mouseMoveCbDisposable = ref[i];
        results.push(mouseMoveCbDisposable());
      }
      return results;
    }
  };

}).call(this);
