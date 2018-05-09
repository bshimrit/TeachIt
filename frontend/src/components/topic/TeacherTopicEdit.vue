<template>
<section>
 
        <form  @submit.prevent="emitSave">

           <div class="input-field col s12">
               <select v-model="teacherClassToEdit.topicId" ref="selectedTopic">
                  <option value="" disabled selected>Class Subject</option>
                  <option v-for="topic in topics" :key="topic._id" :value="topic">{{topic.title}}-{{topic.subtitle}}</option>
              </select>
            </div>
            
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
    },
    showModal: { type: Boolean }
  },
  mounted() {
    if (this.$mq === "lg") {
      this.$refs.selectedTopic.onchange = this.setSelectedTopic;
    }
  },
  created() {
    if (this.teacherClass) {
      this.teacherClassToEdit = { ...this.teacherClass };
    }
    this.$store.dispatch({ type: "loadTopics" }).then(topics => {
      $("select").material_select();
    });
  },

  computed: {
    topics() {
      return this.$store.getters.topicsForDisplay;
    }
  },
  methods: {
    emitSave() {
      console.log("emit in edit:", this.teacherClassToEdit);
      console.log("showModal:", this.showModal);
      console.log("send:", this.teacherClassToEdit);
      this.$emit("emitToModal", this.teacherClassToEdit);
    },
    setSelectedTopic() {
      console.log("this:", $("select").val()._id);
      // this.teacherClassToEdit.topicId = $('select').val()._id;
    }
  },
  components: { teacherTopicService }
};
</script>

<style scoped>

</style>