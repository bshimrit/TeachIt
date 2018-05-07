<template>
  <section >
        <div class="card">
            <div class="card-image">
                <img @click="goToTeacherTopicProfile"  class="pointer topic-img" :src="teacherTopic.topicImage" />
                <a @click="goToTeacherProfile" v-if="showTeacher" class="teacher-img btn-floating  waves-effect waves-light btn-large"><img :src="teacherTopic.teacher.img" /></a>
            </div>
                <p class="card-header font-bold">{{teacherTopic.topic.subtitle}} <br> {{teacherTopic.teacher.fullName}} </p>
            <div class="card-content">
                <p>{{teacherTopic.level}} - {{teacherTopic.pricePerHour}}$/perHour</p>
                <p>{{teacherTopic.shortDes}}</p>
                <StarRating v-model="teacherTopic.rating" :star-size="15" :read-only="true" :show-rating="false"/>
                <div v-if="showEdit">
                    <a class="waves-effect waves-light" @click="$emit('toEdit', teacherTopic)">Edit</a>
                    <button class="waves-effect waves-light" @click="deleteClass">Delete</button>
                    <button v-on:click="$emit('enlarge-text', 0.1)">
                    Enlarge text
                    </button>
                </div>
                <div v-if="showLongDesc">
                    <p class="long-desc">{{teacherTopic.longDes}}</p>
                </div> 
            </div>
        </div>
    </section>
</template>

<script>

import StarRating from 'vue-star-rating'
export default {
    name: 'TeacherTopicPreview',
    props: {teacherTopic:null,showTeacher:{default:true},showLongDesc:{default:true},showEdit:{default:false}},
    data(){
        return {}
    },
    computed: {
    },
    components: {
        StarRating
    },
    methods: {
        goToTeacherProfile(){
            if (this.showTeacher)  this.$router.push('/profile/teacher/' + this.teacherTopic.teacherId);
        },
        goToTeacherTopicProfile(){
            this.$router.push('/profile/topic/' + this.teacherTopic._id)
        },
        
        deleteClass() {
            
           this.$store.dispatch({ type: "deleteTeacherTopic", teacherTopicId: this.teacherTopic._id , teacherId: this.teacherTopic.teacherId })
            .then(deleted => {
                window.alert("deleted");
            console.log("deleted");
            })
            .catch(err => {
            window.alert("Failed");
            console.log("failed:" + err);
            });
    }
       
    }
}
</script>

<style scoped>
    /* (min-width: 740px) */
    .card {
        width: 250px;
        /* height: 300px; */
        text-align: left;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }
    
    .card:hover {
       box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
    }

    .topic-img {
        width: 100%;
        height: 150px;
    }

    .vue-star-rating {
        width: 100%;
        justify-content: start;
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
        text-align:center;
    }

    a.teacher-img {
        /* right: calc(50% - 40px); */
        width: 80px;
        height:80px;
        bottom: 40px;
        /* top: -10px; */
    }

    .card-header {
        margin: 0;
        padding: 0 5px;
    }
    .card-content {
        padding: 0 5px;
        font-size: 14px;
    }

</style>
