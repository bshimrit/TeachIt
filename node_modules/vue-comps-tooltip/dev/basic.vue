<template lang="pug">
.container
  button(v-el:topleft)  hover
    tooltip(v-ref:topleft) Content
  button(v-el:topright) hover
    tooltip(v-ref:topright) Content
  button(v-el:bottomleft) hover
    tooltip(v-ref:bottomleft) Content
  button(v-el:bottomright) hover
    tooltip(v-ref:bottomright) Content
  button(v-el:s) hover
    tooltip(anchor="s" v-ref:s) so much Content. wow
  button(v-el:e) hover
    tooltip(anchor="e" v-ref:e) so much Content. wow
  button(v-el:w) hover
    tooltip(anchor="w" v-ref:w) so much Content. wow
  a(href="https://github.com/vue-comps/vue-comps-tooltip/blob/master/dev/basic.vue") source
</template>

<script lang="coffee">
module.exports =
  components:
    "tooltip" : require "../src/tooltip.vue"

</script>

<style lang="stylus">
.container > a
  position absolute
  left 250px
  top 40px
button
  position absolute
  border none
  &:nth-child(1)
    top 10px
    left 10px
  &:nth-child(2)
    top 10px
    right 10px
  &:nth-child(3)
    bottom 10px
    left 10px
  &:nth-child(4)
    bottom 10px
    right 10px
  &:nth-child(5)
    top 100px
    left 100px
  &:nth-child(6)
    top 100px
    left 200px
  &:nth-child(7)
    top 100px
    left 300px
button>.tooltip
  margin 0
  padding 2px
  border 1px solid black

</style>
