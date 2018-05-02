<template>
  <div class="home">
    <Search/>
  </div>
</template>

<script>
// @ is an alias to /src
import Filter from '@/components/Filter.vue'

export default {
  name: 'home',
  components: {
    Filter
  }
}
</script>
