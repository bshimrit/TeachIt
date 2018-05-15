<template>
  <div v-if="loggedInUser">
        <p class="font-bold">Add Review</p>
        <section class="flex align-start">
            <div class="user-details margin-right20">
                <div class="flex flex-column align-center">
                    <img :src="loggedInUser.img" class="small-image"> 
                    <p class="user-name" >{{loggedInUser.fullName}}</p>
                </div>
            </div>
            <form class="review-data" @submit.prevent="addReview">
                <StarRating :star-size=20 :increment=1 v-model="review.topicRating" :show-rating="false" :read-only="false"/>
                <textarea @keydown="handleEnter" v-model="review.topicReview" placeholder="Enter your review"/>
                <div class="flex justify-end">
                    <input class="btn" type="submit" :disabled="!isValid" />
                </div>
            </form>
        </section>
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
            loggedUser: this.$store.getters.loggedUser 
        }
    },
    computed: {
        isValid() {
            return this.review.topicRating > 0 || this.review.topicReview;
        },
        loggedInUser(){
            return this.$store.getters.loggedUser;
        },
    },
    methods: {
        getEmptyReview() {
            return {
                userId:  '',
                topicRating: 0,
                topicReview: '',
                teacherTopicId: this.$route.params.teacherTopicId,
                teacherId: this.teacherId
            };
        },
        addReview(){
            this.review.userId = this.$store.getters.loggedUser._id;
            this.$store.dispatch({type: 'saveReview', review:this.review})
            .then(saveReview => {
                this.review = this.getEmptyReview()
                this.$emit('addedReview')
            })
            .catch(err => {
                console.error('Review Was NOT Saved', err);
            })
        },
        handleEnter(e)
        {
            var characterCode;
            if(e && e.which)
            {
                e = e;
                characterCode = e.which;
            }
            else
            {
                e = event;
                characterCode = e.keyCode;
            }
           

            if(characterCode == 13)
            {
                e.preventDefault();
                this.addReview();
                return false;
            }
            else
            {
                return true;
            }
        }
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

