<template>
    <section class="review-list">
        <ul class="collection">
            <li class="collection-item avatar" v-for="review in reviews" :key="review._id">
            <img :src="teacherTopic.teacher.img" alt="" class="circle">
            <span class="title">{{teacherTopic.teacher.fullName}}</span>
            <p>Rating: {{review.topicRating}}<br>
                Class: {{teacherTopic.topic.title}}, {{teacherTopic.topic.subtitle}} <br>
                "it's great!"
            </p>
            <a href="#!" class="secondary-content"><i class="fa fa-star"></i></a>
            </li>
        </ul>
    </section>
</template>

<script>

export default {
  data () {
    return {
            teacherTopic: {
                teacher: {fullName: null},
                topic: {title:null, subtitle: null}
                }
        }
  },
  created() {
      var teacherTopicId = this.$route.params.teacherTopicId
        this.$store.dispatch({type: 'loadReviews', teacherTopicId})
        this.$store.dispatch({type: 'getTeacherTopicById', teacherTopicId})
        .then(teacherTopic => {
            this.teacherTopic = teacherTopic[0];
            })
  },
  computed: {
      reviews() {
          return this.$store.getters.reviewsForDisplay
      }
  },
}
</script>


<style scoped>
li {
    border: 1px solid black
}
img {
    height: 50px;
    width: 50px;
    border-radius: 50%
}
/* div {
  border: 1px black solid;
} */
</style>

