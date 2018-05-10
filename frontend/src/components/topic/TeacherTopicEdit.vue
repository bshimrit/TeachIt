<template>
  <section>
    <form v-if="topics" @submit.prevent="emitSave">   
        <div v-if="topics.length" class="input-field col s12">
            <select>
              <option value="" disabled selected>I Teach</option>
              <option v-for="topic in topics" :key="topic._id" :value="topic._id">{{topic.title}}-{{topic.subtitle}}</option>
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
      teacherClassToEdit: teacherTopicService.emptyTeacherTopic(),
    };
  },
  props: {
    teacherClass: {
      type: Object,
    },
    showModal:{ type: Boolean}
  },
  created() {
    if (this.teacherClass) {
      this.teacherClassToEdit = { ...this.teacherClass };
    }
  },
  mounted() {
    this.$store.dispatch({type: 'loadTopics'}).
          then(topics => {
              if (this.teacherClassToEdit.topic) $('select').val(this.teacherClassToEdit.topic._id);
              $('select').material_select()
          })
  },
  computed: {
     topics(){
            return this.$store.getters.topicsForDisplay;
        }
  },
  methods: {
    emitSave(){
      this.teacherClassToEdit.topicId =  $('select').val();
      this.$emit('emitToModal', this.teacherClassToEdit);

    }
  },
  components: { teacherTopicService }
};
</script>

<style scoped>

</style>