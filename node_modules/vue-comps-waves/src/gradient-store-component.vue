// out: ..
<template lang="pug">
svg(
  xmlns="http://www.w3.org/2000/svg"
  style="position:absolute;opacity:0;visibility:hidden;pointer-events:none;top:0;width:0;height:0")
  defs
    radialGradient(
      v-bind:id="hash"
      cx="50%"
      cy="50%"
      r="75%"
      v-for="(hash,color) in colors")
      stop(
        offset="0%"
        style="stop-opacity:0.2;"
        v-bind:style="{stopColor:color}")
      stop(
        offset="40%"
        style="stop-opacity:0.3;"
        v-bind:style="{stopColor:color}")
      stop(
        offset="50%"
        style="stop-opacity:0.4;"
        v-bind:style="{stopColor:color}")
      stop(
        offset="60%"
        style="stop-opacity:0.5;"
        v-bind:style="{stopColor:color}")
      stop(
        offset="70%"
        style="stop-color:rgb(255,255,255);stop-opacity:0")
</template>

<script lang="coffee">
module.exports =

  data: ->
    colors: {}
    map: {}

  el: -> document.createElement "div"

  compiled: ->
    @$appendTo('body')

  beforeDestroy: ->
    @$remove()

  methods:
    getHash: (str) ->
      hash = 0
      for chr in str
        chr   = chr.charCodeAt()
        hash  = ((hash << 5) - hash) + chr
        hash |= 0
      hash = -hash if hash < 0
      return hash
    getId: (color) ->
      colorName = color.replace("#","hash")
      return @map[colorName] if @map[colorName]
      hash = "h"+@getHash(color)
      @$set("colors.#{hash}", color)
      @map[colorName] = hash
      return hash


</script>
