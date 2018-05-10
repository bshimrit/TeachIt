<template>
  <section>
    <button class="btn-floating halfway-fab btn-large  yellow"  @click.stop="showModal = true"><i class="fa fa-plus"></i></button>
    <topicEditModal @toSave="saveClass" :teacherClass="teacherClass" :showModal="showModal" @modalClosed="clearModal"></topicEditModal>
    <ul class="cards-container flex flex-wrap">
      <li class="card-item" v-for="teacherTopic in teacherTopics" :key="teacherTopic._id">
        <TeacherTopic @toEdit="toEdit"  :teacherTopic="teacherTopic" :showLongDesc="false" :showTeacher="false" :showEdit="true"></TeacherTopic>
      </li>
    </ul>
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
        teacherClassToEdit.teacherId = this.$route.params.userId;

      this.$store.dispatch({type: "saveTeacherTopic",teacherTopic: teacherClassToEdit})
        .then(added => {
            this.$store.dispatch({ type: "getTopicsByTeacherId", teacherId: this.$route.params.userId })
        })
        .catch(err => {
          this.teacherClass = null;
        });
        this.clearModal();
    },
    clearModal() {
      this.showModal = false;
      this.teacherClass = null;
    },
  },
  created() {
    var userId = this.$route.params.userId;
    this.$store
      .dispatch({ type: "getTopicsByTeacherId", teacherId: userId })
  },
  components: {
    TeacherTopic,
    TopicEdit,
    TopicEditModal
  }
};
</script>

<style scoped>
  .btn-floating.btn-large.halfway-fab {
    bottom: 10px;
  }

  .classes-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #2b303b;
    padding-bottom: 10px;
    margin-bottom: 20px;
}
/* button:focus {
  background-color: white;
} */
</style>