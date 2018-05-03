<template>
  <section v-if="teacherTopic">
        <div class="card">
            <div class="card-image">
                <img v-if="(showTeacher != undefined ? showTeacher : true)" class="topic-img" :src="teacherTopic.topicImg" />
                <span class="card-title">{{teacherTopic.topic}}</span>
                <a @click="goToProfile" class="btn-floating halfway-fab waves-effect waves-light red btn-large"><img :src="teacherTopic.teacherImg" /></a>
                </div>
                <h5>{{teacherTopic.teacher}}</h5>
                <div class="card-content">
                <StarRating v-model="teacherTopic.rating" :star-size="30" :read-only="true" :show-rating="false"/>
                <h4>{{teacherTopic.subtitle}}</h4>
                <p>{{teacherTopic.shortDes}}</p>
                <p class="long-desc" v-if="(showLongDesc != undefined ? showLongDesc : true)">{{teacherTopic.longDes}}</p>
                <a @click="goToProfile">Read More</a>                    
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
    .card {
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }

    .card:hover {
       box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}
    .btn-floating.btn-large {
        top: -40px;
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

    .long-desc {
        max-height: 60px;
        overflow: hidden;
    }

    a {
        color: blue;
    }

</style>
