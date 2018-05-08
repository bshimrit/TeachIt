<template>
  <div class="topic-review">
    <section class="flex flex-column align-start">
      <div class="font-bold">
        <div v-if="teacherTopicId">Class review</div>
        <div v-else>Teacher review</div>
      </div>
      <reviewChart :reviews="reviews" :width="100" :height="150"></reviewChart>
    </section>
    <reviewAdd @addedReview="loadReviews" :teacherId="teacherId"></reviewAdd>
    <reviewList :reviews="reviews"></reviewList>
  </div>
</template>

<script>
import ReviewList from "./ReviewList.vue";
import ReviewAdd from "./ReviewAdd.vue";
import ReviewChart from "./ReviewChart.vue";
import FilterCmp from "@/components/FilterCmp.vue";

export default {
    name: 'TopicReview',
    props: ['teacherId','teacherTopicId'],
  created(){
      this.loadReviews()
    },
  data() {
    return {
      }
  },
  computed:{
    reviews() {
      return this.$store.getters.reviewsForDisplay
    }
  },
  methods: {
    loadReviews(){
      if (this.teacherTopicId) {
        this.$store.dispatch({type: 'loadReviewsByTeacherTopicId', teacherTopicId: this.teacherTopicId})
      } else {
        this.$store.dispatch({type: 'loadReviewsByTeacherId', teacherId: this.teacherId})
        
      }
    }
  },
  components: {
    ReviewList,
    ReviewAdd,
    ReviewChart,
    FilterCmp
  }
};
</script>


<style scoped>
/* div {
  border: 1px black solid;
} */
</style>

