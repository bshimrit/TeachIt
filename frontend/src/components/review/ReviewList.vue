<template>
    <section class="review-list">
        <p class="font-bold">Reviews</p>
        <ul class="collection">
            <li v-if="review.user" class="flex align-start collection-item " v-for="review in reviews" :key="review._id">
                <div class="user-details margin-right20">
                    <div class="flex flex-column align-center">
                        <img :src="review.user.img" class="small-image"> 
                        <p class="user-name">{{review.user.fullName}}</p>
                    </div>
                </div>
                <div class="review-data">
                    <StarRating :star-size=20 :increment=1 v-model="review.topicRating" :show-rating="false" :read-only="true"/>
                    <textarea readonly v-if="review.topicReview" v-model="review.topicReview"/>
                </div>
                <hr>
            </li>
        </ul>
    </section>
</template>

<script>
import StarRating from 'vue-star-rating'

export default {
    name: 'reviewList',
    props: ['userId'],
    created() {
            var teacherTopicId = this.userId || this.$route.params.teacherTopicId
            this.$store.dispatch({type: 'loadReviewsByTeacherTopicId', teacherTopicId})
    },
    computed: {
        reviews() {
            return this.$store.getters.reviewsForDisplay
        },

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
        width: 100%
    }

</style>

