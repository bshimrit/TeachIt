<template lang="pug">
.container
  p
    a(href="https://github.com/vue-comps/vue-comps-waves/blob/master/dev/basic.vue") source
  button.btn black ripple
    waves(v-ref:wave1)

  button.btn blue ripple
    waves(color="blue" v-ref:wave2)
  button.btn green ripple
    waves(color="green" v-ref:wave3)
  button.btn(style="position:relative") red ripple
    waves(color="red" v-ref:wave4)
  button.btn(style="position:relative;z-index:2") yellow ripple
    waves(color="yellow" v-ref:wave5)
  br
  div(style="width:100px;height:100px;background-color:red")
    waves(color="blue")
  div(style="width:100px;height:100px;background-color:blue")
    waves(color="red")
</template>

<script lang="coffee">
module.exports =
  mixins:[
    require("vue-mixins/vue")
  ]
  components:
    "waves" : require "../src/waves.vue"

</script>
