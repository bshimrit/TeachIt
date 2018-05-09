<template>
  <section class="teacherList">
        <ul class="collection flex flex-wrap">
            <li v-for="teacher in teachers" :key="teacher._id" @click="openProfile(teacher._id)" class="collection-item avatar">
                <div class="card">
                    <div class="card-image">
                        <img src="../../../public/img/topics/topic1.jpg" />
                        <span class="card-title">{{topics.title}}</span>
                        <a class="btn-floating halfway-fab waves-effect waves-light red btn-large"><img src="../../../public/img/users/user1.jpg" /></a>
                    </div>
                    <h5>{{teacher.name}}</h5>
                    <div class="card-content">
                        <StarRating :star-size=30 :increment=0.1 :rating="teacher.rating" :read-only="true" :show-rating="false"/>
                        <h5>{{teacher.topic}} <br> Price: {{teacher.price}}₪</h5>
                        <p>{{teacher.desc}}</p>
                    </div>
                </div>
            </li>
        </ul>
  </section>
</template>

<script>
import TeacherTopicPreview from '@/components/topic/TeacherTopicPreview.vue'
import StarRating from 'vue-star-rating'

export default {
props:['topics'],
name: 'TeacherList',
data() {
    return {
        teachers: []
        }
},
created() {
    //TODO: get teachers from service
    this.teachers= [
        {_id: 1, isTeacher: true, name: 'Puki', desc: 'Short description', rating: 3.7, topic:'Maths', price: 90, img: 'https://graph.facebook.com/1908258719448452/picture?type=large'},
        {_id: 2, isTeacher: true, name: 'Shuki', desc: 'Short description', rating: 5, topic:'Dev', price: 110, img: 'https://www.gravatar.com/avatar/ec5ecb12a5198dbb705b12cd0e621235?s=32&d=identicon&r=PG'},
        {_id: 3, isTeacher: true, name: 'Muki', desc: 'Short description', rating: 4.4, topic:'Lang', price: 100, img: 'https://i.stack.imgur.com/zk6Ku.png?s=32&g=1'}
    ]
},
methods: {
    openProfile(id) {
        this.$router.push(`/profile/${id}`) //Needs merge with profile page
    }
},
components: {
    TeacherTopicPreview,
    StarRating
}
}
</script>

<style scoped>
ul {
    display: flex;
    flex-wrap: wrap;
}
li {
    border: 1px solid #577594;
    text-align: left;
    width: 33.333%
}
.card-content {
    width: 100%;
}
.collection .collection-item.avatar {
    padding: 10px
}

</style>
