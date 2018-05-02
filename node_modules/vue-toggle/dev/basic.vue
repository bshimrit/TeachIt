<template lang="pug">
.container
  toggle(v-bind:is-on.sync="isOn",v-ref:toggle,@on="onOn",@off="onOff",v-bind:disabled="disabled")
    span(v-if="content") {{content}}
    span(v-if="contentOn" slot="on") {{contentOn}}
    span(v-if="contentOff" slot="off") {{contentOff}}
  br
  span isOn: {{isOn}}
  br
  toggle(v-bind:is-on.sync="disabled" v-ref:disable) disable toggle above - state:
    span(slot="on") disabled
    span(slot="off") enabled
  br
  a(href="https://github.com/vue-comps/vue-toggle/blob/master/dev/basic.vue") source
</template>

<script lang="coffee">
module.exports =
  data: ->
    isOn: false
    content: ""
    contentOn: ""
    contentOff: ""
    disabled: false
  components:
    "toggle": require "../src/toggle.vue"
  methods:
    onOn: ->
    onOff: ->
</script>
