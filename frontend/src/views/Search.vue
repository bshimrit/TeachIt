<template>
    <section class="search">
        Filter by subject cmp <br>
        Sort cmp<br>
        <teacher-list></teacher-list>
        map cmp
    </section> 
</template>

<script>
import TeacherList from '@/components/search/TeacherList.vue'

export default {
components: {
    TeacherList
}
}
</script>

<style>

</style>
