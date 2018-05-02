<template>
    <section class="search">
        Filter by subject cmp <br>
        Sort cmp<br>
        <div class="map-list">
            <teacher-list class="teacher-list"></teacher-list>
            <teacher-map class="teacher-map"></teacher-map>
        </div>
    </section> 
</template>

<script>
import TeacherList from '@/components/Teacher/TeacherList.vue';
import TeacherMap from '@/components/Teacher/TeacherMap.vue'


export default {
components: {
    TeacherList,
    TeacherMap
}
}
</script>

<style>
.teacher-list {
    display: inline-block;
    width: 70%;
}
.teacher-map {
    display: inline-block;
    width: 30%
}
</style>
