<template>
  <div class="topic-review">
    <section class="flex flex-column align-start">
      <div v-if="reviews.length && $mq !== 'sm'" class="font-bold">
        <div v-if="teacherTopicId">Class review</div>
        <div v-else>Teacher review</div>
      </div>
      <template v-if="$mq !== 'sm'">
        <reviewChart :reviewsCnt="reviewsCnt" :width="(reviews.length ? 100 : 0)" :height="(reviews.length ? 150 : 0)"></reviewChart>
      </template>
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
    },
    reviewsCnt() {
      return this.$store.getters.reviewsCntDisplay
    }
  },
  methods: {
    loadReviews(){
      if (this.teacherTopicId) {
        this.$store.dispatch({type: 'loadReviewsByTeacherTopicId', teacherTopicId: this.teacherTopicId})
      } else if (this.teacherId){
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
</style>

