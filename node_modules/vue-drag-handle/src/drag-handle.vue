// out: ..
<template lang="pug">
.drag-handle(
  v-bind:style="computedStyle"
  v-touch:pan="onPan"
  v-bind:class="computedClass"
  v-bind:id="id"
  v-if="!disabled"
  v-el:dh
  @click="click"
  )
</template>

<script lang="coffee">
module.exports =
  mixins: [
    require("vue-mixins/style")
    require("vue-mixins/class")
  ]
  props:
    "id":
      type: String
    "style":
      default: ->
    "class":
      default: ->
    "factor":
      type: Number
      default: 2
      coerce: Number
    "maxLeft":
      type: Number
      default: 0
      coerce: Number
    "maxRight":
      type: Number
      default: 0
      coerce: Number
    "offset":
      type: Number
      default: 0
      coerce: Number
    "zIndex":
      type: Number
      default: 1002
      coerce: Number
    "disabled":
      type: Boolean
      default: false
  computed:
    mergeStyle: ->
      height: "100%"
      position: "absolute"
      top: 0
      zIndex: @zIndex
  data: ->
    atMax: false
    pos: null

  methods:
    click: (e) ->
      unless @pos? and @pos.x == e.x and @pos.y == e.y
        @$emit "clean-click",e
    onPan: (e) ->
      if e.type == "pan"
        e.srcEvent.preventDefault()
        dX = e.deltaX*@factor
        @pos = null
        if e.isFinal
          @pos = x:e.srcEvent.x,y:e.srcEvent.y
          if @maxRight > 0 and dX >= @maxRight
            @$emit "right"
            @$emit "max","right"
          else if @maxLeft > 0 and dX <= -@maxLeft
            @$emit "left"
            @$emit "max","left"
          else
            @$emit "aborted"
        else if @maxRight > 0 and dX >= 0
          if dX <= @maxRight
            @$emit "move", dX+@offset
            @atMax = false
          else unless @atMax
            @$emit "move", @maxRight+@offset
            @atMax = true
        else if @maxLeft > 0 and dX <= 0
          if dX >= -@maxLeft
            @$emit "move", dX+@offset
            @atMax = false
          else unless @atMax
            @$emit "move", -@maxLeft+@offset
            @atMax = true
</script>
