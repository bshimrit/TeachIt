<template>
  <div class="topic-review">
    <div class="row">
        <div class="col s12 m10">
            <div class="card-panel">
                    <form class="flex flex-column justify-start" @submit.prevent="addReview">
                    <h5>Add Review</h5>
                    <label>
                        <img :src="userImg" class="small-image"> Name 
                        <input type="text" :value="review.fullName" disabled/>
                    </label>
                    <label>
                        Rate Class
                        <StarRating :star-size=30 :increment=1 v-model="review.topicRating" :read-only="false" :show-rating="true"/>
                        <!-- <input type="number" v-model.number="review.rate"  /> -->
                    </label>
                
                    <label>
                        Review
                        <textarea v-model="review.topicReview" placeholder="Enter your review"/>
                    </label>
                    <button class="btn" type="submit" :disabled="!isValid">Add review</button>
                </form>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import ReviewService from '@/services/ReviewService.js'
import StarRating from 'vue-star-rating'

export default {
    name: 'ReviewAdd',
    props: ['userId'],
  data() {
        return {
            review: this.getEmptyReview(),
        }
    },
    computed: {
        isValid() {
            return this.review.topicRating > 0 && this.review.topicReview;
        },
        userImg() {
            return this.$store.getters.onlineUserImg
        }
    },
    methods: {
        getEmptyReview() {
            var idGetter = this.userId || this.$route.params.teacherTopicId;
            console.log('got id:', idGetter);
            
            return {
                fullName: this.$store.getters.onlineUserName,
                reviewerId: (this.$store.getters.loggedUser)? this.$store.getters.loggedUser._id: 'Please log in',
                topicRating: 0,
                readAt: (new Date()),
                topicReview: '',
                teacherTopicId: idGetter
            };
        },
        addReview(){
            ReviewService.saveReview(this.review)
            .then(saveReview => {
                this.review = this.getEmptyReview()
            })
            .catch(err => {
                console.error('Review Was NOT Saved', err);
            })
        }
        
    },
    components: {
        StarRating
    }
}
</script>


<style scoped>
.topic-review {
  width: 70%;
}
.topic-review {
    width: 100%;
    margin: 0 auto
}
.small-image {
    height: 50px;
    width: 50px;
    border-radius: 50%
}
</style>

