// out: ..
<template lang="pug">
div(
  v-bind:style="computedStyle"
  v-if="opened"
  v-el:tt
  v-bind:class="computedClass"
  v-bind:id="id"
  v-bind:transition="cTransition"
  )
  slot
</template>

<script lang="coffee">
module.exports =

  mixins:[
    require("vue-mixins/getViewportSize")
    require("vue-mixins/isOpened")
    require("vue-mixins/style")
    require("vue-mixins/class")
    require("vue-mixins/transition")
  ]

  props:
    id:
      type: String
    style:
      default: -> []
    class:
      default: -> ["tooltip"]
    anchor:
      type: String
      default: "snwe"
    offset:
      type: Number
      default: 0
      coerce: Number
    ignoreParent:
      type: Boolean
      default: false
    parent:
      type: Object
    zIndex:
      type: Number
      default: 100
      coerce: Number
    onBody:
      type: Boolean
      default: false
    transition:
      type: String
      default: "tooltip"
  computed:
    mergeStyle: ->
      style =
        width: @width+"px"
        height: @height+"px"
        position:"absolute"
        display:"block"
        boxSizing:"border-box"
        zIndex: @zIndex
      top = @top
      left = @left
      if @direction == "n"
        top -= @offset
      else if @direction == "s"
        top += @offset
      else if @direction == "w"
        left -= @offset
      else if @direction == "o"
        left += @offset
      style.top = top + "px"
      style.left = left + "px"
      return style

  data: ->
    direction: ""
    width: null
    height: null
    top: null
    left: null

  watch:
    "parent": "setupParent"

  methods:
    setupParent: (parent = @parent) ->
      unless @ignoreParent
        @removeParentListener?()
        parent.addEventListener "mouseenter", @show
        parent.addEventListener "mouseleave", @hide
        @removeParentListener = =>
          parent.removeEventListener "mouseenter", @show
          parent.removeEventListener "mouseleave", @hide
    show: -> @setOpened() unless @opened
    hide: -> @setClosed() if @opened
    toggle: ->
      if @opened
        @hide()
      else
        @show()

  beforeDestroy: ->
    @removeParentListener?()
    el = @$els.tt
    if el?
      el.parentNode.removeChild(el)

  ready: ->
    unless @parent?
      @parent = @$el.parentElement
    else
      @setupParent()
    @$on "before-enter", ->
      document.body.appendChild @$els.tt if @onBody
      parentPos = @parent.getBoundingClientRect()
      # get real pos depending on position in viewport
      windowSize = @getViewportSize()
      ttPos = @$els.tt.getBoundingClientRect()
      @showing = false
      @height = ttPos.height
      @width = ttPos.width
      totalheight = @height + @offset
      totalwidth = @width + @offset
      pos = null
      for a in @anchor
        pos = a
        if a == "s" and parentPos.bottom + totalheight <= windowSize.height
          break
        else if a == "n" and parentPos.top - totalheight >= 0
          break
        else if a == "w" and parentPos.left - totalwidth >= 0
          break
        else if a == "e" and parentPos.right + totalwidth <= windowSize.width
          break
      @direction = pos
      # get top/left relative to parent nw corner (w/o offset)
      parentHeight = parentPos.height
      parentWidth = parentPos.width
      if pos == "s"
        top = parentHeight
        left = parentWidth/2 - @width/2
      else if pos == "n"
        top = - @height
        left = parentWidth/2 - @width/2
      else if pos == "w"
        top = parentHeight/2 - @height/2
        left = - @width
      else if pos == "e"
        top = parentHeight/2 - @height/2
        left = parentWidth
      # positioning in document
      unless @onBody
        parentStyle = getComputedStyle(@parent)
        # correct border
        if parentStyle.getPropertyValue("box-sizing") == "border-box"
          top -= parseInt(parentStyle.getPropertyValue("border-top-width").replace("px",""))
          left -= parseInt(parentStyle.getPropertyValue("border-left-width").replace("px",""))
        isPositioned = /relative|absolute|fixed/.test(parentStyle.getPropertyValue("position"))
        unless isPositioned
          top += @parent.offsetTop
          left += @parent.offsetLeft
      else
        body = document.body
        docEl = document.documentElement
        scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop
        scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft
        top += scrollTop + parentPos.top
        left += scrollLeft + parentPos.left

      @top = top
      @left = left
</script>
