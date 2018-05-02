<template lang="pug">
.container
  div.div.nr1
    tooltip(anchor="n") Content
  div.div.nr2
    tooltip(anchor="s") Content
  div.div.nr3
    tooltip(anchor="w") Content
  div.div.nr4
    tooltip(anchor="e") Content
  div.div.nr5
    tooltip(anchor="s") so much Content. wow
  div.div.nr6
    tooltip(anchor="e") so much Content. wow
  div.div.nr7
    tooltip(anchor="w") so much Content. wow
  div.div.nr8
    tooltip(anchor="n") so much Content. wow
  div.div
    a(href="https://github.com/vue-comps/vue-comps-tooltip/blob/master/dev/divs.vue") source
</template>

<script lang="coffee">
module.exports =
  components:
    "tooltip" : require "../src/tooltip.vue"

</script>

<style lang="stylus">
.div
  margin 50px 100px
  height 20px
  width 44px
  padding 5px
  border 1px solid black
  &.nr1
    border-top 5px solid black
  &.nr2
    border-bottom 5px solid black
  &.nr3
    border-left 5px solid black
  &.nr4
    border-right 5px solid black
div.div>.tooltip
  margin 0
  padding 2px
  border 1px dashed red

</style>
