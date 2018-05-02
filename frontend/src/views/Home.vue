<template>
  <div class="home">
    <FilterCmp/>
    MostPopular
    <topicPreview/>
    Categories
    <topicPreview/>
  </div>
</template>

<script>
// @ is an alias to /src
import FilterCmp from '@/components/FilterCmp.vue'
import TopicPreview from '@/components/topic/topicPreview.vue'

export default {
  name: 'home',
  components: {
    FilterCmp,
    TopicPreview
  }
}
</script>
