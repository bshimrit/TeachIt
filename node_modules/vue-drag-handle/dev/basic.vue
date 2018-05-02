<template lang="pug">
.container
  .thing(v-bind:style="style", v-el:thing)
  drag-handle(
    @move="move"
    @right="open"
    @aborted="close"
    v-bind:disabled="!active || opened"
    v-bind:max-right="200"
    style="width: 20px;left:0;background-color:black;opacity:0.5"
    v-ref:opener
  )
  drag-handle(
    @move="move"
    @left="close"
    @aborted="open"
    v-bind:disabled="!active || !opened"
    v-bind:max-left="200"
    v-bind:offset="200"
    style="width: 70%;right:0;background-color:black;opacity:0.5"
    v-ref:closer
  )
  p &lt;&lt; drag
  div(style="margin-left:200px")
    p the gray area is the drag handle
    p the red area is the drag target
    button(@click="toggle") {{active ? "disable": "enable"}}
    br
    a(href="https://github.com/vue-comps/vue-side-nav/blob/master/dev/basic.vue") source
</template>

<script lang="coffee">
module.exports =
  mixins: [
    require("vue-mixins/vue")
  ]
  beforeCompile: ->
    @Vue.use(require('vue-touch'))
  data: ->
    active: true
    opened: false
    style:
      top: 0
      width: "200px"
      left: "-200px"
      height: "100%"
      position:"absolute"
      backgroundColor:"red"
  components:
    "drag-handle" : require "../src/drag-handle.vue"
  methods:
    toggle: ->
      @active = !@active
    move: (position) ->
      @style.left = -200+position+ "px"
    open: ->
      @style.left = 0
      @opened = true
    close: ->
      @style.left = "-200px"
      @opened = false
</script>
