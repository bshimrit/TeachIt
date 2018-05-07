<template>
<section>
 <h4>My Classes</h4>
     <div class="row">
          <div class="col" v-for="teacherTopic in teacherTopics" :key="teacherTopic._id">
            <TeacherTopic @toEdit="toEdit"  :teacherTopic="teacherTopic" :showLongDesc="false" :showTeacher="false" :showEdit="true"></TeacherTopic>
          </div>
      </div>     
       <a class="btn-floating btn-large waves-effect waves-light red"><i class="fa fa-plus"></i></a>
     <topic-edit :teacherClass="teacherClass"></topic-edit>

</section>
</template>

<script>
import TeacherTopic from "@/components/topic/TeacherTopicPreview.vue";
import TopicEdit from "@/components/profile/TopicEdit.vue";

export default {
  data() {
    return {
      // teacherTopics:[],
      teacherClass: null
    };
  },
  props: {},
  watch: {},
  computed: {
   teacherTopics() {
     return this.$store.state.TeacherTopicStore.teacherTopicsByTeacherId;
   }
  },
  methods: {
    toEdit(teacherTopic) {
      console.log(teacherTopic);
      
      this.teacherClass = teacherTopic;
    },
    
  },
  created() {
    var userId = this.$route.params.userId;

    this.$store
      .dispatch({ type: "getTopicsByTeacherId", teacherId: userId })
      // .then(topics => {
      //   console.log(topics);
      //   this.teacherTopics = topics;
      // });
  },
  components: {
    TeacherTopic,
    TopicEdit
  }
};
</script>

<style scoped>

</style>