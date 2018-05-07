<template>
<section>
 <h4>Add Class</h4>
                <div>
                  <div class="row">
                    <div class="input-field col s12">
                      <input v-model="teacherClassToEdit.topicId" type="text" class="validate">
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
                      <textarea  v-model="teacherClassToEdit.shortDes" class="materialize-textarea"></textarea>
                        <label class="left active">Summary</label>
                    </div>
                  </div>
                  <div class="row">
                    <div class="input-field col s12">
                      <textarea  v-model="teacherClassToEdit.longDes" class="materialize-textarea"></textarea>
                        <label class="left active">Description</label>
                    </div>
                  </div>
                   <div class="row">
                    <div class="input-field col s12">
                       <input type="text"  v-model="teacherClassToEdit.level" class="validate">
                        <label class="left active">Level</label>
                    </div>
                  </div>
                  <div class="row">
                    <div class="input-field col s12">
                      <input type="number" class="validate" v-model="teacherClassToEdit.pricePerHour">
                        <label class="left active">Price/Hour</label>
                    </div>
                  </div>
                  <div class="row">
                    <div class="input-field col s12">
                      <input type="text" class="validate" v-model="teacherClassToEdit.topicImage">
                        <label class="left active">Image url</label>
                    </div>
                  </div>
                  <div class="row">
                    <div class="input-field col s12">
                      <input type="text" class="validate">
                        <label class="left active">Address</label>
                    </div>
                  </div>

                  <a @click="saveClass" class="btn green accent-3">Add Class</a>
                </div> 

</section>
</template>

<script>
import teacherTopicService from "@/services/TeacherTopicService.js";

export default {
  data() {
    return {
      teacherClassToEdit: teacherTopicService.emptyTeacherTopic()
    };
  },
  props: {
     teacherClass: {
      type: Object
    }
  },
  created () {
    if (this.teacherClass) {
      teacherClassToEdit ={...this. teacherClass}
    }
  },
 
  computed: {},
  methods: {
    saveClass() {
       if(!this.teacherClassToEdit.topicId) this.teacherClassToEdit.topicId= "5ae97336b8ed24ed05f66112";
       this.teacherClassToEdit.teacherId= this.$route.params.userId;
       
      console.log('class', this.teacherClassToEdit);
      this.$store
        .dispatch({ type: "saveTeacherTopic", teacherTopic: this.teacherClassToEdit })
        .then(added => {
            window.alert("Updated class");
          console.log("added");
        })
        .catch(err => {
           window.alert("Failed class");
          console.log("failed:" + err);
        });
    }
  },
  components: {teacherTopicService}
};
</script>

<style scoped>

</style>