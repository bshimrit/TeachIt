<template>
<section>

        <form  @submit.prevent="saveClass">   
            <div class="input-field col s12">
              <input v-model="teacherClassToEdit.topicId" type="text" class="validate">
              <label class="left active">TopicId</label>
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
           
            <div class="input-field col s12">
              <input type="text" v-model="teacherClassToEdit.shortDes" class="validate">
                <label class="left active">Summary</label>
            </div>
         
       
            <div class="input-field col s12">
              <input type="text"  v-model="teacherClassToEdit.longDes" class="validate">
                <label class="left active">Description</label>
            </div>
       
           
            <div class="input-field col s12">
                <input type="text"  v-model="teacherClassToEdit.level" class="validate">
                <label class="left active">Level</label>
            </div>
         
        
            <div class="input-field col s12">
              <input type="number" class="validate" v-model="teacherClassToEdit.pricePerHour">
                <label class="left active">Price/Hour</label>
            </div>
        
       
           <div class="input-field col s12">
              <input type="text" class="validate" v-model="teacherClassToEdit.topicImage">
                <label class="left active">Image url</label>
          </div>
       
            <div class="input-field col s12">
              <input type="text" class="validate">
                <label class="left active">Address</label>
             </div>
       
          <button class="btn accent-3">Cancel</button>
          <button type="submit" class="btn accent-3">Save Class</button>
        </form> 
       
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
  created() {
    if (this.teacherClass) {
      this.teacherClassToEdit = { ...this.teacherClass };
    }
  },

  computed: {},
  methods: {
    saveClass() {
      if (!this.teacherClassToEdit.topicId) this.teacherClassToEdit.topicId = "5ae97336b8ed24ed05f66112";
      this.teacherClassToEdit.teacherId = this.$route.params.userId;

      console.log("class", this.teacherClassToEdit);
      this.$store.dispatch({type: "saveTeacherTopic",teacherTopic: this.teacherClassToEdit})
        .then(added => {
          window.alert("Saved Class");
          console.log("Saved Class");
          this.teacherClassToEdit =teacherTopicService.emptyTeacherTopic();
        })
        .catch(err => {
          window.alert("Failed save class");
          console.log("failed:" + err);
          this.teacherClassToEdit = teacherTopicService.emptyTeacherTopic();
        });
    }
  },
  components: { teacherTopicService }
};
</script>

<style scoped>

</style>