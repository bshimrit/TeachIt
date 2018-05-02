(function() {
  module.exports = {
    mixins: [require("./vue")],
    computed: {
      cTransition: function() {
        var name;
        if (this.disableTransition) {
          name = "empty";
        } else {
          name = this.transition;
        }
        this.processTransition(name);
        return name;
      }
    },
    methods: {
      processTransition: function(value, parent) {
        var addHook, hook, hooks, i, len, newHooks, ref;
        if (parent == null) {
          parent = this.$parent;
        }
        if (value !== "empty") {
          hooks = this.Vue.util.resolveAsset(parent.$options, 'transitions', value);
        }
        if (hooks == null) {
          if (hooks == null) {
            hooks = this.$options.transitions[value];
          }
          if (hooks != null ? hooks.modified : void 0) {
            return;
          }
        }
        if (hooks != null) {
          newHooks = {
            enterClass: hooks.enterClass,
            leaveClass: hooks.leaveClass,
            leave: hooks.leave,
            beforeEnter: hooks.beforeEnter
          };
        } else {
          newHooks = {};
        }
        newHooks.modified = true;
        addHook = (function(_this) {
          return function(name) {
            var eventName, fn, hook;
            eventName = _this.Vue.util.hyphenate(name);
            if ((hooks != null ? hooks[name] : void 0) != null) {
              hook = hooks[name];
              fn = function(el) {
                _this.$emit(eventName);
                return hook.bind(_this)(el);
              };
            } else {
              fn = function(el) {
                return _this.$emit(eventName);
              };
            }
            return newHooks[name] = fn;
          };
        })(this);
        ref = ["afterEnter", "beforeLeave", "afterLeave", "enterCancelled", "leaveCancelled"];
        for (i = 0, len = ref.length; i < len; i++) {
          hook = ref[i];
          addHook(hook);
        }
        if (((hooks != null ? hooks.enter : void 0) != null) && hooks.enter.length === 2) {
          hook = hooks.enter;
          newHooks.enter = (function(_this) {
            return function(el, cb) {
              _this.$emit("before-enter");
              return hook.bind(_this)(el, cb);
            };
          })(this);
        } else if ((hooks != null ? hooks.enter : void 0) != null) {
          hook = hooks.enter;
          newHooks.enter = (function(_this) {
            return function(el) {
              _this.$emit("before-enter");
              return hook.bind(_this)(el);
            };
          })(this);
        } else {
          newHooks.enter = (function(_this) {
            return function(el) {
              return _this.$emit("before-enter");
            };
          })(this);
        }
        return this.$options.transitions[value] = newHooks;
      }
    }
  };

}).call(this);
