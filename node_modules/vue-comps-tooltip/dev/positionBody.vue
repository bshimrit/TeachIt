<template lang="pug">
.container
  button hover
    tooltip(on-body) Content
  button hover
    tooltip(on-body) Content
  button hover
    tooltip(on-body) Content
  button hover
    tooltip(on-body) Content
  button hover
    tooltip(anchor="s" on-body) so much Content. wow
  button hover
    tooltip(anchor="e" on-body) so much Content. wow
  button hover
    tooltip(anchor="w" on-body) so much Content. wow
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
body>.tooltip
  margin 0
  padding 2px
  border 1px solid black

</style>
