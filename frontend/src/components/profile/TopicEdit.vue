<template>
<section>
 <h4>Add Class</h4>
                <div>
                  <div class="row">
                    <div class="input-field col s12">
                      <input v-model="lessonToUpdate.topicId" type="text" class="validate">
                      <label class="left active">TopicId</label>
                    </div>
                    </div>
                  <!-- <div class="row">
                    <div class="input-field col s12">
                      <input type="text" class="validate">
                      <label class="left active">Title</label>
                    </div>
                  </div>
                  <div class="row">
                    <div class="input-field col s12">
                      <input type="text" class="validate">
                        <label class="left active">Subtitle</label>
                    </div>
                  </div> -->
                   <div class="row">
                    <div class="input-field col s12">
                      <textarea  v-model="lessonToUpdate.shortDes" class="materialize-textarea"></textarea>
                        <label class="left active">Summary</label>
                    </div>
                  </div>
                  <div class="row">
                    <div class="input-field col s12">
                      <textarea  v-model="lessonToUpdate.longDes" class="materialize-textarea"></textarea>
                        <label class="left active">Description</label>
                    </div>
                  </div>
                   <div class="row">
                    <div class="input-field col s12">
                       <input type="text"  v-model="lessonToUpdate.level" class="validate">
                        <label class="left active">Level</label>
                    </div>
                  </div>
                  <div class="row">
                    <div class="input-field col s12">
                      <input type="number" class="validate" v-model="lessonToUpdate.pricePerHour">
                        <label class="left active">Price/Hour</label>
                    </div>
                  </div>
                  <div class="row">
                    <div class="input-field col s12">
                      <input type="text" class="validate" v-model="lessonToUpdate.topicImage">
                        <label class="left active">Image url</label>
                    </div>
                  </div>
                  <div class="row">
                    <div class="input-field col s12">
                      <input type="text" class="validate">
                        <label class="left active">Address</label>
                    </div>
                  </div>

                  <a @click="saveLesson" class="btn green accent-3">Add Class</a>
                </div> 

</section>
</template>

<script>
import teacherTopicService from "@/services/TeacherTopicService.js";

export default {
  data() {
    return {
      lessonToUpdate: teacherTopicService.emptyTeacherTopic()
    };
  },
  props: {
    lesson: {
      type: Object
    }
  },
  watch: {},
  computed: {},
  methods: {
    saveLesson() {
       var userId = this.$route.params.userId;
       this.lessonToUpdate.teacherId= this.$route.params.userId;
       this.lessonToUpdate.topicId= "5ae97336b8ed24ed05f66112";
      console.log('lesson', this.lessonToUpdate);
      this.$store
        .dispatch({ type: "saveTeacherTopic", teacherTopic: this.lessonToUpdate })
        .then(added => {
            window.alert("Updated lesson");
          console.log("added");
        })
        .catch(err => {
           window.alert("Failed lesson");
          console.log("failed:" + err);
        });
    }
  },
  components: {teacherTopicService}
};
</script>

<style scoped>

</style>