<template>
  <section class="teacherList">
      Teacher list
        <ul class="collection">
            <li v-for="teacher in teachers" :key="teacher.id" @click="openProfile(teacher._id)" class="collection-item avatar">
                <img :src="teacher.img" class="circle">
                <p>{{teacher.name}}: {{teacher.topic}}</p>
            </li>
        </ul>
  </section>
</template>

<script>
export default {
name: 'TeacherList',
data() {
    return {
        teachers: []
        }
},
created() {
    //TODO: get teachers from service
    this.teachers= [
        {_id: 1, isTeacher: true, name: 'puki', topic:'Maths', img: 'https://graph.facebook.com/1908258719448452/picture?type=large'},
        {_id: 2, isTeacher: true, name: 'Shuki', topic:'Dev', img: 'https://www.gravatar.com/avatar/ec5ecb12a5198dbb705b12cd0e621235?s=32&d=identicon&r=PG'},
        {_id: 3, isTeacher: true, name: 'muki', topic:'Lang', img: 'https://i.stack.imgur.com/zk6Ku.png?s=32&g=1'}
    ]
},
methods: {
    openProfile(id) {
        this.$router.push(`/profile/${id}`) //Needs merge with profile page
    }
}
}
</script>

<style scoped>
li {
    border: 1px solid black
}
</style>
