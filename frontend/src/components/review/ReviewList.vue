<template>
    <section class="review-list">
        <p class="font-bold">Reviews</p>
        <ul class="collection">
            <li class="flex align-center collection-item " v-for="review in reviews" :key="review._id">
                <div class="margin-right20">
                    <div class="flex flex-column align-center">
                        <img :src="userImg" class="small-image"> 
                        name
                    </div>
                </div>
                <div class="review-data">
                    <StarRating :star-size=20 :increment=1 v-model="review.topicRating" :show-rating="false" :read-only="false"/>
                    <textarea v-model="review.topicReview" placeholder="Enter your review"/>
                </div>
                <hr>
            </li>
        </ul>
    </section>
</template>

<script>
import StarRating from 'vue-star-rating'

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
    this.$store.dispatch({type: 'loadReviewsByTeacherTopicId', teacherTopicId})
    .then(() => {
        this.$store.dispatch({type: 'getTeacherTopicById', teacherTopicId})
        .then(teacherTopic => {
                this.teacherTopic = teacherTopic[0];
            })
    })
  },
  computed: {
      reviews() {
          return this.$store.getters.reviewsForDisplay
      },
      userImg() {
            return this.$store.getters.onlineUserImg
        }

  },
  components:{
      StarRating
  }
}
</script>


<style scoped>
    img {
        height: 50px;
        width: 50px;
        border-radius: 50%
    }

    textarea {
        width: 100%;
        resize: none;
        border:none;
        height: 100px;
    }

    textarea:focus{
        outline: 0;
    }

    .collection {
        border: none;
        font-size: 16px;
    }
    .collection-item{
        padding-left: 0;
    }

</style>

