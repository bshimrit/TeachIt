// out: ..
<template lang="pug">
div(
  v-bind:style="computedStyle"
  )
  slot
</template>

<script lang="coffee">
module.exports =

  mixins:[
    require("vue-mixins/onWindowScroll")
    require("vue-mixins/getDocumentHeight")
    require("vue-mixins/style")
  ]

  props:
    style:
      default: -> []
    top:
      type: Number
      default: 0
      coerce: Number
    offset:
      type: Number
      default: 0
      coerce: Number
    bottom:
      type: Number
      default: 0
      coerce: Number

  data: ->
    mergeStyle: {}
  methods:
    calc: ->
      body = document.body
      docEl = document.documentElement
      scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop
      if @bottom
        height = @getDocumentHeight()
      if scrollTop+@offset < @top
        @mergeStyle = top: @top  + "px", position: "absolute"
      else if @bottom and scrollTop+@offset > height - @bottom
        @mergeStyle = top: height - @bottom + "px", position: "absolute"
      else if @mergeStyle.position != "fixed"
        @mergeStyle = top: @offset + "px", position: "fixed"

  compiled: ->
    @onWindowScroll @calc
  attached: ->
    @calc()

</script>
