<template>
  <div v-if="loggedInUser">
        <p class="font-bold">Add Review</p>
        <form class="flex align-start" @submit.prevent="addReview">
            <div class="user-details margin-right20">
                <div class="flex flex-column align-center">
                    <img :src="loggedInUser.img" class="small-image"> 
                    <p class="user-name" >{{loggedInUser.fullName}}</p>
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
    props: ['teacherId'],
  data() {
        return {
            review: this.getEmptyReview(),
        }
    },
    computed: {
        isValid() {
            return this.review.topicRating > 0 ; //&& this.review.topicReview;
        },
        loggedInUser(){
            return this.$store.getters.loggedUser;
        },
    },
    methods: {
        getEmptyReview() {
            var curUser = this.$store.getters.loggedUser;
            return {
                userId:  curUser ? curUser._id: 'Please log in',
                topicRating: 0,
                topicReview: '',
                teacherTopicId: this.$route.params.teacherTopicId,
                teacherId: this.teacherId
            };
        },
        addReview(){
            ReviewService.saveReview(this.review)
            .then(saveReview => {
                this.review = this.getEmptyReview()
                this.$emit('addedReview')
            })
            .catch(err => {
                console.error('Review Was NOT Saved', err);
            })
        },
        
        
    },
    components: {
        StarRating
    }
}
</script>


<style scoped>

textarea {
    width: 100%;
    resize: none;
}

.user-name {
    font-size: 15px;
}

</style>

