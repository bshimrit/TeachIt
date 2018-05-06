<template>
    <section class="review-list">
        <ul>
            <li v-for="review in reviews" :key="review._id">
                <!-- <p>By: {{reviewerName}}</p> -->
                <p>Contnet: {{review.topicReview}}</p>
                <p>Rating: {{review.topicRating}} </p>
            </li>
        </ul>

        <ul class="collection">
            <li class="collection-item avatar">
            <img src="images/yuna.jpg" alt="" class="circle">
            <span class="title">Dani Cohen</span>
            <p>Rating: 5<br>
                Class: Math<br>
                "it's great!"
            </p>
            <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a>
            </li>
            <li class="collection-item avatar">
            <i class="material-icons circle">folder</i>
            <span class="title">Miki Mor</span>
            <p>Rating: 4 <br>
                Class: History<br>
                "Very good"
            </p>
            <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a>
            </li>
        </ul>
    </section>
</template>

<script>

export default {
  data () {
    return {
            teacherTopic: null
        }
  },
  created() {
      var teacherTopicId = this.$route.params.teacherTopicId
        this.$store.dispatch({type: 'loadReviews', teacherTopicId})
        this.$store.dispatch({type: 'getTeacherTopicById', teacherTopicId})
        .then(teacherTopic => {
            this.teacherTopic = teacherTopic;
            console.log('teacherTopic in reviewList',teacherTopic);
            })
  },
  computed: {
      reviews() {
          return this.$store.getters.reviewsForDisplay
      },
    //   reviewerName(userId) {
    //       console.log('userId:', userId);
          
    //       this.$store.dispatch({type: 'getUserById', userId})
    //       .then(user => user.userName)
    //   }
  },
}
</script>


<style scoped>
/* div {
  border: 1px black solid;
} */
</style>

