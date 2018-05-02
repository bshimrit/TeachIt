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
        return this.$emit("toggled", true);
      },
      setClosed: function() {
        this.opened = false;
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
    mounted: function() {
      return this.$nextTick(function() {
        if (this.isOpened) {
          return this.toggle();
        }
      });
    }
  };

}).call(this);
