// out: ..
<template lang="pug">
div(
  v-bind:style="computedStyle"
  )
  div(
    style="position:absolute;pointer-events:none;transform:translate(-50%,-50%);border-radius:50%;line-height:0"
    v-el:ripple-div
    )
    svg(
      xmlns="http://www.w3.org/2000/svg"
      height=10
      width=10
      style="position:relative;opacity:0;pointer-events:none;"
      )
      rect(
        x="0"
        y="0"
        width="100%"
        height="100%"
        v-bind:fill="gradUrl"
        )
</template>

<script lang="coffee">
Velocity = require("velocity-animate")
GradientStore = require('./gradient-store')
module.exports =

  mixins: [
    require("vue-mixins/setCss")
    require("vue-mixins/vue")
    require("vue-mixins/style")
    require("vue-mixins/onceDocument")
  ]

  props:
    color:
      type: String
      default: "black"
    speed:
      type: Number
      default: 1
    style:
      default: -> []
  computed:
    gradUrl: ->
      return null unless @getId?
      return "url(#"+@getId(@color)+")"

  data: ->
    getId: null
    gradUrl: null
    ripples: []
    debug: ""
    parentEl: null
    sibling: false
    mergeStyle: {
      position:'absolute'
    }
    parentPositioned: false
  methods:

    show: (e) ->
      unless @parentPositioned
        @mergeStyle.top = @parentEl.offsetTop + "px"
        @mergeStyle.left = @parentEl.offsetLeft + "px"
        @mergeStyle.height = @parentEl.offsetHeight + "px"
        @mergeStyle.width = @parentEl.offsetWidth + "px"
      x = e.offsetX
      y = e.offsetY
      size = Math.max(@$el.offsetWidth-x,@$el.offsetHeight-y,x,y)*3
      rippleDiv = @$els.rippleDiv.cloneNode(true)
      @setCss(rippleDiv,"top",y+"px")
      @setCss(rippleDiv,"left",x+"px")
      @$el.appendChild(rippleDiv)
      duration = size/@speed/0.35
      rippleEl = rippleDiv.firstChild
      Velocity rippleEl,{opacity:0.5},duration:duration*1/2,queue:false
      Velocity rippleEl,{width:size,height:size},
        duration:duration
        easing:"easeIn"
        queue:false
      ripple = {rippleDiv:rippleDiv,duration:duration*1/2,released: false,timeouted: false}
      @ripples.push ripple
      setTimeout (=>
        ripple.timeouted = true
        if ripple.released
          @hide(ripple)
      ),duration*1/2
      @documentListener ?= @onceDocument "mouseup", =>
        @release()
        @documentListener = null
        return true
      return ripple
    hide: (ripple) ->
      Velocity ripple.rippleDiv.firstChild,{opacity:0},
        duration:ripple.duration
        complete: =>
          ripple.rippleDiv.remove()
          @ripples.splice(@ripples.indexOf(ripple),1)
    release: ->
      lastRipple = @ripples[@ripples.length-1]
      if lastRipple?
        lastRipple.released = true
        if lastRipple.timeouted
          @hide(lastRipple)

  ready: ->
    @getId = GradientStore(@Vue).getId
    @parentEl = @$el.parentElement
    @parentEl.addEventListener "mousedown", @show
    parentStyle = getComputedStyle(@parentEl)

    @parentPositioned = /relative|absolute|fixed/.test(parentStyle.getPropertyValue("position"))
    style = {
      position:'absolute'
      overflow:'hidden'
      touchAction:'auto'
      pointerEvents:"none"
      cursor: parentStyle.getPropertyValue("cursor")
      zIndex: parentStyle.getPropertyValue("z-index")
      boxSizing: "border-box"
      top: 0
      left: 0
    }
    unless @parentPositioned

    else
      style.bottom = 0
      style.right = 0
      style.marginTop = "-" + parentStyle.getPropertyValue("border-top-width")
      style.marginBottom = "-" + parentStyle.getPropertyValue("border-bottom-width")
      style.marginLeft = "-" + parentStyle.getPropertyValue("border-left-width")
      style.marginRight = "-" + parentStyle.getPropertyValue("border-right-width")
      if typeof InstallTrigger != 'undefined' # is firefox
        style.top = Number(parentStyle.getPropertyValue("border-top-width").replace("px",""))/2+"px"
        style.left = Number(parentStyle.getPropertyValue("border-left-width").replace("px",""))/2+"px"
        style.bottom = -Number(parentStyle.getPropertyValue("border-top-width").replace("px",""))/2+"px"
        style.right = -Number(parentStyle.getPropertyValue("border-left-width").replace("px",""))/2+"px"
    @mergeStyle = style
  beforeDestroy: ->
    @parentEl?.removeEventListener "mousedown",@show
</script>
