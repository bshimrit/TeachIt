<template>
  <div class="topic-review">
        <p class="font-bold">Add Review</p>
        <form class="flex align-center" @submit.prevent="addReview">
            <div class="margin-right20">
                <div class="flex flex-column align-center">
                    <img :src="userImg" class="small-image"> 
                    {{review.fullName}}
                </div>
            </div>
            <div class="review-data">
                <StarRating :star-size=20 :increment=1 v-model="review.topicRating" :show-rating="false" :read-only="false"/>
                <textarea v-model="review.topicReview" placeholder="Enter your review"/>
                <div class="flex justify-end">
                    <button class="btn" type="submit" :disabled="!isValid">Submit</button>
                </div>
            </div>
        </form>
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
            return this.review.topicRating > 0 ; //&& this.review.topicReview;
        },
        userImg() {
            return this.$store.getters.onlineUserImg
        }
    },
    methods: {
        getEmptyReview() {
            var idGetter = this.userId || this.$route.params.teacherTopicId;
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

textarea {
    width: 100%;
    resize: none;
}

</style>

