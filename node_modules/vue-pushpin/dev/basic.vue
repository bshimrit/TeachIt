<template lang="pug">
.container(style="height:2000px")
  br
  a(href="https://github.com/vue-comps/vue-pushpin/blob/master/dev/basic.vue") source
  pushpin(offset=300,top=400,bottom=1000,v-ref:p)
    p(style="color:red") pushpin content
  p make the window small (height &lt; 800px) and scroll to the bottom
</template>

<script lang="coffee">
module.exports =
  mixins: [
    require("vue-mixins/getViewportSize")
  ]
  components:
    "pushpin": require "../src/pushpin.vue"
</script>
