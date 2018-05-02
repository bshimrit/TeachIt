(function() {
  module.exports = {
    props: {
      "isOpened": {
        type: Boolean,
        "default": false
      }
    },
    data: function() {
      return {
        opened: null
      };
    },
    methods: {
      setOpened: function() {
        this.opened = true;
        this.isOpened = true;
        return this.$emit("toggled", true);
      },
      setClosed: function() {
        this.opened = false;
        this.isOpened = false;
        return this.$emit("toggled", false);
      }
    },
    watch: {
      "isOpened": function(val) {
        if (val !== this.opened) {
          return this.toggle();
        }
      }
    },
    ready: function() {
      if (this.isOpened) {
        this.disableTransition = true;
        this.toggle();
        return this.disableTransition = false;
      }
    }
  };

}).call(this);
