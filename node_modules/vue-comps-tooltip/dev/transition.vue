<template lang="pug">
.container
  button hover
    tooltip(style="opacity:0") so much Content. wow
  br
  a(href="https://github.com/vue-comps/vue-comps-tooltip/blob/master/dev/basic.vue") source
</template>

<script lang="coffee">
Velocity = require("velocity-animate")
module.exports =

  components:
    "tooltip" : require "../src/tooltip.vue"
  transitions:
    tooltip:
      css: false
      enter: (el,done) ->
        Velocity.hook el, "scale", "0.4"
        Velocity.hook el, "translateY", "-100%"
        Velocity el, {opacity: 1,scale: 1,translateY: 0}, {
          duration: 1000
          queue: false
          complete: done
        }
      enterCancelled: (el) ->
        Velocity el, "stop"
      leave: (el,done) ->
        Velocity el, {opacity: 0,scale:0.4,translateY:"-100%"}, {
          duration: 1000
          queue: false
          complete: done
        }
      leaveCancelled: (el) ->
        Velocity el, "stop"

</script>

<style lang="stylus">
button>.tooltip
  margin 0
  padding 2px
  border 1px solid black

</style>
