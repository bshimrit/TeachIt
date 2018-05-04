<template>
  <section >
        <div class="card">
                <div class="card-image">
                    <img v-if="showTeacher" class="topic-img" :src="teacherTopic.topicImage" />
                    <a @click="goToProfile" class="teacher-img btn-floating  waves-effect waves-light btn-large"><img :src="teacherTopic.teacher.img" /></a>
                </div>
                    <h4>{{teacherTopic.topic.subtitle}}</h4>
                    <h5>{{teacherTopic.teacher.name}}</h5>
                <div class="card-content">
                    <StarRating v-model="teacherTopic.rating" :star-size="30" :read-only="true" :show-rating="false"/>
                    <p class="bold">{{teacherTopic.level}}</p>
                    <p>{{teacherTopic.shortDes}}</p>
                    <div v-if="showLongDesc">
                        <p class="long-desc">{{teacherTopic.longDes}}</p>
                        <a @click="goToProfile">Read More</a>                    
                    </div> 
                </div>
            </div>
    </section>
</template>

<script>

import StarRating from 'vue-star-rating'
export default {
    props: {teacherTopic:null,showTeacher:{default:true},showLongDesc:{default:true}},
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

    .card .card-image {
        height: 200px;
    }

    a.teacher-img {
        /* right: calc(50% - 40px); */
        width: 80px;
        height:80px;
        bottom: 40px;
        /* top: -10px; */
    }

</style>
