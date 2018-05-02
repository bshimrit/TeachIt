// out: ..
<template lang="pug">
button(@click="toggle",v-bind:class="computedClass",v-bind:disabled="disabled")
  slot Toggle:
  slot(name="on" v-if="isOn")  on
  slot(name="off" v-else)  off
</template>

<script lang="coffee">
module.exports =
  mixins: [
    require("vue-mixins/class")
  ]
  props:
    class:
      default: -> []
    onClass:
      type: String
      default: "on"
    offClass:
      type: String
      default: "off"
    isOn:
      type: Boolean
      default: false
    disabled:
      type: Boolean
      default: false
  computed:
    mergeClass: ->
      return if @isOn then [@onClass] else [@offClass]

  methods:
    toggle: (e) ->
      return if e? and e.defaultPrevented
      e?.preventDefault?()
      if @isOn
        @$emit("off",e)
      else
        @$emit("on",e)
      @$emit("toggle",e)
      @isOn = !@isOn

</script>
