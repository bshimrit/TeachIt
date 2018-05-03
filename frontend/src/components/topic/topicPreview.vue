<template>
  <section v-if="teacherTopic">
        <div class="card">
            <div class="card-image">
                <img v-if="(showTeacher ? showTeacher : true)" class="topic-img" :src="teacherTopic.topicImg" />
                <span class="card-title">{{teacherTopic.topic}}</span>
                <a @click="goToProfile" class="btn-floating halfway-fab waves-effect waves-light red btn-large"><img :src="teacherTopic.teacherImg" /></a>
                </div>
                <h5>{{teacherTopic.teacher}}</h5>
                <div class="card-content">
                <StarRating v-model="teacherTopic.rating" :star-size="30" :read-only="true" :show-rating="false"/>
                <h4>{{teacherTopic.subtitle}}</h4>
                <p>{{teacherTopic.shortDes}}</p>
                <p v-if="(showLongDesc ? showLongDesc : true)">{{teacherTopic.longDes}}</p>
            </div>
        </div>
    </section>
</template>

<script>

import StarRating from 'vue-star-rating'
export default {
    props: ['teacherTopic','showTeacher','showLongDesc'],
    data(){
        return {}
    },
    computed: {
    },
    components: {
        StarRating
    },
    methods: {
        goToProfile(){
            this.$router.push('/profile/' + this.teacherTopic._id)
        }
    }
}
</script>

<style scoped>
    .btn-floating.btn-large {
        top: -30px;
        width: 80px;
        height:80px;
    }
    .topic-img {
        width: 300px;
        height: 150px;
    }
    .vue-star-rating {
        width: 100%;
        justify-content: center;
    }
</style>
