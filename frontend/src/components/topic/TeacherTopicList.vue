<template>
  <section>
    <div class="row">
      <button class="btn-floating btn-large waves-effect waves-light yellow" id="show-modal" @click="showModal = true"><i class="fa fa-plus"></i></button>
      <topicEditModal @toSave="saveClass" :teacherClass="teacherClass" :showModal="showModal" @modalClosed="showModal= false"></topicEditModal>
      <div class="col" v-for="teacherTopic in teacherTopics" :key="teacherTopic._id">
        <TeacherTopic @toEdit="toEdit"  :teacherTopic="teacherTopic" :showLongDesc="false" :showTeacher="false" :showEdit="true"></TeacherTopic>
      </div>
    </div>     
  </section>
</template>

<script>
import TeacherTopic from "@/components/topic/TeacherTopicPreview.vue";
import TopicEdit from "@/components/topic/TeacherTopicEdit.vue";
import TopicEditModal from "@/components/topic/TopicEditModal.vue";
import teacherTopicService from "@/services/TeacherTopicService.js";

export default {
  data() {
    return {
      teacherClass: null,
    
      showModal: false
    };
  },
  props: {},
  watch: {},
  computed: {
   teacherTopics() {
     return this.$store.getters.teacherTopicsForDisplay;
     
   }
  },
  methods: {
    toEdit(teacherTopic) {
      this.teacherClass = teacherTopic;
      this.showModal = true;
    },

     saveClass(teacherClassToEdit) {
      if (!teacherClassToEdit.topicId) teacherClassToEdit.topicId = "5ae97573b8ed24ed05f66166";
      teacherClassToEdit.teacherId = this.$route.params.userId;

      this.$store.dispatch({type: "saveTeacherTopic",teacherTopic: teacherClassToEdit})
        .then(added => {
          console.log("Saved Class");
          this.teacherClass =null;
         
        })
        .catch(err => {
          console.log("failed:" + err);
          this.teacherClass = null;
        });
         this.showModal = false;
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