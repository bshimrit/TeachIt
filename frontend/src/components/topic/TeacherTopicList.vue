<template>
<section>
 <h5>My Classes</h5>
     <div class="row">
       <topicEditModal :teacherClass="teacherClass"></topicEditModal>

          <div class="col" v-for="teacherTopic in teacherTopics" :key="teacherTopic._id">
            <TeacherTopic @toEdit="toEdit"  :teacherTopic="teacherTopic" :showLongDesc="false" :showTeacher="false" :showEdit="true"></TeacherTopic>
          </div>
      </div>     
       <a @click="toAdd"  v-if="!editClass" class="btn-floating btn-large waves-effect waves-light red"><i class="fa fa-plus"></i></a>
       <div class="col s6"> <topic-edit v-if="editClass" :teacherClass="teacherClass"></topic-edit></div>
    

</section>
</template>

<script>
import TeacherTopic from "@/components/topic/TeacherTopicPreview.vue";
import TopicEdit from "@/components/topic/TeacherTopicEdit.vue";
import TopicEditModal from "@/components/topic/TopicEditModal.vue";

export default {
  data() {
    return {
      teacherClass: null,
      editClass: false
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
      this.teacherClass = teacherTopic;
      this.editClass=true;
    },
     toAdd() {
    
      this.editClass=true;
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
    TopicEdit,
    TopicEditModal
  }
};
</script>

<style scoped>

</style>