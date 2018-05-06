<template>
<section>
 <h4>My Classes</h4>
     <div class="row">
          <div class="col s12 m3" v-for="teacherTopic in teacherTopics" :key="teacherTopic._id">
            <TeacherTopic :teacherTopic="teacherTopic" :showLongDesc="false"></TeacherTopic>
          </div>
      </div>     
     
     <topic-edit></topic-edit>

</section>
</template>

<script>
import TeacherTopic from "@/components/topic/TeacherTopicPreview.vue";
import TopicEdit from "@/components/profile/TopicEdit.vue";

export default {
  data() {
    return {
      teacherTopics:[]
    };
  },
  props: {},
  watch: {},
  computed: {
   
  },
  methods: {},
  created() {
    var userId = this.$route.params.userId;

    this.$store
      .dispatch({ type: "getTopicsByTeacherId", teacherId: userId })
      .then(topics => {
        console.log(topics);
        this.teacherTopics = topics;
      });
  },
  components: {
    TeacherTopic,
    TopicEdit
  }
};
</script>

<style scoped>

</style>